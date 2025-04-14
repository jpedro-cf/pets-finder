from database.database import VectorDatabase
from qdrant_client import QdrantClient, models
from qdrant_client.models import VectorParams, Distance, PointStruct


class QdrantDatabase(VectorDatabase):
    def __init__(self):
        self.client = QdrantClient("localhost", port=6333)
        self._setup()

    def search(self, collection, query, top_k, metadata):
        filters = (
            models.Filter(
                must=[
                    models.FieldCondition(
                        key="type",
                        match=models.MatchValue(
                            value=metadata["type"],
                        ),
                    ),
                ],
                must_not=models.FieldCondition(
                    key="id",
                    match=models.MatchValue(
                        value=metadata["id"] if "id" in metadata else "",
                    ),
                ),
            )
            if (metadata and "type" in metadata)
            else None
        )

        data = self.client.query_points(
            collection_name=collection,
            query=query,
            query_filter=filters,
            search_params=models.SearchParams(hnsw_ef=128, exact=False),
            limit=top_k,
        )
        res = []
        for point in data.points:
            res.append(point.id)
        return res

    def insert_data(self, collection, vector, metadata):
        self.client.upsert(
            collection_name=collection,
            points=[PointStruct(id=metadata["id"], vector=vector, payload=metadata)],
        )
        return

    def get_by_id(self, collection, id):
        data = self.client.retrieve(
            collection_name=collection,
            with_vectors=True,
            ids=[id],
        )[0]
        return {
            "id": data.id,
            "vector": data.vector,
            "type": data.payload["type"],
            "image": data.payload["image"],
        }

    def delete(self, collection, id):
        try:
            self.client.delete(
                collection_name=collection,
                points_selector=models.FilterSelector(
                    filter=models.Filter(
                        must=[
                            models.FieldCondition(
                                key="id",
                                match=models.MatchValue(value=id),
                            ),
                        ],
                    )
                ),
            )
            print(f"Item {id} deleted!")

        except Exception as e:
            print("Error deleting vector from DB: " + e)

    def _setup(self):
        if not self.client.collection_exists("pets_images"):
            self.client.create_collection(
                collection_name="pets_images",
                vectors_config=VectorParams(size=512, distance=Distance.COSINE),
            )
        if not self.client.collection_exists("pets_texts"):
            self.client.create_collection(
                collection_name="pets_texts",
                vectors_config=VectorParams(size=512, distance=Distance.COSINE),
            )
