package com.example.api.users.validators.register;

import com.example.api.data.exceptions.InvalidArgumentException;
import com.example.api.data.validators.Validator;
import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmailAvailableValidator implements Validator<RegisterUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public void validate(RegisterUserValidator request) {
        boolean available = repository.findByEmail(request.data().email()).isEmpty();
        if(!available){
           throw new InvalidArgumentException("Esse e-mail já está em uso");
        };
    }
}
