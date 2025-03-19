package com.example.api.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String PET_EXCHANGE_NAME = "pet.v1.events";

    public static final String PET_CREATED_ROUTING_KEY = "pet.created";
    public static final String PET_PROCESSED_ROUTING_KEY = "pet.processed";
    public static final String PET_FAILED_ROUTING_KEY = "pet.failed";

    public static final String SIMILARITY_REQUESTED_ROUTING_KEY = "similarity.requested";
    public static final String SIMILARITY_COMPLETED_ROUTING_KEY = "similarity.completed";
    public static final String SIMILARITY_FAILED_ROUTING_KEY = "similarity.failed";

    public static final String DATA_PROCESSED_QUEUE = "data.processed.queue";
    public static final String DATA_FAILED_QUEUE = "data.failed.queue";

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange petExchange() {
        return new TopicExchange(PET_EXCHANGE_NAME, true, false);
    }

    @Bean
    public Queue dataProcessedQueue(){
        return new Queue(DATA_PROCESSED_QUEUE);
    }

    @Bean
    public Queue failedQueue(){
        return new Queue(DATA_FAILED_QUEUE);
    }

    @Bean
    public Binding bindingPetProcessed(){
        Queue queue = dataProcessedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(PET_PROCESSED_ROUTING_KEY);
    }

    @Bean
    public Binding bindingSimilarityCompleted(){
        Queue queue = dataProcessedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(SIMILARITY_COMPLETED_ROUTING_KEY);
    }

    @Bean
    public Binding bindingPetFailed(){
        Queue queue = failedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(PET_FAILED_ROUTING_KEY);
    }
    @Bean
    public Binding bindingSimilarityFailed(){
        Queue queue = failedQueue();
        TopicExchange exchange = petExchange();
        return BindingBuilder.bind(queue).to(exchange).with(SIMILARITY_FAILED_ROUTING_KEY);
    }
}
