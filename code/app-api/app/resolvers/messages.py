import asyncio
import logging
from typing import AsyncGenerator, List

import strawberry

from ..auth import IsAuthenticated
from ..db import create_message, list_messages, UserMessage
from ..external_requests.open_ai import call_open_ai

logger = logging.getLogger(__name__)


@strawberry.input
class MessageCreateInput:
    content: str
    user_name: str


def process_user_message(user_name: str, content: str):
    create_message("user", content, user_name)
    messages = list_messages(user_name)
    messages = [{"role": m.role, "content": m.content} for m in messages]
    response = call_open_ai(content, messages)
    create_message(response["role"], response["content"], user_name)
    return response


@strawberry.type
class Query:
    @strawberry.field
    def messages(self, user_name: str) -> List[UserMessage]:
        logger.info(f"Querying messages for username: {user_name}")
        return list_messages(user_name)


@strawberry.type
class Mutation:
    @strawberry.field(permission_classes=[IsAuthenticated])
    async def message_create(self, messages: List[MessageCreateInput]) -> List[UserMessage]:
        created_items = []
        for message in messages:
            logger.info(f"Mutating message: {message}")
            process_user_message(message.user_name, message.content)
        return created_items


@strawberry.type
class Subscription:
    @strawberry.subscription(permission_classes=[IsAuthenticated])
    async def items_created(self, info: strawberry.types.Info, user_name: str) -> AsyncGenerator[UserMessage, None]:
        seen = set(p.id for p in list_messages(user_name))
        while True:
            for p in list_messages(user_name):
                if p.id not in seen:
                    seen.add(p.id)
                    yield p
            await asyncio.sleep(0.5)
