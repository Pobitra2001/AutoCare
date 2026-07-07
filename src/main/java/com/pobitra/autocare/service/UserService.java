package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.entity.User;

public interface UserService {

    User register(RegisterRequestDTO dto);

    User findByEmail(String email);

}