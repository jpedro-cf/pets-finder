package com.example.api.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String PET_EXCHANGE_NAME = "pet.v1.events";
    public static final String FAILED_EXCHANGE_NAME = "failed.v1.events";

    public static final String PET_CREATED_ROUTING_KEY = "pet.created";
    public static final String PET_PROCESSED_ROUTING_KEY = "pet.processed";

    public static final String SIMILARITY_REQUESTED_ROUTING_KEY = "pet.similarity.requested";
    public static final String SIMILARITY_COMPLETED_ROUTING_KEY = "pet.similarity.completed";

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
    public FanoutExchange failedExchange() {
        return new FanoutExchange(FAILED_EXCHANGE_NAME, true,false);
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
    public Binding bindingFailed(){
        Queue queue = failedQueue();
        FanoutExchange exchange = failedExchange();
        return BindingBuilder.bind(queue).to(exchange);
    }
}
