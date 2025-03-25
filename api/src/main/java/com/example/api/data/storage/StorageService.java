package com.example.api.data.storage;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface StorageService {
    public String store(MultipartFile file, Map<String, String> metadata) throws Exception;
}
