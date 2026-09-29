from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.core.security import hash_password, verify_password, create_access_token, decode_access_token
from app.models import Student
from app.schemas import RegisterRequest, LoginRequest, StudentResponse, AuthResponse, ForgotPasswordRequest, ResetPasswordRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])
bearer = HTTPBearer()

@router.post("/register", response_model=StudentResponse, status_code=201)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.lower()
    if db.query(Student).filter(Student.email == email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    student = Student(
        id=f"stu_{uuid4().hex[:12]}",
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password)
    )
    db.add(student) 
    db.commit()
    db.refresh(student)
    return student

@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == payload.email.lower()).first()
    if not student or not student.password_hash or not verify_password(payload.password, student.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(student.id)
    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "student": student
    }

def get_current_student(
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
    db: Session = Depends(get_db)
):
    try:
        student_id = decode_access_token(credentials.credentials)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=401, detail="Student not found")
    return student

@router.post("/refresh")
def refresh(current_student: Student = Depends(get_current_student)):
    token = create_access_token(current_student.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@router.post("/logout")
def logout(current_student: Student = Depends(get_current_student)):
    return {"message": "Logout successful"}

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    # TODO: create short-lived single-use reset token and send email.
    return {"message": "If an account exists for this email, a password reset link has been sent."}

@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest):
    # TODO: verify the real reset token, then update password.
    raise HTTPException(status_code=501, detail="Password reset token service is not implemented yet")
