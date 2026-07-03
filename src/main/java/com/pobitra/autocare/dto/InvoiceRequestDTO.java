package com.pobitra.autocare.dto;

import com.pobitra.autocare.enums.PaymentMethod;
import com.pobitra.autocare.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class InvoiceRequestDTO {

    @NotNull(message = "Service charge is required")
    @Positive(message = "Service charge must be greater than 0")
    private Double serviceCharge;

    @NotNull(message = "Parts charge is required")
    @Positive(message = "Parts charge must be greater than 0")
    private Double partsCharge;

    @NotNull(message = "Tax is required")
    private Double tax;

    @NotNull(message = "Discount is required")
    private Double discount;

    @NotNull(message = "Payment status is required")
    private PaymentStatus paymentStatus;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Invoice date is required")
    private java.time.LocalDate invoiceDate;

    @NotNull(message = "Service Record ID is required")
    private Long serviceRecordId;

    // Generate Getters and Setters

    public Double getServiceCharge() {
        return serviceCharge;
    }

    public void setServiceCharge(Double serviceCharge) {
        this.serviceCharge = serviceCharge;
    }

    public Double getPartsCharge() {
        return partsCharge;
    }

    public void setPartsCharge(Double partsCharge) {
        this.partsCharge = partsCharge;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Long getServiceRecordId() {
        return serviceRecordId;
    }

    public void setServiceRecordId(Long serviceRecordId) {
        this.serviceRecordId = serviceRecordId;
    }
}