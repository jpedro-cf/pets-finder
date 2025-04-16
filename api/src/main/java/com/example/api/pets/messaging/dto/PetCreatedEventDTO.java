package com.example.api.pets.messaging.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PetCreatedEventDTO(String id,
                                 @JsonProperty("request_id")
                                 String requestId,
                                 String image,
                                 String type
                                   ) {
}
