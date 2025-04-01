import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Login {
  username: string;
  password: string;
}

export interface Signup {
  name: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.restServerUrl;

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/auth/login`, credentials);
  }

  signup(data: Signup): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/auth/signup`, data);
  }
}