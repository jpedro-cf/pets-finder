package com.example.api.users.controllers;

import com.example.api.users.dto.UpdateUserDTO;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.services.UsersService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users")
public class UsersController {
    @Autowired
    private UsersService service;

    @PutMapping("{id}")
    public ResponseEntity<UserEntity> update(@PathVariable UUID id,
                                             @RequestBody @Valid UpdateUserDTO data){
        return ResponseEntity.ok(service.update(id, data));
    }
}
