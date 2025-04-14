from abc import ABC, abstractmethod
from io import BytesIO


class FilesStorage(ABC):
    @abstractmethod
    def download_file(self, key) -> BytesIO:
        pass
