package com.example.api.data.connections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SSEConnections {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Logger logger = LoggerFactory.getLogger(SSEConnections.class);

    public SseEmitter addEmitter(String uuid) {
        SseEmitter emitter = new SseEmitter(0L);
        emitters.put(uuid, emitter);

        emitter.onCompletion(() -> emitters.remove(uuid));
        emitter.onTimeout(() -> emitters.remove(uuid));

        return emitter;
    }

    public void sendMessage(SSEMessageDTO data) {
        SseEmitter emitter = emitters.get(data.connectionId());
        if (emitter != null) {
            try {
                emitter.send(data);

                if(data.step().equals("completed") || data.step().equals("failed")){
                    emitters.remove(data.connectionId());
                }

            } catch (IOException e) {
                emitters.remove(data.connectionId());
            }
        }
    }
}
