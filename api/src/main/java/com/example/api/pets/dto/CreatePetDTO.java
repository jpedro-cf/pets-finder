package com.example.api.pets.dto;

import java.math.BigDecimal;

public record CreatePetDTO(String description,
                           String type,
                           String color,
                           BigDecimal latitude,
                           BigDecimal longitude
                           ) {
}
