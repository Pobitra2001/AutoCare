package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.DashboardResponseDTO;
import com.pobitra.autocare.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
@Tag(name = "Dashboard API", description = "Dashboard Statistics")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @Operation(summary = "Dashboard Statistics")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<DashboardResponseDTO> getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboard());
    }
}