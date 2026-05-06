from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from loguru import logger
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="HumanSpeak API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("HUMANSPEAK_API_KEY")

def verify_key(x_api_key: str = None):
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(401, "Invalid or missing API key")
    return x_api_key

@app.get("/")
async def root():
    return {"message": "HumanSpeak Backend Alive 🚀"}

# TODO: AI endpoints etc.