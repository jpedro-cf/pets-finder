package com.example.api.pets.dto;

import java.math.BigDecimal;

public record PetCreatedEventDTO(String id,
                                 String requestId,
                                 String imageKey,
                                 String type,
                                 String color
                                   ) {
}
