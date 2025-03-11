import json
import pika


class QueueProducer:
    def __init__(self, host="localhost"):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue="processed", durable=True)

    def produce(self, data):
        message = json.dumps({"id": data})

        self.channel.basic_publish(
            exchange="",
            routing_key="processed",
            body=message,
            properties=pika.BasicProperties(
                content_type="application/json", delivery_mode=2
            ),
        )

    def close(self):
        self.connection.close()
