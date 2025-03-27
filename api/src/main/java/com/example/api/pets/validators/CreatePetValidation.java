package com.example.api.pets.validators;

import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.users.entities.UserEntity;

public record CreatePetValidation(CreatePetDTO petData, UserEntity user) {
}
