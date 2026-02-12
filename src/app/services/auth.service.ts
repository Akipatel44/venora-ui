import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8000/auth';
  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(`${this.base}/login`, payload);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.base}/register`, payload);
  }
}
