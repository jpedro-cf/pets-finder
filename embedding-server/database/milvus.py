from database.database import VectorDatabase
from pymilvus import (
    Collection,
    CollectionSchema,
    DataType,
    FieldSchema,
    MilvusClient,
    connections,
)


class MilvusDatabase(VectorDatabase):
    def __init__(self, host="localhost", port="19530", collection_name="pets"):
        self.host = host
        self.port = port
        self.collection_name = collection_name

        self._connect_to_milvus()
        self._define_schema()
        self._create_collection()
        self._create_index()
        self._load_collection()

    def _connect_to_milvus(self):
        connections.connect(alias="default", host=self.host, port=self.port)
        print(f"Connected - {self.host}:{self.port}")

    def _define_schema(self):
        fields = [
            FieldSchema(
                name="object_key",
                dtype=DataType.VARCHAR,
                max_length=255,
                is_primary=True,
            ),
            FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=512),
            FieldSchema(name="color", dtype=DataType.VARCHAR, max_length=100),
            FieldSchema(name="type", dtype=DataType.VARCHAR, max_length=100),
        ]
        schema = CollectionSchema(fields, description="Pets collection")
        self.schema = schema

    def _create_collection(self):
        self.collection = Collection(name=self.collection_name)

    def _create_index(self):
        index_params = {
            "index_type": "IVF_FLAT",
            "metric_type": "L2",
            "params": {"nlist": 128},
        }
        self.collection.create_index(field_name="embedding", index_params=index_params)

    def _load_collection(self):
        self.collection.load()

    def insert_data(self, data):
        try:

            return self.collection.insert(data)
        except Exception as e:
            print(e)

    def search(self, query, top_k=5):
        search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
        results = self.collection.search(
            query, "embedding", param=search_params, limit=top_k
        )

        print(f"Top {top_k} results:")
        for result in results[0]:
            print(f"ID: {result.id}, Distance: {result.distance}")
        return results

    def close(self):
        connections.disconnect(alias="default")
        print("Connection closed.")
