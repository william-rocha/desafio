import { Routes } from '@angular/router';
import { SupplierFormComponent } from './pages/supplier-form/supplier-form.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { supplierResolver } from './resolver/supplier.resolver';

export const SUPPLIER_ROUTES: Routes = [
  {
    path: '',
    component: SupplierListComponent,
  },
  {
    path: 'new',
    component: SupplierFormComponent,
    resolve: { supplier: supplierResolver },
  },
  {
    path: 'edit/:id',
    component: SupplierFormComponent,
    resolve: { supplier: supplierResolver },
  },
];
