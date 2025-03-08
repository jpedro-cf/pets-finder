import json
import pika

from database.database import VectorDatabase


class QueueProducer:
    def __init__(self, database: VectorDatabase):
        self.db = database

    def initialize(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
        channel = connection.channel()

        channel.queue_declare(queue="to_process", durable=True)
        message = {
            "color": "brown",
            "entity_id": "12345",
            "type": "dog",
        }
        channel.basic_publish(
            exchange="",
            routing_key="to_process",
            body=json.dumps(message),
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

        print(" [x] Sent")

        connection.close()
