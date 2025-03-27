package com.example.api.pets.repositories;

import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.enums.PetStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface PetsRepository extends JpaRepository<PetEntity, UUID>, PagingAndSortingRepository<PetEntity, UUID> {
    public Page<PetEntity> findByStatus(Pageable pageable, PetStatusEnum petStatus);
}
