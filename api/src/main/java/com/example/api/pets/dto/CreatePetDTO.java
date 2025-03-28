package com.example.api.pets.dto;

import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.users.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Optional;

public record CreatePetDTO(@NotBlank String color,
                           @NotNull MultipartFile image,
                           @NotNull PetTypeEnum type,
                           @NotBlank String location,
                           Optional<String> requestId
                           ) {
}
