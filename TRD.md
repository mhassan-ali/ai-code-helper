# Technical Requirements Document (TRD) — CodePilot AI

---

# 1. System Architecture Overview

## 1.1 High-Level Architecture Diagram
The **CodePilot AI** ecosystem follows a decoupled Client-Server architecture. The frontend is built as a single-page application (SPA) using React 19, Vite, and TypeScript, communicating over RESTful HTTP APIs with a high-performance Python FastAPI backend.

```
                    +--------------------------------------------------+
                    |                Client Browser                    |
                    |   (React 19 + TypeScript + Tailwind CSS v4)     |
                    +------------------------+-------------------------+
                                             |
                                             | HTTP Requests (REST / JSON)
                                             | Authorization: Bearer <JWT>
                                             v
                    +--------------------------------------------------+
                    |             FastAPI Gateway Backend              |
                    |             (Uvicorn ASGI Server)                |
                    +-------------------+------------------------------+
                                        |
               +------------------------+------------------------+
               |                                                 |
               v                                                 v
    +-----------------------+                         +-----------------------+
    | Authentication Module |                         |   AI Assistant Module |
    | (Bcrypt + Python-Jose)|                         |  (Fix, Explain, Opt)  |
    +-----------+-----------+                         +-----------------------+
                |
                v
    +-----------------------+
    |   SQLAlchemy ORM      |
    +-----------+-----------+
                |
                v
    +-----------------------+
    | SQLite Database       |
    | (codepilot.db)        |
    +-----------------------+
```

## 1.2 Architectural Principles
- **Decoupled Architecture**: Independent frontend and backend deployments allowing separate scaling and maintenance.
- **Stateless REST APIs**: Every API request contains necessary authentication state via JWT Bearer headers.
- **Modularity & Scalability**: Clean separation of database models, authentication logic, route controllers, and AI services.

---

# 2. Tech Stack & Infrastructure Specification

## 2.1 Frontend Stack
- **Framework**: React 19 (`19.2.6`)
- **Build Tool & Bundler**: Vite 7 (`7.3.2`) with `@vitejs/plugin-react`
- **Language**: TypeScript (`5.9.3`)
- **Styling & Design System**: TailwindCSS v4 (`4.1.17`), `clsx` (`2.1.1`), `tailwind-merge` (`3.4.0`)
- **Animations**: Framer Motion (`12.42.2`)
- **Icons**: Lucide React (`1.23.0`)
- **Routing**: React Router DOM v7 (`7.18.1`)

## 2.2 Backend Stack
- **Framework**: FastAPI (`0.115.0`)
- **ASGI Server**: Uvicorn (`0.30.6`)
- **Database & ORM**: SQLite (`codepilot.db`) with SQLAlchemy (`2.0.35`)
- **Authentication**: JWT via `python-jose[cryptography]` (`3.3.0`) and password hashing with `bcrypt` (`4.2.0`)
- **Validation**: Pydantic v2 (`2.9.2`) with email validation support
- **Form & Multipart Parser**: `python-multipart` (`0.0.12`)

---

# 3. Database Schema & Data Models

## 3.1 Entity Relationship Diagram & Tables
The backend relies on SQLAlchemy ORM managing SQLite database tables.

### User Model Schema (`users` Table)
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key, Auto Increment, Index | Unique identifier for user |
| `email` | String(255) | Unique, Indexed, Not Null | User email address used for login |
| `hashed_password` | String(255) | Not Null | Salted bcrypt hash of password |
| `created_at` | DateTime | Default `utcnow` | Timestamp of account creation |

## 3.2 Database Initialization Logic
- Database connection managed via `sqlalchemy.create_engine("sqlite:///./codepilot.db")`.
- `init_db()` is called during application lifespan startup to automatically generate table schemas if missing.

---

# 4. API Specification & Interface Contracts

## 4.1 System & Health Check Endpoints
### `GET /`
- **Description**: Returns server metadata and running status.
- **Response `200 OK`**:
```json
{
  "message": "API is running",
  "service": "CodePilot AI — Auth Service",
  "version": "1.0.0"
}
```

### `GET /health`
- **Description**: Health monitoring check.
- **Response `200 OK`**: `{"status": "healthy"}`

## 4.2 Authentication Router (`/auth`)

### `POST /auth/signup`
- **Request Body**: `{"email": "dev@example.com", "password": "SecurePassword123"}`
- **Response `200 OK`**:
```json
{
  "access_token": "<jwt_string>",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "dev@example.com",
    "created_at": "2026-07-28T18:00:00Z"
  }
}
```

### `POST /auth/login`
- **Request Body**: `{"email": "dev@example.com", "password": "SecurePassword123"}`
- **Response `200 OK`**: Same token structure as signup.

### `GET /auth/me`
- **Header Required**: `Authorization: Bearer <jwt_token>`
- **Response `200 OK`**: `{"id": 1, "email": "dev@example.com", "created_at": "..."}`

## 4.3 AI Router (`/ai`)

### `POST /ai/fix`
- **Request Body**: `{"code": "const x = 5\nconst y = 10"}`
- **Response `200 OK`**:
```json
{
  "success": true,
  "action": "fix",
  "result": "const x = 5;\nconst y = 10;",
  "original_code": "const x = 5\nconst y = 10"
}
```

### `POST /ai/explain`
- **Request Body**: `{"code": "function add(a, b) { return a + b; }"}`
- **Response `200 OK`**: Detailed line-by-line explanation response object.

### `POST /ai/optimize`
- **Request Body**: `{"code": "for(let i=0; i<arr.length; i++) { ... }"}`
- **Response `200 OK`**: Algorithmic complexity reduction and optimized code output.

