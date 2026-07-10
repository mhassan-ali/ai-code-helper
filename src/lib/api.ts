/**
 * API client for the CodePilot AI backend.
 * Handles auth endpoints, token management, and AI code assistant calls.
 *
 * Base URL: http://127.0.0.1:8000
 * Auth: /auth/signup, /auth/login, /auth/me
 * AI:   /ai/fix, /ai/explain, /ai/optimize
 */

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface AIResponse {
  success: boolean;
  action: string;
  result: string;
  original_code: string;
}

// ─── Token Storage ────────────────────────────────────────────────────────────

const TOKEN_KEY = "codepilot_token";
const REMEMBER_KEY = "codepilot_remember";

export function saveToken(token: string, remember: boolean = false): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_KEY, "true");
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function isRemembered(): boolean {
  return localStorage.getItem(REMEMBER_KEY) === "true";
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export async function signup(email: string, password: string): Promise<AuthResponse> {
  return authFetch("/auth/signup", { email, password });
}

export async function login(email: string, password: string, rememberMe: boolean = false): Promise<AuthResponse> {
  return authFetch("/auth/login", { email, password, remember_me: rememberMe });
}

export async function fetchCurrentUser(token: string): Promise<User> {
  const url = `${API_BASE_URL}/auth/me`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to fetch user.");
  return data as User;
}

async function authFetch(path: string, body: Record<string, unknown>): Promise<AuthResponse> {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || (Array.isArray(data.detail) ? data.detail[0]?.msg : "Request failed."));
    }
    return data as AuthResponse;
  } catch (err: any) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Cannot connect to server at " + API_BASE_URL + ". Is the backend running?");
    }
    throw err;
  }
}

// ─── AI Code Assistant API ────────────────────────────────────────────────────

export async function fixCode(code: string): Promise<AIResponse> {
  return callAIEndpoint("/ai/fix", code);
}

export async function explainCode(code: string): Promise<AIResponse> {
  return callAIEndpoint("/ai/explain", code);
}

export async function optimizeCode(code: string): Promise<AIResponse> {
  return callAIEndpoint("/ai/optimize", code);
}

async function callAIEndpoint(path: string, code: string): Promise<AIResponse> {
  const url = `${API_BASE_URL}${path}`;
  const token = getToken();

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "AI request failed.");
    return data as AIResponse;
  } catch (err: any) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      console.warn("[API] Backend unreachable — using simulated response for", path);
      return simulateAIResponse(path, code);
    }
    throw err;
  }
}

/** Simulated AI responses — keeps dashboard functional without backend. */
function simulateAIResponse(path: string, code: string): AIResponse {
  const action = path.replace("/ai/", "");

  if (action === "fix") {
    return {
      success: true, action: "fix",
      result: `⚡ Fixed Code\n${"=".repeat(40)}\n\n${code}\n\n${"─".repeat(40)}\n📝 Changes:\n✅ Added missing semicolons\n✅ Fixed variable declarations\n✅ Corrected syntax errors\n\n⚠️  Simulated — start backend for real AI`,
      original_code: code,
    };
  }

  if (action === "explain") {
    const lines = code.trim().split("\n");
    const explanation = lines.map((line, i) => `  Line ${i + 1}: ${line.trim() || "[blank]"}`).join("\n");
    return {
      success: true, action: "explain",
      result: `📖 Code Explanation\n${"=".repeat(40)}\n\n${explanation}\n\n${"─".repeat(40)}\nTotal: ${lines.length} lines\n\n⚠️  Simulated — start backend for real AI`,
      original_code: code,
    };
  }

  return {
    success: true, action: "optimize",
    result: `⚡ Optimized Code\n${"=".repeat(40)}\n\n${code}\n\n${"─".repeat(40)}\n📝 Changes:\n✅ Replaced var with const/let\n✅ Simplified conditionals\n✅ Used modern ES6+ syntax\n\n⚠️  Simulated — start backend for real AI`,
    original_code: code,
  };
}
