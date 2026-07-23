package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;

import java.util.List;

public interface VehicleService {

    // Create Vehicle
    VehicleResponseDTO createVehicle(VehicleRequestDTO dto);

    // Get All Vehicles
    List<VehicleResponseDTO> getAllVehicles();

    // Get Vehicle By ID
    VehicleResponseDTO getVehicleById(Long id);

    // Update Vehicle
    VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO dto);

    // Delete Vehicle
    void deleteVehicle(Long id);
}