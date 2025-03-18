package com.example.api.users.services;

import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.dto.UpdateUserDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.enums.UserRolesEnum;
import com.example.api.users.repositories.UsersRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsersService {
    @Autowired
    private UsersRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    public UserEntity create(RegisterRequestDTO data) throws Exception{
        String name = data.name();
        String email = data.email();
        String password = data.password();
        String number = data.number();

        if(this.repository.findByEmail(email).isPresent()){
            throw new BadRequestException("E-mail already in use.");
        }

        UserEntity user = new UserEntity();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(this.encoder.encode(password));
        user.setRole(UserRolesEnum.USER);
        user.setNumber(number);

        this.repository.save(user);

        return user;
    }

    public UserEntity update(UUID id, UpdateUserDTO data) throws Exception{
        UserEntity user = this.repository.findById(id)
                .orElseThrow(() -> new BadRequestException("User not found."));

        if(data.email() != null && this.repository.findByEmail(data.email()).isPresent()){
            throw new BadRequestException("E-mail already in use.");
        }

        if(data.number() != null && this.repository.findByNumber(data.number()).isPresent()){
            new BadRequestException("Number already in use.");
        }

        user.setNumber(data.number() == null ? user.getNumber() : data.number());
        user.setEmail(data.email() == null ? user.getEmail() : data.email());

        this.repository.save(user);

        return user;
    }

    public void delete(UUID id) throws Exception{
        if(this.repository.findById(id).isEmpty()){
            throw new BadRequestException("User not found.");
        }

        this.repository.deleteById(id);
    }

}
