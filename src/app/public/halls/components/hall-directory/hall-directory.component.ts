import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HallService } from '../../../../owner/hall/services/hall.service';

interface Hall {
  hall_id: number;
  hall_name: string;
  subadmin_id: number;
  location: string;
  capacity: number;
  base_price: number;
  commission_percent?: number;
  status: string;
  description?: string;
  created_at?: string;
}

@Component({
  selector: 'app-hall-directory',
  templateUrl: './hall-directory.component.html',
  styleUrls: ['./hall-directory.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [HallService]
})
export class HallDirectoryComponent implements OnInit {
  approvedHalls: Hall[] = [];
  loading = false;
  error: string | null = null;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.loadApprovedHalls();
  }

  loadApprovedHalls(): void {
    this.loading = true;
    this.error = null;
    this.hallService.getAllHalls().subscribe(
      (data: any[]) => {
        this.approvedHalls = data.filter(hall => hall.status === 'approved');
        this.loading = false;
      },
      (err: any) => {
        this.error = 'Failed to load halls. Please try again later.';
        this.loading = false;
        console.error(err);
      }
    );
  }

  viewDetails(hallId: number): void {
    // Navigate to hall details page
    console.log('View details for hall', hallId);
  }
}
