package com.test_tecnico.back_end.supplier.dto.enums.converter;

import com.test_tecnico.back_end.supplier.dto.enums.IdentificationDocumentEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class IndentificationDocumentEnumConverter implements AttributeConverter<IdentificationDocumentEnum, String> {
    @Override
    public String convertToDatabaseColumn(IdentificationDocumentEnum indentificationDocumentEnum) {
        if(indentificationDocumentEnum == null) {
            return null;
        }
        return indentificationDocumentEnum.getValue();
    }

    @Override
    public IdentificationDocumentEnum convertToEntityAttribute(String value) {
        if(value == null) {
            return null;
        }
        return Stream.of(IdentificationDocumentEnum.values())
                .filter(i -> i.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
