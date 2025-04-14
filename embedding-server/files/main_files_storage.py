from files.files_storage import FilesStorage
from files.local import LocalFileStorage
from files.s3 import S3Client


class MainFilesStorage(FilesStorage):
    def __init__(self):
        self.options = {"s3": S3Client(), "local": LocalFileStorage()}

    def download_file(self, key):
        storage = self.options["local"]

        return storage.download_file(key)
