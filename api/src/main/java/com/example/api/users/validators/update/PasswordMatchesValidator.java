package com.example.api.users.validators.update;

import com.example.api.data.validators.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PasswordMatchesValidator implements Validator<UpdateUserValidator> {
    @Autowired
    private PasswordEncoder encoder;
    @Override
    public Optional<String> validate(UpdateUserValidator updateData) {

        boolean matches = encoder.matches(updateData.data().passwordConfirmation(),
                updateData.user().getPassword());

        if(!matches){
            return Optional.of("Senha incorreta.");
        }
        return Optional.empty();
    }
}
