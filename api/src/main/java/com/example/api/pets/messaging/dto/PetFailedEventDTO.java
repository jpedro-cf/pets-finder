package com.example.api.pets.messaging.dto;

import java.util.Optional;

public record PetFailedDTO(Optional<String> requestId, String id, String info) {
}
