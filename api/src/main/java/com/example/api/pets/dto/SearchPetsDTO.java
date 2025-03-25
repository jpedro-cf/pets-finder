package com.example.api.pets.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public record SearchPetsDTO(Optional <MultipartFile> image,
                            String text) {
}
