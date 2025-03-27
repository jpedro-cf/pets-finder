package com.example.api.users.validators.auth;

import com.example.api.users.entities.UserEntity;

import java.util.Optional;

public record AuthenticateUserValidator(UserEntity user, String password) {
}
