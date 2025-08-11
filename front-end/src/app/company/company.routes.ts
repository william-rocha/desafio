import { Routes } from '@angular/router';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { ListCompanyComponent } from './pages/list-company/list-company.component';
import { companyResolver } from './resolver/company.resolver';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    component: ListCompanyComponent,
  },
  {
    path: 'new',
    component: CompanyFormComponent,
    resolve: { company: companyResolver },
  },
  {
    path: 'edit/:id',
    component: CompanyFormComponent,
    resolve: { company: companyResolver },
  },
];
