/**
 * AuthContext — manages authentication state across the entire app.
 * Provides login, signup, logout functions and the current user object.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  signup as apiSignup,
  login as apiLogin,
  fetchCurrentUser,
  saveToken,
  getToken,
  removeToken,
  isRemembered,
  type User,
} from "../lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider Component ──────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // ─── Check for existing token on mount ──────────────────────────────────
  useEffect(() => {
    const token = getToken();
    console.log("[AuthContext] Initializing — token found:", !!token);

    if (token) {
      fetchCurrentUser(token)
        .then((user) => {
          console.log("[AuthContext] User restored:", user.email);
          setState({ user, isLoading: false, isAuthenticated: true });
        })
        .catch((err) => {
          // Token is invalid or expired — clear it
          console.warn("[AuthContext] Token invalid, clearing:", err.message);
          removeToken();
          setState({ user: null, isLoading: false, isAuthenticated: false });
        });
    } else {
      setState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  // ─── Signup ─────────────────────────────────────────────────────────────
  const signup = useCallback(async (email: string, password: string) => {
    console.log("[AuthContext] Signing up:", email);
    const response = await apiSignup(email, password);
    if (response.token && response.user) {
      const remember = isRemembered();
      saveToken(response.token, remember);
      console.log("[AuthContext] Signup successful — authenticated");
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
    }
  }, []);

  // ─── Login ──────────────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean = false) => {
      console.log("[AuthContext] Logging in:", email, "remember:", rememberMe);
      const response = await apiLogin(email, password, rememberMe);
      if (response.token && response.user) {
        saveToken(response.token, rememberMe);
        console.log("[AuthContext] Login successful — authenticated");
        setState({
          user: response.user,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    },
    []
  );

  // ─── Logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    console.log("[AuthContext] Logging out");
    removeToken();
    setState({ user: null, isLoading: false, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
