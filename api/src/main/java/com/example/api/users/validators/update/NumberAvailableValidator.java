package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NumberAvailableValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public Optional<String> validate(UpdateUserValidator updateData) {
        if(updateData.data().number().isEmpty()){
            return Optional.empty();
        }
        if(repository.findByNumber(updateData.data().number().get()).isPresent()){
            return Optional.of("Esse número de celular já está em uso");
        }
        return Optional.empty();
    }
}
