package com.example.api.pets.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public record SearchPetsDTO(String type,
                            String requestId, Optional
                            <MultipartFile> image,
                            String data) {
}
