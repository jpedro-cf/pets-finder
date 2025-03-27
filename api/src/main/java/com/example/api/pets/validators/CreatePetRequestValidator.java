package com.example.api.pets.validators;

import com.example.api.data.validators.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CreatePetRequestValidator implements Validator<CreatePetValidation> {
    @Autowired
    private List<Validator<CreatePetValidation>> validators;

    @Override
    public Optional<String> validate(CreatePetValidation data) {
        return validators.stream()
                .map(validator -> validator.validate(data))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .findFirst();
    }
}
