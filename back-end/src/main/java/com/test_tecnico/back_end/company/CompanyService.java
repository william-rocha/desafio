package com.test_tecnico.back_end.company;

import com.test_tecnico.back_end.CepApi.CepService;
import com.test_tecnico.back_end.company.dto.CompanyDTO;
import com.test_tecnico.back_end.company.dto.CompanyPageResponseDTO;
import com.test_tecnico.back_end.company.dto.CompanyRequestDTO;
import com.test_tecnico.back_end.company.dto.CompanyWithSupplierDTO;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.company.dto.mapper.CompanyMapper;
import com.test_tecnico.back_end.companySupplier.CompanySupplier;
import com.test_tecnico.back_end.companySupplier.CompanySupplierRepository;
import com.test_tecnico.back_end.supplier.SupplierRepository;
import com.test_tecnico.back_end.supplier.SupplierService;
import com.test_tecnico.back_end.supplier.dto.mapper.SupplierMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private CompanySupplierRepository companySupplierRepository;

    @Autowired
    private CepService cepService;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private SupplierMapper supplierMapper;

    @Autowired
    private CompanyMapper companyMapper;

    public CompanyPageResponseDTO findAll(int page, int pageSize) {
        Page<Company> companyPage = companyRepository.findAll(PageRequest.of(page, pageSize));

        List<CompanyDTO> companyList = companyPage.getContent()
                .stream()
                .map(CompanyDTO::from)
                .toList();

        return new CompanyPageResponseDTO(companyList, companyPage.getTotalElements(), companyPage.getTotalPages());
    }

    public void delete(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa com ID " + id + " não encontrada."));
        companyRepository.delete(company);
    }

    // No CompanyService
    public CompanyDTO create(CompanyRequestDTO dto) {
        Company company = new Company();
        company.setCnpj(dto.cnpj());
        company.setZipCode(dto.zipCode());
        company.setTradeName(dto.tradeName());
        company.setStatus(StatusCompanyEnum.ACTIVE);

        if (dto.suppliers() != null) {
            List<CompanySupplier> companySuppliers = dto.suppliers().stream()
                    .map(supplierDTO -> {
                        CompanySupplier cs = new CompanySupplier();
                        cs.setCompany(company);
                        cs.setSupplier(supplierMapper.dtoToModel(supplierDTO));
                        return cs;
                    }).toList();
            company.setSuppliers(companySuppliers);
        }

        return CompanyDTO.from(companyRepository.save(company));
    }

    public Company update(CompanyRequestDTO dto,Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa não encontrada"));

        company.getSuppliers().clear();

        List<CompanySupplier> novosSuppliers = companyMapper.mapCompanySuppliers(dto.suppliers(), company);
        company.setSuppliers(novosSuppliers);

        company.setCnpj(dto.cnpj());
        company.setTradeName(dto.tradeName());
        company.setZipCode(dto.zipCode());

        return companyRepository.save(company);
    }

    public CompanyDTO findCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada com id: " + id));

        return CompanyDTO.from(company);
    }

    public CompanyWithSupplierDTO findCompanyWithSuppliers(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada com id: " + id));
        return CompanyWithSupplierDTO.from(company);
    }

}
