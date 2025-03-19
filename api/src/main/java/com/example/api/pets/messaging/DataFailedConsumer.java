package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.data.connections.SSEConnections;
import com.example.api.data.connections.SSEMessageDTO;
import com.example.api.pets.messaging.dto.ProcessFailedDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataFailedConsumer {
    @Autowired
    private SSEConnections sseConnections;

    private final Logger logger = LoggerFactory.getLogger(DataFailedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.DATA_FAILED_QUEUE)
    public void consume(ProcessFailedDTO message){
        sseConnections.sendMessage(
                new SSEMessageDTO(message.requestId(), "failed", message.info())
        );
        logger.error(message.info());
    }
}
