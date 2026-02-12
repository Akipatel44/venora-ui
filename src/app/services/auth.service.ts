import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8000/auth';
  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    // The backend expects OAuth2 form fields (username, password) as form-encoded data.
    const username = payload.email || payload.username || '';
    const password = payload.password || '';
    const body = new URLSearchParams({ username, password }).toString();
    return this.http.post(`${this.base}/login`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.base}/register`, payload);
  }
}
