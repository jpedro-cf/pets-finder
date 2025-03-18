import os
import sys
import threading
import clip
from os.path import join, dirname
from dotenv import load_dotenv

from cache.redis import RedisCache
from embeddings.embedding_generator import EmbeddingGenerator

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
    cache = RedisCache()

    consumer = QueueConsumer(database, obj_storage, cache, embedding_generator)
    consumer.listen()


if __name__ == "__main__":
    try:
        start()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
