import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'client/app/core/models';
import { environment } from 'client/environments/environment';
import { Observable } from 'rxjs';

import { SignupMetadata } from '../models';
import { LoginMetadata } from '../models/login';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private backendUrl = environment.backendUrl;
  private version = environment.backendVersion;
  private baseUrl = `${this.backendUrl}/${this.version}/auth`;

  constructor(private http: HttpClient) {}

  signup(signup: SignupMetadata): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, signup);
  }

  login(login: LoginMetadata): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, login);
  }

  getCurrentUser(params?) {
    return this.http.get<User>(`${this.baseUrl}/profile`, { params });
  }
}
