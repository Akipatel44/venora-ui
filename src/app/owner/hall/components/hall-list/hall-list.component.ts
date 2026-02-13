import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HallService } from '../../services/hall.service';

@Component({
  selector: 'app-hall-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HallService],
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.scss']
})
export class HallListComponent implements OnInit {
  halls: any[] = [];
  loading = false;
  error: string | null = null;
  isSuperAdmin = false;

  constructor(private hallService: HallService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.checkUserRole();
    this.loadHalls();
  }

  checkUserRole() {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isSuperAdmin = payload.role === 'superadmin';
      }
    } catch (err) {
      console.error('Error checking user role:', err);
      this.isSuperAdmin = false;
    }
  }

  loadHalls() {
    this.loading = true;
    this.error = null;
    
    // Use getAllHalls for superadmin, getMyHalls for others
    const hallsObservable = this.isSuperAdmin 
      ? this.hallService.getAllHalls() 
      : this.hallService.getMyHalls();
    
    hallsObservable.subscribe({
      next: (data: any[]) => {
        this.halls = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to load halls';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  createHall() {
    this.router.navigate(['/owner/halls/create']);
  }

  editHall(id: number) {
    this.router.navigate(['/owner/halls/edit', id]);
  }

  deleteHall(id: number) {
    if (confirm('Are you sure you want to delete this hall?')) {
      this.hallService.deleteHall(id).subscribe({
        next: () => {
          this.loadHalls();
        },
        error: (err: any) => {
          this.error = err?.error?.detail || 'Failed to delete hall';
          this.cdr.markForCheck();
        }
      });
    }
  }
}
