package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.FeedbackRequestDTO;
import com.pobitra.autocare.dto.FeedbackResponseDTO;

import java.util.List;

public interface FeedbackService {

    FeedbackResponseDTO createFeedback(FeedbackRequestDTO dto);

    List<FeedbackResponseDTO> getAllFeedbacks();

    FeedbackResponseDTO getFeedbackById(Long id);

    List<FeedbackResponseDTO> getFeedbackByRating(Integer rating);

    List<FeedbackResponseDTO> getFeedbackByCustomer(Long customerId);

    void deleteFeedback(Long id);

}