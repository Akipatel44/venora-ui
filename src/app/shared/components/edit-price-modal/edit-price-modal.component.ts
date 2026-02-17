import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-price-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" (click)="onCancel()"></div>
      <div class="bg-gray-800 rounded-lg shadow-xl w-full max-w-md z-10 p-6">
        <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
        <p *ngIf="subtitle" class="text-sm text-gray-300 mb-3">{{ subtitle }}</p>
        <div class="mb-4">
          <label class="text-sm text-gray-300 block mb-1">Custom Price (leave empty to reset)</label>
          <input type="number" min="0" step="0.01" [(ngModel)]="inputValue" class="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div class="flex justify-end gap-3">
          <button class="px-4 py-2 rounded-lg bg-gray-700 text-gray-200" (click)="onCancel()">Cancel</button>
          <button class="px-4 py-2 rounded-lg bg-primary-600 text-white" (click)="onSave()">Save</button>
        </div>
      </div>
    </div>
  `
})
export class EditPriceModalComponent {
  @Input() visible = false;
  @Input() title = 'Edit Price';
  @Input() subtitle: string | null = null;
  @Input() initialPrice: number | null = null;

  @Output() save = new EventEmitter<number | null>();
  @Output() cancel = new EventEmitter<void>();

  inputValue: any = null;

  ngOnChanges() {
    this.inputValue = this.initialPrice != null ? String(this.initialPrice) : '';
  }

  onSave() {
    const v = this.inputValue === '' || this.inputValue === null ? null : Number(this.inputValue);
    if (v !== null && (isNaN(v) || v < 0)) {
      return; // ignore invalid
    }
    this.save.emit(v);
  }

  onCancel() {
    this.cancel.emit();
  }
}
