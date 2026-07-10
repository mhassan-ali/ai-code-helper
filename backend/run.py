"""
Quick-start script to run the FastAPI backend.
Binds to 127.0.0.1:8000 so the frontend can connect.

Usage (from the backend/ directory):
    python run.py
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
