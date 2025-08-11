import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>Delete</h2>
    <mat-dialog-content> Would you like to delete? </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="onConfirm(false)">No</button>
      <button matButton (click)="onConfirm(true)" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `,
  ],
})
export class DialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
