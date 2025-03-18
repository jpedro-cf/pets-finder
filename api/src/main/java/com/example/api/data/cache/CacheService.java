package com.example.api.data.cache;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class CacheService<T> {
    @Autowired
    private RedisTemplate<String, String> template;
    private final ObjectMapper mapper = new ObjectMapper();

    private final Logger logger = LoggerFactory.getLogger(CacheService.class);

    public String getValue(String key){
        return template.opsForValue().get(key);
    }

    public void setValue(String key, T value){
        try {
            String jsonInString = mapper.writeValueAsString(value);
            template.opsForValue().set(key,jsonInString);
        } catch (Exception e) {
            logger.error("Error writing cache :" + e.getMessage());
        }
    }

    public void setValue(String key, T value, long timeoutInSeconds){
        try {
            String jsonInString = mapper.writeValueAsString(value);
            template.opsForValue().set(key,jsonInString,timeoutInSeconds, TimeUnit.SECONDS);
        } catch (Exception e) {
            logger.error("Error writing cache :" + e.getMessage());
        }
    }

}
