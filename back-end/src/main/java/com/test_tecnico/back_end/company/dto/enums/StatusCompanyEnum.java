package com.test_tecnico.back_end.company.dto.enums;

public enum StatusCompanyEnum {
    CLOSED("Closed"), ACTIVE("Active");

    private final String value;

    StatusCompanyEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
