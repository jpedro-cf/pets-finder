package com.example.api.users.dto;

import java.util.Optional;

public record UpdateUserDTO(Optional<String> email,
                            Optional<String> number,
                            Optional<String> password,
                            String passwordConfirmation) {
}
