package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.ServiceRecordRequestDTO;
import com.pobitra.autocare.dto.ServiceRecordResponseDTO;
import com.pobitra.autocare.enums.ServiceStatus;

import java.util.List;

public interface ServiceRecordService {

    ServiceRecordResponseDTO createServiceRecord(ServiceRecordRequestDTO dto);

    List<ServiceRecordResponseDTO> getAllServiceRecords();

    ServiceRecordResponseDTO getServiceRecordById(Long id);

    List<ServiceRecordResponseDTO> getServiceRecordsByVehicle(Long vehicleId);

    List<ServiceRecordResponseDTO> getServiceRecordsByStatus(ServiceStatus status);

    ServiceRecordResponseDTO updateServiceStatus(Long id, ServiceStatus status);

    void deleteServiceRecord(Long id);
}
