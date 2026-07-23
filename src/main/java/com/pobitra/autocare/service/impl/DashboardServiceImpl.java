package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.DashboardResponseDTO;
import com.pobitra.autocare.enums.ServiceStatus;
import com.pobitra.autocare.repository.ContactMessageRepository;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.repository.FeedbackRepository;
import com.pobitra.autocare.repository.InvoiceRepository;
import com.pobitra.autocare.repository.ServiceRecordRepository;
import com.pobitra.autocare.repository.VehicleRepository;
import com.pobitra.autocare.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;
    private final ServiceRecordRepository serviceRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final FeedbackRepository feedbackRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardServiceImpl(
            CustomerRepository customerRepository,
            VehicleRepository vehicleRepository,
            ServiceRecordRepository serviceRecordRepository,
            InvoiceRepository invoiceRepository,
            FeedbackRepository feedbackRepository,
            ContactMessageRepository contactMessageRepository) {

        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.serviceRecordRepository = serviceRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.feedbackRepository = feedbackRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    public DashboardResponseDTO getDashboard() {

        DashboardResponseDTO dto = new DashboardResponseDTO();

        dto.setTotalCustomers(customerRepository.count());

        dto.setTotalVehicles(vehicleRepository.count());

        dto.setTotalServiceRecords(serviceRecordRepository.count());

        dto.setPendingServices(
                serviceRecordRepository.countByStatus(ServiceStatus.PENDING));

        dto.setInProgressServices(
                serviceRecordRepository.countByStatus(ServiceStatus.IN_PROGRESS));

        dto.setCompletedServices(
                serviceRecordRepository.countByStatus(ServiceStatus.COMPLETED));

        dto.setTotalInvoices(invoiceRepository.count());

        Double revenue = invoiceRepository.getTotalRevenue();
        dto.setTotalRevenue(revenue == null ? 0 : revenue);

        dto.setTotalFeedbacks(feedbackRepository.count());

        Double rating = feedbackRepository.getAverageRating();
        dto.setAverageRating(rating == null ? 0 : rating);

        dto.setTotalContactMessages(contactMessageRepository.count());

        return dto;
    }
}