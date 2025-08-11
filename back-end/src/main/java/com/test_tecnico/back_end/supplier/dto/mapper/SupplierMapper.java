package com.test_tecnico.back_end.supplier.dto.mapper;

import com.test_tecnico.back_end.company.dto.mapper.CompanyMapper;
import com.test_tecnico.back_end.supplier.Supplier;
import com.test_tecnico.back_end.supplier.dto.SupplierDTO;
import com.test_tecnico.back_end.supplier.dto.SupplierRequestDTO;
import com.test_tecnico.back_end.supplier.dto.enums.IdentificationDocumentEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class SupplierMapper {

    @Autowired
    private CompanyMapper companyMapper;

    public SupplierDTO toDTO(Supplier supplier) {

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

    public Supplier toModel(SupplierRequestDTO supplierRequestDTO) {
        Supplier supplier = new Supplier();
        String value = String.valueOf(IdentificationDocumentEnum.fromDocument(supplierRequestDTO.identificationDocument()));
        supplier.setIdentificationType(convertIdentificationDocumentEnumValue(value));
        supplier.setIdentificationDocument(supplierRequestDTO.identificationDocument());
        supplier.setName(supplierRequestDTO.name());
        supplier.setEmail(supplierRequestDTO.email());
        supplier.setZipCode(supplierRequestDTO.zipCode());

        supplier.setBirthDate(LocalDate.parse(supplierRequestDTO.birthDate()));
        supplier.setRg(supplierRequestDTO.rg());
        return supplier;
    }

    public Supplier dtoToModel(SupplierDTO supplierDTO) {
        Supplier supplier = new Supplier();
        supplier.setId(supplierDTO.id());
        String value = String.valueOf(IdentificationDocumentEnum.fromDocument(supplierDTO.identificationDocument()));
        supplier.setIdentificationType(convertIdentificationDocumentEnumValue(value));
        supplier.setIdentificationDocument(supplierDTO.identificationDocument());
        supplier.setName(supplierDTO.name());
        supplier.setEmail(supplierDTO.email());
        supplier.setZipCode(supplierDTO.zipCode());

        supplier.setBirthDate(supplierDTO.birthDate());
        supplier.setRg(supplierDTO.rg());
        return supplier;
    }

    public IdentificationDocumentEnum convertIdentificationDocumentEnumValue(String value) {
        if (value == null) {
            return null;
        }

        return switch (value) {
            case "cpf" -> IdentificationDocumentEnum.CPF;
            case "cnpj" -> IdentificationDocumentEnum.CNPJ;
            default -> throw new IllegalArgumentException("Invalid ID Doc.");
        };
    }

}
