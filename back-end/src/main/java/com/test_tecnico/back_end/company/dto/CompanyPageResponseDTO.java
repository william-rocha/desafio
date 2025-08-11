package com.test_tecnico.back_end.company.dto;

import java.util.List;

public record CompanyPageResponseDTO(List<CompanyDTO> companies, Long totalElements, int totalPages) {
}
