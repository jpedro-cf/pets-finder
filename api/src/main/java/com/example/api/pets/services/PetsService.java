package com.example.api.pets.services;

import com.example.api.data.cache.CacheService;
import com.example.api.data.storage.MainStorageService;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.dto.PetResponseDTO;
import com.example.api.pets.dto.SearchPetsDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetStatusEnum;
import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.pets.messaging.PetsProducer;
import com.example.api.pets.messaging.dto.SimilarityEventDTO;
import com.example.api.pets.repositories.PetsRepository;
import com.example.api.users.entities.UserEntity;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PetsService {
    @Autowired
    private PetsRepository repository;
    @Autowired
    private MainStorageService storageService;
    @Autowired
    private PetsProducer producer;
    @Autowired
    private CacheService<SimilarPetsDTO> cacheService;

    private final Logger logger = LoggerFactory.getLogger(PetsService.class);


    public PetEntity getPetById(String id) throws Exception{
        PetEntity pet = this.repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new BadRequestException("Pet not found"));

        return pet;
    }

    public PetResponseDTO getPetData(String id) throws Exception{
        PetEntity pet = getPetById(id);
        List<SimilarPetsDTO> similar = findSimilar(pet);

        return new PetResponseDTO(
                pet.getId().toString(),
                pet.getImage(),
                pet.getLocation(),
                pet.getType().getValue(),
                pet.getStatus().getValue(),
                pet.getColor(),
                pet.getDescription(),
                pet.getUser().getNumber(),
                similar,
                pet.getDate()
        );
    }

    public PetEntity create(CreatePetDTO data, UserEntity user) throws Exception {
        String image = storageService.store(data.image());

        PetEntity pet = new PetEntity();
        pet.setColor(data.color());
        pet.setImage(image);
        pet.setUser(user);
        pet.setStatus(PetStatusEnum.PROCESSING);
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

    public List<SimilarPetsDTO> findSimilar(PetEntity pet){
        List<SimilarPetsDTO> similarPets = cacheService.getValue(pet.getId().toString());
        if(similarPets == null || similarPets.size() < 4){
            producer.producePetCreated(pet, Optional.empty());
        }

        return similarPets != null ? similarPets : Collections.emptyList();
    }

    public PetEntity updateStatus(String id, PetStatusEnum status) throws  Exception{
        PetEntity pet = this.repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new BadRequestException("Pet not found"));

        pet.setStatus(status);
        repository.save(pet);

        return pet;
    }

    public void delete(String id){
        repository.deleteById(UUID.fromString(id));
    }
}
