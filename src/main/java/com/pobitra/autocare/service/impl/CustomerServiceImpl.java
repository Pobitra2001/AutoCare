package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.CustomerRequestDTO;
import com.pobitra.autocare.dto.CustomerResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public CustomerResponseDTO saveCustomer(CustomerRequestDTO dto) {

        // Business Rule
        if (customerRepository.existsByPhone(dto.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        // DTO -> Entity
        Customer customer = new Customer();
        customer.setName(dto.getName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());
        customer.setAddress(dto.getAddress());

        Customer savedCustomer = customerRepository.save(customer);

        // Entity -> ResponseDTO
        CustomerResponseDTO response = new CustomerResponseDTO();
        response.setId(savedCustomer.getId());
        response.setName(savedCustomer.getName());
        response.setPhone(savedCustomer.getPhone());
        response.setEmail(savedCustomer.getEmail());
        response.setAddress(savedCustomer.getAddress());
        response.setCreatedAt(savedCustomer.getCreatedAt());

        return response;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {

        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {

        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));

        existingCustomer.setName(customer.getName());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setAddress(customer.getAddress());

        return customerRepository.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

        customerRepository.delete(customer);
    }
}
