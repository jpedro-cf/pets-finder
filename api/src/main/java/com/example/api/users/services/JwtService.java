package com.example.api.users.services;

import com.example.api.users.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class JwtService {
    @Autowired
    private JwtEncoder encoder;
    @Autowired
    private JwtDecoder decoder;

    public String generateAccessToken(UserEntity user){
        Instant now = Instant.now();

        var claims = JwtClaimsSet.builder()
                .issuer("pet-finder-api")
                .issuedAt(now)
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .subject(user.getName())
                .claim("scope", user.getAuthorities().toString())
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }
    public String generateRefreshToken(UserEntity user){
        Instant now = Instant.now();

        var claims = JwtClaimsSet.builder()
                .issuer("pet-finder-api")
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .subject(user.getName())
                .claim("scope", user.getAuthorities().toString())
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }

    public String extractData(String token){
        Jwt decoded = decoder.decode(token);
        return decoded.getSubject();
    }
}
