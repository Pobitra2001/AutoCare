package com.pobitra.autocare.repository;

import com.pobitra.autocare.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByRating(Integer rating);

    List<Feedback> findByCustomerId(Long customerId);

}