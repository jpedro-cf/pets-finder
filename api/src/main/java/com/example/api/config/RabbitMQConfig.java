package com.example.api.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String PROCESSED_QUEUE = "processed";
    public static final String IMAGES_QUEUE = "images";
}
