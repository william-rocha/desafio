import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company.models';
import { CompanyService } from '../service/company.service';

export const companyResolver: ResolveFn<Company> = (
  route,
  state
): Observable<Company> => {
  const service = inject(CompanyService);
  return route.params['id']
    ? service.getById(route.params['id'])
    : of({
        id: '',
        cnpj: '',
        tradeName: '',
        zipCode: '',
        status: '',
      });
};
