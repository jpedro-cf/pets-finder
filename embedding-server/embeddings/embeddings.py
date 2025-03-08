from abc import ABC, abstractmethod


class DataEmbedding(ABC):

    @abstractmethod
    def process_embedding(self, data):
        pass
