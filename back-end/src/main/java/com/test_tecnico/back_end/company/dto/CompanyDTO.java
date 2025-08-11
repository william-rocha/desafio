package com.test_tecnico.back_end.company.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.test_tecnico.back_end.company.Company;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.supplier.dto.SupplierDTO;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CompanyDTO(
        Long id,
        String cnpj,
        String tradeName,
        String zipCode,
        StatusCompanyEnum status
) {

    public static CompanyDTO from(Company company) {
        return new CompanyDTO(
                company.getId(),
                company.getCnpj(),
                company.getTradeName(),
                company.getZipCode(),
                company.getStatus()
        );
    }
}
