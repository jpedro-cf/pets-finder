import uvicorn
from fastapi import FastAPI
from aws.s3 import S3Client
from cache.redis import RedisCache
from database.database import VectorDatabase
from embeddings.factory import EmbeddingsFactory


class Api:
    def __init__(
        self,
        factory: EmbeddingsFactory,
        db: VectorDatabase,
        cache: RedisCache,
        storage: S3Client,
    ):
        self.factory = factory
        self.db = db
        self.app = FastAPI()
        self.storage = storage
        self.cache = cache

        self._setup_routes()

    def _setup_routes(self):

        @self.app.get("/search")
        async def search(type: str, data: str):
            if type == "text":
                data = self.storage.download_image(data)

            embedding = self.factory.get_data_embedding(type)
            vector = embedding.process_embedding(data)

            res = self.db.search(vector, 8, None)
            return res

        @self.app.get("/similar/{id}")
        async def similar(id):
            data = self.db.get(id)
            if not data:
                return []

            neighbours = self.db.search(
                data["vector"], 4, {"id": id, "type": data["type"]}
            )

            self.cache.set(id, neighbours)

            return neighbours

    def run(self):
        uvicorn.run(self.app, host="localhost", port=3333)
