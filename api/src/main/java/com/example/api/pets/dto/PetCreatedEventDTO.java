package com.example.api.pets.dto;

import java.math.BigDecimal;

public record PetCreatedEventDTO(String id,
                                 String requestId,
                                 String imageKey,
                                 BigDecimal latitude,
                                 BigDecimal longitude
                                   ) {
}
