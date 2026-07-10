"""
Password hashing and verification utilities.
Uses bcrypt for secure password storage.
"""

import bcrypt


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using bcrypt.
    
    Args:
        password: The plain-text password to hash.
    
    Returns:
        The bcrypt-hashed password as a UTF-8 string.
    """
    # Convert password to bytes, generate salt, and hash
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt(rounds=12)  # 12 rounds = good balance of security & speed
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against a bcrypt hash.
    
    Args:
        plain_password: The password the user submitted.
        hashed_password: The stored bcrypt hash.
    
    Returns:
        True if the password matches, False otherwise.
    """
    try:
        password_bytes = plain_password.encode("utf-8")
        hash_bytes = hashed_password.encode("utf-8")
        return bcrypt.checkpw(password_bytes, hash_bytes)
    except Exception:
        return False
