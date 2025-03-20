package com.example.api.pets.messaging.dto;

import java.util.List;
import java.util.Optional;

public record DataProcessedDTO(Optional<String> id,
                               Optional<String> requestId,
                               List<String> data)
{}