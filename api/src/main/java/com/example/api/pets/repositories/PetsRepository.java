package com.example.api.pets.repositories;

import com.example.api.pets.entities.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PetsRepository extends JpaRepository<PetEntity, UUID> {
}
