import { Component, Input, CommonModule } from '@angular/core';

@Component({
  selector: 'venora-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full bg-white text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <ng-content select="thead"></ng-content>
        </thead>
        <tbody [class.divide-y]="true" class="divide-gray-200">
          <ng-content select="tbody"></ng-content>
        </tbody>
      </table>
    </div>
  `
})
export class TableLayoutComponent {
  @Input() striped = false;
}
