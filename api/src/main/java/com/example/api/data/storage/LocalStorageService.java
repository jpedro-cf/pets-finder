package com.example.api.data.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {
    @Value("${app.files.folder}")
    private String FOLDER_PATH;

    private Logger logger = LoggerFactory.getLogger(LocalStorageService.class);

    @Override
    public Optional<String> store(MultipartFile file, Map<String, String> metadata) {
        try {
            Path uploadPath = Paths.get(FOLDER_PATH);
            if(Files.notExists(uploadPath)){
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID() + file.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            return Optional.of(fileName);

        } catch (Exception e) {
            logger.error(e.toString());
            return Optional.empty();
        }
    }
}
