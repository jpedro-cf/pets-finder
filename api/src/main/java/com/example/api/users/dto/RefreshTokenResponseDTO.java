package com.example.api.users.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RefreshTokenResponseDTO(@JsonProperty("access_token") String accessToken) {
}
