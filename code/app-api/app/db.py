import datetime
import uuid

import strawberry
from . import couchbase as cb, env


@strawberry.type
class Message:
    id = str
    role: str
    content: str
    chat_user: str


@strawberry.type
class Preference:
    chat_user: str
    time_from: datetime.time
    time_to: datetime.time
    day_of_the_week: str
    prefer_to_work: bool


@strawberry.type
class WorkSchedule:
    chat_user: str
    date: datetime.date
    time_from: datetime.time
    time_to: datetime.time


def create_message(role: str, content: str, chat_user: str) -> Message:
    id = str(uuid.uuid1())
    cb.insert(env.get_couchbase_conf(),
              cb.DocSpec(bucket=env.get_couchbase_bucket(),
                         collection='messages',
                         key=id,
                         data={'role': role,
                               'content': content,
                               'chat_user': chat_user})
              )
    return Message(id=id, role=role, content=content, chat_user=chat_user)


#
def get_message(id: str) -> Message | None:
    if doc := cb.get(env.get_couchbase_conf(),
                     cb.DocRef(bucket=env.get_couchbase_bucket(),
                               collection='messages',
                               key=id)):
        return Message(id=id, role=doc['role'], content=doc['content'], chat_user=doc['chat_user'])


def list_messages(chat_user) -> list[Message]:
    result = cb.exec(
        env.get_couchbase_conf(),
        f"SELECT role, content, chat_user, META().id "
        f"FROM {env.get_couchbase_bucket()}._default.messages msgs "
        f"WHERE convos.chat_user = '{chat_user}'"
    )
    return [Message(**r) for r in result]
