package com.test_tecnico.back_end.supplier.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.test_tecnico.back_end.supplier.Supplier;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SupplierDTO(
        Long id,
        String identificationDocument,
        String name,
        String email,
        String zipCode,
        String rg,
        LocalDate birthDate
) {
    public static SupplierDTO from(Supplier supplier) {
        return new SupplierDTO(
                supplier.getId(),
                supplier.getIdentificationDocument(),
                supplier.getName(),
                supplier.getEmail(),
                supplier.getZipCode(),
                supplier.getRg(),
                supplier.getBirthDate()
        );
    }
}
