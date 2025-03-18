from io import BytesIO
import boto3
import os


class S3Client:
    def __init__(self):
        self.client = boto3.client(
            "s3",
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
            aws_secret_access_key=os.environ.get("AWS_SECRET_KEY"),
            region_name=os.environ.get("AWS_REGION"),
        )

    def download_image(self, key) -> BytesIO:
        bucket_name = os.environ["AWS_S3_BUCKET"]

        file_stream = BytesIO()
        self.client.download_fileobj(bucket_name, key, file_stream)
        file_stream.seek(0)

        return file_stream
