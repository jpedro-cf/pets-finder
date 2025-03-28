package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import com.example.api.users.exceptions.NumberInUseException;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NumberAvailableValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public void validate(UpdateUserValidator updateData) {
        if(updateData.data().number().isEmpty()){
            return;
        }
        if(repository.findByNumber(updateData.data().number().get()).isPresent()){
            throw new NumberInUseException("Esse número de celular já está em uso");
        }
    }
}
