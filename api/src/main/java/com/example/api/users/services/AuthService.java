package com.example.api.users.services;

import com.example.api.users.dto.RegisterRequestDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.enums.UserRolesEnum;
import com.example.api.users.repositories.UsersRepository;
import com.example.api.users.validators.auth.AuthRequestValidator;
import com.example.api.users.validators.auth.AuthenticateUserValidator;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AuthRequestValidator authValidator;

    public String authenticate(String email, String password) throws Exception {
        UserEntity user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("E-mail or password invalid."));

        Optional<String> validationErrors = authValidator.validate(
                new AuthenticateUserValidator(user,password));

        if(validationErrors.isPresent()){
            throw new BadRequestException(validationErrors.get());
        }

        return this.jwtService.generateToken(
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return this.usersRepository.findById(UUID.fromString(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }
}
