package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.CustomerRequestDTO;
import com.pobitra.autocare.dto.CustomerResponseDTO;
import com.pobitra.autocare.dto.PageResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Customer API", description = "Operations related to Customer Management")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Operation(summary = "Create a new customer")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> saveCustomer(
            @Valid @RequestBody CustomerRequestDTO customerRequestDTO) {

        CustomerResponseDTO savedCustomer =
                customerService.saveCustomer(customerRequestDTO);

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all customers with pagination and sorting")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<PageResponseDTO<CustomerResponseDTO>> getAllCustomers(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                customerService.getAllCustomers(page, size, sortBy, direction)
        );
    }

    @Operation(summary = "Get customer by ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {

        return ResponseEntity.ok(
                customerService.getCustomerById(id)
        );
    }

    @Operation(summary = "Update customer")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {

        return ResponseEntity.ok(
                customerService.updateCustomer(id, customer)
        );
    }

    @Operation(summary = "Delete customer")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.ok("Customer deleted successfully.");
    }
}