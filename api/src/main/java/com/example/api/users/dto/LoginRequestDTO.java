package com.example.api.users.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(@NotBlank String email,@NotBlank String password) {
}
