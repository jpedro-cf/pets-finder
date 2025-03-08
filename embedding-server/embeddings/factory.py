from embeddings.embeddings import DataEmbedding
from embeddings.image_embedding import ImageEmbedding
from embeddings.text_embedding import TextEmbedding


class EmbeddingsFactory:
    def __init__(self, embeddings):
        self.embeddors = {}
        for item in embeddings:
            key, instance = item
            self.embeddors[key] = instance

    def get_data_embedding(self, type: str) -> DataEmbedding:
        if type not in self.embeddors:
            raise Exception("Unsupported embedding type.")

        return self.embeddors[type]
