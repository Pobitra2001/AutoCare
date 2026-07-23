package com.pobitra.autocare.repository;

import com.pobitra.autocare.entity.Booking;
import com.pobitra.autocare.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByVehicleNumber(String vehicleNumber);

    List<Booking> findByEmail(String email);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByBookingDate(LocalDate bookingDate);
    long countByStatus(BookingStatus status);

}