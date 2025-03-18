package com.example.api.pets.services;

import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.pets.repositories.PetsRepository;
import com.example.api.users.entities.UserEntity;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PetsService {
    @Autowired
    private PetsRepository repository;

    public PetEntity getPet(UUID id) throws Exception{
        return this.repository.findById(id).orElseThrow(() -> new BadRequestException("Pet not found"));
    }

    public PetEntity create(CreatePetDTO data, UserEntity user){
        PetEntity newPet = new PetEntity();
        newPet.setColor(data.color());
        newPet.setLatitude(data.latitude());
        newPet.setLatitude(data.longitude());
        newPet.setUser(user);
        newPet.setDescription(data.description());
        newPet.setType(PetTypeEnum.CAT);

        repository.save(newPet);

        return newPet;
    }
}
