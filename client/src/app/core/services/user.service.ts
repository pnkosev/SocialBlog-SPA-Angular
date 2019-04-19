import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Post } from './../../components/shared/models/post.model';
import { UserRegister } from '../../components/shared/models/userRegister.model';
import { UserLogin } from '../../components/shared/models/userLogin.model';

const baseURL = `${environment.ApiURL}/user`;

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(payload: UserRegister): Observable<object> {
    return this.http.post(`${baseURL}/register`, payload);
  }

  login(payload: UserLogin): Observable<object> {
    return this.http.post(`${baseURL}/login`, payload);
  }

  logout() {
    localStorage.clear();
  }

  get token() {
    return localStorage.getItem('authToken');
  }

  get userId() {
    return localStorage.getItem('userId');
  }

  get username() {
    return localStorage.getItem('username');
  }

  isLoggedIn() {
    return this.token !== null;
  }

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getProfile(): Observable<Post[]> {
    return this.http.get<Post[]>(`${baseURL}/profile`)
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map((data) => data['posts'])
      );
  }

  saveUser(res: object) {
    // tslint:disable-next-line: no-string-literal
    localStorage.setItem('authToken', res['token']);
    // tslint:disable-next-line: no-string-literal
    localStorage.setItem('username', res['username']);
    // tslint:disable-next-line: no-string-literal
    localStorage.setItem('isAdmin', res['isAdmin']);
    // tslint:disable-next-line: no-string-literal
    localStorage.setItem('userId', res['userId']);
  }
}
