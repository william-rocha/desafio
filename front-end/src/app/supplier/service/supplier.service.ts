import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { first, Observable } from 'rxjs';
import { Crud } from '../../_shared/models/crud.model';
import { Supplier, SupplierPage } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService implements Crud<Supplier, SupplierPage> {
  private readonly API = 'api/supplier';

  constructor(private readonly http: HttpClient) {}

  update(record: Partial<Supplier>): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.API}`, record).pipe(first());
  }

  create(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.API}`, data).pipe(first());
  }

  pageList(page = 0, pageSize = 10): Observable<SupplierPage> {
    return this.http
      .get<SupplierPage>(`${this.API}`, {
        params: { page, pageSize },
      })
      .pipe(first());
  }

  deleteById(id: string): Observable<Supplier> {
    return this.http.delete<Supplier>(`${this.API}/${id}`).pipe(first());
  }

  getById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.API}/${id}/companies`).pipe(first());
  }

  filterByName(
    { pageIndex, pageSize }: PageEvent,
    name: string
  ): Observable<SupplierPage> {
    return this.http
      .get<SupplierPage>(`${this.API}/searchByName`, {
        params: {
          pageIndex: pageIndex.toString(),
          pageSize: pageSize.toString(),
          name: name.trim(),
        },
      })
      .pipe(first());
  }

  filterByCpfOrCnpj(
    { pageIndex, pageSize }: PageEvent,
    cpfCnpj: string
  ): Observable<SupplierPage> {
    return this.http
      .get<SupplierPage>(`${this.API}/searchByIdentificationDoc`, {
        params: {
          pageIndex: pageIndex.toString(),
          pageSize: pageSize.toString(),
          identification: cpfCnpj.trim(),
        },
      })
      .pipe(first());
  }
}
