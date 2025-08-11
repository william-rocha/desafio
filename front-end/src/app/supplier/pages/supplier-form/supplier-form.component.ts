import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Supplier } from '../../models/supplier.model';
import { SupplierService } from '../../service/supplier.service';
@Component({
  selector: 'app-supplier-form',
  imports: [
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    CommonModule,
    NgxMaskDirective,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
    provideNgxMask(),
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss',
})
export class SupplierFormComponent {
  form!: FormGroup;
  isCpf = false;

  constructor(
    private readonly service: SupplierService,
    private fb: NonNullableFormBuilder,
    private location: Location,
    private snackbar: MatSnackBar,
    private actRoute: ActivatedRoute
  ) {
    const supplier: Supplier = this.actRoute.snapshot.data['supplier'];
    this.form = this.fb.group({
      name: [
        supplier.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: [supplier.email, [Validators.required, Validators.email]],
      zipCode: [
        supplier.zipCode,
        [Validators.required, this.zipCodeValidator()],
      ],
      identificationDocument: [
        supplier.identificationDocument,
        [Validators.required, this.cpfCnpjLengthValidator()],
      ],
    });
  }

  ngOnInit() {
    this.form.get('identificationDocument')?.valueChanges.subscribe((value) => {
      this.isCpf = !!value && value.toString().length === 11;
    });
  }

  onCancel() {
    this.backPage();
  }

  backPage() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.value as Supplier).subscribe({
        next: (response) => {
          this.onSuccess(response);
        },
        error: (err) => console.error('Erro:', err),
      });
    }
  }

  onSuccess(supplier: Supplier) {
    this.snackbar.open(`Supplier (${supplier.id}) successfully created.`, 'X', {
      duration: 5000,
    });
    this.backPage();
  }

  cpfCnpjLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const value = control.value?.toString().trim() ?? '';

      if (value.length < 11 && value.length !== 11) {
        return { invalidCpfLength: 'CPF must be exactly 11 digits.' };
      }

      if (value.length > 11 && value.length !== 14) {
        return { invalidCnpjLength: 'CNPJ must be exactly 14 digits.' };
      }

      return null;
    };
  }

  zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const value = control.value?.toString().trim() ?? '';
      if (value.length !== 8) {
        return { invalidZipCodeLength: true };
      }
      return null;
    };
  }
}
