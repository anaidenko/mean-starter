import { Injectable } from '@angular/core';
import { User } from 'client/app/core/models';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { AuthApiService } from './auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private meSubj = new BehaviorSubject<User>(undefined);
  public me$ = this.meSubj.asObservable();

  @LocalStorage()
  private token: string;

  constructor(private api: AuthApiService, private localStorage: LocalStorageService) {}

  signup(metadata): Observable<any> {
    return this.api.signup(metadata);
  }

  login(metadata): Observable<any> {
    return this.api.login(metadata);
  }

  logout() {
    this.setUser(null);
    this.setToken(null);
  }

  verify(params?): Observable<User> {
    if (this.isAuthenticated()) {
      return this.api.getCurrentUser(params).pipe(
        tap(user => this.setUser(user)),
        share()
      );
    } else {
      return throwError(new Error('You are not authenticated, please proceed to login page'));
    }
  }

  refresh(me?: User): Observable<User> {
    if (me) {
      this.setUser(me);
      return of(me);
    } else if (this.isAuthenticated()) {
      const me$ = this.api.getCurrentUser().pipe(share());
      const sub = me$.subscribe(user => {
        sub.unsubscribe();
        this.setUser(user);
      });
      return me$;
    } else {
      return of(null);
    }
  }

  // Save the auth token in local storage
  setToken(token?: string) {
    if (token) {
      this.token = token;
      this.localStorage.store('token', token);
    } else {
      this.localStorage.clear('token');
    }
  }

  // Get token from local storage
  getToken() {
    return this.token;
  }

  /*
    Check if we are logged in
    - This is a cheap and dirty way of checking if we are logged in.
    - The backed needs to ensure that we are authorized access certain endpoints.
  */
  isAuthenticated() {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  private setUser(user: User) {
    this.meSubj.next(user);
  }
}
