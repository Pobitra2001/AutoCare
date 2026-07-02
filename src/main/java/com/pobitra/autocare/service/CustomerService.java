package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.CustomerRequestDTO;
import com.pobitra.autocare.dto.CustomerResponseDTO;
import com.pobitra.autocare.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    CustomerResponseDTO saveCustomer(CustomerRequestDTO customerRequestDTO);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}