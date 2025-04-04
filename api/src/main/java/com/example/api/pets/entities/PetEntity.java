package com.example.api.pets.entities;

import com.example.api.pets.enums.PetStatusEnum;
import com.example.api.pets.enums.PetTypeEnum;
import com.example.api.users.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Table(name="pets")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;

    private String image;

    private PetStatusEnum status;
    private PetTypeEnum type;

    private String color;
    private String location;

    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserEntity user;
}
