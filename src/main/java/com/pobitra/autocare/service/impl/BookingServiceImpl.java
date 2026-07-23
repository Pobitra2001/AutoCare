package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.BookingRequestDTO;
import com.pobitra.autocare.dto.BookingResponseDTO;
import com.pobitra.autocare.entity.Booking;
import com.pobitra.autocare.enums.BookingStatus;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.BookingRepository;
import com.pobitra.autocare.service.BookingService;
import com.pobitra.autocare.service.EmailService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            EmailService emailService) {

        this.bookingRepository = bookingRepository;
        this.emailService = emailService;
    }

    @Override
    public BookingResponseDTO createBooking(BookingRequestDTO dto) {

        if (bookingRepository.existsByVehicleNumber(dto.getVehicleNumber())) {
            throw new DuplicateResourceException(
                    "Vehicle number already has an active booking.");
        }

        Booking booking = new Booking();

        booking.setCustomerName(dto.getCustomerName());
        booking.setEmail(dto.getEmail());
        booking.setPhone(dto.getPhone());
        booking.setVehicleNumber(dto.getVehicleNumber());
        booking.setVehicleModel(dto.getVehicleModel());
        booking.setServiceType(dto.getServiceType());
        booking.setBookingDate(dto.getBookingDate());
        booking.setNotes(dto.getNotes());

        Booking savedBooking = bookingRepository.save(booking);

        emailService.sendEmail(
                savedBooking.getEmail(),
                "AutoCare Booking Confirmation",
                """
                Hello %s,

                Your service booking has been created successfully.

                Booking Details

                Customer Name : %s
                Vehicle Number: %s
                Vehicle Model : %s
                Service Type  : %s
                Booking Date  : %s
                Status        : %s

                Thank you for choosing AutoCare.

                Regards,
                AutoCare Team
                """.formatted(
                        savedBooking.getCustomerName(),
                        savedBooking.getCustomerName(),
                        savedBooking.getVehicleNumber(),
                        savedBooking.getVehicleModel(),
                        savedBooking.getServiceType(),
                        savedBooking.getBookingDate(),
                        savedBooking.getStatus()
                )
        );

        return mapToDTO(savedBooking);
    }

    @Override
    public List<BookingResponseDTO> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponseDTO getBookingById(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with id: " + id));

        return mapToDTO(booking);
    }
    @Override
    public List<BookingResponseDTO> getBookingsByEmail(String email) {

        return bookingRepository.findByEmail(email)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDTO> getBookingsByStatus(BookingStatus status) {

        return bookingRepository.findByStatus(status)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponseDTO updateBookingStatus(
            Long id,
            BookingStatus status) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with id: " + id));

        booking.setStatus(status);

        Booking updatedBooking = bookingRepository.save(booking);

        emailService.sendEmail(
                updatedBooking.getEmail(),
                "AutoCare Booking Status Updated",
                """
                Hello %s,

                Your booking status has been updated successfully.

                Vehicle Number : %s
                Current Status : %s

                Thank you for choosing AutoCare.

                Regards,
                AutoCare Team
                """.formatted(
                        updatedBooking.getCustomerName(),
                        updatedBooking.getVehicleNumber(),
                        updatedBooking.getStatus()
                )
        );

        return mapToDTO(updatedBooking);
    }

    @Override
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with id: " + id));

        bookingRepository.delete(booking);
    }

    private BookingResponseDTO mapToDTO(Booking booking) {

        BookingResponseDTO dto = new BookingResponseDTO();

        dto.setId(booking.getId());
        dto.setCustomerName(booking.getCustomerName());
        dto.setEmail(booking.getEmail());
        dto.setPhone(booking.getPhone());
        dto.setVehicleNumber(booking.getVehicleNumber());
        dto.setVehicleModel(booking.getVehicleModel());
        dto.setServiceType(booking.getServiceType());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStatus(booking.getStatus());
        dto.setNotes(booking.getNotes());
        dto.setCreatedAt(booking.getCreatedAt());

        return dto;
    }
}