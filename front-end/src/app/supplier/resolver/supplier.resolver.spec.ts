import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { supplierResolver } from './supplier.resolver';

describe('supplierResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => supplierResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
