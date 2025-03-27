from io import BytesIO
import os
from google import genai
from google.genai import types
from PIL import Image


class ImageProcessor:
    def __init__(self):
        self.client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

    def describe_image(self, image_bytes: BytesIO) -> str:
        try:
            img = Image.open(image_bytes)
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    "Gere um texto incluindo apenas as características físicas deste animal de estimação como a cor da pelagem, raça, e porte, de forma simples, usando apenas 3-4 frases.\n"
                    "Não responda minha pergunta com introduções como 'Aqui está' ou 'Isto é' — apenas a descrição em si.",
                    img,
                ],
            )

            return response.text
        except Exception as e:
            print(e)
            return ""
