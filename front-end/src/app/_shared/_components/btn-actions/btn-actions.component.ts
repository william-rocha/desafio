import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-btn-actions',
  imports: [MatCardActions],
  template: `
    <mat-card-actions class="actions-center">
      <button
        mat-raised-button
        color="primary"
        (click)="onSubmit()"
        type="submit"
        [disabled]="disabled"
      >
        Save
      </button>
      <button
        mat-raised-button
        (click)="onCancel()"
        class="btn-space"
        type="button"
      >
        Cancel
      </button>
    </mat-card-actions>
  `,
  styles: ``,
})
export class BtnActionsComponent {
  @Input() disabled: boolean = false;

  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
