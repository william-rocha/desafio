package com.test_tecnico.back_end.company.dto;

import com.test_tecnico.back_end.company.Company;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.supplier.Supplier;
import com.test_tecnico.back_end.supplier.dto.SupplierDTO;

import java.util.List;

public record CompanyWithSupplierDTO(
        Long id,
        String cnpj,
        String tradeName,
        String zipCode,
        StatusCompanyEnum status,
        List<SupplierDTO> suppliers
) {
    public static CompanyWithSupplierDTO from(Company company) {
        List<SupplierDTO> suppliers = company.getSuppliers()
                .stream()
                .map(sup ->
                       new SupplierDTO(
                               sup.getSupplier().getId(),
                               sup.getSupplier().getIdentificationDocument(),
                               sup.getSupplier().getName(),
                               sup.getSupplier().getEmail(),
                               sup.getSupplier().getZipCode(),
                               sup.getSupplier().getRg(),
                               sup.getSupplier().getBirthDate()
                       ))
                .toList();
        return new CompanyWithSupplierDTO(
                company.getId(),
                company.getCnpj(),
                company.getTradeName(),
                company.getZipCode(),
                company.getStatus(),
                suppliers
                );
    }
}
