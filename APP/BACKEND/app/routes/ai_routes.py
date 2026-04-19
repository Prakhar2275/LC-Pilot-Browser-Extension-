# /*
#  * LC Pilot — ai_routes.py


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.ai_schema import RoadmapRequest, CodeRequest, AIResponse, RoadmapResponse
from app.services.session_service import create_session, get_session
from app.services.message_service import save_message
from app.prompts.prompts import roadmap_prompt, analyze_prompt, next_step_prompt, test_prompt
from app.services.ai_service import call_ai
from app.database import get_db

router = APIRouter(prefix="/api", tags=["LC Buddy"])


@router.post("/generate-roadmap", response_model=RoadmapResponse)
def generate_roadmap(data: RoadmapRequest, db: Session = Depends(get_db)):
    """
    Called when the extension detects a LeetCode problem page.
    Generates a step-by-step roadmap and creates a session.
    """
    prompt = roadmap_prompt(data.title, data.description)
    roadmap = call_ai(prompt)

    session = create_session(db, data.title, data.description, roadmap)

    return RoadmapResponse(session_id=session.id, roadmap=roadmap)


@router.post("/analyze-code", response_model=AIResponse)
def analyze_code(data: CodeRequest, db: Session = Depends(get_db)):
    """
    Analyzes the user's current code for patterns, complexity, and logic issues.
    session_id is optional but recommended for history tracking.
    """
    prompt = analyze_prompt(data.code)
    result = call_ai(prompt)

    if data.session_id:
        save_message(db, data.session_id, "analyze", data.code, result)

    return AIResponse(message=result)


@router.post("/next-step", response_model=AIResponse)
def next_step(data: CodeRequest, db: Session = Depends(get_db)):
    """
    Provides the next logical hint based on the roadmap and current code.
    Requires session_id so we can load the problem context.
    """
    if not data.session_id:
        raise HTTPException(status_code=400, detail="session_id is required for /next-step")

    session = get_session(db, data.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    prompt = next_step_prompt(session.problem_title, session.roadmap, data.code)
    result = call_ai(prompt)

    save_message(db, data.session_id, "next_step", data.code, result)

    return AIResponse(message=result)


@router.post("/test-code", response_model=AIResponse)
def test_code(data: CodeRequest, db: Session = Depends(get_db)):
    
    prompt = test_prompt(data.code)
    result = call_ai(prompt)

    if data.session_id:
        save_message(db, data.session_id, "test", data.code, result)

    return AIResponse(message=result)
