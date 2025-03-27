package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmailInUseValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public Optional<String> validate(UpdateUserValidator updateData) {
        if(repository.findByEmail(updateData.data().email().get()).isPresent()){
            return Optional.of("Esse e-mail já está em uso");
        }
        return Optional.empty();
    }
}
