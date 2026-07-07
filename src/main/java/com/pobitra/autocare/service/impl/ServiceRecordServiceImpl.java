package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.ServiceRecordRequestDTO;
import com.pobitra.autocare.dto.ServiceRecordResponseDTO;
import com.pobitra.autocare.entity.Booking;
import com.pobitra.autocare.entity.ServiceRecord;
import com.pobitra.autocare.entity.Vehicle;
import com.pobitra.autocare.enums.ServiceStatus;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.BookingRepository;
import com.pobitra.autocare.repository.ServiceRecordRepository;
import com.pobitra.autocare.repository.VehicleRepository;
import com.pobitra.autocare.service.ServiceRecordService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRecordServiceImpl implements ServiceRecordService {

    private final ServiceRecordRepository serviceRecordRepository;
    private final VehicleRepository vehicleRepository;
    private final BookingRepository bookingRepository;

    public ServiceRecordServiceImpl(
            ServiceRecordRepository serviceRecordRepository,
            VehicleRepository vehicleRepository,
            BookingRepository bookingRepository) {

        this.serviceRecordRepository = serviceRecordRepository;
        this.vehicleRepository = vehicleRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public ServiceRecordResponseDTO createServiceRecord(ServiceRecordRequestDTO dto) {

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + dto.getVehicleId()));

        Booking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with id: " + dto.getBookingId()));

        // Prevent duplicate Service Record for the same Booking
        if (serviceRecordRepository.findByBookingId(dto.getBookingId()).isPresent()) {
            throw new DuplicateResourceException(
                    "A Service Record already exists for this Booking.");
        }

        ServiceRecord record = new ServiceRecord();

        record.setServiceType(dto.getServiceType());
        record.setDescription(dto.getDescription());
        record.setServiceDate(dto.getServiceDate());
        record.setStatus(dto.getStatus());

        record.setVehicle(vehicle);
        record.setBooking(booking);

        ServiceRecord saved = serviceRecordRepository.save(record);

        return mapToDTO(saved);
    }

    @Override
    public List<ServiceRecordResponseDTO> getAllServiceRecords() {

        return serviceRecordRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceRecordResponseDTO getServiceRecordById(Long id) {

        ServiceRecord record = serviceRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service Record not found with id: " + id));

        return mapToDTO(record);
    }

    @Override
    public List<ServiceRecordResponseDTO> getServiceRecordsByVehicle(Long vehicleId) {

        return serviceRecordRepository.findByVehicleId(vehicleId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceRecordResponseDTO> getServiceRecordsByStatus(ServiceStatus status) {

        return serviceRecordRepository.findByStatus(status)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceRecordResponseDTO updateServiceStatus(Long id, ServiceStatus status) {

        ServiceRecord record = serviceRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service Record not found with id: " + id));

        record.setStatus(status);

        return mapToDTO(serviceRecordRepository.save(record));
    }

    @Override
    public void deleteServiceRecord(Long id) {

        ServiceRecord record = serviceRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service Record not found with id: " + id));

        serviceRecordRepository.delete(record);
    }

    private ServiceRecordResponseDTO mapToDTO(ServiceRecord record) {

        ServiceRecordResponseDTO dto = new ServiceRecordResponseDTO();

        dto.setId(record.getId());
        dto.setServiceType(record.getServiceType());
        dto.setDescription(record.getDescription());
        dto.setServiceDate(record.getServiceDate());
        dto.setStatus(record.getStatus());

        dto.setVehicleId(record.getVehicle().getId());
        dto.setBookingId(record.getBooking().getId());

        return dto;
    }
}