package com.example.api.users.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequestDTO(String name,
                                 String email,
                                 String password,
                                 @NotBlank String number) {
}
