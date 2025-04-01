import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import Comment from '../models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.restServerUrl;

  constructor(private http: HttpClient) {}

  addComment(postId: string, body: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/comments/${postId}`, { body });
  }

  updateComment(commentId: string, body: string): Observable<Comment> {
    return this.http.patch<Comment>(`${this.baseUrl}/comments/${commentId}`, { body });
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/comments/${commentId}`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/${postId}`);
  }
}