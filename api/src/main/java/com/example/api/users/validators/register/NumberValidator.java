package com.example.api.users.validators.register;

import com.example.api.data.validators.Validator;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.exceptions.NumberInUseException;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NumberValidator implements Validator<RegisterUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public void validate(RegisterUserValidator request) {
        if(request.data().number().isEmpty()){
            return;
        }
        if(repository.findByNumber(request.data().number().get()).isPresent()){
            throw new NumberInUseException("Esse número já está em uso.");
        }
    }
}
