import json
import pika
from queues.config import rabbit_mq_config as config


class QueueProducer:
    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("localhost")
        )
        self.channel = self.connection.channel()

    def produce_pet_processed(self, data):
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["PET_PROCESSED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def produce_similarity_completed(self, data):
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["SIMILARITY_COMPLETED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def produce_pet_error(self, data):
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["PET_FAILED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def produce_similarity_error(self, data):
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["SIMILARITY_FAILED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def close(self):
        self.connection.close()
