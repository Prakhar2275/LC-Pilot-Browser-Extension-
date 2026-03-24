from pydantic import BaseModel


class RoadmapRequest(BaseModel):

    title: str
    description: str


class CodeRequest(BaseModel):

    code: str