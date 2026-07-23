package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.entity.Vehicle;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.repository.VehicleRepository;
import com.pobitra.autocare.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    public VehicleServiceImpl(
            VehicleRepository vehicleRepository,
            CustomerRepository customerRepository) {

        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
    }

    // ==========================
    // Create Vehicle
    // ==========================
    @Override
    public VehicleResponseDTO createVehicle(VehicleRequestDTO dto) {

        if (vehicleRepository.existsByVehicleNumber(dto.getVehicleNumber())) {
            throw new RuntimeException("Vehicle number already exists.");
        }

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + dto.getCustomerId()));

        Vehicle vehicle = new Vehicle();

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setManufacturingYear(dto.getManufacturingYear());
        vehicle.setCustomer(customer);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return mapToDTO(savedVehicle);
    }

    // ==========================
    // Get All Vehicles
    // ==========================
    @Override
    public List<VehicleResponseDTO> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ==========================
    // Get Vehicle By ID
    // ==========================
    @Override
    public VehicleResponseDTO getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id));

        return mapToDTO(vehicle);
    }

    // ==========================
    // Update Vehicle
    // ==========================
    @Override
    public VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO dto) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id));

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + dto.getCustomerId()));

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setManufacturingYear(dto.getManufacturingYear());
        vehicle.setCustomer(customer);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToDTO(updatedVehicle);
    }

    // ==========================
    // Delete Vehicle
    // ==========================
    @Override
    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id));

        vehicleRepository.delete(vehicle);
    }

    // ==========================
    // Entity -> DTO
    // ==========================
    private VehicleResponseDTO mapToDTO(Vehicle vehicle) {

        VehicleResponseDTO dto = new VehicleResponseDTO();

        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setBrand(vehicle.getBrand());
        dto.setModel(vehicle.getModel());
        dto.setColor(vehicle.getColor());
        dto.setVehicleType(vehicle.getVehicleType());
        dto.setFuelType(vehicle.getFuelType());
        dto.setManufacturingYear(vehicle.getManufacturingYear());
        dto.setCustomerId(vehicle.getCustomer().getId());

        // Uncomment only if VehicleResponseDTO has customerName
        // dto.setCustomerName(vehicle.getCustomer().getName());

        return dto;
    }
}