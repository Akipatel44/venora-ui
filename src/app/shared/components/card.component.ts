import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'venora-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      <div *ngIf="title" class="text-lg font-bold text-gray-900 mb-4">{{ title }}</div>
      <div class="text-gray-700">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
}
