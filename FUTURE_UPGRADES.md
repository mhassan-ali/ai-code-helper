# Future Upgrades & Product Roadmap — CodePilot AI

This document details the architectural evolution, planned feature enhancements, and long-term expansion roadmap for **CodePilot AI**.

---

# 1. Overview & Architectural Roadmap

To transition **CodePilot AI** from a local developer assistant into an enterprise-grade AI software development platform, we have outlined a multi-phase upgrade plan spanning LLM streaming, IDE extensions, repository-level RAG indexing, team collaboration, and automated CI/CD code reviews.

```
+-----------------------------------------------------------------------------------+
|                            CodePilot AI Expansion Roadmap                         |
+-------------------+-------------------+-------------------+-----------------------+
|  Phase 1          |  Phase 2          |  Phase 3          |  Phase 4 & 5          |
|  Live LLM & SSE   |  IDE Extensions   |  RAG & Repository |  Team Hub & CI/CD Bot |
|  Streaming        |  (VS Code/JetB)   |  Context (Qdrant) |  (GitHub Action Bot)  |
+-------------------+-------------------+-------------------+-----------------------+
```

---

# 2. Detailed Upgrade Modules

## Phase 1: Live LLM Integration & Real-Time SSE Streaming

### 1.1 Multi-Provider LLM Integration
- **Objective**: Replace local regex mock heuristics with production-grade Large Language Models.
- **Provider Support**:
  - **Google Gemini 1.5 Pro / Flash**: High context window for deep repository reasoning.
  - **OpenAI GPT-4o / GPT-4o-mini**: Low-latency code generation and refactoring.
  - **Anthropic Claude 3.5 Sonnet**: Industry-leading code logic explanations and security analysis.
- **Implementation**:
  - Add backend SDK dependencies (`google-genai`, `openai`, `anthropic`).
  - Abstract AI service behind a unified adapter interface (`AIServiceAdapter`).

### 1.2 Server-Sent Events (SSE) & WebSocket Streaming
- **Objective**: Stream AI code generation token-by-token directly to the frontend OutputBox.
- **Implementation**:
  - FastAPI endpoint `GET /ai/stream/{action}` returning `EventSourceResponse`.
  - Frontend React hook `useCodeStream` consuming chunked SSE tokens and rendering animated cursor.

---

## Phase 2: Native IDE Extensions (VS Code & JetBrains)

### 2.1 VS Code Extension (`codepilot-vscode`)
- **Features**:
  - Context menu item: *Right Click -> CodePilot: Fix Selected Code*.
  - Inline hover suggestions and diff review overlay (side-by-side git diff view).
  - Activity Bar sidebar panel with persistent chat & prompt input.
- **Tech Stack**: TypeScript, VS Code Extension API, Language Server Protocol (LSP).

### 2.2 JetBrains Plugin (`codepilot-intellij`)
- **Features**: Support for IntelliJ IDEA, PyCharm, WebStorm, and GoLand.
- **Tech Stack**: Kotlin, JetBrains SDK.

---

## Phase 3: Multi-File Context & Retrieval-Augmented Generation (RAG)

### 3.1 Repository Indexing & Vector Search
- **Objective**: Allow CodePilot AI to analyze entire project architecture rather than isolated single code snippets.
- **Architecture**:
  - **Vector Database**: Integration with Qdrant, ChromaDB, or PostgreSQL (`pgvector`).
  - **Code Chunking**: Tree-sitter AST parser breaking source code into semantically relevant function and class chunks.
  - **Embedding Pipeline**: Generating code embeddings using `text-embedding-3-small` or Gemini embeddings.

---

## Phase 4: Enterprise Team Hub & Stripe Monetization

### 4.1 OAuth2 & Social Authentication
- **OAuth Providers**: GitHub Login, Google Workspace SSO, SAML / Okta for enterprise.

### 4.2 Team Collaboration & Snippet Library
- Shared team workspace dashboards.
- Saved AI prompt templates and organization snippet vault.
- RBAC (Admin, Developer, Viewer roles).

### 4.3 Stripe Subscription & Usage Quotas
- Billing integration for Free (50 ops/mo), Pro ($19/mo unlimited), and Team ($49/user/mo).
- Redis-backed rate limiting per tenant API key.

---

## Phase 5: Automated CI/CD Review & GitHub Bot

### 5.1 GitHub Action Bot (`codepilot-review-action`)
- **Functionality**:
  - Automatically triggers on `pull_request` events.
  - Scans changed lines of code for security vulnerabilities, syntax bugs, and performance bottlenecks.
  - Leaves inline review comments on GitHub PRs with clickable "Apply Suggestion" buttons.

---

# 3. Target Timeline & Implementation Strategy

| Phase | Target Quarter | Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Q3 2026 | LLM Streaming | Google Gemini / OpenAI SSE Streaming Endpoints |
| **Phase 2** | Q4 2026 | IDE Extension | VS Code Extension Marketplace Launch |
| **Phase 3** | Q1 2027 | Repo RAG | Qdrant Vector Indexing & Multi-file Context |
| **Phase 4** | Q2 2027 | Enterprise Hub | Team Workspaces, GitHub OAuth, Stripe Billing |
| **Phase 5** | Q3 2027 | CI/CD Bot | GitHub Action & PR Auto-Reviewer |
