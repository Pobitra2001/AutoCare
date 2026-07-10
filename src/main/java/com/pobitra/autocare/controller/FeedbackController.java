package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.FeedbackRequestDTO;
import com.pobitra.autocare.dto.FeedbackResponseDTO;
import com.pobitra.autocare.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
@Tag(name = "Feedback API", description = "Operations related to Customer Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @Operation(summary = "Create new feedback")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public ResponseEntity<FeedbackResponseDTO> createFeedback(
            @Valid @RequestBody FeedbackRequestDTO dto) {

        return new ResponseEntity<>(
                feedbackService.createFeedback(dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all feedback")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<List<FeedbackResponseDTO>> getAllFeedbacks() {

        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @Operation(summary = "Get feedback by ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackById(
            @PathVariable Long id) {

        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @Operation(summary = "Get feedback by rating")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<FeedbackResponseDTO>> getFeedbackByRating(
            @PathVariable Integer rating) {

        return ResponseEntity.ok(feedbackService.getFeedbackByRating(rating));
    }

    @Operation(summary = "Get feedback by customer ID")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<FeedbackResponseDTO>> getFeedbackByCustomer(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(feedbackService.getFeedbackByCustomer(customerId));
    }

    @Operation(summary = "Delete feedback")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {

        feedbackService.deleteFeedback(id);

        return ResponseEntity.ok("Feedback deleted successfully.");
    }
}