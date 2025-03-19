package com.example.api.data.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class MainStorageService implements StorageService {
    private final Map<String, StorageService> storageMap;

    public MainStorageService(S3StorageService s3StorageService){
        // In case of needing to upload to different locations later
        storageMap = Map.of(
                "aws", s3StorageService
        );
    }
    @Override
    public String store(MultipartFile file) throws Exception {
        return storageMap.get("aws").store(file);
    }
}
