package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import com.example.api.users.exceptions.EmailInUseException;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmailInUseValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private UsersRepository repository;
    @Override
    public void validate(UpdateUserValidator updateData) {
        if(updateData.data().email().isEmpty()){
            return;
        }
        String email = updateData.data().email().get();
        if(repository.findByEmail(email).isPresent()){
            throw new EmailInUseException("O email '" + email + "' já está em uso");
        }
    }
}
