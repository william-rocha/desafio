import { Page } from '../../_shared/models/page.model';

// Fornecedor
export type Supplier = {
  id: string;
  name: string;
  email: string;
  zipCode: string; // CEP
  identificationDocument: string; // Pode ser cnpj ou CPF
  rg?: string;
  birthDate?: string;
};

export type SupplierPage = Page<Supplier, 'suppliers'>;
