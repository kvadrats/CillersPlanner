import logging

from fastapi import FastAPI
from pydantic import BaseModel

from . import graphql, init
from .db import create_message, list_messages
from .external_requests.open_ai import call_open_ai

logger = logging.getLogger(__name__)

#### Routes ####

app = FastAPI()


@app.on_event("startup")
async def reinit():
    init.init()


@app.get("/chat/{user_name}")
async def get_chat_history(user_name: str):
    return {}


class Message(BaseModel):
    content: str


@app.post("/chat/{user_name}")
async def process_user_message(user_name: str, message: Message):
    create_message("user", message.content, user_name)
    messages = list_messages(user_name)
    messages = [{"role": m.role, "content": m.content} for m in messages]
    response = call_open_ai(message.content, messages)
    create_message(response["role"], response["content"], user_name)
    return response
