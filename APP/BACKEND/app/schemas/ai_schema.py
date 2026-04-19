# /*
#  * LC Buddy — ai_schema.py
#  * pydantic request,response models for all api endpoints.
#  */

from pydantic import BaseModel
from typing import Optional


class RoadmapRequest(BaseModel):
    """Sent by the extension when a problem page is opened."""
    title: str
    description: str


class CodeRequest(BaseModel):
    """Sent when the user triggers Analyze / Next Step / Test actions."""
    code: str
    session_id: Optional[int] = None  # required for /next-step


class AIResponse(BaseModel):
    message: str


class RoadmapResponse(BaseModel):
    session_id: int
    roadmap: str
