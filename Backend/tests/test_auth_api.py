import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import Base, engine, SessionLocal
from app.models import Student, PasswordResetToken

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

@pytest.fixture
def client():
    return TestClient(app)

def test_health_check(client):
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["service"] == "personalized-learning-platform"

def test_weak_password_registration(client):
    res = client.post("/api/v1/auth/register", json={
        "name": "Alex Student",
        "email": "alex@example.edu",
        "password": "weakpassword"
    })
    assert res.status_code == 422
    assert "error" in res.json()

def test_valid_registration_and_duplicate(client):
    payload = {
        "name": "Alex Student",
        "email": "alex@example.edu",
        "password": "SecurePassword123!"
    }
    # First registration
    res = client.post("/api/v1/auth/register", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    assert data["student"]["email"] == "alex@example.edu"
    assert "refresh_token" in res.cookies

    # Duplicate registration
    dup_res = client.post("/api/v1/auth/register", json=payload)
    assert dup_res.status_code == 409
    assert "Email is already registered" in dup_res.json()["detail"]

def test_login_invalid_and_valid(client):
    # Invalid password
    bad_res = client.post("/api/v1/auth/login", json={
        "email": "alex@example.edu",
        "password": "WrongPassword999!"
    })
    assert bad_res.status_code == 401

    # Valid password
    good_res = client.post("/api/v1/auth/login", json={
        "email": "alex@example.edu",
        "password": "SecurePassword123!"
    })
    assert good_res.status_code == 200
    data = good_res.json()
    assert "access_token" in data
    assert data["student"]["name"] == "Alex Student"
    assert "refresh_token" in good_res.cookies

def test_authenticated_me_route(client):
    # Login to get token
    login_res = client.post("/api/v1/auth/login", json={
        "email": "alex@example.edu",
        "password": "SecurePassword123!"
    })
    token = login_res.json()["access_token"]

    # Valid access token
    me_res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["email"] == "alex@example.edu"

    # Missing token
    unauth_res = client.get("/api/v1/auth/me")
    assert unauth_res.status_code == 401

    # Invalid token
    bad_token_res = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer invalid.token.value"})
    assert bad_token_res.status_code == 401

def test_refresh_token_flow(client):
    login_res = client.post("/api/v1/auth/login", json={
        "email": "alex@example.edu",
        "password": "SecurePassword123!"
    })
    cookie = login_res.cookies.get("refresh_token")
    client.cookies.set("refresh_token", cookie)

    ref_res = client.post("/api/v1/auth/refresh")
    assert ref_res.status_code == 200
    assert "access_token" in ref_res.json()

def test_forgot_and_reset_password(client):
    # Request forgot password
    fp_res = client.post("/api/v1/auth/forgot-password", json={"email": "alex@example.edu"})
    assert fp_res.status_code == 200

    # Retrieve reset token from database
    db = SessionLocal()
    student = db.query(Student).filter(Student.email == "alex@example.edu").first()
    reset_entry = db.query(PasswordResetToken).filter(PasswordResetToken.student_id == student.id).first()
    assert reset_entry is not None

    # Invalid token
    bad_reset = client.post("/api/v1/auth/reset-password", json={
        "token": "invalid-token",
        "new_password": "BrandNewPassword999!"
    })
    assert bad_reset.status_code == 400
    db.close()

def test_logout(client):
    login_res = client.post("/api/v1/auth/login", json={
        "email": "alex@example.edu",
        "password": "SecurePassword123!"
    })
    token = login_res.json()["access_token"]
    cookie = login_res.cookies.get("refresh_token")
    client.cookies.set("refresh_token", cookie)

    logout_res = client.post("/api/v1/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert logout_res.status_code == 200
    assert logout_res.json()["message"] == "Logout successful"
