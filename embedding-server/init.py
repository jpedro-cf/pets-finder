import os
import sys
import threading
from os.path import join, dirname
from dotenv import load_dotenv
import torch

from embeddings.embedding_generator import EmbeddingGenerator
from processors.image_processor import ImageProcessor
from transformers import CLIPProcessor, CLIPModel
from rest.api import Api

load_dotenv(override=True)
sys.dont_write_bytecode = True

from aws.s3 import S3Client
from database.qdrant import QdrantDatabase
from queues.consumer import QueueConsumer


def start():
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)

    embedding_generator = EmbeddingGenerator(model, processor, device)

    database = QdrantDatabase()
    obj_storage = S3Client()
    image_processor = ImageProcessor()

    consumer = QueueConsumer(
        database, obj_storage, embedding_generator, image_processor
    )
    consumer_thread = threading.Thread(target=consumer.listen, daemon=True)
    consumer_thread.start()

    api = Api(embedding_generator, database)
    api.run()


if __name__ == "__main__":
    try:
        start()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
