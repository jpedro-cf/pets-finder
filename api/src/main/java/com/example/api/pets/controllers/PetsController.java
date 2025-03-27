package com.example.api.pets.controllers;

import com.example.api.data.cache.CacheService;
import com.example.api.data.connections.SSEConnections;
import com.example.api.data.connections.SSEMessageDTO;
import com.example.api.pets.dto.CreatePetDTO;
import com.example.api.pets.dto.PetResponseDTO;
import com.example.api.pets.dto.SearchPetsDTO;
import com.example.api.pets.entities.PetEntity;
import com.example.api.pets.services.PetsService;
import com.example.api.users.entities.UserEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("pets")
public class PetsController {
    @Autowired
    private CacheService<List<PetEntity>> cache;
    @Autowired
    private PetsService service;
    @Autowired
    private SSEConnections connections;

    @GetMapping("sse")
    public SseEmitter sseConnection(){
        String id = UUID.randomUUID().toString();

        SseEmitter emitter = connections.addEmitter(id);
        connections.sendMessage(new SSEMessageDTO(id, "connection_stablished", id));

        return emitter;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity create(@Valid @ModelAttribute CreatePetDTO data){
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserEntity user = (UserEntity) auth.getPrincipal();
            PetEntity pet = service.create(data, user);

            return ResponseEntity.ok(pet);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred");
        }

    }
    @GetMapping("{id}")
    public ResponseEntity getPet(@PathVariable UUID id){
        try{
            PetResponseDTO data = service.getPetData(id.toString());
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred");
        }
    }

    @GetMapping("ids")
    public ResponseEntity findByIds(@RequestParam String data){
        try{
            List<String> list = List.of(data.split(","));
            List<PetEntity> pets = service.findPetsByIds(list);
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred");
        }
    }
    @GetMapping()
    public ResponseEntity findAll(Pageable pageable){
        return ResponseEntity.ok(service.listPets(pageable));
    }

}
