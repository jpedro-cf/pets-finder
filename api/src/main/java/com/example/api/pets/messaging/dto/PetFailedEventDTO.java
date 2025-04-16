package com.example.api.pets.messaging.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;

public record PetFailedEventDTO(@JsonProperty("request_id")
                                Optional<String> requestId,
                                String id,
                                String info) {
}
