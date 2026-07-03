package com.pobitra.autocare.repository;

import com.pobitra.autocare.entity.ServiceRecord;
import com.pobitra.autocare.enums.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRecordRepository extends JpaRepository<ServiceRecord, Long> {

    List<ServiceRecord> findByVehicleId(Long vehicleId);

    List<ServiceRecord> findByStatus(ServiceStatus status);
}
