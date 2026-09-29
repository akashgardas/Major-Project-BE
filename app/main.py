from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.auth import router as auth_router

app = FastAPI(title="Personalized Agentic Learning Platform API", version="1.0.0")

app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Personalized Learning Platform API", "docs": "/docs"}
