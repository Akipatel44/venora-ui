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
    this.hallService.getAllHalls().subscribe(
      (data: any[]) => {
        this.halls = data;
        this.loading = false;
      },
      (err: any) => {
        this.error = 'Failed to load halls. Please try again.';
        this.loading = false;
        console.error(err);
      }
    );
  }

  approveHall(hallId: number): void {
    this.approvingHallId = hallId;
    this.hallService.updateHallStatus(hallId, 'approved').subscribe(
      (data: any) => {
        this.hallService.getAllHalls().subscribe(
          (halls: any[]) => {
            this.halls = halls;
            this.approvingHallId = null;
          },
          (err: any) => {
            this.error = 'Failed to refresh halls.';
            this.approvingHallId = null;
          }
        );
      },
      (err: any) => {
        this.error = 'Failed to approve hall. Please try again.';
        this.approvingHallId = null;
        console.error(err);
      }
    );
  }

  blockHall(hallId: number): void {
    this.blockingHallId = hallId;
    this.hallService.updateHallStatus(hallId, 'blocked').subscribe(
      (data: any) => {
        this.hallService.getAllHalls().subscribe(
          (halls: any[]) => {
            this.halls = halls;
            this.blockingHallId = null;
          },
          (err: any) => {
            this.error = 'Failed to refresh halls.';
            this.blockingHallId = null;
          }
        );
      },
      (err: any) => {
        this.error = 'Failed to block hall. Please try again.';
        this.blockingHallId = null;
        console.error(err);
      }
    );
  }

  getPendingHalls(): Hall[] {
    return this.halls.filter(hall => hall.status === 'pending');
  }
}
