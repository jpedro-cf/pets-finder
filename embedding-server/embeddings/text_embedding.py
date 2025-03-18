import torch

from embeddings.embeddings import DataEmbedding


class TextEmbedding(DataEmbedding):
    def __init__(self, clip, model, preprocess):
        self.clip, self.model, self.preprocess = clip, model, preprocess

    def process_embedding(self, type, data):
        text_input = self.clip.tokenize([data]).to("cpu")

        with torch.no_grad():
            text_features = self.model.encode_text(text_input)

        text_features /= text_features.norm(dim=-1, keepdim=True)

        return text_features.cpu().numpy().flatten().tolist()
