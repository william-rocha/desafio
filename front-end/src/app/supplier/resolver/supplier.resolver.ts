import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { SupplierService } from '../service/supplier.service';

export const supplierResolver: ResolveFn<Supplier> = (
  route,
  state
): Observable<Supplier> => {
  const service = inject(SupplierService);

  return route.params['id']
    ? service.getById(route.params['id'])
    : of({
        id: '',
        identificationDocument: '',
        name: '',
        email: '',
        zipCode: '',
        status: '',
        rg: '',
        birthDate: '',
      });
};
