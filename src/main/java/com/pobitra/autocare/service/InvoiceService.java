package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.InvoiceRequestDTO;
import com.pobitra.autocare.dto.InvoiceResponseDTO;

import java.util.List;

public interface InvoiceService {

    InvoiceResponseDTO createInvoice(InvoiceRequestDTO dto);

    List<InvoiceResponseDTO> getAllInvoices();

    InvoiceResponseDTO getInvoiceById(Long id);

    InvoiceResponseDTO getInvoiceByNumber(String invoiceNumber);

    InvoiceResponseDTO updateInvoice(Long id, InvoiceRequestDTO dto);

    void deleteInvoice(Long id);
}