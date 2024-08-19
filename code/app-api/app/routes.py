from fastapi import FastAPI
from pydantic import BaseModel
import logging

from . import graphql, init

logger = logging.getLogger(__name__)

#### Routes ####

app = FastAPI()

@app.on_event("startup")
async def reinit():
    init.init()

app.include_router(graphql.get_app(), prefix="/api")

class Message(BaseModel):
    content: str

@app.post("http://app-api:4000/chat/user_name")
async def process_user_message(user_name: str, message: Message):
    return {"role": "assistant", "content": "Dummy response"}