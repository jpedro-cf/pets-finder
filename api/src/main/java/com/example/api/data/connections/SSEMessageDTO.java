package com.example.api.data.connections;

public record SSEMessageDTO(String requestId, String step, Object data) {
}
