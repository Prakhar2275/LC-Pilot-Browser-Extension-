# /*
#  * LC Pilot — session_model.py
#  * stores data for eachh prolem solved on the LC.
#  * session_id is returned to the frontend and used in follow-up calls.
# if any followup calls occour it will proide memoized answer
#  */

from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    problem_title = Column(String, nullable=False)
    problem_description = Column(Text, nullable=False)
    roadmap = Column(Text, nullable=False)
