package com.test_tecnico.back_end.supplier.dto.enums;

public enum IdentificationDocumentEnum {
    CPF("cpf"), CNPJ("cnpj");

    private final String value;

    IdentificationDocumentEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static String fromDocument(String document) {
        if (document == null) {
            throw new IllegalArgumentException("Document is null");
        }
        String numeric = document.replaceAll("\\D", "");
        if (numeric.length() == 11) return "cpf";
        if (numeric.length() == 14) return "cnpj";
        throw new IllegalArgumentException("Document must have 11 or 14 digits");
    }

}
