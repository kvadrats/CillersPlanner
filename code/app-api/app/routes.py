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


app.include_router(graphql.get_app(), prefix="/api")
