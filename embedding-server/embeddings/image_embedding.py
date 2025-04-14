from PIL import Image
import torch

from embeddings.embeddings import DataEmbedding


class ImageEmbedding(DataEmbedding):
    def __init__(self, model, processor, device):
        self.model, self.processor, self.device = model, processor, device

    def process_embedding(self, type, data):
        image = Image.open(data)

        processed = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            image_features = self.model.get_image_features(**processed)

        return image_features.cpu().squeeze(0).numpy().tolist()
