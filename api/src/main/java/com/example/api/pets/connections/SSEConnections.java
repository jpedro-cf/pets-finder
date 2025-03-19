package com.example.api.pets.connections;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SSEConnections {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

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
                emitter.send(data.step());

                if(data.step().equals("completed")){
                    emitters.remove(data.connectionId());
                }

            } catch (IOException e) {
                emitters.remove(data.connectionId());
            }
        }
    }
}
