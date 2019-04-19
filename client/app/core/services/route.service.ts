import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'client/app/auth/services/auth.service';
import { from, Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteService {
  public primaryRoute$: Observable<ActivatedRoute>;
  private primaryRoute: ActivatedRoute;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platformLocation: PlatformLocation
  ) {
    this.primaryRoute$ = this.getPrimaryRoute().pipe(share());
    this.primaryRoute$.subscribe(route => (this.primaryRoute = route));
  }

  getLandingPageUrl() {
    if (this.auth.isAuthenticated()) {
      return '/home';
    } else {
      return '/login';
    }
  }

  getAbsoluteUrl(commands: any[], params?: any) {
    const origin = (this.platformLocation as any).location.origin;
    const absoluteUrl = origin + this.getRelativeUrl(commands, params);
    return absoluteUrl;
  }

  getCurrentUrl() {
    const url = this.getRelativeUrl(['.'], null, this.primaryRoute);
    return url;
  }

  getRedirectUrl() {
    let redirect = (this.primaryRoute || this.activatedRoute).snapshot.queryParams.redirect;
    redirect = redirect || this.getCurrentUrl();
    return redirect;
  }

  getRelativeUrl(commands: any[], params?: any, route: ActivatedRoute = this.primaryRoute || this.activatedRoute) {
    const url = this.router.createUrlTree(commands, { relativeTo: route, queryParams: params });
    const relativeUrl = this.router.serializeUrl(url);
    return relativeUrl;
  }

  goToLandingPage(): Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      const landingUrl = this.getLandingPageUrl();
      return this.router.navigate([landingUrl]);
    } else {
      return this.goToLogin();
    }
  }

  goToLogin(noRedirect = false, redirectUrl?): Promise<boolean> {
    if (noRedirect || redirectUrl === '' || redirectUrl === '/' || redirectUrl === '/login') {
      return this.router.navigate(['/login']);
    } else {
      const redirect = redirectUrl || this.getRelativeUrl(['.'], null, this.primaryRoute);
      if (redirect === '/login') {
        return Promise.resolve(false); // already there
      }

      let params = {};
      if (redirect && redirect !== '/') {
        params = { ...params, redirect };
      }

      return this.router.navigate(['/login'], { queryParams: params });
    }
  }

  private getPrimaryRoute(): Observable<ActivatedRoute> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary')
    );
  }
}
