package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.entity.User;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.UserRepository;
import com.pobitra.autocare.service.EmailService;
import com.pobitra.autocare.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public User register(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        User user = new User();

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        User savedUser = userRepository.save(user);

        // Send Welcome Email
        emailService.sendEmail(
                savedUser.getEmail(),
                "Welcome to AutoCare",
                """
                Hello %s,

                Welcome to AutoCare!

                Your account has been created successfully.

                You can now log in and start using AutoCare.

                We are delighted to have you as a part of our AutoCare family.

                Regards,
                AutoCare Team
                """.formatted(savedUser.getFullName())
        );

        return savedUser;
    }

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }
}