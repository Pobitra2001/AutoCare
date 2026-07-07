package com.pobitra.autocare.repository;

import com.pobitra.autocare.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    boolean existsByInvoiceNumber(String invoiceNumber);

    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    Optional<Invoice> findByServiceRecordId(Long serviceRecordId);
    @Query("SELECT COALESCE(SUM(i.finalAmount), 0) FROM Invoice i")
    Double getTotalRevenue();
}

