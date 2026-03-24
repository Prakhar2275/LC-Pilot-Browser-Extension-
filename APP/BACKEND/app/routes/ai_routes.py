from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session


from app.schemas.ai_schema import RoadmapRequest, CodeRequest
from app.services.session_service import create_session, get_session
from app.prompts.prompts import (
    roadmap_prompt,
    analyze_prompt,
    next_step_prompt,
    test_prompt
)

from app.services.ai_service import call_ai
from app.database import get_db

router = APIRouter()


@router.post("/generate-roadmap")

def generate_roadmap(data: RoadmapRequest, db: Session = Depends(get_db)):

    prompt = roadmap_prompt(
        data.title,
        data.description
    )

    roadmap = call_ai(prompt)

    session = create_session(
        db,
        data.title,
        data.description,
        roadmap
    )

    return {
        "session_id": session.id,
        "roadmap": roadmap
    }

@router.post("/analyze-code")

def analyze_code(data: CodeRequest):

    prompt = analyze_prompt(data.code)

    result = call_ai(prompt)

    return {"message": result}


@router.post("/next-step")

def next_step(data: CodeRequest, db: Session = Depends(get_db)):

    session = get_session(db, data.session_id)

    prompt = f"""
Problem:
{session.problem_title}

Roadmap:
{session.roadmap}

User code:
{data.code}

Provide next hint.
"""

    result = call_ai(prompt)

    return {"message": result}


@router.post("/test-code")

def test_code(data: CodeRequest):

    prompt = test_prompt(data.code)

    result = call_ai(prompt)

    return {"message": result}