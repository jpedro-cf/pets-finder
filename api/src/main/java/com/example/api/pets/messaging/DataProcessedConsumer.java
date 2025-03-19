package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.cache.CacheService;
import com.example.api.pets.connections.SSEConnections;
import com.example.api.pets.connections.SSEMessageDTO;
import com.example.api.pets.messaging.dto.DataProcessedDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataProcessedConsumer {
    @Autowired
    private CacheService<List<SimilarPetsDTO>> cache;
    @Autowired
    private SSEConnections connections;

    private final Logger logger = LoggerFactory.getLogger(DataProcessedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.DATA_PROCESSED_QUEUE)
    public void consume(DataProcessedDTO message){
        if(message.id().isPresent()){

        }
        connections.sendMessage(
                new SSEMessageDTO(message.requestId(), "completed")
        );

        logger.info("Data processed: " + message.toString());
    }
}
