package com.pobitra.autocare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactMessageRequestDTO {

    @NotBlank(message = "Name is required.")
    private String name;

    @Email(message = "Enter a valid email.")
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Subject is required.")
    private String subject;

    @NotBlank(message = "Message is required.")
    private String message;

    public ContactMessageRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}