import { Component, Input } from '@angular/core';

@Component({
  selector: 'venora-button',
  standalone: true,
  template: `
    <button [ngClass]="classes" class="btn">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'default' = 'primary';

  get classes() {
    if (this.variant === 'primary') return 'btn-primary';
    if (this.variant === 'secondary') return 'btn-secondary';
    return '';
  }
}
