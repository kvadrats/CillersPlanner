import logging

from openai import OpenAI
from openai.types.chat import ChatCompletion

from app.env import get_open_ai_api_token

log = logging.getLogger(__name__)


def call_open_ai(message: str, previous_messages: list = None) -> dict:
    client = OpenAI(api_key=get_open_ai_api_token())
    messages = [] if previous_messages is None else previous_messages
    messages.append({"role": "user", "content": message})
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    validate_open_ai_response(response)
    return {"role": response.choices[0].message.role,
            "content": response.choices[0].message.content}


def validate_open_ai_response(response: ChatCompletion) -> None:
    finish_reason = response.choices[0].finish_reason
    if finish_reason.lower() != "stop":
        logging.error(
            f"Received message from OpenAI may be incomplete, finish reason was {finish_reason}\n"
            f"Full msg:{str(response)}")

# if __name__ == '__main__':
#     result = call_open_ai("What is the meaning of life?")
#     print(result)
