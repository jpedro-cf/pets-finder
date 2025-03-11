import json
from database.database import VectorDatabase
from pymilvus import (
    Collection,
    CollectionSchema,
    DataType,
    FieldSchema,
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
        print(f"Connected to Milvus - {self.host}:{self.port}")

    def _define_schema(self):
        fields = [
            FieldSchema(
                name="id",
                dtype=DataType.VARCHAR,
                max_length=255,
                is_primary=True,
            ),
            FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=512),
            FieldSchema(name="color", dtype=DataType.VARCHAR, max_length=100),
            FieldSchema(name="type", dtype=DataType.VARCHAR, max_length=100),
        ]
        schema = CollectionSchema(fields, description="Pets collection")
        self.schema = schema

    def _create_collection(self):
        self.collection = Collection(name=self.collection_name, schema=self.schema)

    def _create_index(self):
        index_params = {
            "index_type": "IVF_FLAT",
            "metric_type": "L2",
            "params": {"nlist": 128},
        }
        self.collection.create_index(field_name="vector", index_params=index_params)

    def _load_collection(self):
        self.collection.load()

    def insert_data(self, vector, metadata):
        try:
            res = self.collection.upsert(
                [
                    {
                        "id": metadata.get("object_key"),
                        "vector": vector,
                        "color": metadata.get("color"),
                        "type": metadata.get("type"),
                    },
                ],
            )
            self.collection.flush()
            return res
        except Exception as e:
            print(e)
            return None

    def search(self, query, top_k, metadata):
        try:
            search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
            res = self.collection.search(
                data=[query],
                expr=f'id != "{metadata["id"]}"',
                filter=f'type == "{metadata["type"]}"',
                anns_field="vector",
                param=search_params,
                limit=4,
                output_fields=["id", "vector", "type"],
            )
            structured_results = []

            for hits in res:
                for hit in hits:
                    structured_results.append(
                        [hit.id, hit.distance, hit.entity.vector, hit.entity.type]
                    )

            return structured_results
        except Exception as e:
            print(e)

    def close(self):
        connections.disconnect(alias="default")
        print("Milvus connection closed.")
