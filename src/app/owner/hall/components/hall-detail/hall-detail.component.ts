import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    // API calls will be added here
  }

  loadServices() {
    this.serviceLoading = true;
    this.serviceError = null;
    // API calls will be added here
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
    // API call will be added here
  }

  removeAmenity(amenityId: number) {
    if (confirm('Are you sure you want to remove this amenity?')) {
      // API call will be added here
    }
  }

  editAmenityPrice(amenity: any) {
    // API call will be added here
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

    // API call will be added here
    // this.hallService.addServiceToHall(this.hallId, this.selectedServiceId, this.serviceCustomPrice).subscribe(...)
  }

  removeService(serviceId: number) {
    if (confirm('Are you sure you want to remove this service?')) {
      // API call will be added here
      // this.hallService.removeServiceFromHall(this.hallId, serviceId).subscribe(...)
    }
  }

  editServicePrice(service: any) {
    // API call will be added here
  }
}

