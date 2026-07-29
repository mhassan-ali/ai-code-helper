# CodePilot AI — Backend Setup

## Quick Start

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate   # macOS/Linux
# venv\Scripts\activate    # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the server (binds to 127.0.0.1:8000)
python run.py
```

The API will be available at **http://127.0.0.1:8000**

Interactive docs at **http://127.0.0.1:8000/docs**

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Create a new account | ❌ |
| POST | `/auth/login` | Sign in and get JWT | ❌ |
| GET | `/auth/me` | Get current user profile | ✅ |
| GET | `/` | Health check | ❌ |
| GET | `/health` | Health check | ❌ |

---

## Testing with curl

```bash
# Sign up
curl -X POST http://127.0.0.1:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass1"}'

# Log in
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass1","remember_me":true}'

# Get current user (use token from login response)
curl http://127.0.0.1:8000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE   "
```

---

## Request / Response Examples   

### POST /auth/signup    
```json
// Request
{
  "email": "user@example.com",
  "password": "SecurePass1"
}

// Response (201)
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-15T10:30:00"
  }
}
```

### POST /auth/login
```json
// Request
{
  "email": "user@example.com",
  "password": "SecurePass1",
  "remember_me": true
}

// Response (200)
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-15T10:30:00"
  }
}
```

### GET /auth/me
```json
// Headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// Response (200)
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2024-01-15T10:30:00"
}
```

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point + CORS
│   ├── database.py           # SQLAlchemy + SQLite config
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── jwt.py            # JWT creation & verification
│   │   └── utils.py          # Password hashing (bcrypt)
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py           # User SQLAlchemy model
│   └── routes/
│       ├── __init__.py
│       └── auth.py            # Auth route handlers + dependency
├── requirements.txt
├── run.py                     # Quick-start script
└── README.md
```

---

## Troubleshooting

### "Failed to fetch" error on frontend

1. **Backend not running?** Start it with `python run.py`
2. **Wrong URL?** Frontend uses `http://127.0.0.1:8000` — check the URL
3. **CORS blocked?** Backend now allows all origins (`*`)
4. **Firewall?** Make sure port 8000 is not blocked

### "Invalid email or password" error

- Password must be at least 8 characters with 1 uppercase letter and 1 number
- Make sure you signed up first before trying to log in

---

## Security Notes

- **Passwords**: bcrypt (12 rounds) — never stored in plain text
- **JWT tokens**: expire after 24h (30 days with "Remember Me")
- **CORS**: Allows all origins in development — restrict in production
- **Input validation**: Pydantic schemas with email + password rules
- **SQL injection**: Prevented by SQLAlchemy parameterized queries
