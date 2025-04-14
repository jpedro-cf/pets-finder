from io import BytesIO
import os

import requests
from files.files_storage import FilesStorage


class LocalFileStorage(FilesStorage):
    def __init__(self):
        self.url = os.environ.get("BASE_IMAGES_URL")

    def download_file(self, key) -> BytesIO:
        response = requests.get(f"{self.url}/{key}")

        if response.status_code == 200:
            return BytesIO(response.content)

        raise Exception(f"Erro ao buscar a imagem: {response.status_code}")
