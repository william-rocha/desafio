package com.test_tecnico.back_end.supplier;


import com.test_tecnico.back_end.supplier.dto.SupplierDTO;
import com.test_tecnico.back_end.supplier.dto.SupplierRequestDTO;
import com.test_tecnico.back_end.supplier.dto.SupplierResponsePageDTO;
import com.test_tecnico.back_end.supplier.dto.SupplierWithCompaniesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/supplier")
public class SupplierControler {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public SupplierResponsePageDTO findAll(
            @RequestParam(defaultValue = "0") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return supplierService.findAll(pageIndex, pageSize);
    }

    @PostMapping
    public SupplierDTO created(
            @RequestBody SupplierRequestDTO supplierRequestDTO
    ) {
        return supplierService.create(supplierRequestDTO);
    }

    @GetMapping("searchByIdentificationDoc")
    public SupplierResponsePageDTO searchByIdentification(@RequestParam String identification,
                                                          @RequestParam(defaultValue = "0") int pageIndex,
                                                          @RequestParam(defaultValue = "10") int pageSize) {
        return supplierService.findByIdentification(identification, pageIndex, pageSize);
    }

    @GetMapping("searchByName")
    public SupplierResponsePageDTO searchByName(@RequestParam String name,
                                                          @RequestParam(defaultValue = "0") int pageIndex,
                                                          @RequestParam(defaultValue = "10") int pageSize) {
        return supplierService.findByName(name, pageIndex, pageSize);
    }

    @GetMapping("/{id}")
    public SupplierDTO findById(@PathVariable Long id) {
        return supplierService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        supplierService.delete(id);
    }


    @GetMapping("{supplierId}/companies")
    public SupplierWithCompaniesDTO listSuppliersByCompany(
            @PathVariable Long supplierId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        return supplierService.findSuppliersByIdWithCompanies(supplierId);
    }
}
