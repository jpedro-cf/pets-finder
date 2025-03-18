package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.cache.CacheService;
import com.example.api.pets.dto.DataProcessedDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataProcessedConsumer {
    private final Logger logger = LoggerFactory.getLogger(DataProcessedConsumer.class);
    @Autowired
    private CacheService<List<SimilarPetsDTO>> cache;

    @RabbitListener(queues = RabbitMQConfig.DATA_PROCESSED_QUEUE)
    public void consume(DataProcessedDTO message){
        if(message.id().isPresent()){
            cache.setValue(message.id().get(), message.data());
        }

        logger.info(message.toString());

    }
}
