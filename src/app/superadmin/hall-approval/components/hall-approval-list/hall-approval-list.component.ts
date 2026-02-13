import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HallService } from '../../../../owner/hall/services/hall.service';

interface Hall {
  hall_id: number;
  hall_name: string;
  subadmin_id: number;
  owner_name?: string;
  location: string;
  capacity: number;
  base_price: number;
  commission_percent?: number;
  status: string;
  description?: string;
  created_at?: string;
}

@Component({
  selector: 'app-hall-approval-list',
  templateUrl: './hall-approval-list.component.html',
  styleUrls: ['./hall-approval-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HallService]
})
export class HallApprovalListComponent implements OnInit {
  halls: Hall[] = [];
  loading = false;
  error: string | null = null;
  approvingHallId: number | null = null;
  blockingHallId: number | null = null;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(): void {
    this.loading = true;
    this.error = null;
    this.hallService.getAllHalls().subscribe({
      next: (data: any[]) => {
        console.log('Halls loaded:', data);
        this.halls = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading halls:', err);
        this.error = err?.error?.detail || 'Failed to load halls. Please try again.';
        this.loading = false;
      }
    });
  }

  approveHall(hallId: number): void {
    this.approvingHallId = hallId;
    this.hallService.updateHallStatus(hallId, 'approved').subscribe({
      next: (data: any) => {
        this.hallService.getAllHalls().subscribe({
          next: (halls: any[]) => {
            this.halls = halls;
            this.approvingHallId = null;
          },
          error: (err: any) => {
            this.error = 'Failed to refresh halls.';
            this.approvingHallId = null;
            console.error(err);
          }
        });
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to approve hall. Please try again.';
        this.approvingHallId = null;
        console.error(err);
      }
    });
  }

  blockHall(hallId: number): void {
    this.blockingHallId = hallId;
    this.hallService.updateHallStatus(hallId, 'blocked').subscribe({
      next: (data: any) => {
        this.hallService.getAllHalls().subscribe({
          next: (halls: any[]) => {
            this.halls = halls;
            this.blockingHallId = null;
          },
          error: (err: any) => {
            this.error = 'Failed to refresh halls.';
            this.blockingHallId = null;
            console.error(err);
          }
        });
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to block hall. Please try again.';
        this.blockingHallId = null;
        console.error(err);
      }
    });
  }

  getPendingHalls(): Hall[] {
    return this.halls.filter(hall => hall.status === 'pending');
  }
}
