package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.ContactMessageRequestDTO;
import com.pobitra.autocare.dto.ContactMessageResponseDTO;

import java.util.List;

public interface ContactMessageService {

    ContactMessageResponseDTO createMessage(ContactMessageRequestDTO dto);

    List<ContactMessageResponseDTO> getAllMessages();

    ContactMessageResponseDTO getMessageById(Long id);

    List<ContactMessageResponseDTO> getMessagesByEmail(String email);

    void deleteMessage(Long id);

}