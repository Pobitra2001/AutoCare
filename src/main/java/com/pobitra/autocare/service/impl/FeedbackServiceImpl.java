package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.FeedbackRequestDTO;
import com.pobitra.autocare.dto.FeedbackResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.entity.Feedback;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.repository.FeedbackRepository;
import com.pobitra.autocare.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final CustomerRepository customerRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                               CustomerRepository customerRepository) {
        this.feedbackRepository = feedbackRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public FeedbackResponseDTO createFeedback(FeedbackRequestDTO dto) {

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + dto.getCustomerId()));

        Feedback feedback = new Feedback();

        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setCustomer(customer);

        Feedback saved = feedbackRepository.save(feedback);

        return mapToDTO(saved);
    }

    @Override
    public List<FeedbackResponseDTO> getAllFeedbacks() {

        return feedbackRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FeedbackResponseDTO getFeedbackById(Long id) {

        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Feedback not found with id: " + id));

        return mapToDTO(feedback);
    }

    @Override
    public List<FeedbackResponseDTO> getFeedbackByRating(Integer rating) {

        return feedbackRepository.findByRating(rating)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FeedbackResponseDTO> getFeedbackByCustomer(Long customerId) {

        return feedbackRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFeedback(Long id) {

        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Feedback not found with id: " + id));

        feedbackRepository.delete(feedback);
    }

    private FeedbackResponseDTO mapToDTO(Feedback feedback) {

        FeedbackResponseDTO dto = new FeedbackResponseDTO();

        dto.setId(feedback.getId());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        dto.setCustomerId(feedback.getCustomer().getId());

        return dto;
    }
}