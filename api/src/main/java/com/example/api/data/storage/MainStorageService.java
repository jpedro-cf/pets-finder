package com.example.api.data.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class MainStorageService implements StorageService {
    private final Map<String, StorageService> storageMap;

    public MainStorageService(S3StorageService s3StorageService, LocalStorageService localStorageService){
        // In case we need to upload to different locations later
        storageMap = Map.of(
                "aws", s3StorageService,
                "local", localStorageService
        );
    }
    @Override
    public Optional<String> store(MultipartFile file, Map<String, String> metadata) {
        return storageMap.get("local").store(file, metadata);
    }
}
