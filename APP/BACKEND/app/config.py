import os
from dotenv import load_dotenv

load_dotenv()

AI_API_KEY = os.getenv("AI_API_KEY")

AI_API_URL = os.getenv("AI_API_URL")

MODEL_NAME = os.getenv("MODEL_NAME")