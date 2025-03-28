package com.example.api.data.storage;

import com.example.api.data.exceptions.ApplicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.nio.ByteBuffer;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class S3StorageService implements StorageService {
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private S3Client client;

    private Logger logger = LoggerFactory.getLogger(S3StorageService.class);

    @Override
    public Optional<String> store(MultipartFile file, Map<String, String> metadata) {
        try{
            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .metadata(metadata)
                    .build();

            RequestBody body = RequestBody.fromByteBuffer(ByteBuffer.wrap(file.getBytes()));
            client.putObject(putRequest, body);

            GetUrlRequest getRequest = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            return Optional.of(fileName);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return Optional.empty();
        }
    }
}
