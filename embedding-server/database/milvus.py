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
    def __init__(self, conn, host="localhost", port="19530", collection_name="pets"):
        self.host = host
        self.port = port
        self.collection_name = collection_name
        self.conn = conn

        self._connect_to_milvus()
        self._define_schema()
        self._create_collection()
        self._create_index()
        self._load_collection()

    def _connect_to_milvus(self):
        connections.connect(alias=self.conn, host=self.host, port=self.port)
        print(f"Connected to Milvus - {self.host}:{self.port}")

    def _define_schema(self):
        fields = [
            FieldSchema(
                name="id",
                dtype=DataType.VARCHAR,
                max_length=255,
                is_primary=True,
            ),
            FieldSchema(name="key", dtype=DataType.VARCHAR, max_length=100),
            FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=512),
            FieldSchema(name="color", dtype=DataType.VARCHAR, max_length=20),
            FieldSchema(name="type", dtype=DataType.VARCHAR, max_length=5),
        ]
        schema = CollectionSchema(
            fields, description="Pets collection", using=self.conn
        )
        self.schema = schema

    def _create_collection(self):
        self.collection = Collection(
            name=self.collection_name, schema=self.schema, using=self.conn
        )

    def _create_index(self):
        index_params = {
            "index_type": "IVF_FLAT",
            "metric_type": "L2",
            "params": {"nlist": 128},
        }
        self.collection.create_index(
            field_name="vector", index_params=index_params, using=self.conn
        )

    def _load_collection(self):
        self.collection.load(using=self.conn)

    def insert_data(self, vector, metadata):
        try:
            res = self.collection.upsert(
                [
                    {
                        "id": metadata["id"],
                        "key": metadata["imageKey"],
                        "vector": vector,
                        "color": metadata["color"],
                        "type": metadata["type"],
                    },
                ],
                using=self.conn,
            )
            return res
        except Exception as e:
            print(e)
            return None

    def search(self, query, top_k, metadata):
        try:
            search_params = {"metric_type": "L2", "params": {"nprobe": 10}}

            expression = f'id != "{metadata["id"]}"' if metadata else ""
            if metadata and "type" in metadata:
                expression += f' and type == "{metadata["type"]}"'

            res = self.collection.search(
                data=[query],
                expr=expression,
                anns_field="vector",
                param=search_params,
                limit=top_k,
                output_fields=["id", "key"],
                using=self.conn,
            )

            structured_response = []
            for hits in res:
                for hit in hits:
                    structured_response.append(
                        {"id": hit.id, "imageKey": hit.entity.key}
                    )
            return structured_response
        except Exception as e:
            print(e)

    def get(self, id):
        res = self.collection.query(
            expr=f'id == "{id}"',
            output_fields=["id", "type", "vector"],
            using=self.conn,
        )
        return res[0] if res else None

    def close(self):
        connections.disconnect(alias=self.conn)
        print("Milvus connection closed.")
