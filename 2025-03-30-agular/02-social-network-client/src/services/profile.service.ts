import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import Post from '../models/post.model';
import PostDraft from '../models/post-draft.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.restServerUrl;

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/profile`);
  }

  addPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/profile`, postData);
  }

  updatePost(id: string, postData: PostDraft): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/profile/${id}`, postData);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/profile/${id}`);
  }

  addComment(postId: string, body: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/${postId}`, { body });
  }
}