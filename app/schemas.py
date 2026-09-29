from pydantic import BaseModel, EmailStr, Field

class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class StudentResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    model_config = {"from_attributes": True}

class AuthResponse(BaseModel):
    message: str
    access_token: str
    token_type: str
    expires_in: int
    student: StudentResponse

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8, max_length=128)
