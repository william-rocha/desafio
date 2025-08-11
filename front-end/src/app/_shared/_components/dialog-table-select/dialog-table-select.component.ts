import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Supplier } from '../../../supplier/models/supplier.model';
import { SupplierService } from '../../../supplier/service/supplier.service';

const ELEMENT_DATA: Supplier[] = [
  {
    id: '1',
    name: 'teste',
    email: 'teste',
    zipCode: '13131',
    identificationDocument: '13646',
  },
];

@Component({
  selector: 'app-dialog-table-select',
  imports: [
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './dialog-table-select.component.html',
  styleUrl: './dialog-table-select.component.scss',
})
export class DialogTableSelectComponent {
  displayedColumns: string[] = ['select', 'name', 'email'];
  dataSource!: MatTableDataSource<Supplier>;
  selection = new SelectionModel<Supplier>(true, []);

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 100,
    length: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<DialogTableSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private service: SupplierService
  ) {}

  ngOnInit() {
    this.service
      .pageList(this.pageEvent.pageIndex, this.pageEvent.pageSize)
      .subscribe({
        next: (supplierPage) => {
          this.dataSource = new MatTableDataSource<Supplier>(
            supplierPage.suppliers
          );
        },
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Supplier): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  closeDialog() {
    console.log('this.selection._selected: ', this.selection.selected);
    this.dialogRef.close(this.selection.selected);
  }
}
