package com.test_tecnico.back_end.company.dto.mapper;

import com.test_tecnico.back_end.company.Company;
import com.test_tecnico.back_end.company.dto.CompanyDTO;
import com.test_tecnico.back_end.company.dto.CompanyRequestDTO;
import com.test_tecnico.back_end.company.dto.CompanyWithSupplierDTO;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.companySupplier.CompanySupplier;
import com.test_tecnico.back_end.supplier.Supplier;
import com.test_tecnico.back_end.supplier.SupplierRepository;
import com.test_tecnico.back_end.supplier.dto.SupplierDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CompanyMapper {
    @Autowired
    private SupplierRepository supplierRepository;

    public Company toModel(CompanyRequestDTO dto, List<CompanySupplier> suppliers) {
        Company company = new Company();
        company.setCnpj(dto.cnpj());
        company.setZipCode(dto.zipCode());
        company.setTradeName(dto.tradeName());
        company.setStatus(StatusCompanyEnum.ACTIVE);
        company.setSuppliers(suppliers);
        return company;
    }

    public List<CompanySupplier> mapCompanySuppliers(List<SupplierDTO> supplierDTOs, Company company) {
        if (supplierDTOs == null || supplierDTOs.isEmpty()) {
            return Collections.emptyList();
        }

        return supplierDTOs.stream()
                .map(dto -> {
                    Supplier supplier = supplierRepository.findById(dto.id())
                            .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado com id: " + dto.id()));

                    CompanySupplier companySupplier = new CompanySupplier();
                    companySupplier.setCompany(company);
                    companySupplier.setSupplier(supplier);
                    return companySupplier;
                })
                .collect(Collectors.toList());
    }

}


