from fastapi import FastAPI

from app.routes.ai_routes import router


app = FastAPI(
    title="LC Buddy Backend"
)

app.include_router(router)