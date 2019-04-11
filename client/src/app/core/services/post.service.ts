import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/components/shared/models/post';
import { Observable } from 'rxjs';

const host = 'http://localhost:9999';
const baseURL = `${host}/post`;

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${baseURL}/all`);
  }

  postCreatePost(body: Post): Observable<Post> {
    return this.http.post<Post>(`${baseURL}/create`, body);
  }

  getPendingPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${baseURL}/pending`);
  }

  getPostDetails(id: string): Observable<Post> {
    return this.http.get<Post>(`${baseURL}/details/` + id);
  }

  editPost(id: string, body: Post): Observable<Post> {
    return this.http.put<Post>(`${baseURL}/update/` + id, body);
  }

  approvePost(id: string): Observable<Post> {
    return this.http.put<Post>(`${baseURL}/approve/` + id, {});
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${baseURL}/delete/` + id);
  }

  likePost(id: string): Observable<Post> {
    return this.http.post<Post>(`${baseURL}/like/` + id, {});
  }

  hatePost(id: string): Observable<Post> {
    return this.http.post<Post>(`${baseURL}/hate/` + id, {});
  }
}
