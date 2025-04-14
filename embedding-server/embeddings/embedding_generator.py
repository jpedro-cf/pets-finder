from embeddings.embeddings import DataEmbedding
from embeddings.image_embedding import ImageEmbedding
from embeddings.text_embedding import TextEmbedding


class EmbeddingGenerator(DataEmbedding):
    def __init__(self, model, processor, device):
        self.options = {
            "image": ImageEmbedding(model, processor, device),
            "text": TextEmbedding(model, processor, device),
        }

    def process_embedding(self, type, data):
        if type not in self.options:
            raise Exception("Unsupported data.")

        generator: DataEmbedding = self.options[type]

        return generator.process_embedding(type, data)
