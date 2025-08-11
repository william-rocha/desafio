package com.test_tecnico.back_end.company;

import com.test_tecnico.back_end.company.dto.CompanyDTO;
import com.test_tecnico.back_end.company.dto.CompanyPageResponseDTO;
import com.test_tecnico.back_end.company.dto.CompanyRequestDTO;
import com.test_tecnico.back_end.company.dto.CompanyWithSupplierDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public CompanyPageResponseDTO findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return companyService.findAll(page, pageSize);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        companyService.delete(id);
    }

    @PostMapping
    public CompanyDTO create(@RequestBody CompanyRequestDTO companyRequestDTO) {
        return companyService.create(companyRequestDTO);
    }

    @PutMapping("{id}")
    public CompanyDTO update(@RequestBody CompanyRequestDTO companyRequestDTO, @PathVariable Long id) {
        return CompanyDTO.from(companyService.update(companyRequestDTO, id));
    }

    @GetMapping("/{id}")
    public CompanyDTO findCompanyById(@PathVariable Long id) {
        return companyService.findCompanyById(id);
    }

    @GetMapping("/{id}/suppliers")
    public CompanyWithSupplierDTO findCompanyWithSuppliers(@PathVariable Long id) {
       return companyService.findCompanyWithSuppliers(id);
    }

}
