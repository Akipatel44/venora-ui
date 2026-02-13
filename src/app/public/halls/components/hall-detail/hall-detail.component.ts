import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hall-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.scss']
})
export class HallDetailComponent implements OnInit {
  hall: any = null;
  amenities: any[] = [];
  services: any[] = [];
  loading = true;
  error: string | null = null;
  apiUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadHall(parseInt(id));
      }
    });
  }

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

  loadHall(id: number) {
    this.loading = true;
    this.error = null;
    
    this.http.get(`${this.apiUrl}/halls/${id}`, { headers: this.getHeaders() }).subscribe({
      next: (data: any) => {
        this.hall = data;
        this.loadAmenities(id);
        this.loadServices(id);
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to load hall details';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadAmenities(hallId: number) {
    this.http.get(`${this.apiUrl}/amenities/hall/${hallId}`, { headers: this.getHeaders() }).subscribe({
      next: (data: any) => {
        this.amenities = data;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Failed to load amenities:', err);
      }
    });
  }

  loadServices(hallId: number) {
    this.http.get(`${this.apiUrl}/services/hall/${hallId}`, { headers: this.getHeaders() }).subscribe({
      next: (data: any) => {
        this.services = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Failed to load services:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
