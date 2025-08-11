import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { DialogConfirmComponent } from '../../../_shared/_components/dialog-confirm/dialog-confirm.component';
import { ListContainerComponent } from '../../../_shared/_components/list-container/list-container.component';
import { TableListComponent } from '../../../_shared/_components/table-list/table-list.component';
import { Supplier, SupplierPage } from '../../models/supplier.model';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  imports: [
    MatPaginatorModule,
    CommonModule,
    ListContainerComponent,
    TableListComponent,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss',
})
export class SupplierListComponent {
  supplierPage$!: Observable<SupplierPage>;

  filterBy = new FormGroup({
    identificationDoc: new FormControl(''),
    name: new FormControl(''),
  });

  displayerColumns = [
    'id',
    'identificationDocument',
    'name',
    'email',
    'zipCode',
  ];

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  constructor(
    private readonly service: SupplierService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.refresh(this.pageEvent);
    this.filterBy
      .get('identificationDoc')!
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.searchByCpfOrCnpj(value);
        }
      });

    this.filterBy
      .get('name')!
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.searchByName(value);
        }
      });
  }

  refresh(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.supplierPage$ = this.service.pageList(
      this.pageEvent.pageIndex,
      this.pageEvent.pageSize
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.actRoute });
  }

  onEdit(supplier: Supplier) {
    this.router.navigate([`edit/${supplier.id}`], {
      relativeTo: this.actRoute,
    });
  }

  onRemove(supplier: Supplier) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: 'Are you sure you want to delete this Supplier?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.deleteById(supplier.id).subscribe({
          next: () => {
            this.snackbar.open(
              `Supplier (${supplier.name}) successfully deleted.`,
              'X',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );
            this.refresh(this.pageEvent);
          },
          error: () => {},
        });
      }
    });
  }

  searchByCpfOrCnpj = (value: string) => {
    this.supplierPage$ = this.service.filterByCpfOrCnpj(this.pageEvent, value);
  };

  searchByName(value: string) {
    this.supplierPage$ = this.service.filterByName(this.pageEvent, value);
  }
}
