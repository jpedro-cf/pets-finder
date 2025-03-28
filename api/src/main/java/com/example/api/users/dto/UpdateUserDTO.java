package com.example.api.users.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.validation.constraints.NotBlank;

import java.util.Optional;

public record UpdateUserDTO(Optional<String> email,
                            Optional<String> number,
                            Optional<String> password,
                            @JsonProperty("password_confirmation")
                            @NotBlank String passwordConfirmation) {
}
