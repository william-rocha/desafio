package com.test_tecnico.back_end.supplier;

import com.test_tecnico.back_end.CepApi.CepService;
import com.test_tecnico.back_end.supplier.dto.*;
import com.test_tecnico.back_end.supplier.dto.enums.IdentificationDocumentEnum;
import com.test_tecnico.back_end.supplier.dto.mapper.SupplierMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private CepService cepService;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private SupplierMapper supplierMapper;

    public SupplierResponsePageDTO findAll(int page, int pageSize) {
        Page<Supplier> supplierPage = supplierRepository.findAll(PageRequest.of(page, pageSize));
        List<SupplierDTO> supplierListDTO = supplierPage.getContent()
                .stream()
                .map(supplierMapper::toDTO)
                .toList();

        return new SupplierResponsePageDTO(
                    supplierListDTO,
                    supplierPage.getTotalElements(),
                    supplierPage.getTotalPages()
        );
    };

    public void validateSupplier(Supplier supplier) {
        if (supplier.getIdentificationType() == IdentificationDocumentEnum.CPF) {
            if (supplier.getRg() == null || supplier.getBirthDate() == null) {
                throw new IllegalArgumentException("RG e data de nascimento são obrigatórios para pessoa física");
            }
        }
    }

    public SupplierResponsePageDTO findByIdentification(String identification, int page, int pageSize) {
        Page<Supplier> supplierPage = supplierRepository
                .findByIdentificationDocumentStartingWith(identification, PageRequest.of(page, pageSize));
        List<SupplierDTO> supplierListDTO = supplierPage.getContent()
                .stream()
                .map(supplierMapper::toDTO)
                .toList();

        return new SupplierResponsePageDTO(
                supplierListDTO,
                supplierPage.getTotalElements(),
                supplierPage.getTotalPages()
        );
    }

    public SupplierResponsePageDTO findByName(String name, int pageIndex, int pageSize) {
        Page<Supplier> supplierPage = supplierRepository
                .findByNameStartingWith(name, PageRequest.of(pageIndex, pageSize));
        List<SupplierDTO> supplierListDTO = supplierPage.getContent()
                .stream()
                .map(supplierMapper::toDTO)
                .toList();
        return new SupplierResponsePageDTO(
                supplierListDTO,
                supplierPage.getTotalElements(),
                supplierPage.getTotalPages()
        );
    }

    public void delete(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor com ID " + id + " não encontrado."));

        supplierRepository.delete(supplier);
    }

    public SupplierDTO findById(Long id) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow(RuntimeException::new);
        return supplierMapper.toDTO(supplier);
    }

    public SupplierWithCompaniesDTO findSuppliersByIdWithCompanies(Long supplierId) {
        Supplier supplierPage = supplierRepository.findById(supplierId)
                .orElseThrow(RuntimeException::new);
        return SupplierWithCompaniesDTO.from(supplierPage);
    }

    public SupplierDTO create(SupplierRequestDTO supplierRequestDTO) {
        Supplier supplier = supplierMapper.toModel(supplierRequestDTO);

        Supplier saveSupplier = supplierRepository.save(supplier);

        return new SupplierDTO(
                saveSupplier.getId(),
                saveSupplier.getIdentificationDocument(),
                saveSupplier.getName(),
                saveSupplier.getEmail(),
                saveSupplier.getZipCode(),
                saveSupplier.getRg(),
                saveSupplier.getBirthDate()
        );
    }
}
