"""
Database configuration for the AI Code Assistant backend.
Uses SQLAlchemy with SQLite for development.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database URL — file will be created in the backend/ directory
SQLALCHEMY_DATABASE_URL = "sqlite:///./codepilot.db"

# Create the SQLAlchemy engine
# check_same_thread=False is needed for SQLite to work with FastAPI's async model
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

# SessionLocal is a factory for creating database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our ORM models
Base = declarative_base()


def get_db():
    """
    Dependency that provides a database session to route handlers.
    Ensures the session is always closed after the request completes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Create all database tables. Called on app startup."""
    Base.metadata.create_all(bind=engine)
