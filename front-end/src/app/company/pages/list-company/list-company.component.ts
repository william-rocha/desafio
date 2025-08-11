import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogConfirmComponent } from '../../../_shared/_components/dialog-confirm/dialog-confirm.component';
import { ListContainerComponent } from '../../../_shared/_components/list-container/list-container.component';
import { TableListComponent } from '../../../_shared/_components/table-list/table-list.component';
import { Company, CompanyPage } from '../../models/company.models';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-list-company',
  imports: [
    MatPaginatorModule,
    CommonModule,
    TableListComponent,
    ListContainerComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss',
})
export class ListCompanyComponent {
  companyPage$!: Observable<CompanyPage>;

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  constructor(
    private readonly service: CompanyService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = this.pageEvent) {
    this.pageEvent = pageEvent;
    this.companyPage$ = this.service.pageList(
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.actRoute });
  }

  onEdit(company: Company) {
    this.router.navigate([`edit/${company.id}`], { relativeTo: this.actRoute });
  }

  onRemove(company: Company) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: 'Are you sure you want to delete this company?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.deleteById(company.id).subscribe({
          next: () => {
            this.snackbar.open(
              `Company (${company.tradeName}) successfully deleted.`,
              'X',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );
            this.refresh(this.pageEvent);
          },
          error: (err) => {
            this.onError(err);
          },
        });
      }
    });
  }

  onError(error: Error) {}
}
