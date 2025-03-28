package com.example.api.users.dto;
import jakarta.validation.constraints.NotBlank;

import java.util.Optional;

public record RegisterRequestDTO(@NotBlank String name,
                                 @NotBlank String email,
                                 @NotBlank String password,
                                 Optional<String> number) {
}
