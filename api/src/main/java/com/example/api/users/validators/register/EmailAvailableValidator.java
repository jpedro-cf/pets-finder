package com.example.api.users.validators.register;

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
    public Optional<String> validate(RegisterUserValidator request) {
        boolean available = repository.findByEmail(request.data().email()).isEmpty();
        return available ? Optional.empty() : Optional.of("Usuário ou email inválidos");
    }
}
