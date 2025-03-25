package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.cache.CacheService;
import com.example.api.data.connections.SSEConnections;
import com.example.api.data.connections.SSEMessageDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetStatusEnum;
import com.example.api.pets.messaging.dto.PetFailedEventDTO;
import com.example.api.pets.services.PetsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PetFailedConsumer {
    @Autowired
    private SSEConnections sseConnections;
    @Autowired
    private CacheService<List<SimilarPetsDTO>> cacheService;
    @Autowired
    private PetsService petsService;

    private final Logger logger = LoggerFactory.getLogger(PetFailedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.PET_FAILED_QUEUE)
    public void consume(PetFailedEventDTO message){
        try{
            PetEntity pet = petsService.getPetById(message.id());
            if(pet.getStatus().equals(PetStatusEnum.PROCESSING)){
                petsService.delete(pet.getId().toString());
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        if(message.requestId().isPresent()){
            sseConnections.sendMessage(
                    new SSEMessageDTO(message.requestId().get(), "failed", message.info())
            );

        }
        logger.error(message.info());
    }
}
