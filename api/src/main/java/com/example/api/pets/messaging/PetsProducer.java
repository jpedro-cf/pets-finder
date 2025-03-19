package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.pets.messaging.dto.PetCreatedEventDTO;
import com.example.api.pets.messaging.dto.SimilarityEventDTO;
import com.example.api.pets.entities.PetEntity;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class PetsProducer {
    @Autowired
    private RabbitTemplate template;

    public void producePetCreated(PetEntity pet, Optional<String> requestId){
        PetCreatedEventDTO event = new PetCreatedEventDTO(
                pet.getId().toString(),
                requestId.orElse(null),
                pet.getImage(),
                pet.getType().getValue(),
                pet.getColor()
        );

        template.convertAndSend(RabbitMQConfig.PET_EXCHANGE_NAME,
                                RabbitMQConfig.PET_CREATED_ROUTING_KEY,
                                event);
    }

    public void produceSimilarityRequest(SimilarityEventDTO event){
        template.convertAndSend(RabbitMQConfig.PET_CREATED_ROUTING_KEY,
                                RabbitMQConfig.SIMILARITY_REQUESTED_ROUTING_KEY,
                                event);
    }
}
