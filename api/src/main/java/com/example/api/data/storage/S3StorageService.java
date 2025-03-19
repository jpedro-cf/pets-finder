package com.example.api.data.storage;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.UUID;

public class S3StorageService implements StorageService {
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private S3Client client;

    private final Logger logger = LoggerFactory.getLogger(S3StorageService.class);

    @Override
    public String store(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            RequestBody body = RequestBody.fromByteBuffer(ByteBuffer.wrap(file.getBytes()));
            client.putObject(putRequest, body);

            GetUrlRequest getRequest = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            return client.utilities().getUrl(getRequest).toString();

        } catch (Exception e) {

            return null;
        }
    }
}
