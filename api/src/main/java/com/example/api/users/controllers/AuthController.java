package com.example.api.users.controllers;

import com.example.api.users.dto.LoginRequestDTO;
import com.example.api.users.dto.LoginResponseDTO;
import com.example.api.users.dto.RefreshTokenResponseDTO;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.services.AuthService;
import com.example.api.users.services.JwtService;
import com.example.api.users.services.UsersService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
    @Autowired
    private JwtService jwtService;

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO request, HttpServletResponse response){
        LoginResponseDTO data = this.authService.authenticate(request.email(), request.password());

        HttpCookie cookie = ResponseCookie.from("refresh_token", data.refreshToken())
                .httpOnly(true)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(data);
    }

    @PostMapping("register")
    public ResponseEntity<UserEntity> login(@RequestBody @Valid RegisterRequestDTO request){
        UserEntity user = this.usersService.create(request);
        return ResponseEntity.ok(user);
    }

    @GetMapping("me")
    public ResponseEntity<UserEntity> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok((UserEntity) auth.getPrincipal());
    }

    @GetMapping("refresh")
    public ResponseEntity<RefreshTokenResponseDTO> refresh(@CookieValue("refresh_token") String cookie){
        String newAccessToken = authService.refreshToken(cookie);
        return ResponseEntity.ok(new RefreshTokenResponseDTO(newAccessToken));
    }

}
