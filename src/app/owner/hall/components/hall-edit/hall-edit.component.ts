import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HallService } from '../../services/hall.service';

@Component({
  selector: 'app-hall-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HallService],
  templateUrl: './hall-edit.component.html',
  styleUrls: ['./hall-edit.component.scss']
})
export class HallEditComponent implements OnInit {
  form = {
    hall_name: '',
    location: '',
    capacity: '',
    base_price: '',
    commission_percent: '',
    description: ''
  };
  hallId: number = 0;
  loading = false;
  error: string | null = null;

  constructor(
    private hallService: HallService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.hallId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    if (this.hallId) {
      this.loadHall();
    }
  }

  loadHall() {
    this.loading = true;
    this.hallService.getHallById(this.hallId).subscribe({
      next: (data: any) => {
        this.form = {
          hall_name: data.hall_name,
          location: data.location,
          capacity: data.capacity.toString(),
          base_price: data.base_price.toString(),
          commission_percent: data.commission_percent ? data.commission_percent.toString() : '',
          description: data.description || ''
        };
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to load hall';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSubmit() {
    if (!this.form.hall_name || !this.form.location || !this.form.capacity || !this.form.base_price) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.error = null;

    const payload = {
      hall_name: this.form.hall_name,
      location: this.form.location,
      capacity: parseInt(this.form.capacity),
      base_price: parseFloat(this.form.base_price),
      commission_percent: this.form.commission_percent ? parseFloat(this.form.commission_percent) : null,
      description: this.form.description
    };

    this.hallService.updateHall(this.hallId, payload).subscribe({
      next: () => {
        this.cdr.markForCheck();
        this.router.navigate(['/owner/halls']);
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to update hall';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack() {
    this.router.navigate(['/owner/halls']);
  }
}
