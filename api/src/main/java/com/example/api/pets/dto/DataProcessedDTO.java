package com.example.api.pets.dto;

import java.util.List;
import java.util.Optional;

public record DataProcessedDTO(Optional<String> id,
                               String requestId,
                               List<SimilarPetsDTO> data
                                    ) {
}

