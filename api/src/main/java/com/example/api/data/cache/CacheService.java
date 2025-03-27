package com.example.api.data.cache;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class CacheService<T> {
    @Autowired
    private RedisTemplate<String, String> template;
    private final ObjectMapper mapper = new ObjectMapper();

    private final Logger logger = LoggerFactory.getLogger(CacheService.class);

    public List<T> getValue(String key){
        try {
            String jsonValue = template.opsForValue().get(key);
            if (jsonValue != null) {
                    return mapper.readValue(jsonValue, new TypeReference<List<T>>() {});
            }
        } catch (Exception e) {
            logger.error("Error reading cache: " + e.getMessage());

        }
        return List.of();
    }

    public void setValue(String key, T value){
        try {
            String jsonInString = mapper.writeValueAsString(value);
            template.opsForValue().set(key,jsonInString);
        } catch (Exception e) {
            logger.error("Error writing cache :" + e.getMessage());
        }
    }

    public void deleteKey(String key){
        try {
            template.delete(key);
        } catch (Exception e) {
            logger.error("Error removing cache :" + e.getMessage());
        }
    }

}
