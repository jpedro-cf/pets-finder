package com.example.api.pets.services;

import com.example.api.data.storage.MainStorageService;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.dto.SearchPetsDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.pets.messaging.PetsProducer;
import com.example.api.pets.messaging.dto.SimilarityEventDTO;
import com.example.api.pets.repositories.PetsRepository;
import com.example.api.users.entities.UserEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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

    public PetEntity create(CreatePetDTO data, UserEntity user) throws Exception {
        String image = storageService.store(data.image());

        PetEntity pet = new PetEntity();
        pet.setColor(data.color());
        pet.setImage(image);
        pet.setUser(user);
        pet.setDescription(data.description());
        pet.setLocation(data.location());
        pet.setDate(new Date());
        pet.setType(data.type());

        repository.save(pet);

        producer.producePetCreated(pet, data.requestId());

        return pet;
    }

    public String search(SearchPetsDTO searchData) throws Exception{

        String data = searchData.data();
        if(searchData.image().isPresent()){
            data = storageService.store(searchData.image().get());
        }

        producer.produceSimilarityRequest(
                new SimilarityEventDTO(searchData.requestId(), searchData.type(), data)
        );

        return data;
    }
}
