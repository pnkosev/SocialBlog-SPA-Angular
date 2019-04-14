import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const baseURL = `${environment.ApiURL}/user`;

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(payload: object): Observable<object> {
    return this.http.post(`${baseURL}/register`, payload);
  }

  login(payload: object): Observable<object> {
    return this.http.post(`${baseURL}/login`, payload);
  }

  logout(): Observable<object> {
    return this.http.get(`${baseURL}/logout`);
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

  getProfile(): Observable<object> {
    return this.http.get<object>(`${baseURL}/profile`)
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
