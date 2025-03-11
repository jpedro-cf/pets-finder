from abc import ABC, abstractmethod


class VectorDatabase(ABC):
    @abstractmethod
    def insert_data(self, vector, metadata):
        pass

    @abstractmethod
    def search(self, query, top_k, metadata):
        pass

    @abstractmethod
    def get(self, id):
        pass
