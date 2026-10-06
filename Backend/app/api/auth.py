import logging
from datetime import datetime, timedelta, timezone
from typing import Optional
from urllib.parse import urlencode
from uuid import uuid4

import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import (
    create_access_token,
    decode_access_token,
    generate_random_token,
    hash_password,
    hash_token,
    verify_password,
)
from app.models import OAuthAccount, PasswordResetToken, RefreshSession, Student
from app.schemas import (
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest,
    ResetPasswordRequest,
    StudentResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_student(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> Student:
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        student_id = decode_access_token(credentials.credentials)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Student not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return student


def set_refresh_cookie(response: Response, raw_refresh_token: str) -> None:
    max_age = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    response.set_cookie(
        key="refresh_token",
        value=raw_refresh_token,
        max_age=max_age,
        expires=max_age,
        httponly=True,
        samesite="lax",
        secure=False,  # Set to True in production HTTPS
        path="/",
    )


def create_refresh_session_record(db: Session, student_id: str) -> str:
    raw_token = generate_random_token()
    token_h = hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    session_record = RefreshSession(
        id=f"ref_{uuid4().hex[:12]}",
        student_id=student_id,
        token_hash=token_h,
        expires_at=expires_at,
        revoked=False,
    )
    db.add(session_record)
    db.commit()
    return raw_token


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    existing = db.query(Student).filter(Student.email == email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered. Please log in or use a different email.",
        )

    student = Student(
        id=f"stu_{uuid4().hex[:12]}",
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password),
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    access_token = create_access_token(student.id)
    raw_refresh_token = create_refresh_session_record(db, student.id)
    set_refresh_cookie(response, raw_refresh_token)

    return {
        "message": "Account created successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "student": student,
    }


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    student = db.query(Student).filter(Student.email == email).first()

    if not student or not student.password_hash or not verify_password(payload.password, student.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(student.id)
    raw_refresh_token = create_refresh_session_record(db, student.id)
    set_refresh_cookie(response, raw_refresh_token)

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "student": student,
    }


@router.post("/refresh", response_model=RefreshTokenResponse)
def refresh_token(
    request: Request,
    response: Response,
    payload: Optional[RefreshTokenRequest] = None,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    raw_token = request.cookies.get("refresh_token")
    if not raw_token and payload and payload.refresh_token:
        raw_token = payload.refresh_token.strip()
    if not raw_token and credentials and credentials.credentials:
        raw_token = credentials.credentials.strip()

    if not raw_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing. Please log in again.",
        )

    token_h = hash_token(raw_token)
    session_record = (
        db.query(RefreshSession)
        .filter(RefreshSession.token_hash == token_h, RefreshSession.revoked == False)
        .first()
    )

    now = datetime.now(timezone.utc)
    if not session_record or session_record.expires_at.replace(tzinfo=timezone.utc) < now:
        if session_record:
            session_record.revoked = True
            db.commit()
        response.delete_cookie(key="refresh_token", path="/")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token is expired or revoked. Please log in again.",
        )

    student = db.query(Student).filter(Student.id == session_record.student_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Student not found")

    session_record.revoked = True

    new_raw_refresh = create_refresh_session_record(db, student.id)
    set_refresh_cookie(response, new_raw_refresh)

    new_access_token = create_access_token(student.id)

    return {
        "access_token": new_access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


@router.post("/logout", response_model=MessageResponse)
def logout(
    request: Request,
    response: Response,
    payload: Optional[RefreshTokenRequest] = None,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    raw_token = request.cookies.get("refresh_token")
    if not raw_token and payload and payload.refresh_token:
        raw_token = payload.refresh_token.strip()

    if raw_token:
        token_h = hash_token(raw_token)
        session_record = db.query(RefreshSession).filter(RefreshSession.token_hash == token_h).first()
        if session_record:
            session_record.revoked = True
            db.commit()

    if credentials and credentials.credentials:
        try:
            student_id = decode_access_token(credentials.credentials)
            # Revoke all active sessions for this student on logout
            db.query(RefreshSession).filter(
                RefreshSession.student_id == student_id,
                RefreshSession.revoked == False,
            ).update({"revoked": True})
            db.commit()
        except Exception:
            pass

    response.delete_cookie(key="refresh_token", path="/")
    return {"message": "Logout successful"}


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    student = db.query(Student).filter(Student.email == email).first()

    if student:
        raw_reset_token = generate_random_token()
        token_h = hash_token(raw_reset_token)
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)

        reset_record = PasswordResetToken(
            id=f"rst_{uuid4().hex[:12]}",
            student_id=student.id,
            token_hash=token_h,
            expires_at=expires_at,
            used=False,
        )
        db.add(reset_record)
        db.commit()

        logger.info(
            f"Password reset requested for {email}. Reset token: {raw_reset_token}"
        )

    return {
        "message": "If an account exists for this email, a password reset link has been sent."
    }


@router.post("/reset-password", response_model=MessageResponse)
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    token_h = hash_token(payload.token.strip())
    reset_record = (
        db.query(PasswordResetToken)
        .filter(PasswordResetToken.token_hash == token_h, PasswordResetToken.used == False)
        .first()
    )

    now = datetime.now(timezone.utc)
    if not reset_record or reset_record.expires_at.replace(tzinfo=timezone.utc) < now:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password reset token is invalid, used, or expired.",
        )

    student = db.query(Student).filter(Student.id == reset_record.student_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found.")

    student.password_hash = hash_password(payload.new_password)
    reset_record.used = True

    # Revoke all existing sessions on password change
    db.query(RefreshSession).filter(
        RefreshSession.student_id == student.id,
        RefreshSession.revoked == False,
    ).update({"revoked": True})

    db.commit()

    return {
        "message": "Password reset successful. You can now log in with your new password."
    }


@router.get("/oauth/{provider}")
def oauth_start(provider: str, request: Request):
    provider = provider.lower().strip()
    if provider != "google":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"OAuth provider '{provider}' is not supported. Supported: google",
        )

    if not settings.GOOGLE_CLIENT_ID:
        # Graceful fallback when credentials are not configured yet
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/login?oauth_error=google_client_id_not_configured"
        )

    state = generate_random_token()
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "access_type": "offline",
        "prompt": "consent",
    }
    google_auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    return RedirectResponse(url=google_auth_url)


