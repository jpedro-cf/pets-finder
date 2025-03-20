package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.cache.CacheService;
import com.example.api.data.connections.SSEConnections;
import com.example.api.data.connections.SSEMessageDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.messaging.dto.DataProcessedDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import com.example.api.pets.services.PetsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class DataProcessedConsumer {
    @Autowired
    private CacheService<List<SimilarPetsDTO>> cacheService;
    @Autowired
    private SSEConnections sseConnections;
    @Autowired
    private PetsService petsService;

    private final Logger logger = LoggerFactory.getLogger(DataProcessedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.DATA_PROCESSED_QUEUE)
    public void consume(DataProcessedDTO message){
        List<SimilarPetsDTO> similarPets = new ArrayList<>();

        for (String id: message.data()){
            try {
                PetEntity pet = petsService.getPetById(UUID.fromString(id));
                similarPets.add(
                        new SimilarPetsDTO(pet.getId().toString(),
                                            pet.getImage(),
                                            pet.getLocation(),
                                            pet.getDate())
                );
            } catch (Exception e) {
                logger.error("Error getting Pet from database: " + e.getMessage());
            }
        }

        if(message.id().isPresent()){
            cacheService.setValue(message.id().get(), similarPets);
        }
        if(message.requestId().isPresent()){
            sseConnections.sendMessage(
                    new SSEMessageDTO(message.requestId().get(), "completed", similarPets)
            );
        }

        logger.info("Data processed: " + message.toString());
    }
}
