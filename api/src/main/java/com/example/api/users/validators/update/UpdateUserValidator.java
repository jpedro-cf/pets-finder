package com.example.api.users.validators.update;

import com.example.api.users.dto.UpdateUserDTO;
import com.example.api.users.entities.UserEntity;

public record UpdateUserValidator(UserEntity user, UpdateUserDTO data) {
}