---

# 5. Authentication & Authorization Mechanism

## 5.1 Password Hashing & Verification
- Uses **bcrypt** with custom salt generation:
  - `pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")`
  - Function `get_password_hash(password: str) -> str` returns salted hash.
  - Function `verify_password(plain_password: str, hashed_password: str) -> bool` verifies credentials against hash.

## 5.2 JSON Web Token (JWT) Lifecycle
- Signature Algorithm: **HS256**
- Secret Key: Configurable environment secret key (`SECRET_KEY`).
- Token Claims: `sub` (subject containing user email or ID) and `exp` (expiration timestamp).
- Dependency Injection: FastAPI `OAuth2PasswordBearer(tokenUrl="auth/login")` extracts Bearer tokens automatically from `Authorization` header.

---

# 6. AI Engine Integration & Processing Pipeline

## 6.1 Modular Processing Architecture
The AI processing pipeline currently relies on structured AST/regex heuristics and pattern matchers designed for high-speed local processing.

```
       Raw Code Payload (POST /ai/fix|explain|optimize)
                             |
                             v
               +---------------------------+
               | JWT Dependency Validation |
               +-------------+-------------+
                             |
                             v
               +---------------------------+
               | Regex Heuristics Engine   |
               | - Semicolon Injector      |
               | - Strict Equality Checker |
               | - Variable Declaration    |
               +-------------+-------------+
                             |
                             v
               +---------------------------+
               | JSON Response Formatter   |
               +---------------------------+
```

## 6.2 Extensibility for Production LLM Provider
The AI route handlers (`backend/app/routes/ai.py`) are structured as pure python modules, allowing straightforward swap with real LLM provider SDKs (such as `google-genai` or `openai` client wrappers).

---

# 7. Frontend State Management & Component Architecture

## 7.1 State Management Pattern
- **AuthContext (`src/contexts/AuthContext.tsx`)**: Global React context managing current user state, token persistence in `localStorage`, login handler, signup handler, and logout logic.
- **Local Component State**: Page-level and component-level state managing input code, selected tab mode, loading spinners, and error alerts.

## 7.2 Key UI Component Boundaries
- **Dashboard Workspace (`DashboardPage.tsx`)**:
  - `<Sidebar />`: Navigation tree and quick actions.
  - `<DashNavbar />`: Top header with user profile badge and logout button.
  - `<CodeInput />`: Code editor textarea with character counter and mode selector tabs.
  - `<OutputBox />`: Syntax-highlighted response block with copy-to-clipboard functionality.

---

# 8. Security & Error Handling Infrastructure

## 8.1 HTTP Error Responses & Exception Handling
FastAPI `HTTPException` triggers standard RFC-7807 error responses:
- `400 Bad Request`: Email already registered / invalid format.
- `401 Unauthorized`: Invalid credentials / expired JWT token.
- `404 Not Found`: Requested endpoint or user record missing.
- `500 Internal Server Error`: Unhandled backend runtime exception logged via FastAPI request logging middleware.

## 8.2 CORS & Web Security
- **Allowed Origins**: Strictly configured allowed origins list (`http://localhost:5173`, `http://127.0.0.1:5173`, etc.).
- **Allowed Methods**: `GET`, `POST`, `OPTIONS`.
- **Allowed Headers**: `Content-Type`, `Authorization`.

---

# 9. Performance, Scalability & Rate Limiting

## 9.1 Performance Benchmarks
- **Uvicorn Concurrency**: Async event loop capable of handling 5,000+ non-blocking requests per second per core.
- **Vite Production Bundling**: Optimized JS chunking with `vite-plugin-singlefile` or code-splitting for fast initial page load.

## 9.2 Rate Limiting Strategy
- **Token Bucket Rate Limiter**: Planned Redis-backed rate limiting per IP / authenticated user ID to prevent spamming AI endpoints (e.g. max 60 requests/minute for Free tier).

---

# 10. Development, Testing & CI/CD Pipeline

## 10.1 Local Development Workflow
- **Backend Launch**:
  ```bash
  cd backend
  python -m venv venv
  venv\Scripts\activate  # Windows
  pip install -r requirements.txt
  python main.py
  ```
- **Frontend Launch**:
  ```bash
  npm install
  npm run dev
  ```

## 10.2 Quality Assurance & Testing Strategy
- **Backend Tests**: `pytest` test suite verifying auth flow, JWT generation, and route status codes.
- **Frontend Tests**: TypeScript static type checks (`tsc --noEmit`) and Vite production build test (`npm run build`).

---

# 11. Environment Configuration & Deployment

## 11.1 Environment Variables
| Variable Name | Default / Sample | Description |
| :--- | :--- | :--- |
| `SECRET_KEY` | `your-secret-key-keep-it-secret` | Cryptographic secret for signing JWTs |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` (24h) | Token validity period |
| `DATABASE_URL` | `sqlite:///./codepilot.db` | SQLAlchemy connection URI |

## 11.2 Containerized & Cloud Deployment
- **Docker Production Image**: Multi-stage Dockerfile bundling FastAPI backend and Vite static assets.
- **Cloud Hosts**: Compatible with Render, Railway, Vercel (frontend static host), or AWS ECS.

---

# 12. Maintenance, Monitoring & Observability

## 12.1 Logging Infrastructure
- Structured HTTP request middleware logging incoming request methods, paths, client IPs, and status codes.
- Error tracing for failed database queries and auth mismatches.

## 12.2 Health Check Monitoring
- Automated ping checks against `/health` endpoint to monitor service health and trigger automatic instance restarts if unresponsive.
