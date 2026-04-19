# /*
#  * LC Pilot — message_model.py
#  * stores each interaction with the LLM for all three steps and memoization for the future usage.



from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    action = Column(String, nullable=False)  
    user_code = Column(Text, nullable=True)
    ai_response = Column(Text, nullable=False)
