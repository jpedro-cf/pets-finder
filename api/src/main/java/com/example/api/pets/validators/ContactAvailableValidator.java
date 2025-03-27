package com.example.api.pets.validators;

import com.example.api.data.validators.Validator;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ContactAvailableValidator implements Validator<CreatePetValidation> {
    @Override
    public Optional<String> validate(CreatePetValidation data) {
        if(data.user().getNumber().isEmpty()){
            return Optional.of("Preencha seu número de celular em seu perfil primeiro.");
        }

        return Optional.empty();
    }
}
