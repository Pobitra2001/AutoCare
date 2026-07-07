package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.ServiceRecordRequestDTO;
import com.pobitra.autocare.dto.ServiceRecordResponseDTO;
import com.pobitra.autocare.enums.ServiceStatus;
import com.pobitra.autocare.service.ServiceRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-records")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Service Record API", description = "Operations related to Vehicle Service Records")
public class ServiceRecordController {

    private final ServiceRecordService serviceRecordService;

    public ServiceRecordController(ServiceRecordService serviceRecordService) {
        this.serviceRecordService = serviceRecordService;
    }

    @Operation(summary = "Create a new service record")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public ResponseEntity<ServiceRecordResponseDTO> createServiceRecord(
            @Valid @RequestBody ServiceRecordRequestDTO dto) {

        return new ResponseEntity<>(
                serviceRecordService.createServiceRecord(dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all service records")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<List<ServiceRecordResponseDTO>> getAllServiceRecords() {

        return ResponseEntity.ok(serviceRecordService.getAllServiceRecords());
    }

    @Operation(summary = "Get service record by ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<ServiceRecordResponseDTO> getServiceRecordById(
            @PathVariable Long id) {

        return ResponseEntity.ok(serviceRecordService.getServiceRecordById(id));
    }

    @Operation(summary = "Get service records by vehicle ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<ServiceRecordResponseDTO>> getByVehicle(
            @PathVariable Long vehicleId) {

        return ResponseEntity.ok(serviceRecordService.getServiceRecordsByVehicle(vehicleId));
    }

    @Operation(summary = "Get service records by status")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ServiceRecordResponseDTO>> getByStatus(
            @PathVariable ServiceStatus status) {

        return ResponseEntity.ok(serviceRecordService.getServiceRecordsByStatus(status));
    }

    @Operation(summary = "Update service status")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ServiceRecordResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam ServiceStatus status) {

        return ResponseEntity.ok(serviceRecordService.updateServiceStatus(id, status));
    }

    @Operation(summary = "Delete service record")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteServiceRecord(@PathVariable Long id) {

        serviceRecordService.deleteServiceRecord(id);

        return ResponseEntity.ok("Service Record deleted successfully.");
    }
}