package com.example.api.pets.messaging.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Optional;

public record PetProcessedEventDTO(String id,
                                   @JsonProperty("request_id")
                                   Optional<String> requestId,
                                   Optional<String> description,
                                   List<String> data)
{}