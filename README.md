# CodePilot AI — Intelligent AI Code Assistant

![CodePilot AI Banner](https://img.shields.io/badge/CodePilot%20AI-v1.0.0-6366f1?style=for-the-badge&logo=codefactor&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**CodePilot AI** is a state-of-the-art web application and API platform that empowers software developers to fix bugs, understand complex code line-by-line, and optimize algorithms for maximum performance. Featuring a sleek, dark-mode landing page, interactive showcase, full authentication system, and dedicated developer workspace dashboard.

---

## Features

- 🛠️ **AI Code Fixer**: Automatically detects syntax issues, missing variable scopes, and logical glitches, providing drop-in replacements.
- 📖 **AI Code Explainer**: Generates plain-English step-by-step breakdowns of code snippets to streamline onboarding and reviews.
- ⚡ **AI Code Optimizer**: Analyzes time/space complexity and rewrites code to minimize algorithmic overhead.
- 🔐 **JWT Authentication**: Complete login, signup, and user session isolation powered by FastAPI and bcrypt.
- 🎨 **Modern Sleek UI**: Built with React 19, TailwindCSS v4, Framer Motion animations, and custom visual components.
- 📊 **Developer Dashboard**: Dedicated interactive workspace with live action tab switching and structured copy-ready output boxes.

---

## Tech Stack

### Frontend Architecture
- **Framework**: React 19 (`19.2.6`)
- **Build Tool**: Vite 7 (`7.3.2`)
- **Type Safety**: TypeScript (`5.9.3`)
- **Styling**: Tailwind CSS v4 (`4.1.17`), Framer Motion (`12.42.2`), Lucide React Icons (`1.23.0`)
- **Routing**: React Router DOM v7 (`7.18.1`)

### Backend Architecture
- **Framework**: FastAPI (`0.115.0`) & Uvicorn (`0.30.6`)
- **Database**: SQLite with SQLAlchemy ORM (`2.0.35`)
- **Auth & Security**: JWT (`python-jose`) and Password Hashing (`bcrypt`)
- **Validation**: Pydantic v2 (`2.9.2`)

---

## Getting Started & Installation

### Prerequisites
- Node.js (v18.0 or higher) & npm
- Python 3.10+ & pip

### 1. Repository Setup
```bash
git clone https://github.com/mhassan-ali/ai-code-helper.git
cd ai-code-helper
```

### 2. Backend Setup & Startup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*Backend API will run at `http://127.0.0.1:8000` (Docs available at `http://127.0.0.1:8000/docs`).*

### 3. Frontend Setup & Startup
Open a new terminal tab at root directory:
```bash
npm install
npm run dev
```
*Frontend application will run at `http://localhost:5173`.*

---

## API Endpoints & Usage

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/signup` | Register new developer user | ❌ |
| `POST` | `/auth/login` | Authenticate user & return JWT | ❌ |
| `GET` | `/auth/me` | Retrieve profile of authenticated user | ✅ Bearer JWT |
| `POST` | `/ai/fix` | Submit code block for automated fix | ✅ Bearer JWT |
| `POST` | `/ai/explain` | Submit code block for line-by-line explanation | ✅ Bearer JWT |
| `POST` | `/ai/optimize` | Submit code block for algorithm optimization | ✅ Bearer JWT |
| `GET` | `/health` | API health monitoring endpoint | ❌ |

---

## Project Structure

```
ai-code-assistant-landing-page/
├── backend/                  # FastAPI Python Service
│   ├── app/
│   │   ├── auth/             # Password security & JWT utilities
│   │   ├── models/           # SQLAlchemy database user schemas
│   │   ├── routes/           # Auth and AI endpoint controllers
│   │   ├── database.py       # DB engine and session initializer
│   │   └── main.py           # FastAPI application entry point
│   ├── main.py               # Root backend launcher script
│   └── requirements.txt      # Python dependencies
├── src/                      # React 19 Frontend Workspace
│   ├── components/           # UI components (Hero, Features, Pricing, Dashboard)
│   ├── contexts/             # AuthContext state provider
│   ├── pages/                # Landing, Login, Signup, Dashboard pages
│   ├── App.tsx               # Main routing & application wrapper
│   └── main.tsx              # React DOM render entry
├── PRD.md                    # Product Requirements Document
├── TRD.md                    # Technical Requirements Document
├── FUTURE_UPGRADES.md        # Architectural Roadmap & Planned Features
├── package.json              # Frontend npm dependencies
└── vite.config.ts            # Vite build configuration
```

---

## Documentation Index

For comprehensive product and technical specifications, refer to the following repository documents:
- 📄 **[PRD.md](./PRD.md)**: Product Requirements Document detailing user personas, business objectives, functional features, NFRs, and product KPIs.
- ⚙️ **[TRD.md](./TRD.md)**: Technical Requirements Document covering system architecture, database schemas, API specs, auth workflows, and deployment pipelines.
- 🚀 **[FUTURE_UPGRADES.md](./FUTURE_UPGRADES.md)**: Product Roadmap and future feature expansion plan including live LLM streaming, IDE extensions, team collaboration, and Stripe billing.

---

## License

This repository is distributed under the MIT License. See [`LICENSE`](./LICENSE) for more details.

---

## Contact & Support

For questions, feature requests, or technical support:
- **Repository**: [mhassan-ali/ai-code-helper](https://github.com/mhassan-ali/ai-code-helper)
- **Author**: Hassan Ali ([@mhassan-ali](https://github.com/mhassan-ali))
