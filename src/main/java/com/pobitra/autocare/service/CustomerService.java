package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.CustomerRequestDTO;
import com.pobitra.autocare.dto.CustomerResponseDTO;
import com.pobitra.autocare.dto.PageResponseDTO;
import com.pobitra.autocare.entity.Customer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CustomerService {

    CustomerResponseDTO saveCustomer(CustomerRequestDTO customerRequestDTO);



    PageResponseDTO<CustomerResponseDTO> getAllCustomers(
            int page,
            int size,
            String sortBy,
            String direction
    );

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}