package com.example.api.pets.messaging.dto;

import java.util.List;
import java.util.Optional;

public record PetProcessedEventDTO(String id,
                                   Optional<String> requestId,
                                   Optional<String> description,
                                   List<String> data)
{}