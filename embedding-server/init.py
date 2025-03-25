import os
import sys
import threading
import clip
from os.path import join, dirname
from dotenv import load_dotenv

from embeddings.embedding_generator import EmbeddingGenerator
from rest.api import Api

load_dotenv(override=True)
sys.dont_write_bytecode = True

from aws.s3 import S3Client
from database.milvus import MilvusDatabase
from queues.consumer import QueueConsumer


def start():
    model, preprocess = clip.load("ViT-B/32", "cpu")

    embedding_generator = EmbeddingGenerator(clip, model, preprocess)

    database = MilvusDatabase("conn1")
    obj_storage = S3Client()

    consumer = QueueConsumer(database, obj_storage, embedding_generator)
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
