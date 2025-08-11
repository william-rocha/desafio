import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'company',
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.routes').then((m) => m.COMPANY_ROUTES),
  },
  {
    path: 'supplier',
    loadChildren: () =>
      import('./supplier/supplier.routes').then((m) => m.SUPPLIER_ROUTES),
  },
];
