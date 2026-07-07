package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;
import com.pobitra.autocare.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public ResponseEntity<VehicleResponseDTO> createVehicle(
            @Valid @RequestBody VehicleRequestDTO vehicleRequestDTO) {

        VehicleResponseDTO savedVehicle = vehicleService.createVehicle(vehicleRequestDTO);

        return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {

        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> getVehicleById(@PathVariable Long id) {

        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.ok("Vehicle deleted successfully.");
    }
}