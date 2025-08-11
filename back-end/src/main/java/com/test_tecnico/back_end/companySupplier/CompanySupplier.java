package com.test_tecnico.back_end.companySupplier;

import com.test_tecnico.back_end.company.Company;
import com.test_tecnico.back_end.supplier.Supplier;
import jakarta.persistence.*;

@Entity
public class CompanySupplier {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Company company;

    @ManyToOne
    private Supplier supplier;

    public CompanySupplier(Company company, Supplier supplier) {
        this.company = company;
        this.supplier = supplier;
    }

    public CompanySupplier() {
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
