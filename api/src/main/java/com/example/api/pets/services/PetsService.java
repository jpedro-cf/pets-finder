package com.example.api.pets.services;

import com.example.api.data.cache.CacheService;
import com.example.api.data.storage.MainStorageService;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.dto.PetResponseDTO;
import com.example.api.pets.dto.SearchPetsDTO;
import com.example.api.pets.dto.SimilarPetsDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetStatusEnum;
import com.example.api.pets.messaging.PetsProducer;
import com.example.api.pets.messaging.dto.PetRefreshEventDTO;
import com.example.api.pets.repositories.PetsRepository;
import com.example.api.users.entities.UserEntity;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public PetEntity create(CreatePetDTO data, UserEntity user) throws Exception {
        String image = storageService.store(data.image(), Map.of("expire", "false"));

        PetEntity pet = new PetEntity();
        pet.setColor(data.color());
        pet.setImage(image);
        pet.setUser(user);
        pet.setStatus(PetStatusEnum.PROCESSING);
        pet.setLocation(data.location());
        pet.setDate(new Date());
        pet.setType(data.type());

        repository.save(pet);

        producer.producePetCreated(pet, data.requestId());

        return pet;
    }

    public List<PetEntity> findPetsByIds(List<String> ids) {
        Iterable<UUID> uuids = ids.stream().
                map(UUID::fromString).
                toList();

        return repository.findAllById(uuids);
    }

    public Page<PetEntity> listPets(Pageable pageable){
        return repository.findByStatus(pageable, PetStatusEnum.PROCESSED);
    }

    public PetResponseDTO getPetData(String id) throws Exception{
        PetEntity pet = findPetById(id);
        List<SimilarPetsDTO> similar = findSimilar(pet);

        return new PetResponseDTO(pet.getId().toString(),
                pet.getImage(),
                pet.getLocation(),
                pet.getType().getValue(),
                pet.getStatus().getValue(),
                pet.getColor(),
                pet.getDescription(),
                pet.getUser().getNumber(),
                similar, pet.getDate());
    }

    public List<SimilarPetsDTO> findSimilar(PetEntity pet){
        List<SimilarPetsDTO> similarPets = cacheService.getValue(pet.getId().toString());
        if(similarPets == null || similarPets.size() < 4){
            // try to populate more data into redis
            producer.produceRefreshRequest(new PetRefreshEventDTO(pet.getId().toString()));
        }

        return similarPets != null ? similarPets : Collections.emptyList();
    }

    public PetEntity findPetById(String id) throws Exception{
        return this.repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new BadRequestException("Pet not found"));
    }

    public void update(PetEntity data){
        repository.save(data);
    }

    public void delete(String id){
        repository.deleteById(UUID.fromString(id));
    }
}
