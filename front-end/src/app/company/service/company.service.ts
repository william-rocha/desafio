import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Crud } from '../../_shared/models/crud.model';
import { Company, CompanyPage } from '../models/company.models';

@Injectable({
  providedIn: 'root',
})
export class CompanyService implements Crud<Company, CompanyPage> {
  private readonly API = 'api/company';

  constructor(private readonly http: HttpClient) {}

  update(record: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.API}`, record).pipe(first());
  }

  create(data: Company): Observable<Company> {
    return this.http.post<Company>(`${this.API}`, data).pipe(first());
  }

  pageList(page = 0, pageSize = 10): Observable<CompanyPage> {
    return this.http
      .get<CompanyPage>(`${this.API}`, {
        params: { page, pageSize },
      })
      .pipe(first());
  }

  deleteById(id: string) {
    return this.http.delete<Company>(`${this.API}/${id}`).pipe(first());
  }

  getById(id: string) {
    return this.http.get<Company>(`${this.API}/${id}/suppliers`).pipe(first());
  }

  save(company: Company) {
    if (company.id) {
      return this.update(company);
    } else {
      return this.create(company);
    }
  }
}
