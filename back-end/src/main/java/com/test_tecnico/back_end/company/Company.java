package com.test_tecnico.back_end.company;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.test_tecnico.back_end.company.dto.enums.StatusCompanyEnum;
import com.test_tecnico.back_end.company.dto.enums.converter.StatusCompanyConverterEnum;
import com.test_tecnico.back_end.companySupplier.CompanySupplier;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
@SQLDelete(sql = "UPDATE Company SET status = 'Closed' WHERE id=?")
@SQLRestriction("status <> 'Closed'")
@Entity
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cnpj;

    private String tradeName; // Nome Fantasia

    @Column(name = "zipCode")
    private String zipCode; // CEP

    @Column(name = "status", nullable = false)
    @Convert(converter = StatusCompanyConverterEnum.class)
    private StatusCompanyEnum status;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CompanySupplier> Suppliers;

    public List<CompanySupplier> getSuppliers() {
        return Suppliers;
    }

    public void setSuppliers(List<CompanySupplier> suppliers) {
        Suppliers = suppliers;
    }

    public StatusCompanyEnum getStatus() {
        return status;
    }

    public void setStatus(StatusCompanyEnum status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getTradeName() {
        return tradeName;
    }

    public void setTradeName(String tradeName) {
        this.tradeName = tradeName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
