from PIL import Image
import torch

from embeddings.embeddings import DataEmbedding


class ImageEmbedding(DataEmbedding):
    def __init__(self, clip, model, preprocess):
        self.clip, self.model, self.preprocess = clip, model, preprocess

    def process_embedding(self, type, data):
        image = Image.open(data)
        image_input = self.preprocess(image).unsqueeze(0).to("cpu")

        with torch.no_grad():
            image_features = self.model.encode_image(image_input)

        image_features /= image_features.norm(dim=-1, keepdim=True)
        return image_features.cpu().numpy().flatten().tolist()
