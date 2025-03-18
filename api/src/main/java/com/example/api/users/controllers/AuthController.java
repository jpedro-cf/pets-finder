package com.example.api.users.controllers;

import com.example.api.users.dto.LoginRequestDTO;
import com.example.api.users.dto.LoginResponseDTO;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.services.AuthService;
import com.example.api.users.services.UsersService;
import jakarta.validation.Valid;
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
    @Autowired
    private UsersService usersService;

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO request) throws Exception{
        String token = this.authService.authenticate(request.email(), request.password());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("register")
    public ResponseEntity<UserEntity> login(@RequestBody @Valid RegisterRequestDTO request) throws Exception{
        UserEntity user = this.usersService.create(request);

        return ResponseEntity.ok(user);
    }

    @GetMapping("me")
    public ResponseEntity<UserEntity> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return ResponseEntity.ok((UserEntity) auth.getPrincipal());
    }

}
