import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HallService } from '../../services/hall.service';

interface SelectedAmenity {
  amenity_id: number;
  amenity_name: string;
  is_chargeable: boolean;
  base_price: number;
  custom_price: number | null;
}

@Component({
  selector: 'app-hall-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HallService],
  templateUrl: './hall-create.component.html',
  styleUrls: ['./hall-create.component.scss']
})
export class HallCreateComponent implements OnInit {
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

  // Amenities
  availableAmenities: any[] = [];
  selectedAmenities: SelectedAmenity[] = [];
  amenityLoading = false;

  constructor(private hallService: HallService, private router: Router) {}

  ngOnInit() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.amenityLoading = true;
    // safety timeout: if API doesn't respond, clear loader after 8s
    const fallback = setTimeout(() => {
      if (this.amenityLoading) {
        console.warn('Amenities load timeout, hiding loader');
        this.amenityLoading = false;
      }
    }, 8000);

    this.hallService.getAllAmenities().subscribe({
      next: (data: any[]) => {
        console.debug('Loaded amenities:', data?.length ?? 0);
        this.availableAmenities = data || [];
        this.amenityLoading = false;
        clearTimeout(fallback);
      },
      error: (err: any) => {
        console.error('Failed to load amenities:', err);
        this.availableAmenities = [];
        this.amenityLoading = false;
        clearTimeout(fallback);
      }
    });
  }

  toggleAmenity(amenity: any) {
    const idx = this.selectedAmenities.findIndex(a => a.amenity_id === amenity.amenity_id);
    if (idx > -1) {
      this.selectedAmenities.splice(idx, 1);
    } else {
      this.selectedAmenities.push({
        amenity_id: amenity.amenity_id,
        amenity_name: amenity.amenity_name,
        is_chargeable: amenity.is_chargeable,
        base_price: amenity.base_price,
        custom_price: null
      });
    }
  }

  isAmenitySelected(amenityId: number): boolean {
    return this.selectedAmenities.some(a => a.amenity_id === amenityId);
  }

  getSelectedAmenity(amenityId: number): SelectedAmenity | undefined {
    return this.selectedAmenities.find(a => a.amenity_id === amenityId);
  }

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
      next: (hall: any) => {
        // After hall created, add selected amenities
        if (this.selectedAmenities.length > 0 && hall?.hall_id) {
          this.addAmenitiesToHall(hall.hall_id);
        } else {
          this.loading = false;
          this.router.navigate(['/owner/halls']);
        }
      },
      error: (err: any) => {
        this.error = err?.error?.detail || 'Failed to create hall';
        this.loading = false;
      }
    });
  }

  addAmenitiesToHall(hallId: number) {
    const total = this.selectedAmenities.length;
    let completed = 0;
    let failures = 0;

    this.selectedAmenities.forEach(amenity => {
      this.hallService.addAmenityToHall(hallId, amenity.amenity_id, amenity.custom_price || undefined).subscribe({
        next: () => {
          completed++;
          if (completed + failures === total) {
            this.loading = false;
            if (failures > 0) {
              this.error = `${failures} amenity(ies) failed to add. Please review.`;
            }
            this.router.navigate(['/owner/halls']);
          }
        },
        error: (err: any) => {
          failures++;
          completed++;
          if (completed + failures === total) {
            this.loading = false;
            this.error = `${failures} amenity(ies) failed to add. Please review.`;
            this.router.navigate(['/owner/halls']);
          }
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/owner/halls']);
  }
}
