package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.cache.CacheService;
import com.example.api.data.connections.SSEConnections;
import com.example.api.data.connections.SSEMessageDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetStatusEnum;
import com.example.api.pets.messaging.dto.PetProcessedEventDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import com.example.api.pets.services.PetsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PetProcessedConsumer {
    @Autowired
    private CacheService<List<SimilarPetsDTO>> cacheService;
    @Autowired
    private SSEConnections sseConnections;
    @Autowired
    private PetsService petsService;

    private final Logger logger = LoggerFactory.getLogger(PetProcessedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.PET_PROCESSED_QUEUE)
    public void consume(PetProcessedEventDTO message){
        List<PetEntity> pets = petsService.findPetsByIds(message.data());
        List<SimilarPetsDTO> similarPets = pets.stream()
                .filter(pet -> pet.getStatus().equals(PetStatusEnum.PROCESSED))
                .map(pet -> new SimilarPetsDTO(pet.getId().toString(),
                        pet.getImage(),
                        pet.getLocation(),
                        pet.getDate()))
                .toList();


        try {
            PetEntity pet = petsService.findPetById(message.id());
            cacheService.setValue(message.id(), similarPets);

            pet.setStatus(PetStatusEnum.PROCESSED);
            if(message.description().isPresent()){
                pet.setDescription(message.description().get());
            }

            petsService.update(pet);

        } catch (Exception e) {
            logger.error("Error after pet being processed: " + e.getMessage());
        }

        if(message.requestId().isPresent()){
            sseConnections.sendMessage(
                    new SSEMessageDTO(message.requestId().get(), "completed", similarPets)
            );
        }

        logger.info("Data processed: " + message.toString());
    }
}
