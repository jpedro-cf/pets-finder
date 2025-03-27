package com.example.api.users.validators.register;

import com.example.api.data.validators.Validator;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NumberValidator implements Validator<RegisterUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public Optional<String> validate(RegisterUserValidator request) {
        if(repository.findByNumber(request.data().number()).isPresent()){
            return Optional.of("Esse número já está em uso.");
        }
        return Optional.empty();
    }
}
