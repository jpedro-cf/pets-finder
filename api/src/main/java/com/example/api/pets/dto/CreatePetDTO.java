package com.example.api.pets.dto;

import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.users.entities.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Optional;

public record CreatePetDTO(String description,
                           String color,
                           MultipartFile image,
                           PetTypeEnum type,
                           String location,
                           Optional<String> requestId
                           ) {
}
