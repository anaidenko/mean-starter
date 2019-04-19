import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'client/app/core/models';
import { RouteService } from 'client/app/core/services';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, mergeMap, share, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthResolver implements Resolve<User> {
  constructor(private authService: AuthService, private router: Router, private routeService: RouteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      return this.getMeOrResolve(route).pipe(catchError(err => this.handleError(err)));
    } else {
      this.routeService.goToLogin(false, state.url);
      return of(null);
    }
  }

  getMeOrResolve(route: ActivatedRoute | ActivatedRouteSnapshot): Observable<User> {
    if (!this.authService.isAuthenticated()) {
      return of(null);
    }
    const me = this.getMeFor(route);
    if (me) {
      return of(me);
    }
    return this.authService.verify();
  }

  getMeFor(route: ActivatedRoute | ActivatedRouteSnapshot): User {
    const snapshot: ActivatedRouteSnapshot = route instanceof ActivatedRoute ? route.snapshot : route;

    let me = snapshot.data.me;
    let parentSnapshot = snapshot.parent;
    while (!me && parentSnapshot) {
      me = parentSnapshot.data.me;
      parentSnapshot = parentSnapshot.parent;
    }

    return me;
  }

  private handleError(err): Observable<any> {
    console.error('AuthResolver Error', err);
    return of(null);
  }
}
