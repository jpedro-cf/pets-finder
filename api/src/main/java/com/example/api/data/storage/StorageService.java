package com.example.api.data.storage;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

public interface StorageService {
    public Optional<String> store(MultipartFile file, Map<String, String> metadata);
}
