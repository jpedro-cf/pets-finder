package com.example.api.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String PET_EXCHANGE_NAME = "pet.v1.events";

    public static final String PET_CREATED_ROUTING_KEY = "pet.created";
    public static final String PET_REFRESH_ROUTING_KEY = "pet.refresh";
    public static final String PET_PROCESSED_ROUTING_KEY = "pet.processed";
    public static final String PET_FAILED_ROUTING_KEY = "pet.failed";

    public static final String PET_PROCESSED_QUEUE = "pet.processed.queue";
    public static final String PET_FAILED_QUEUE = "pet.failed.queue";

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange petExchange() {
        return new TopicExchange(PET_EXCHANGE_NAME, true, false);
    }

    @Bean
    public Queue petProcessedQueue(){
        return new Queue(PET_PROCESSED_QUEUE);
    }

    @Bean
    public Queue failedQueue(){
        return new Queue(PET_FAILED_QUEUE);
    }

    @Bean
    public Binding bindingPetProcessed(){
        Queue queue = petProcessedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(PET_PROCESSED_ROUTING_KEY);
    }

    @Bean
    public Binding bindingPetFailed(){
        Queue queue = failedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(PET_FAILED_ROUTING_KEY);
    }
}
