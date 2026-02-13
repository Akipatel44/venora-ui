import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HallService } from '../../services/hall.service';

@Component({
  selector: 'app-hall-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HallService],
  templateUrl: './hall-create.component.html',
  styleUrls: ['./hall-create.component.scss']
})
export class HallCreateComponent {
  form = {
    hall_name: '',
    location: '',
    capacity: '',
    base_price: '',
    commission_percent: '',
    description: ''
  };
  loading = false;
  error: string | null = null;

  constructor(private hallService: HallService, private router: Router) {}

  onSubmit() {
    if (!this.form.hall_name || !this.form.location || !this.form.capacity || !this.form.base_price) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.error = null;

    const payload = {
      ...this.form,
      capacity: parseInt(this.form.capacity),
      base_price: parseFloat(this.form.base_price),
      commission_percent: this.form.commission_percent ? parseFloat(this.form.commission_percent) : null,
      subadmin_id: 1
    };

    this.hallService.createHall(payload).subscribe({
      next: () => {
        this.router.navigate(['/owner/halls']);
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to create hall';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/owner/halls']);
  }
}
