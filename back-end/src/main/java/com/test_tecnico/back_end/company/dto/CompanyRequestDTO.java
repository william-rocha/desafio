package com.test_tecnico.back_end.company.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.test_tecnico.back_end.supplier.dto.SupplierDTO;

import java.util.List;


public record CompanyRequestDTO(
        String cnpj,
        String tradeName,
        String zipCode,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        List<SupplierDTO> suppliers
) {
}
