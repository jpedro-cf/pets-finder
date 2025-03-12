package com.example.api.users.services;

import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.enums.UserRolesEnum;
import com.example.api.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UsersRepository repository;

    public String authenticate(String email, String password) {
        Optional<UserEntity> verifyUser = this.repository.findByEmail(email);
        if (!verifyUser.isPresent()) {
            throw new BadCredentialsException("User or password invalid.");
        }

        UserEntity user = verifyUser.get();

        if (!this.verifyPassword(user, password)) {
            throw new BadCredentialsException("User or password invalid.");
        }

        return this.jwtService.generateToken(user);
    }

    public UserEntity register(RegisterRequestDTO data){
        String name = data.name();
        String email = data.email();
        String password = data.password();
        String number = data.number();

        if(this.repository.findByEmail(email).isPresent()){
            throw new BadCredentialsException("E-mail already in use.");
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

    private boolean verifyPassword(UserEntity user, String password){
        return this.encoder.matches(password, user.getPassword());
    }
}
