import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HallService } from '../../services/hall.service';

@Component({
  selector: 'app-hall-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.scss']
})
export class HallDetailComponent implements OnInit {
  hall: any = null;
  loading = false;
  error: string | null = null;
  activeTab: 'overview' | 'amenities' | 'services' = 'overview';
  
  // Amenities management
  showAddAmenityModal = false;
  amenities: any[] = [];
  hallAmenities: any[] = [];
  selectedAmenityId: number | null = null;
  customPrice: number | null = null;
  amenityLoading = false;
  amenityError: string | null = null;

  // Services management
  showAddServiceModal = false;
  services: any[] = [];
  hallServices: any[] = [];
  selectedServiceId: number | null = null;
  serviceCustomPrice: number | null = null;
  serviceLoading = false;
  serviceError: string | null = null;

  constructor(
    private hallService: HallService,
    private route: ActivatedRoute,
    private router: Router,
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

  loadHall(id: number) {
    this.loading = true;
    this.error = null;
    this.hallService.getHallById(id).subscribe({
      next: (data: any) => {
        this.hall = data;
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

  setActiveTab(tab: 'overview' | 'amenities' | 'services') {
    this.activeTab = tab;
    if (tab === 'amenities') {
      this.loadAmenities();
    } else if (tab === 'services') {
      this.loadServices();
    }
  }

  loadAmenities() {
    this.amenityLoading = true;
    this.amenityError = null;

    // Load master amenities and hall-specific selected amenities
    const hallId = this.hall?.hall_id;
    if (!hallId) {
      this.amenityError = 'Hall ID missing';
      this.amenityLoading = false;
      return;
    }

    // load master amenities first
    this.hallService.getAllAmenities().subscribe({
      next: (all: any[]) => {
        this.amenities = all || [];
        // then load hall-specific amenities
        this.hallService.getHallAmenities(hallId).subscribe({
          next: (hallA: any[]) => {
            // normalize fields: expect each item to contain link id as `id` or `hall_amenity_id`
            this.hallAmenities = (hallA || []).map(a => {
              return {
                id: a.id ?? a.hall_amenity_id ?? a.hall_amenity_id,
                amenity_id: a.amenity_id ?? a.amenity_id,
                amenity_name: a.amenity_name ?? a.name ?? a.amenity?.amenity_name,
                is_chargeable: a.is_chargeable ?? a.is_chargeable ?? (a.amenity?.is_chargeable ?? false),
                base_price: a.base_price ?? (a.amenity?.base_price ?? null),
                custom_price: a.custom_price ?? a.custom_price ?? null
              };
            });
            this.amenityLoading = false;
            this.cdr.markForCheck();
          },
          error: (err: any) => {
            this.amenityError = err?.error?.detail || 'Failed to load hall amenities';
            this.amenityLoading = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: (err: any) => {
        this.amenityError = err?.error?.detail || 'Failed to load amenities';
        this.amenityLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadServices() {
    this.serviceLoading = true;
    this.serviceError = null;

    const hallId = this.hall?.hall_id;
    if (!hallId) {
      this.serviceError = 'Hall ID missing';
      this.serviceLoading = false;
      return;
    }

    this.hallService.getAllServices().subscribe({
      next: (all: any[]) => {
        this.services = all || [];
        this.hallService.getHallServices(hallId).subscribe({
          next: (hallS: any[]) => {
            this.hallServices = (hallS || []).map(s => ({
              id: s.id ?? s.hall_service_id ?? s.hall_service_id,
              service_id: s.service_id ?? s.service_id,
              service_name: s.service_name ?? s.name ?? s.service?.service_name,
              base_price: s.base_price ?? (s.service?.base_price ?? null),
              custom_price: s.custom_price ?? null,
              is_active: s.is_active ?? (s.service?.is_active ?? true),
              service_type: s.service_type ?? s.service?.service_type
            }));
            this.serviceLoading = false;
            this.cdr.markForCheck();
          },
          error: (err: any) => {
            this.serviceError = err?.error?.detail || 'Failed to load hall services';
            this.serviceLoading = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: (err: any) => {
        this.serviceError = err?.error?.detail || 'Failed to load services';
        this.serviceLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  openAddAmenityModal() {
    this.showAddAmenityModal = true;
    this.selectedAmenityId = null;
    this.customPrice = null;
  }

  closeAddAmenityModal() {
    this.showAddAmenityModal = false;
    this.selectedAmenityId = null;
    this.customPrice = null;
  }

  saveAmenity() {
    if (!this.selectedAmenityId) {
      this.amenityError = 'Please select an amenity';
      return;
    }
    this.amenityLoading = true;
    this.amenityError = null;
    const hallId = this.hall?.hall_id;
    if (!hallId) {
      this.amenityError = 'Hall ID missing';
      this.amenityLoading = false;
      return;
    }

    this.hallService.addAmenityToHall(hallId, this.selectedAmenityId, this.customPrice ?? undefined).subscribe({
      next: () => {
        this.closeAddAmenityModal();
        // refresh list
        this.loadAmenities();
      },
      error: (err: any) => {
        this.amenityError = err?.error?.detail || 'Failed to add amenity';
        this.amenityLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  removeAmenity(amenityId: number) {
    if (confirm('Are you sure you want to remove this amenity?')) {
      this.amenityLoading = true;
      this.amenityError = null;
      this.hallService.removeAmenityFromHall(amenityId).subscribe({
        next: () => {
          this.loadAmenities();
        },
        error: (err: any) => {
          this.amenityError = err?.error?.detail || 'Failed to remove amenity';
          this.amenityLoading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  editAmenityPrice(amenity: any) {
    const current = amenity.custom_price ?? amenity.base_price ?? 0;
    const input = prompt('Enter custom price (leave empty to reset to base price)', String(current));
    if (input === null) return; // cancelled
    const val = input.trim() === '' ? null : Number(input);
    const amenityLinkId = amenity.id;
    if (val === null) {
      // reset to base price by setting custom_price to null — assuming API supports null
      this.hallService.updateAmenityPrice(amenityLinkId, null as any).subscribe({
        next: () => this.loadAmenities(),
        error: (err: any) => { this.amenityError = err?.error?.detail || 'Failed to update price'; this.cdr.markForCheck(); }
      });
      return;
    }
    if (isNaN(val) || val < 0) {
      alert('Please enter a valid non-negative number');
      return;
    }
    this.hallService.updateAmenityPrice(amenityLinkId, val).subscribe({
      next: () => this.loadAmenities(),
      error: (err: any) => { this.amenityError = err?.error?.detail || 'Failed to update price'; this.cdr.markForCheck(); }
    });
  }

  // Service methods
  openAddServiceModal() {
    this.showAddServiceModal = true;
  }

  closeAddServiceModal() {
    this.showAddServiceModal = false;
    this.selectedServiceId = null;
    this.serviceCustomPrice = null;
  }

  saveService() {
    if (!this.selectedServiceId) {
      this.serviceError = 'Please select a service';
      return;
    }

    this.serviceLoading = true;
    this.serviceError = null;
    const hallId = this.hall?.hall_id;
    if (!hallId) {
      this.serviceError = 'Hall ID missing';
      this.serviceLoading = false;
      return;
    }

    this.hallService.addServiceToHall(hallId, this.selectedServiceId, this.serviceCustomPrice ?? undefined).subscribe({
      next: () => {
        this.closeAddServiceModal();
        this.loadServices();
      },
      error: (err: any) => {
        this.serviceError = err?.error?.detail || 'Failed to add service';
        this.serviceLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  removeService(serviceId: number) {
    if (confirm('Are you sure you want to remove this service?')) {
      this.serviceLoading = true;
      this.serviceError = null;
      this.hallService.removeServiceFromHall(serviceId).subscribe({
        next: () => this.loadServices(),
        error: (err: any) => { this.serviceError = err?.error?.detail || 'Failed to remove service'; this.serviceLoading = false; this.cdr.markForCheck(); }
      });
    }
  }

  editServicePrice(service: any) {
    const current = service.custom_price ?? service.base_price ?? 0;
    const input = prompt('Enter custom price for service (leave empty to reset to base price)', String(current));
    if (input === null) return;
    const val = input.trim() === '' ? null : Number(input);
    const serviceLinkId = service.id;
    if (val === null) {
      this.hallService.updateServicePrice(serviceLinkId, null as any).subscribe({ next: () => this.loadServices(), error: (err:any)=>{ this.serviceError = err?.error?.detail || 'Failed to update service price'; this.cdr.markForCheck(); } });
      return;
    }
    if (isNaN(val) || val < 0) { alert('Please enter a valid non-negative number'); return; }
    this.hallService.updateServicePrice(serviceLinkId, val).subscribe({ next: () => this.loadServices(), error: (err:any)=>{ this.serviceError = err?.error?.detail || 'Failed to update service price'; this.cdr.markForCheck(); } });
  }

  editHall() {
    this.router.navigate(['/owner/halls/edit', this.hall.hall_id]);
  }
}

