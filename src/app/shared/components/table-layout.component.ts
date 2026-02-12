import { Component, Input } from '@angular/core';

@Component({
  selector: 'venora-table',
  standalone: true,
  template: `
    <div class="overflow-x-auto">
      <table class="table-layout w-full bg-white border">
        <ng-content></ng-content>
      </table>
    </div>
  `
})
export class TableLayoutComponent {
  @Input() striped = false;
}
