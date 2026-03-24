import requests

from app.config import AI_API_KEY, AI_API_URL, MODEL_NAME

from app.prompts.prompts import SYSTEM_PROMPT


def call_ai(prompt):

    headers = {
        "Authorization": f"Bearer {AI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(
        AI_API_URL,
        headers=headers,
        json=payload
    )

    data = response.json()

    return data["choices"][0]["message"]["content"]