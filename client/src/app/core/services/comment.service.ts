import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from './../../components/shared/models/comment';

const host = 'http://localhost:9999';
const baseURL = `${host}/comment`;

@Injectable()
export class CommentService {

  constructor(
    private http: HttpClient,
  ) { }

  postCreateComment(postId: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${baseURL}/${postId}/create`, comment);
  }

  getPendingComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseURL}/pending`).pipe(
      // tslint:disable-next-line: no-string-literal
      map((data) => data['comments'])
    );
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${baseURL}/get/` + id);
  }

  editComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${baseURL}/update/` + id, comment);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.http.delete<Comment>(`${baseURL}/delete/` + id);
  }

  approveComment(id: string): Observable<Comment> {
    return this.http.put<Comment>(`${baseURL}/approve/` + id, {});
  }
}
