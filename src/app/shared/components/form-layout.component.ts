import { Component, Input } from '@angular/core';

@Component({
  selector: 'venora-form',
  standalone: true,
  template: `
    <form class="space-y-6">
      <ng-content></ng-content>
    </form>
  `
})
export class FormLayoutComponent {
  @Input() gutter = '6';
}
