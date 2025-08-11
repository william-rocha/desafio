import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    NgxMaskDirective,
    MatIconModule,
    CommonModule,

    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgIf,
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [placeholder]="placeholder"
        [required]="required"
        [mask]="mask"
      />
      <mat-error
        *ngIf="control && control.invalid && (control.dirty || control.touched)"
      >
        deu ruim
      </mat-error>
      <!-- <mat-icon matSuffix>{{ icon }}</mat-icon> -->
      <!-- <mat-hint align="end"> 100</mat-hint> -->
      <!-- <mat-error *ngIf="true"> tradeName is required. </mat-error> -->
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    provideNgxMask(),
  ],
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() mask: string = '';
  @Input() control!: FormControl;
  @Input() icon: string = '';

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Se quiser tratar o desabilitado
  }
}
