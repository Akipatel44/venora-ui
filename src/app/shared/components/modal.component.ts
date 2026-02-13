import { Component, Input, Output, EventEmitter, CommonModule } from '@angular/core';

@Component({
  selector: 'venora-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        (click)="onClose()"
      ></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 z-10 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">{{ title }}</h2>
          <button
            (click)="onClose()"
            class="text-white hover:bg-white/20 rounded-lg p-1 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <ng-content></ng-content>
        </div>

        <!-- Footer (optional) -->
        <div *ngIf="showFooter" class="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <button
            (click)="onClose()"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            (click)="onConfirm()"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() showFooter = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmModal = new EventEmitter<void>();

  onClose() {
    this.open = false;
    this.closeModal.emit();
  }

  onConfirm() {
    this.confirmModal.emit();
    this.open = false;
  }
}
