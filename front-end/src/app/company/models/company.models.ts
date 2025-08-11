import { Page } from '../../_shared/models/page.model';
import { Supplier } from '../../supplier/models/supplier.model';

export type Company = {
  id: string;
  cnpj: string;
  tradeName: string;
  zipCode: string; // CEP
  status: string;
  suppliers?: Supplier[];
};

export type CompanyPage = Page<Company, 'companies'>;
