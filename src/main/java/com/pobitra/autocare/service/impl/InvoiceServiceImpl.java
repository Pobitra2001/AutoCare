package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.InvoiceRequestDTO;
import com.pobitra.autocare.dto.InvoiceResponseDTO;
import com.pobitra.autocare.entity.Invoice;
import com.pobitra.autocare.entity.ServiceRecord;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.InvoiceRepository;
import com.pobitra.autocare.repository.ServiceRecordRepository;
import com.pobitra.autocare.service.InvoiceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ServiceRecordRepository serviceRecordRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              ServiceRecordRepository serviceRecordRepository) {
        this.invoiceRepository = invoiceRepository;
        this.serviceRecordRepository = serviceRecordRepository;
    }

    @Override
    public InvoiceResponseDTO createInvoice(InvoiceRequestDTO dto) {

        ServiceRecord serviceRecord = serviceRecordRepository.findById(dto.getServiceRecordId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service Record not found with id: " + dto.getServiceRecordId()));

        if (invoiceRepository.findByServiceRecordId(dto.getServiceRecordId()).isPresent()) {
            throw new DuplicateResourceException(
                    "Invoice already exists for this Service Record.");
        }

        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(generateInvoiceNumber());

        invoice.setServiceCharge(dto.getServiceCharge());
        invoice.setPartsCharge(dto.getPartsCharge());
        invoice.setTax(dto.getTax());
        invoice.setDiscount(dto.getDiscount());

        double finalAmount = dto.getServiceCharge()
                + dto.getPartsCharge()
                + dto.getTax()
                - dto.getDiscount();

        invoice.setFinalAmount(finalAmount);

        invoice.setPaymentStatus(dto.getPaymentStatus());
        invoice.setPaymentMethod(dto.getPaymentMethod());
        invoice.setInvoiceDate(dto.getInvoiceDate());

        invoice.setServiceRecord(serviceRecord);

        Invoice saved = invoiceRepository.save(invoice);

        return mapToDTO(saved);
    }

    @Override
    public List<InvoiceResponseDTO> getAllInvoices() {

        return invoiceRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponseDTO getInvoiceById(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found with id: " + id));

        return mapToDTO(invoice);
    }

    @Override
    public InvoiceResponseDTO getInvoiceByNumber(String invoiceNumber) {

        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found with number: " + invoiceNumber));

        return mapToDTO(invoice);
    }

    @Override
    public InvoiceResponseDTO updateInvoice(Long id,
                                            InvoiceRequestDTO dto) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invoice not found with id: " + id));

        ServiceRecord serviceRecord =
                serviceRecordRepository.findById(dto.getServiceRecordId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service Record not found with id: "
                                                + dto.getServiceRecordId()));

        invoice.setServiceCharge(dto.getServiceCharge());

        invoice.setPartsCharge(dto.getPartsCharge());

        invoice.setTax(dto.getTax());

        invoice.setDiscount(dto.getDiscount());

        invoice.setPaymentMethod(dto.getPaymentMethod());

        invoice.setPaymentStatus(dto.getPaymentStatus());

        invoice.setInvoiceDate(dto.getInvoiceDate());

        invoice.setServiceRecord(serviceRecord);

        double finalAmount =
                dto.getServiceCharge()
                        + dto.getPartsCharge()
                        + dto.getTax()
                        - dto.getDiscount();

        invoice.setFinalAmount(finalAmount);

        Invoice updated = invoiceRepository.save(invoice);

        return mapToDTO(updated);
    }

    @Override
    public void deleteInvoice(Long id) {

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found with id: " + id));

        invoiceRepository.delete(invoice);
    }

    private String generateInvoiceNumber() {

        return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private InvoiceResponseDTO mapToDTO(Invoice invoice) {

        InvoiceResponseDTO dto = new InvoiceResponseDTO();

        dto.setId(invoice.getId());
        dto.setInvoiceNumber(invoice.getInvoiceNumber());
        dto.setServiceCharge(invoice.getServiceCharge());
        dto.setPartsCharge(invoice.getPartsCharge());
        dto.setTax(invoice.getTax());
        dto.setDiscount(invoice.getDiscount());
        dto.setFinalAmount(invoice.getFinalAmount());
        dto.setPaymentStatus(invoice.getPaymentStatus());
        dto.setPaymentMethod(invoice.getPaymentMethod());
        dto.setInvoiceDate(invoice.getInvoiceDate());
        dto.setServiceRecordId(invoice.getServiceRecord().getId());

        return dto;
    }
}