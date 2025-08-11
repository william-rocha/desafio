package com.test_tecnico.back_end.supplier.dto;

public record SupplierRequestDTO(
        String identificationDocument,
        String name,
        String email,
        String zipCode,
        String rg,
        String birthDate
) {
}