@router.get("/oauth/{provider}/callback")
async def oauth_callback(
    provider: str,
    code: Optional[str] = None,
    state: Optional[str] = None,
    error: Optional[str] = None,
    db: Session = Depends(get_db),
):
    provider = provider.lower().strip()
    if provider != "google":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"OAuth provider '{provider}' is not supported.",
        )

    if error or not code:
        err_msg = error or "Authorization code missing"
        return RedirectResponse(url=f"{settings.FRONTEND_URL}/login?oauth_error={err_msg}")

    # Exchange authorization code for Google access token
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient() as client:
        token_resp = await client.post(token_url, data=token_data)
        if token_resp.status_code != 200:
            logger.error(f"Google token exchange failed: {token_resp.text}")
            return RedirectResponse(
                url=f"{settings.FRONTEND_URL}/login?oauth_error=token_exchange_failed"
            )
        tokens = token_resp.json()
        google_access_token = tokens.get("access_token")

        # Fetch student profile from Google OpenID Connect
        userinfo_resp = await client.get(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {google_access_token}"},
        )
        if userinfo_resp.status_code != 200:
            logger.error(f"Google userinfo request failed: {userinfo_resp.text}")
            return RedirectResponse(
                url=f"{settings.FRONTEND_URL}/login?oauth_error=userinfo_failed"
            )
        userinfo = userinfo_resp.json()

    google_sub = userinfo.get("sub")
    email = userinfo.get("email", "").lower().strip()
    name = userinfo.get("name") or email.split("@")[0]

    if not google_sub or not email:
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/login?oauth_error=invalid_google_profile"
        )

    # Find existing OAuth account or existing student
    oauth_acc = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.provider == "google",
            OAuthAccount.provider_user_id == google_sub,
        )
        .first()
    )

    if oauth_acc:
        student = db.query(Student).filter(Student.id == oauth_acc.student_id).first()
    else:
        student = db.query(Student).filter(Student.email == email).first()
        if not student:
            student = Student(
                id=f"stu_{uuid4().hex[:12]}",
                name=name,
                email=email,
                password_hash=None,
            )
            db.add(student)
            db.commit()
            db.refresh(student)

        # Link OAuth Account
        oauth_acc = OAuthAccount(
            id=f"oa_{uuid4().hex[:12]}",
            student_id=student.id,
            provider="google",
            provider_user_id=google_sub,
        )
        db.add(oauth_acc)
        db.commit()

    # Generate session tokens
    access_token = create_access_token(student.id)
    raw_refresh = create_refresh_session_record(db, student.id)

    response = RedirectResponse(
        url=f"{settings.FRONTEND_URL}/dashboard?token={access_token}&auth=google"
    )
    set_refresh_cookie(response, raw_refresh)
    return response


@router.get("/me", response_model=StudentResponse)
def get_current_user_profile(current_student: Student = Depends(get_current_student)):
    return current_student

