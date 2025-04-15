import json
import time
import pika

from database.database import VectorDatabase
from embeddings.embeddings import DataEmbedding
from files.files_storage import FilesStorage
from processors.image_processor import ImageProcessor
from queues.producer import QueueProducer

from queues.config import rabbit_mq_config as config


class QueueConsumer:
    def __init__(
        self,
        database: VectorDatabase,
        storage: FilesStorage,
        embedding_generator: DataEmbedding,
        image_processor: ImageProcessor,
    ):
        self.db = database
        self.object_storage = storage
        self.generator = embedding_generator
        self.producer = QueueProducer()
        self.image_processor = image_processor

    def listen(self):
        while True:
            try:
                self.connection = pika.BlockingConnection(
                    pika.ConnectionParameters(host="rabbitmq", heartbeat=60, port=5672)
                )
                self.channel = self.connection.channel()
                self._setup_channel()

                self.channel.basic_consume(
                    queue=config["PET_CREATED_QUEUE"],
                    on_message_callback=self.process_pet_created,
                    auto_ack=False,
                )
                self.channel.basic_consume(
                    queue=config["PET_REFRESH_QUEUE"],
                    on_message_callback=self.process_refresh,
                    auto_ack=False,
                )

                print("Consumer ready..")
                self.channel.start_consuming()
            except pika.exceptions.AMQPConnectionError as e:
                print(f"[!] Failed to connect: {e}")
                time.sleep(5)

    def process_pet_created(self, ch, method, properties, body):
        try:
            data = json.loads(body.decode("utf-8"))

            pet_id = data.get("id")
            request_id = data.get("requestId", None)
            image_key = data.get("image")
            pet_type = data.get("type")

            image_bytes = self.object_storage.download_file(image_key)
            if not image_bytes:
                raise Exception("Image not found on S3")

            description = self.image_processor.describe_image(image_bytes)

            image_vector = self.generator.process_embedding("image", image_bytes)
            text_vector = self.generator.process_embedding("text", description)

            self.db.insert_data(
                collection="pets_images",
                vector=image_vector,
                metadata={"id": pet_id, "type": pet_type, "image": image_key},
            )
            self.db.insert_data(
                collection="pets_texts",
                vector=text_vector,
                metadata={"id": pet_id, "type": pet_type, "content": description},
            )

            neighbours = self.db.search(
                collection="pets_images",
                query=image_vector,
                metadata={"id": pet_id, "type": pet_type},
                top_k=4,
            )

            self.producer.produce_pet_processed(
                {
                    "id": pet_id,
                    "requestId": request_id,
                    "data": neighbours,
                    "description": description,
                }
            )

            ch.basic_ack(delivery_tag=method.delivery_tag)
            print(f"Item {pet_id} processed!")
        except Exception as e:
            self.producer.produce_pet_error(
                {
                    "requestId": request_id,
                    "id": pet_id,
                    "info": "Error occurred while creating pet",
                }
            )
            ch.basic_ack(delivery_tag=method.delivery_tag)

            self.db.delete(collection="pets_images", id=pet_id)
            self.db.delete(collection="pets_texts", id=pet_id)

            print(f"Error occurred: {e}")

    def process_refresh(self, ch, method, properties, body):
        try:
            data = json.loads(body.decode("utf-8"))

            pet_id = data.get("id")
            db_data = self.db.get_by_id(collection="pets_images", id=pet_id)
            if not db_data:
                raise Exception("Pet with this id not found.")

            vector = db_data["vector"]
            pet_type = db_data["type"]

            metadata = {"id": pet_id, "type": pet_type}
            neighbours = self.db.search(
                collection="pets_images", query=vector, metadata=metadata, top_k=4
            )

            self.producer.produce_pet_processed({"id": pet_id, "data": neighbours})
            ch.basic_ack(delivery_tag=method.delivery_tag)

            print(f"Item {pet_id} refreshed!")
        except Exception as e:
            self.producer.produce_pet_error(
                {
                    "id": pet_id,
                    "info": "Error occurred while refreshing pet",
                }
            )
            ch.basic_ack(delivery_tag=method.delivery_tag)
            print(f"Error occurred: {e}")

    def _setup_channel(self):
        self.channel.exchange_declare(
            exchange=config["PET_EXCHANGE"], exchange_type="topic", durable=True
        )

        self.channel.queue_declare(queue=config["PET_CREATED_QUEUE"], durable=True)
        self.channel.queue_declare(queue=config["PET_REFRESH_QUEUE"], durable=True)

        self.channel.queue_bind(
            exchange=config["PET_EXCHANGE"],
            queue=config["PET_CREATED_QUEUE"],
            routing_key=config["PET_CREATED_ROUTING_KEY"],
        )
        self.channel.queue_bind(
            exchange=config["PET_EXCHANGE"],
            queue=config["PET_REFRESH_QUEUE"],
            routing_key=config["PET_REFRESH_ROUTING_KEY"],
        )
