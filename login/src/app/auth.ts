import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
