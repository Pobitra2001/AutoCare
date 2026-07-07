package com.pobitra.autocare.dto;

import com.pobitra.autocare.enums.ServiceStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ServiceRecordRequestDTO {

    @NotBlank(message = "Service type is required")
    private String serviceType;

    private String description;

    @NotNull(message = "Service date is required")
    private LocalDate serviceDate;

    @NotNull(message = "Status is required")
    private ServiceStatus status;

    @NotNull(message = "Vehicle ID is required")
    private Long vehicleId;

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
}