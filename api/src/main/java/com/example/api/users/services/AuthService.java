package com.example.api.users.services;

import com.example.api.data.exceptions.InvalidArgumentException;
import com.example.api.data.exceptions.NotFoundException;
import com.example.api.data.exceptions.UnauthorizedException;
import com.example.api.users.dto.LoginResponseDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.repositories.UsersRepository;
import com.example.api.users.validators.auth.AuthRequestValidator;
import com.example.api.users.validators.auth.AuthenticateUserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AuthRequestValidator authValidator;

    public LoginResponseDTO authenticate(String email, String password) {
        UserEntity user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidArgumentException("E-mail ou senha inválidos."));

        authValidator.validate(new AuthenticateUserValidator(user,password));

        String refreshToken = this.jwtService.generateRefreshToken(user);
        String accessToken = this.jwtService.generateAccessToken(user);

        return new LoginResponseDTO(accessToken, refreshToken, user);
    }

    public String refreshToken(String token){
        String userId = jwtService.extractData(token);

        Optional<UserEntity> user = usersRepository.findById(UUID.fromString(userId));
        if(user.isEmpty()){
            throw new UnauthorizedException("Usuário inválido.");
        }

        return this.jwtService.generateAccessToken(user.get());
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return this.usersRepository.findById(UUID.fromString(username))
                .orElseThrow(() -> new UnauthorizedException("Usuário não encontrado"));
    }
}
