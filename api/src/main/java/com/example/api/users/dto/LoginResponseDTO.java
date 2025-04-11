package com.example.api.users.dto;

import com.example.api.users.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

public record LoginResponseDTO(@JsonProperty("access_token")
                               String accessToken,
                               @JsonProperty("refresh_token")
                               String refreshToken,
                               UserEntity user) {
}
