package com.test_tecnico.back_end.supplier.dto;

import java.util.List;

public record SupplierResponsePageDTO(
        List<SupplierDTO> suppliers,
        Long totalElements,
        int totalPages
) {
}
