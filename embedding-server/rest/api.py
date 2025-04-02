import io
from typing import Annotated, Optional
import uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, Form

from database.database import VectorDatabase
from embeddings.embedding_generator import EmbeddingGenerator
from PIL import Image


class Api:
    def __init__(self, generator: EmbeddingGenerator, db: VectorDatabase):
        self.generator = generator
        self.db = db
        self.app = FastAPI()

        self._setup_routes()

    def _setup_routes(self):
        @self.app.post("/similarity")
        async def similarity(
            text: Annotated[Optional[str], Form()],
            image: Optional[UploadFile] = None,
        ):
            if not text and not image:
                raise HTTPException(
                    status_code=400, detail="Either 'text' or 'image' must be provided."
                )

            data, data_type = text, "text"
            if image:
                data_type = "image"
                data = io.BytesIO(await image.read())
            vector = self.generator.process_embedding(data_type, data)

            res = self.db.search(vector, 6, {})
            return {"ids": res}

    def run(self):
        uvicorn.run(self.app, host="0.0.0.0", port=3333)
