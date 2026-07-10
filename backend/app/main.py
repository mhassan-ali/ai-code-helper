"""
FastAPI application entry point for the CodePilot AI backend.

Run from the backend/ directory:
    python main.py
  or:
    uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.models.user import User  # MUST import before init_db so the table is created
from app.routes.auth import router as auth_router
from app.routes.ai import router as ai_router


# ─── Lifespan ──────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(application: FastAPI):
    """Runs on server startup and shutdown."""
    # ── Startup ──
    try:
        init_db()
        print("  [OK] Database initialized - tables ready")
    except Exception as e:
        print(f"  [ERROR] Database init failed: {e}")
        raise

    print("")
    print("  ==============================================")
    print("  * CodePilot AI Backend - RUNNING")
    print("  *")
    print("  * API:  http://127.0.0.1:8000")
    print("  * Docs: http://127.0.0.1:8000/docs")
    print("  *")
    print("  * Endpoints:")
    print("  *   POST /auth/signup")
    print("  *   POST /auth/login")
    print("  *   GET  /auth/me")
    print("  *   POST /ai/fix")
    print("  *   POST /ai/explain")
    print("  *   POST /ai/optimize")
    print("  *   GET  /          (health check)")
    print("  ==============================================")
    print("")

    yield

    # ── Shutdown ──
    print("  [INFO] Server shutting down")


# ─── Create the FastAPI app ────────────────────────────────────────────────────

app = FastAPI(
    title="CodePilot AI — Authentication API",
    description="Backend authentication service for the AI Code Assistant",
    version="1.0.0",
    lifespan=lifespan,
)


# Allowed origins for local development (including Vite default and fallback ports)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


# ─── Request Logging (debug helper) ───────────────────────────────────────────

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log every incoming request — useful for debugging connection issues."""
    print(f"  -> {request.method} {request.url.path}")
    try:
        response: Response = await call_next(request)
        print(f"  <- {request.method} {request.url.path} - status: {response.status_code}")
        return response
    except Exception as e:
        print(f"  [ERROR] {request.method} {request.url.path} - details: {e}")
        raise


# ─── Register Routes ───────────────────────────────────────────────────────────
# Router has prefix="/auth" so routes become:
#   POST /auth/signup
#   POST /auth/login
#   GET  /auth/me

app.include_router(auth_router)
app.include_router(ai_router)


# ─── Health Check ──────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "message": "API is running",
        "service": "CodePilot AI — Auth Service",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
