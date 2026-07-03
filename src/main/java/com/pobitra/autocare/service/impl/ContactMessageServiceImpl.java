package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.ContactMessageRequestDTO;
import com.pobitra.autocare.dto.ContactMessageResponseDTO;
import com.pobitra.autocare.entity.ContactMessage;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.ContactMessageRepository;
import com.pobitra.autocare.service.ContactMessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageServiceImpl(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public ContactMessageResponseDTO createMessage(ContactMessageRequestDTO dto) {

        ContactMessage message = new ContactMessage();

        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setSubject(dto.getSubject());
        message.setMessage(dto.getMessage());

        ContactMessage saved = repository.save(message);

        return mapToDTO(saved);
    }

    @Override
    public List<ContactMessageResponseDTO> getAllMessages() {

        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ContactMessageResponseDTO getMessageById(Long id) {

        ContactMessage message = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Message not found with id: " + id));

        return mapToDTO(message);
    }

    @Override
    public List<ContactMessageResponseDTO> getMessagesByEmail(String email) {

        return repository.findByEmail(email)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMessage(Long id) {

        ContactMessage message = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Message not found with id: " + id));

        repository.delete(message);
    }

    private ContactMessageResponseDTO mapToDTO(ContactMessage message) {

        ContactMessageResponseDTO dto = new ContactMessageResponseDTO();

        dto.setId(message.getId());
        dto.setName(message.getName());
        dto.setEmail(message.getEmail());
        dto.setSubject(message.getSubject());
        dto.setMessage(message.getMessage());
        dto.setCreatedAt(message.getCreatedAt());

        return dto;
    }
}