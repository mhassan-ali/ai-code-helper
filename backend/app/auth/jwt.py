"""
JWT token generation and verification.
Uses python-jose for encoding/decoding JWTs.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt

# ─── Configuration ────────────────────────────────────────────────────────────
# In production, load these from environment variables!
SECRET_KEY = "codepilot-super-secret-key-change-in-production-2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours
REFRESH_TOKEN_EXPIRE_DAYS = 30         # 30 days for "remember me"


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
    remember_me: bool = False,
) -> str:
    """
    Create a signed JWT access token.
    
    Args:
        data: The payload to encode (typically {"sub": user_email}).
        expires_delta: Custom expiration time. If None, uses default.
        remember_me: If True, token lasts 30 days instead of 24 hours.
    
    Returns:
        The encoded JWT string.
    """
    to_encode = data.copy()

    # Set expiration time
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    elif remember_me:
        expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> Optional[dict]:
    """
    Verify and decode a JWT token.
    
    Args:
        token: The JWT string to verify.
    
    Returns:
        The decoded payload dict if valid, None otherwise.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
