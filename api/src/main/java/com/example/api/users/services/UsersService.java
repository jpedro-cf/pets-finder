package com.example.api.users.services;

import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.dto.UpdateUserDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.enums.UserRolesEnum;
import com.example.api.users.repositories.UsersRepository;
import com.example.api.users.validators.register.RegisterRequestValidator;
import com.example.api.users.validators.register.RegisterUserValidator;
import com.example.api.users.validators.update.UpdateUserRequestValidator;
import com.example.api.users.validators.update.UpdateUserValidator;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService {
    @Autowired
    private UsersRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private RegisterRequestValidator registrationValidator;
    @Autowired
    private UpdateUserRequestValidator updateValidator;

    public UserEntity create(RegisterRequestDTO data) throws Exception{
        Optional<String> validationErrors = registrationValidator.validate(new RegisterUserValidator(data));
        if(validationErrors.isPresent()){
            throw new BadRequestException(validationErrors.get());
        }

        UserEntity user = new UserEntity();
        user.setName(data.name());
        user.setEmail(data.email());
        user.setPassword(this.encoder.encode(data.password()));
        user.setRole(UserRolesEnum.USER);
        user.setNumber(data.number());

        this.repository.save(user);

        return user;
    }

    public UserEntity update(UUID id, UpdateUserDTO data) throws Exception{
        UserEntity user = this.repository.findById(id)
                .orElseThrow(() -> new BadRequestException("User not found."));

        Optional<String> validationErrors = updateValidator.validate(
                new UpdateUserValidator(user, data));

        if(validationErrors.isPresent()){
            throw new BadRequestException(validationErrors.get());
        }

        user.setNumber(data.number().isEmpty() ? user.getNumber() : data.number().get());
        user.setEmail(data.email().isEmpty() ? user.getEmail() : data.email().get());
        user.setPassword(data.password().isEmpty() ? user.getPassword() : encoder.encode(data.password().get()));

        this.repository.save(user);

        return user;
    }

}
