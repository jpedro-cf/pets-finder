import os
import sys
import clip
from os.path import join, dirname
from dotenv import load_dotenv

from cache.redis import RedisCache

load_dotenv(override=True)
sys.dont_write_bytecode = True

from aws.s3 import S3Client
from database.milvus import MilvusDatabase
from embeddings.factory import EmbeddingsFactory
from embeddings.image_embedding import ImageEmbedding
from embeddings.text_embedding import TextEmbedding
from queues.consumer import QueueConsumer
from queues.producer import QueueProducer


def start():
    model, preprocess = clip.load("ViT-B/32", "cpu")

    embeddings = [
        ["image", ImageEmbedding(clip, model, preprocess)],
        ["text", TextEmbedding(clip, model, preprocess)],
    ]
    embedding_factory = EmbeddingsFactory(embeddings)

    database = MilvusDatabase()
    obj_storage = S3Client()
    cache = RedisCache()

    consumer = QueueConsumer(database, obj_storage, cache, embedding_factory)
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
