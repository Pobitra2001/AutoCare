package com.pobitra.autocare.controller;

import com.pobitra.autocare.config.JwtService;
import com.pobitra.autocare.dto.LoginRequestDTO;
import com.pobitra.autocare.dto.LoginResponseDTO;
import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.entity.User;
import com.pobitra.autocare.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager) {

        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequestDTO dto) {

        userService.register(dto);

        return new ResponseEntity<>(
                "User registered successfully.",
                HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword())
        );

        User user = userService.findByEmail(dto.getEmail());

        String token = jwtService.generateToken(user);

        LoginResponseDTO response = new LoginResponseDTO();

        response.setToken(token);
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setMessage("Login successful.");

        return ResponseEntity.ok(response);
    }
}