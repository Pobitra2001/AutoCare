package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.entity.User;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.repository.UserRepository;
import com.pobitra.autocare.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        User user = new User();

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(dto.getRole());

        return userRepository.save(user);
    }
}