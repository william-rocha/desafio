import { Observable } from 'rxjs';

export interface Crud<T, K> {
  create(data: T): Observable<T>;

  pageList(page: number, pageSize: number): Observable<K>;

  update(record: Partial<T>): Observable<T>;

  deleteById(id: string): Observable<T>;
  getById(id: string): Observable<T>;
}
