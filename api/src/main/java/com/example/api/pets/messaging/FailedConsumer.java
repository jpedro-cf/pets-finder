package com.example.api.pets.messaging;

import com.example.api.config.RabbitMQConfig;
import com.example.api.pets.dto.ProcessFailedDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class FailedConsumer {
    private final Logger logger = LoggerFactory.getLogger(FailedConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.DATA_FAILED_QUEUE)
    public void consume(ProcessFailedDTO message){
        logger.error(message.toString());
    }
}
