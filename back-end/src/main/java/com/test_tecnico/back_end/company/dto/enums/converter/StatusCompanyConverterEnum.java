package com.test_tecnico.back_end.company.dto.enums.converter;

import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatusCompanyConverterEnum implements AttributeConverter<StatusCompanyEnum, String> {
    @Override
    public String convertToDatabaseColumn(StatusCompanyEnum statusCompanyEnum) {
        if(statusCompanyEnum == null) {
            return null;
        } return statusCompanyEnum.getValue();
    }

    @Override
    public StatusCompanyEnum convertToEntityAttribute(String value) {
        if(value == null) {
            return null;
        }
        return Stream.of(StatusCompanyEnum.values())
                .filter(s -> s.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
