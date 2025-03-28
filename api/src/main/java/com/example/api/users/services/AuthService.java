package com.example.api.users.services;

import com.example.api.data.exceptions.InvalidArgumentException;
import com.example.api.data.exceptions.NotFoundException;
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
    private AuthRequestValidator authValidators;

    public String authenticate(String email, String password) {
        UserEntity user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidArgumentException("E-mail ou senha inválidos."));

        authValidators.validate( new AuthenticateUserValidator(user,password));

        return this.jwtService.generateToken(
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        return this.usersRepository.findById(UUID.fromString(username))
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
    }
}
