import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = '/api/halls/';
  private amenityUrl = '/api/amenities/';
  private serviceUrl = '/api/services/';

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

  // Hall methods
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

  // Amenity methods
  getAllAmenities(): Observable<any[]> {
    return this.http.get<any[]>(this.amenityUrl, { headers: this.getHeaders() });
  }

  getHallAmenities(hallId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.amenityUrl}hall/${hallId}`, { headers: this.getHeaders() });
  }

  addAmenityToHall(hallId: number, amenityId: number, customPrice?: number): Observable<any> {
    const payload: any = { hall_id: hallId, amenity_id: amenityId };
    if (customPrice != null) payload.custom_price = customPrice;
    return this.http.post<any>(`${this.amenityUrl}hall/${hallId}`, payload, { headers: this.getHeaders() });
  }

  removeAmenityFromHall(amenityLinkId: number): Observable<any> {
    return this.http.delete<any>(`${this.amenityUrl}hall/${amenityLinkId}`, { headers: this.getHeaders() });
  }

  updateAmenityPrice(amenityLinkId: number, customPrice: number): Observable<any> {
    return this.http.put<any>(`${this.amenityUrl}hall/${amenityLinkId}/price`, { custom_price: customPrice }, { headers: this.getHeaders() });
  }

  // Service methods (parallel to amenities)
  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl, { headers: this.getHeaders() });
  }

  getHallServices(hallId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.serviceUrl}hall/${hallId}`, { headers: this.getHeaders() });
  }

  addServiceToHall(hallId: number, serviceId: number, customPrice?: number): Observable<any> {
    const payload: any = { hall_id: hallId, service_id: serviceId };
    if (customPrice != null) payload.custom_price = customPrice;
    return this.http.post<any>(`${this.serviceUrl}hall/${hallId}`, payload, { headers: this.getHeaders() });
  }

  removeServiceFromHall(serviceLinkId: number): Observable<any> {
    return this.http.delete<any>(`${this.serviceUrl}hall/${serviceLinkId}`, { headers: this.getHeaders() });
  }

  updateServicePrice(serviceLinkId: number, customPrice: number): Observable<any> {
    return this.http.put<any>(`${this.serviceUrl}hall/${serviceLinkId}/price`, { custom_price: customPrice }, { headers: this.getHeaders() });
  }
}
