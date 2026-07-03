package com.pobitra.autocare.repository;

import com.pobitra.autocare.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    boolean existsByVehicleNumber(String vehicleNumber);

    List<Vehicle> findByCustomerId(Long customerId);

}
