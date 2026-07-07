package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.InvoiceRequestDTO;
import com.pobitra.autocare.dto.InvoiceResponseDTO;
import com.pobitra.autocare.service.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Invoice API", description = "Operations related to Invoice Management")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @Operation(summary = "Create a new invoice")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public ResponseEntity<InvoiceResponseDTO> createInvoice(
            @Valid @RequestBody InvoiceRequestDTO dto) {

        return new ResponseEntity<>(
                invoiceService.createInvoice(dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all invoices")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<List<InvoiceResponseDTO>> getAllInvoices() {

        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @Operation(summary = "Get invoice by ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponseDTO> getInvoiceById(@PathVariable Long id) {

        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }

    @Operation(summary = "Get invoice by invoice number")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/number/{invoiceNumber}")
    public ResponseEntity<InvoiceResponseDTO> getInvoiceByNumber(
            @PathVariable String invoiceNumber) {

        return ResponseEntity.ok(invoiceService.getInvoiceByNumber(invoiceNumber));
    }

    @Operation(summary = "Delete invoice")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable Long id) {

        invoiceService.deleteInvoice(id);

        return ResponseEntity.ok("Invoice deleted successfully.");
    }
}