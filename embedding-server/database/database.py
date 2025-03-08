from abc import ABC, abstractmethod


class VectorDatabase(ABC):
    @abstractmethod
    def insert_data(self, data):
        pass

    @abstractmethod
    def search(self, query, top_k):
        pass
