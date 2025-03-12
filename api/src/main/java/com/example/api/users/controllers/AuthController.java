package com.example.api.users.controllers;

import com.example.api.users.dto.LoginRequestDTO;
import com.example.api.users.dto.LoginResponseDTO;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request){
        String token = this.authService.authenticate(request.email(), request.password());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("register")
    public ResponseEntity<UserEntity> login(@RequestBody RegisterRequestDTO request){
        UserEntity user = this.authService.register(request);

        return ResponseEntity.ok(user);
    }
}
