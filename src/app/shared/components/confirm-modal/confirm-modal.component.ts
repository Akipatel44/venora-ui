import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" (click)="onCancel()"></div>
      <div class="bg-gray-800 rounded-lg shadow-xl w-full max-w-md z-10 p-6">
        <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-300 mb-4">{{ message }}</p>
        <div class="flex justify-end gap-3">
          <button class="px-4 py-2 rounded-lg bg-gray-700 text-gray-200" (click)="onCancel()">{{ cancelText }}</button>
          <button class="px-4 py-2 rounded-lg bg-red-600 text-white" (click)="onConfirm()">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() visible = false;
  @Input() title = 'Confirm';
  @Input() message = '';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
