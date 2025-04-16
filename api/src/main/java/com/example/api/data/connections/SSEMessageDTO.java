package com.example.api.data.connections;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SSEMessageDTO(@JsonProperty("request_id")
                            String requestId,
                            String step,
                            Object data) {
}
