package com.test_tecnico.back_end;

import com.test_tecnico.back_end.company.Company;
import com.test_tecnico.back_end.company.CompanyRepository;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.companySupplier.CompanySupplier;
import com.test_tecnico.back_end.companySupplier.CompanySupplierRepository;
import com.test_tecnico.back_end.supplier.Supplier;
import com.test_tecnico.back_end.supplier.SupplierRepository;
import com.test_tecnico.back_end.supplier.dto.enums.IdentificationDocumentEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(
			CompanyRepository companyRepository,
			SupplierRepository supplierRepository,
			CompanySupplierRepository companySupplier
	) {
		return args -> extracted(companyRepository, supplierRepository,  companySupplier);
	}


	private void extracted(
			CompanyRepository companyRepository,
			SupplierRepository supplierRepository,
			CompanySupplierRepository companySupplierRepository
	) {
		// Criar empresas
		Company company1 = new Company();
		company1.setCnpj("12345678000101");
		company1.setTradeName("Empresa Alpha");
		company1.setZipCode("31000000");
		company1.setStatus(StatusCompanyEnum.ACTIVE);
		company1 = companyRepository.save(company1);

		Company company2 = new Company();
		company2.setCnpj("12345678000202");
		company2.setTradeName("Empresa Beta");
		company2.setZipCode("31000001");
		company2.setStatus(StatusCompanyEnum.ACTIVE);
		company2 = companyRepository.save(company2);

		// Criar fornecedores
		Supplier supplier1 = new Supplier();
		supplier1.setName("Fornecedor A");
		supplier1.setEmail("fornecedorA@email.com");
		supplier1.setZipCode("32000000");
		supplier1.setIdentificationDocument("00112223330001");
		supplier1.setIdentificationType(IdentificationDocumentEnum.CNPJ);
		supplier1 = supplierRepository.save(supplier1);

		Supplier supplier2 = new Supplier();
		supplier2.setName("Fornecedor B");
		supplier2.setEmail("fornecedorB@email.com");
		supplier2.setZipCode("32000001");
		supplier2.setIdentificationDocument("00223334440001");
		supplier2.setIdentificationType(IdentificationDocumentEnum.CNPJ);
		supplier2 = supplierRepository.save(supplier2);

		Supplier supplier3 = new Supplier();
		supplier3.setName("Fornecedor C");
		supplier3.setEmail("fornecedorC@email.com");
		supplier3.setZipCode("32000002");
		supplier3.setIdentificationDocument("00334445550001");
		supplier3.setIdentificationType(IdentificationDocumentEnum.CNPJ);
		supplier3 = supplierRepository.save(supplier3);

		// Relacionar empresas com fornecedores via entidade intermediária
		companySupplierRepository.save(new CompanySupplier(company1, supplier1));
		companySupplierRepository.save(new CompanySupplier(company1, supplier2));

		companySupplierRepository.save(new CompanySupplier(company2, supplier2));
		companySupplierRepository.save(new CompanySupplier(company2, supplier3));
	}


}
