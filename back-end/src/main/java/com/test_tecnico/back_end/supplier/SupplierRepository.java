package com.test_tecnico.back_end.supplier;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Page<Supplier> findByIdentificationDocumentStartingWith(String identification, PageRequest of);

    Page<Supplier> findByNameStartingWith(String name, PageRequest of);

}
