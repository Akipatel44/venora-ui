import { Component, Input } from '@angular/core';

@Component({
  selector: 'venora-card',
  standalone: true,
  template: `
    <div class="card">
      <div *ngIf="title" class="font-semibold mb-2">{{title}}</div>
      <div><ng-content></ng-content></div>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
}
