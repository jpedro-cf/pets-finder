import json
import pika
from queues.config import rabbit_mq_config as config


class QueueProducer:
    def __init__(self):
        self.connection = None
        self.channel = None
        self._connect()

    def produce_pet_processed(self, data):
        self._ensure_connection()
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["PET_PROCESSED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def produce_pet_error(self, data):
        self._ensure_connection()
        message = json.dumps(data)

        self.channel.basic_publish(
            exchange=config["PET_EXCHANGE"],
            routing_key=config["PET_FAILED_ROUTING_KEY"],
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def _ensure_connection(self):
        if not self.connection or self.connection.is_closed:
            self._connect()
        if not self.channel or self.channel.is_closed:
            self.channel = self.connection.channel()

    def _connect(self):
        if self.connection and self.connection.is_open:
            return

        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("localhost")
        )
        self.channel = self.connection.channel()
