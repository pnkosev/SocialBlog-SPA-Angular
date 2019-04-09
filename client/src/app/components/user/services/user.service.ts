import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const host = 'http://localhost:9999';
const baseURL = `${host}/user`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  })
};

@Injectable({
  providedIn: 'root'
})
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

  getProfile(): Observable<object> {
    return this.http.get<object>(`${baseURL}/profile`, httpOptions)
      .pipe(
        // tslint:disable-next-line: no-string-literal
        map((data) => data['posts'])
      );
  }
  
}
