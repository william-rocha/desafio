package com.test_tecnico.back_end.supplier;

import com.fasterxml.jackson.annotation.*;
import com.test_tecnico.back_end.companySupplier.CompanySupplier;
import com.test_tecnico.back_end.supplier.dto.enums.IdentificationDocumentEnum;
import com.test_tecnico.back_end.supplier.dto.enums.converter.IndentificationDocumentEnumConverter;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@SQLDelete(sql = "UPDATE Supplier SET active = false WHERE id = ?")
@SQLRestriction("active <> false")
@Entity
public class Supplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Convert(converter = IndentificationDocumentEnumConverter.class)
    private IdentificationDocumentEnum identificationType;

    @Column(nullable = false, unique = true)
    private String identificationDocument; // Pode ser cnpj ou CPF

    private String name;

    private String email;

    private String zipCode; // CEP

    private String rg;

    private LocalDate birthDate;

    private Boolean active = true;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CompanySupplier> companies;

    public List<CompanySupplier> getCompanies() {
        return companies;
    }

    public void setCompanies(List<CompanySupplier> companies) {
        this.companies = companies;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public IdentificationDocumentEnum getIdentificationType() {
        return identificationType;
    }

    public void setIdentificationType(IdentificationDocumentEnum identificationType) {
        this.identificationType = identificationType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificationDocument() {
        return identificationDocument;
    }

    public void setIdentificationDocument(String identificationDocument) {
        this.identificationDocument = identificationDocument;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
