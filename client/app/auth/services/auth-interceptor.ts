import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'client/environments/environment';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    let authRequest;
    if (authToken && req.url.includes(environment.backendUrl)) {
      authRequest = req.clone({
        headers: req.headers.set('x-access-token', authToken)
      });
    } else {
      authRequest = req.clone();
    }
    return next.handle(authRequest);
  }
}
