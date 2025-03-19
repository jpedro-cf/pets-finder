package com.example.api.data.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    public String store(MultipartFile file);
}
