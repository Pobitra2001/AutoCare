package com.pobitra.autocare.dto;

public class LoginResponseDTO {

    private String token;
    private String fullName;
    private String email;
    private String role;
    private String message;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token,
                            String fullName,
                            String email,
                            String role,
                            String message) {
        this.token = token;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}