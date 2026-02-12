import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-4"><h2 class="text-2xl font-bold">Welcome SubAdmin</h2></div>`
})
export class OwnerDashboardComponent {}
