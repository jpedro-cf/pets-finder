import json
import pika

from aws.s3 import S3Client
from cache.redis import RedisCache
from database.database import VectorDatabase
from embeddings.factory import EmbeddingsFactory
from queues.producer import QueueProducer


class QueueConsumer:
    def __init__(
        self,
        database: VectorDatabase,
        storage: S3Client,
        cache: RedisCache,
        factory: EmbeddingsFactory,
    ):
        self.db = database
        self.object_storage = storage
        self.factory = factory
        self.cache = cache
        self.producer = QueueProducer()

    def listen(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
        channel = connection.channel()

        channel.queue_declare(queue="images", durable=True)

        def callback(ch, method, properties, body):
            res = self.process_data(body)
            print(res)

        channel.basic_consume(
            queue="images", on_message_callback=callback, auto_ack=True
        )

        print("Consumer ready.")
        channel.start_consuming()

    def process_data(self, body):
        try:
            data = json.loads(body.decode("utf-8"))

            image = self.object_storage.download_image(data.get("object_key"))
            if not image:
                return "Imagem não encontrada no S3"

            image_embedding = self.factory.get_data_embedding("image")
            vector = image_embedding.process_embedding(image)

            self.db.insert_data(vector, data)

            metadata = {"id": data.get("object_key"), "type": data.get("typé")}
            res = self.db.search(vector, 4, metadata)

            self.cache.set(data.get("object_key"), res)
            for key, distance, vect, type in res:
                metadata = {"id": key, "type": type}
                neighbours = self.db.search(vect, 4, metadata)
                self.cache.set(key, neighbours)

            self.producer.produce(data.get("object_key"))

            return "Item processed"

        except json.JSONDecodeError:
            print("Error decoding json")
