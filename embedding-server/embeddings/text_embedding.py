import torch

from embeddings.embeddings import DataEmbedding


class TextEmbedding(DataEmbedding):
    def __init__(self, model, processor, device):
        self.model, self.processor, self.device = model, processor, device

    def process_embedding(self, type, data):
        with torch.no_grad():
            processed_text = self.processor(text=data, return_tensors="pt").to(
                self.device
            )
            text_features = self.model.get_text_features(**processed_text)
        return text_features.cpu().squeeze(0).numpy().tolist()
