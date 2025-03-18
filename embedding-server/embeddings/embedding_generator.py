from embeddings.embeddings import DataEmbedding
from embeddings.image_embedding import ImageEmbedding
from embeddings.text_embedding import TextEmbedding


class EmbeddingGenerator(DataEmbedding):
    def __init__(self, clip, model, preprocess):
        self.clip, self.model, self.preprocess = clip, model, preprocess
        self.options = {
            "image": ImageEmbedding(self.clip, self.model, self.preprocess),
            "text": TextEmbedding(self.clip, self.model, self.preprocess),
        }

    def process_embedding(self, type, data):
        if type not in self.options:
            return

        generator: DataEmbedding = self.options[type]

        return generator.process_embedding(type, data)
