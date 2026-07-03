package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.CustomerRequestDTO;
import com.pobitra.autocare.dto.CustomerResponseDTO;
import com.pobitra.autocare.dto.PageResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerResponseDTO saveCustomer(CustomerRequestDTO dto) {

        if (customerRepository.existsByPhone(dto.getPhone())) {
            throw new DuplicateResourceException("Phone number already exists.");
        }

        Customer customer = new Customer();
        customer.setName(dto.getName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());
        customer.setAddress(dto.getAddress());

        Customer savedCustomer = customerRepository.save(customer);

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
    public PageResponseDTO<CustomerResponseDTO> getAllCustomers(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Customer> customerPage = customerRepository.findAll(pageable);

        List<CustomerResponseDTO> customerDTOs = customerPage.getContent()
                .stream()
                .map(customer -> {

                    CustomerResponseDTO dto = new CustomerResponseDTO();

                    dto.setId(customer.getId());
                    dto.setName(customer.getName());
                    dto.setPhone(customer.getPhone());
                    dto.setEmail(customer.getEmail());
                    dto.setAddress(customer.getAddress());
                    dto.setCreatedAt(customer.getCreatedAt());

                    return dto;

                }).toList();

        PageResponseDTO<CustomerResponseDTO> response = new PageResponseDTO<>();

        response.setContent(customerDTOs);
        response.setPage(customerPage.getNumber());
        response.setSize(customerPage.getSize());
        response.setTotalElements(customerPage.getTotalElements());
        response.setTotalPages(customerPage.getTotalPages());
        response.setLast(customerPage.isLast());

        return response;
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
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

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