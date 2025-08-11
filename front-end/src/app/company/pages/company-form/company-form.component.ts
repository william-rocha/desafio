import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { DialogTableSelectComponent } from '../../../_shared/_components/dialog-table-select/dialog-table-select.component';
import {
  Supplier,
  SupplierPage,
} from '../../../supplier/models/supplier.model';
import { SupplierService } from '../../../supplier/service/supplier.service';
import { Company } from '../../models/company.models';
import { CompanyService } from '../../service/company.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-company-form',
  standalone: true,
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
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent {
  form!: FormGroup;

  suppliers: Supplier[] = [];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 100,
    length: 0,
  };

  constructor(
    private readonly service: CompanyService,
    private fb: NonNullableFormBuilder,
    private location: Location,
    private snackbar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    const company: Company = this.actRoute.snapshot.data['company'];
    this.suppliers = company.suppliers || [];
    this.form = this.fb.group({
      tradeName: [
        company.tradeName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      zipCode: [
        company.zipCode,
        [Validators.required, this.zipCodeValidator()],
      ],
      cnpj: [
        company.cnpj,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      suppliers: this.fb.control(company.suppliers || []),
    });
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

  onCancel() {
    this.backPage();
  }

  backPage() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value as Company).subscribe({
        next: (response) => {
          this.onSuccess(response);
        },
        error: (err) => console.error('Erro:', err),
      });
    }
  }

  onSuccess(company: Company) {
    this.snackbar.open(
      `Company (${company.tradeName}) successfully saved!`,
      'X',
      {
        duration: 5000,
      }
    );
    this.backPage();
  }

  tradeNameControl(): FormControl {
    return this.form.get('tradeName') as FormControl;
  }

  onSupplierSelectionChange(event: MatSelectChange) {
    console.log('event: ', event, this.form);
  }

  supplierPage$!: Observable<SupplierPage>;

  refresh(pageEvent: PageEvent = this.pageEvent) {
    this.pageEvent = pageEvent;
    this.supplierPage$ = this.supplierService.pageList(
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }

  async addSupplier() {
    const dialogRef = this.dialog.open(DialogTableSelectComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
