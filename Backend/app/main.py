from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.auth import router as auth_router
from app.api.health import router as health_router
from app.core.config import settings
from app.core.database import Base, engine
import app.models  # ensure models are registered


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Personalized Agentic Learning Platform API",
    description="Authentication and Agentic Learning API for LearnSphere",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS configuration
origins: List[str] = []
if isinstance(settings.CORS_ORIGINS, list):
    origins.extend(settings.CORS_ORIGINS)
else:
    origins.append(str(settings.CORS_ORIGINS))

if settings.FRONTEND_URL and settings.FRONTEND_URL not in origins:
    origins.append(settings.FRONTEND_URL)

# Common development frontend ports
for default_origin in ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"]:
    if default_origin not in origins:
        origins.append(default_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    code_map = {
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
        422: "UNPROCESSABLE_ENTITY",
        500: "INTERNAL_SERVER_ERROR",
    }
    error_code = code_map.get(exc.status_code, "ERROR")
    message = str(exc.detail) if exc.detail else "An error occurred"

    return JSONResponse(
        status_code=exc.status_code,
        headers=getattr(exc, "headers", None),
        content={
            "detail": message,
            "error": {
                "code": error_code,
                "message": message,
            },
        },
    )


from fastapi.encoders import jsonable_encoder

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    first_msg = errors[0].get("msg", "Validation error") if errors else "Validation error"
    field = errors[0].get("loc", ["unknown"])[-1] if errors else "field"

    message = f"{field}: {first_msg}" if field != "unknown" else first_msg

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": message,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": message,
                "details": jsonable_encoder(errors),
            },
        },
    )


app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": "Personalized Learning Platform API",
        "health": "/api/v1/health",
        "docs": "/docs",
        "redoc": "/redoc",
    }

