package com.test_tecnico.back_end.supplier.dto;

import com.test_tecnico.back_end.company.dto.CompanyDTO;
import com.test_tecnico.back_end.supplier.Supplier;

import java.util.List;

public record SupplierWithCompaniesDTO(
        Long id,
        String identificationDocument,
        String name,
        String email,
        String zipCode,
        List<CompanyDTO> companies
) {
    public static SupplierWithCompaniesDTO from(Supplier supplier) {
        List<CompanyDTO> companyDTOList = supplier.getCompanies()
                .stream()
                .map(c ->
                        new CompanyDTO(
                                c.getCompany().getId(),
                                c.getCompany().getCnpj(),
                                c.getCompany().getTradeName(),
                                c.getSupplier().getZipCode(),
                                c.getCompany().getStatus()
                                ))
                .toList();
        return new SupplierWithCompaniesDTO(
                supplier.getId(),
                supplier.getIdentificationDocument(),
                supplier.getName(),
                supplier.getEmail(),
                supplier.getZipCode(),
                companyDTOList
        );
    }
}
