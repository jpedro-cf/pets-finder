import json
import pika

from aws.s3 import S3Client
from database.database import VectorDatabase
from embeddings.factory import EmbeddingsFactory


class QueueConsumer:
    def __init__(
        self, database: VectorDatabase, storage: S3Client, factory: EmbeddingsFactory
    ):
        self.db = database
        self.object_storage = storage
        self.factory = factory

    def listen(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
        channel = connection.channel()

        channel.queue_declare(queue="to_process", durable=True)

        def callback(ch, method, properties, body):
            res = self.process_data(body)
            print(res)

        channel.basic_consume(
            queue="to_process", on_message_callback=callback, auto_ack=True
        )

        print(" [*] Waiting for messages. To exit press CTRL+C")
        channel.start_consuming()

    def process_data(self, body):
        try:
            data = json.loads(body.decode("utf-8"))

            image = self.object_storage.download_image(data.get("object_key"))
            if not image:
                return "Imagem não encontrada no S3"
            image_embedding = self.factory.get_data_embedding("image")

            embedding = image_embedding.process_embedding(image)
            data = [
                {
                    "object_key": data.get("object_key"),
                    "embedding": embedding,
                    "color": data.get("color"),
                    "type": data.get("type"),
                },
            ]
            res = self.db.insert_data(data)

            return "Item processado com sucesso" if res else "Erro ao processar item"
        except json.JSONDecodeError:
            print("Error decoding json")
