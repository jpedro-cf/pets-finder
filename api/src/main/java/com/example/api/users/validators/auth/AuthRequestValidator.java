package com.example.api.users.validators.auth;

import com.example.api.data.validators.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AuthRequestValidator implements Validator<AuthenticateUserValidator> {
    @Autowired
    private List<Validator<AuthenticateUserValidator>> validators;
    @Override
    public Optional<String> validate(AuthenticateUserValidator data) {
        return validators.stream()
                .map(validator -> validator.validate(data))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .findFirst();
    }
}
