"""
Authentication routes for the AI Code Assistant.
Handles signup, login, and fetching the current user.
"""

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr, field_validator
from sqlalchemy.orm import Session

from app.auth.utils import hash_password, verify_password
from app.auth.jwt import create_access_token, verify_token
from app.database import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    """Request body for user signup."""
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one number")
        return v


class LoginRequest(BaseModel):
    """Request body for user login."""
    email: EmailStr
    password: str
    remember_me: bool = False


class AuthResponse(BaseModel):
    """Response body for successful auth operations."""
    success: bool
    message: str
    token: str | None = None
    user: dict | None = None


class UserResponse(BaseModel):
    """Response body for user data."""
    id: int
    email: str
    created_at: datetime


# ─── Auth Dependency ──────────────────────────────────────────────────────────
# Extracts and validates the JWT token from the Authorization header.

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    """
    FastAPI dependency that extracts and validates the JWT token
    from the Authorization header, then returns the authenticated user.
    
    Usage in a route:
        @router.get("/protected")
        def protected_route(user: User = Depends(get_current_user)):
            return {"email": user.email}
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]

    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


# ─── Route: POST /auth/signup ─────────────────────────────────────────────────

@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """
    Create a new user account.
    
    - Validates the email is not already registered
    - Hashes the password with bcrypt (12 rounds)
    - Stores the user in the database
    - Returns a JWT token for immediate login
    """
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    hashed_pw = hash_password(request.password)
    new_user = User(
        email=request.email,
        password_hash=hashed_pw,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(data={"sub": new_user.email})

    return AuthResponse(
        success=True,
        message="Account created successfully",
        token=token,
        user={
            "id": new_user.id,
            "email": new_user.email,
            "created_at": new_user.created_at.isoformat(),
        },
    )


# ─── Route: POST /auth/login ──────────────────────────────────────────────────

@router.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate an existing user.
    
    - Verifies email exists and password matches
    - Generates a JWT token with optional extended expiration (remember me)
    - Returns the token and user info
    """
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(
        data={"sub": user.email},
        remember_me=request.remember_me,
    )

    return AuthResponse(
        success=True,
        message="Login successful",
        token=token,
        user={
            "id": user.id,
            "email": user.email,
            "created_at": user.created_at.isoformat(),
        },
    )


# ─── Route: GET /auth/me (Protected) ──────────────────────────────────────────

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(user: User = Depends(get_current_user)):
    """
    Get the currently authenticated user's profile.
    Requires a valid JWT token in the Authorization header:
        Authorization: Bearer <token>
    """
    return UserResponse(
        id=user.id,
        email=user.email,
        created_at=user.created_at,
    )
