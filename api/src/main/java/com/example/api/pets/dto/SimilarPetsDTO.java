package com.example.api.pets.dto;

import java.util.Date;

public record SimilarPetsDTO(String id,
                             String image,
                             String location,
                             Date date) {
}