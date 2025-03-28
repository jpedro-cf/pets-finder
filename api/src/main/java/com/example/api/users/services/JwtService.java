package com.example.api.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {
    @Autowired
    private JwtEncoder encoder;

    public String generateToken(Authentication authentication){
        Instant now = Instant.now();
        long expiry = 3600L;

        var claims = JwtClaimsSet.builder()
                .issuer("pet-finder-api")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", authentication.getAuthorities().toString())
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }
}
