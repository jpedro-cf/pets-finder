package com.example.api.pets.http;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.ContentBody;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.HttpResponse;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.List;
import java.util.Optional;

@Component
public class PetSimilarityHttp {
    private ObjectMapper mapper = new ObjectMapper();
    @Value("${api.similarity.url}")
    private String URI;

    public List<String> requestSimilarPets(String text, Optional<MultipartFile> file){
        try{
            CloseableHttpClient client = HttpClients.createDefault();

            HttpPost post = new HttpPost(URI);
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();

            builder.addTextBody("text", text, ContentType.TEXT_PLAIN);
            if(file.isPresent()){
                InputStream inputStream = file.get().getInputStream();
                builder.addBinaryBody("image",
                        inputStream,ContentType.APPLICATION_OCTET_STREAM,
                        file.get().getOriginalFilename());

            }

            HttpEntity entity = builder.build();
            post.setEntity(entity);
            post.addHeader("Accept", "application/json");
            post.addHeader("Content-Type", entity.getContentType());

            CloseableHttpResponse response = client.execute(post);
            String value = EntityUtils.toString(response.getEntity());

            return mapper.readValue(value, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return List.of();
        }
    }
}
