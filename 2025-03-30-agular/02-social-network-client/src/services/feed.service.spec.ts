import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import Post from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private baseUrl = environment.restServerUrl;

  constructor(private http: HttpClient) {}

  getFeed(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/feed`);
  }
}