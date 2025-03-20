package com.example.api.pets.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public record PetResponseDTO(String id,
                             String image,
                             String location,
                             String type,
                             String status,
                             String color,
                             String description,
                             String contactInfo,
                             @JsonProperty("similar")
                             List<?> similar,
                             Date date) {
}
