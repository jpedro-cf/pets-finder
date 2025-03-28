package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UpdateUserRequestValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private List<Validator<UpdateUserValidator>> validators;

    @Override
    public void validate(UpdateUserValidator updateData) {
        validators.forEach(v -> v.validate(updateData));
    }
}
