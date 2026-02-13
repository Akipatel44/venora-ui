import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'venora-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="getClasses()"
      class="inline-flex items-center justify-center font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  getClasses(): string {
    let classes = '';

    // Size variants
    if (this.size === 'sm') classes += 'px-3 py-1.5 text-sm ';
    else if (this.size === 'lg') classes += 'px-6 py-3 text-lg ';
    else classes += 'px-4 py-2 text-base '; // md

    // Color variants
    if (this.variant === 'primary') {
      classes += 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 ';
      if (this.disabled) classes += 'opacity-50 cursor-not-allowed ';
    } else if (this.variant === 'secondary') {
      classes += 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 ';
      if (this.disabled) classes += 'opacity-50 cursor-not-allowed ';
    } else if (this.variant === 'danger') {
      classes += 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ';
      if (this.disabled) classes += 'opacity-50 cursor-not-allowed ';
    } else if (this.variant === 'ghost') {
      classes += 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 ';
      if (this.disabled) classes += 'opacity-50 cursor-not-allowed ';
    }

    return classes;
  }
}

