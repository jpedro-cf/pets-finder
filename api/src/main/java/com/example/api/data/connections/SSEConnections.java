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
    private static final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Logger logger = LoggerFactory.getLogger(SSEConnections.class);

    public SseEmitter addEmitter(String uuid) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(uuid, emitter);

        emitter.onCompletion(() -> emitters.remove(uuid));
        emitter.onTimeout(() ->  emitters.remove(uuid));
        emitter.onError((e) ->  emitters.remove(uuid));

        return emitter;
    }

    public void sendMessage(SSEMessageDTO data) {
        SseEmitter emitter = emitters.get(data.requestId());

        if (emitter != null) {
            try {
                emitter.send(data);

                if(data.step().equals("completed") || data.step().equals("failed")){
                    emitter.complete();
                }

            } catch (IOException e) {
                emitter.complete();
            }
        }
    }
}
