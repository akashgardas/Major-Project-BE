from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "personalized-learning-platform",
        "version": "1.0.0"
    }
