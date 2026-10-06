# Personalized Agentic Learning Platform — Authentication Backend

FastAPI-powered authentication service integrating securely with the React + Vite frontend for LearnSphere.

## Features
- **Argon2 Password Hashing**: State-of-the-art password security (`pwdlib[argon2]`).
- **JWT Authentication**: Short-lived access tokens with cryptographic signatures (`python-jose`).
- **Rotating Refresh Sessions**: Database-tracked refresh sessions with HTTP-only secure cookies and session revocation.
- **Google OAuth 2.0 / OpenID Connect**: Secure authorization flow, code exchange, profile validation, and account linking.
- **Password Reset**: Cryptographically secure, single-use, short-lived reset tokens with session invalidation.
- **CORS Configured**: Pre-configured for Vite (`http://localhost:5173`) and custom origins with credentials support.
- **SQLAlchemy ORM**: Full support for PostgreSQL with SQLite fallback for offline development.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/health` | Service health status check | No |
| `POST` | `/api/v1/auth/register` | Register new student account | No |
| `POST` | `/api/v1/auth/login` | Student login (returns JWT & sets refresh cookie) | No |
| `POST` | `/api/v1/auth/refresh` | Rotate and issue new access token | Cookie / Bearer |
| `POST` | `/api/v1/auth/logout` | Revoke active refresh session & clear cookie | Bearer / Cookie |
| `GET` | `/api/v1/auth/me` | Fetch authenticated student profile | Bearer |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset token | No |
| `POST` | `/api/v1/auth/reset-password` | Reset password using valid single-use token | No |
| `GET` | `/api/v1/auth/oauth/google` | Initiate Google OAuth 2.0 login | No |
| `GET` | `/api/v1/auth/oauth/google/callback` | Google OAuth redirect callback | No |

---

## Getting Started

### 1. Prerequisites
- Python 3.10+ (tested on Python 3.13)
- PostgreSQL (or local SQLite for development)

### 2. Environment Setup
```bash
cd Backend
copy .env.example .env
```
Edit `.env` to configure your PostgreSQL credentials or use the default SQLite setup.

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server
```bash
uvicorn app.main:app --reload --port 8000
```
- Interactive API Docs (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)
- Alternative Docs (ReDoc): [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 5. Run Automated Tests
```bash
pytest -v
```

