package com.example.api.pets.messaging.dto;

import java.util.Optional;

public record PetFailedEventDTO(Optional<String> requestId, String id, String info) {
}
