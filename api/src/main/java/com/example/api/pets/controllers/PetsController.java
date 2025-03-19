package com.example.api.pets.controllers;

import com.example.api.data.cache.CacheService;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.services.PetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("pets")
public class PetsController {
    @Autowired
    private CacheService<List<PetEntity>> cache;
    @Autowired
    private PetsService service;

}
