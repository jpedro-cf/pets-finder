package com.example.api.pets.controllers;

import com.example.api.data.cache.CacheService;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.services.PetsService;
import com.example.api.users.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("pets")
public class PetsController {
    @Autowired
    private CacheService<List<PetEntity>> cache;


    @Autowired
    private PetsService service;

}
