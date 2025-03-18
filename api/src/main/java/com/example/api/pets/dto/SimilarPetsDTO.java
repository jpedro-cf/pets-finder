package com.example.api.pets.dto;

import java.math.BigDecimal;

public record SimilarPetsDTO(String id,
                             String imageKey,
                             BigDecimal latitude,
                             BigDecimal longitude) {
}
