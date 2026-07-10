package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.ContactMessageRequestDTO;
import com.pobitra.autocare.dto.ContactMessageResponseDTO;
import com.pobitra.autocare.service.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
@Tag(name = "Contact API", description = "Operations related to Contact Messages")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    // ===============================
    // Public Endpoint (No Login Required)
    // ===============================
    @Operation(summary = "Submit a contact message")
    @PostMapping
    public ResponseEntity<ContactMessageResponseDTO> createMessage(
            @Valid @RequestBody ContactMessageRequestDTO dto) {

        System.out.println("========== CONTACT API HIT ==========");

        return new ResponseEntity<>(
                service.createMessage(dto),
                HttpStatus.CREATED);
    }

    // ===============================
    // Admin Only
    // ===============================
    @Operation(summary = "Get all contact messages")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ContactMessageResponseDTO>> getAllMessages() {

        return ResponseEntity.ok(service.getAllMessages());
    }

    // ===============================
    // Admin Only
    // ===============================
    @Operation(summary = "Get contact message by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessageResponseDTO> getMessageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getMessageById(id));
    }

    // ===============================
    // Admin Only
    // ===============================
    @Operation(summary = "Get contact messages by email")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/email/{email}")
    public ResponseEntity<List<ContactMessageResponseDTO>> getMessagesByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(service.getMessagesByEmail(email));
    }

    // ===============================
    // Admin Only
    // ===============================
    @Operation(summary = "Delete contact message")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {

        service.deleteMessage(id);

        return ResponseEntity.ok("Contact message deleted successfully.");
    }
}