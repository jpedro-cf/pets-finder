package com.example.api.users.services;

import com.example.api.users.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {
    @Autowired
    private JwtEncoder encoder;

    public String generateToken(UserEntity user){
        Instant now = Instant.now();
        long expiry = 3600L;

        String scopes = user.getRole().name();

        var claims = JwtClaimsSet.builder()
                .issuer("pet-finder-api")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(user.getId().toString())
                .claim("scope", scopes)
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }
}
