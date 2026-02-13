import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = '/api/halls/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createHall(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  getMyHalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}my-halls`, { headers: this.getHeaders() });
  }

  getAllHalls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getHallById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`, { headers: this.getHeaders() });
  }

  updateHall(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, data, { headers: this.getHeaders() });
  }

  updateHallStatus(id: number, status: string): Observable<any> {
    const payload = { status };
    return this.http.patch<any>(`${this.apiUrl}${id}/status`, payload, { headers: this.getHeaders() });
  }

  deleteHall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`, { headers: this.getHeaders() });
  }
}
