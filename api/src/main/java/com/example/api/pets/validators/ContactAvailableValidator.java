package com.example.api.pets.validators;

import com.example.api.data.validators.Validator;
import com.example.api.users.exceptions.MissingNumberException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ContactAvailableValidator implements Validator<CreatePetValidation> {
    @Override
    public void validate(CreatePetValidation data) {
        if(data.user().getNumber() == null){
            throw new MissingNumberException("Preencha seu número de celular em seu perfil primeiro.");
        }
    }
}
