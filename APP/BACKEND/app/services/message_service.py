# /*
#  * LC Buddy — message_service.py
#  * each interaction with the model is taken as a service request to the model
#  */

from sqlalchemy.orm import Session
from app.models.message_model import Message


def save_message(db: Session, session_id: int, action: str, user_code: str, ai_response: str):
    msg = Message(
        session_id=session_id,
        action=action,
        user_code=user_code,
        ai_response=ai_response
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
