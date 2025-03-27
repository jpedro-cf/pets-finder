package com.example.api.users.validators.auth;

import com.example.api.data.validators.Validator;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PasswordCorrectValidator implements Validator<AuthenticateUserValidator> {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UsersRepository repository;

    @Override
    public Optional<String> validate(AuthenticateUserValidator data) {
        boolean valid = encoder.matches(data.password(), data.user().getPassword());
        return valid ? Optional.empty() : Optional.of("E-mail or password invalid.");
    }
}
