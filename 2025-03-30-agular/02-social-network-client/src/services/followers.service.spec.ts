import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  private baseUrl = environment.restServerUrl;

  constructor(private http: HttpClient) {}

  getFollowers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/follows/followers`);
  }

  getFollowing(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/follows/following`);
  }

  followUser(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/follows/follow/${id}`, {});
  }

  unfollowUser(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/follows/unfollow/${id}`, {});
  }
}