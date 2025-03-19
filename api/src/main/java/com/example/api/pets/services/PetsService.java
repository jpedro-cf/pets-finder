package com.example.api.pets.services;

import com.example.api.data.storage.MainStorageService;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.pets.messaging.PetsProducer;
import com.example.api.pets.repositories.PetsRepository;
import com.example.api.users.entities.UserEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PetsService {
    @Autowired
    private PetsRepository repository;
    @Autowired
    private MainStorageService storageService;
    @Autowired
    private PetsProducer producer;


    public PetEntity getPetById(UUID id) throws Exception{
        return this.repository.findById(id).orElseThrow(() -> new BadRequestException("Pet not found"));
    }

    public PetEntity create(CreatePetDTO data) throws Exception{
        String image = storageService.store(data.image());

        PetEntity pet = new PetEntity();
        pet.setColor(data.color());
        pet.setLatitude(data.latitude());
        pet.setLatitude(data.longitude());
        pet.setImage(image);
        pet.setUser(data.user());
        pet.setDescription(data.description());
        pet.setType(data.type());

        repository.save(pet);

        producer.producePetCreated(pet, data.connectionId());

        return pet;
    }
}
