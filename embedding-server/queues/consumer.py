import json
import pika

from aws.s3 import S3Client
from cache.redis import RedisCache
from database.database import VectorDatabase
from embeddings.embeddings import DataEmbedding
from queues.producer import QueueProducer

from queues.config import rabbit_mq_config as config


class QueueConsumer:
    def __init__(
        self,
        database: VectorDatabase,
        storage: S3Client,
        cache: RedisCache,
        embedding_generator: DataEmbedding,
    ):
        self.db = database
        self.object_storage = storage
        self.generator = embedding_generator
        self.cache = cache
        self.producer = QueueProducer()

    def listen(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("localhost")
        )
        self.channel = self.connection.channel()

        self._setup_channel()

        self.channel.basic_consume(
            queue=config["PET_CREATED_QUEUE"],
            on_message_callback=self.process_pet_created,
            auto_ack=True,
        )
        self.channel.basic_consume(
            queue=config["SIMILARITY_REQUESTED_QUEUE"],
            on_message_callback=self.process_similarity,
            auto_ack=True,
        )
        print("Consumer ready..")
        self.channel.start_consuming()

    def process_pet_created(self, ch, method, properties, body):
        try:
            data = json.loads(body.decode("utf-8"))

            pet_id = data.get("id")
            request_id = data.get("requestId", None)
            image_key = data.get("imageKey")
            color = data.get("color")
            pet_type = data.get("type")

            image_bytes = self.object_storage.download_image(image_key)
            if not image_bytes:
                return "Image not found on S3"

            vector = self.generator.process_embedding("image", image_bytes)

            self.db.insert_data(vector, data)

            metadata = {"id": pet_id, "type": pet_type, "color": color}
            neighbours = self.db.search(vector, 4, metadata)

            self.cache.set(pet_id, neighbours)

            self.producer.produce_pet_processed(
                {"id": pet_id, "requestId": request_id, "data": neighbours}
            )

            print(f"Item {pet_id} processed!")

        except json.JSONDecodeError:
            print("Error decoding json")

    def process_similarity(self, ch, method, properties, body):
        try:
            data = json.loads(body.decode("utf-8"))

            request_id = data.get("requestId")
            data_type = data.get("type")
            content = data.get("data")

            if data_type == "image":
                content = self.object_storage.download_image(content)

            vector = self.generator.process_embedding(data_type, content)
            neighbours = self.db.search(vector, 6, {})

            self.producer.produce_similarity_completed(
                {"id": None, "requestId": request_id, "data": neighbours}
            )

        except json.JSONDecodeError:
            print("Error decoding json")

    def _setup_channel(self):
        self.channel.exchange_declare(
            exchange=config["PET_EXCHANGE"], exchange_type="topic", durable=True
        )
        self.channel.exchange_declare(
            exchange=config["SIMILARITY_EXCHANGE"], exchange_type="topic", durable=True
        )

        self.channel.queue_declare(queue=config["PET_CREATED_QUEUE"], durable=True)
        self.channel.queue_declare(
            queue=config["SIMILARITY_REQUESTED_QUEUE"], durable=True
        )

        self.channel.queue_bind(
            exchange=config["PET_EXCHANGE"],
            queue=config["PET_CREATED_QUEUE"],
            routing_key=config["PET_CREATED_ROUTING_KEY"],
        )
        self.channel.queue_bind(
            exchange=config["SIMILARITY_EXCHANGE"],
            queue=config["SIMILARITY_REQUESTED_QUEUE"],
            routing_key=config["SIMILARITY_REQUESTED_ROUTING_KEY"],
        )
