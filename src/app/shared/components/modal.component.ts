import { Component, Input } from '@angular/core';

@Component({
  selector: 'venora-modal',
  standalone: true,
  template: `
    <div *ngIf="open" class="modal-overlay">
      <div class="bg-white rounded-md p-4 max-w-lg w-full">
        <div class="flex justify-end">
          <button (click)="close()" class="text-gray-500">✕</button>
        </div>
        <div><ng-content></ng-content></div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() open = false;
  close() { this.open = false; }
}
