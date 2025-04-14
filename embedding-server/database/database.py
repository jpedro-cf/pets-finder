from abc import ABC, abstractmethod


class VectorDatabase(ABC):
    @abstractmethod
    def insert_data(self, collection, vector, metadata):
        pass

    @abstractmethod
    def search(self, collection, query, top_k, metadata):
        pass

    @abstractmethod
    def get_by_id(self, collection, id):
        pass

    @abstractmethod
    def delete(self, collection, id):
        pass
