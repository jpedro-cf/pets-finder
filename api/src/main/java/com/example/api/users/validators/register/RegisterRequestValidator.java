package com.example.api.users.validators.register;

import com.example.api.data.validators.Validator;
import com.example.api.users.dto.RegisterRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RegisterRequestValidator implements Validator<RegisterUserValidator> {
    @Autowired
    private List<Validator<RegisterUserValidator>> validators;
    @Override
    public Optional<String> validate(RegisterUserValidator request) {
        return validators.stream()
                .map(validator -> validator.validate(request))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .findFirst();
    }

}
