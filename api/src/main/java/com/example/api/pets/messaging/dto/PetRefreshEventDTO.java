package com.example.api.pets.messaging.dto;

public record SimilarityEventDTO(String requestId,
                                        String type,
                                        String data) {
}
