# /*
#  * LC Pilot — main.py


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.ai_routes import router

from app.models import session_model, message_model  # noqa: F401

app = FastAPI(title="LC Buddy Backend", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)


@app.get("/health")
def health():
    return {"status": "LC Buddy backend is running"}
