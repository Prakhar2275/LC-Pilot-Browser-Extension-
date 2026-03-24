from sqlalchemy.orm import Session

from app.models.session_model import Session as SessionModel


def create_session(db: Session, title, description, roadmap):

    session = SessionModel(
        problem_title=title,
        problem_description=description,
        roadmap=roadmap
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


def get_session(db: Session, session_id):

    return db.query(SessionModel).filter(
        SessionModel.id == session_id
    ).first()