package com.example.api.pets.messaging.dto;

public record PetCreatedEventDTO(String id,
                                 String requestId,
                                 String image,
                                 String type,
                                 String color
                                   ) {
}
