package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.ContactMessageRequestDTO;
import com.pobitra.autocare.dto.ContactMessageResponseDTO;
import com.pobitra.autocare.service.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Contact API", description = "Operations related to Contact Messages")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @Operation(summary = "Submit a contact message")
    @PostMapping
    public ResponseEntity<ContactMessageResponseDTO> createMessage(
            @Valid @RequestBody ContactMessageRequestDTO dto) {

        return new ResponseEntity<>(
                service.createMessage(dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all contact messages")
    @GetMapping
    public ResponseEntity<List<ContactMessageResponseDTO>> getAllMessages() {

        return ResponseEntity.ok(service.getAllMessages());
    }

    @Operation(summary = "Get contact message by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessageResponseDTO> getMessageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getMessageById(id));
    }

    @Operation(summary = "Get contact messages by email")
    @GetMapping("/email/{email}")
    public ResponseEntity<List<ContactMessageResponseDTO>> getMessagesByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(service.getMessagesByEmail(email));
    }

    @Operation(summary = "Delete contact message")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {

        service.deleteMessage(id);

        return ResponseEntity.ok("Contact message deleted successfully.");
    }
}