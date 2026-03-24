from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Session(Base):

    __tablename__ = "message_sessions"

    id = Column(Integer, primary_key=True, index=True)

    problem_title = Column(String)

    problem_description = Column(Text)

    roadmap = Column(Text)