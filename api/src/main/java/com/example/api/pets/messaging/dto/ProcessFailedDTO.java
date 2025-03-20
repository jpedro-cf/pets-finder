package com.example.api.pets.messaging.dto;

import java.util.Optional;

public record ProcessFailedDTO(String requestId, Optional<String> id, String info) {
}
