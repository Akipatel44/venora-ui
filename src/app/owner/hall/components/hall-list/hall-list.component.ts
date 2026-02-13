import { Component, OnInit } from '@angular/core';
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

  constructor(private hallService: HallService, private router: Router) {}

  ngOnInit() {
    this.loadHalls();
  }

  loadHalls() {
    this.loading = true;
    this.error = null;
    this.hallService.getMyHalls().subscribe({
      next: (data: any[]) => {
        this.halls = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to load halls';
        this.loading = false;
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
          this.halls = this.halls.filter(h => h.hall_id !== id);
        },
        error: (err: any) => {
          this.error = err?.error?.detail || 'Failed to delete hall';
        }
      });
    }
  }
}
