import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = 'http://localhost:8000/halls';

  constructor(private http: HttpClient) {}

  getMyHalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-halls`);
  }

  getHallById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHall(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateHall(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteHall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
