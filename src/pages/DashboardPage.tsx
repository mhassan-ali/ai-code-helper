/**
 * Protected Dashboard — AI Code Assistant interface.
 * Redirects to /login if not authenticated.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { fixCode, explainCode, optimizeCode } from "../lib/api";
import type { AIResponse } from "../lib/api";

import Sidebar, { type HistoryItem } from "../components/dashboard/Sidebar";
import MobileSidebar from "../components/dashboard/MobileSidebar";
import DashNavbar from "../components/dashboard/DashNavbar";
import CodeInput from "../components/dashboard/CodeInput";
import OutputBox from "../components/dashboard/OutputBox";

// ─── History persistence ──────────────────────────────────────────────────────

const HISTORY_KEY = "codepilot_history";
const MAX_HISTORY = 50;

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // UI state
  const [activeTab, setActiveTab] = useState("assistant");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI state
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [inputCode, setInputCode] = useState("");

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  // ─── Route Protection ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // ─── Logout ────────────────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  // ─── AI Submit ─────────────────────────────────────────────────────────
  async function handleSubmit(code: string, action: "fix" | "explain" | "optimize") {
    setAiLoading(true);
    setAiError(null);
    setAiResponse(null);
    setInputCode(code);

    try {
      let response: AIResponse;
      switch (action) {
        case "fix":
          response = await fixCode(code);
          break;
        case "explain":
          response = await explainCode(code);
          break;
        case "optimize":
          response = await optimizeCode(code);
          break;
      }

      setAiResponse(response);

      // Add to history
      const item: HistoryItem = {
        id: `${Date.now()}-${action}`,
        action,
        preview: code.split("\n")[0].slice(0, 60),
        code,
        timestamp: Date.now(),
      };
      const updated = [item, ...history].slice(0, MAX_HISTORY);
      setHistory(updated);
      saveHistory(updated);
    } catch (err: any) {
      setAiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  // ─── History selection ─────────────────────────────────────────────────
  function handleSelectHistory(item: HistoryItem) {
    setActiveTab("assistant");
    setInputCode(item.code || item.preview);
    setAiResponse(null);
    setAiError(null);
  }

  function handleClearHistory() {
    setHistory([]);
    saveHistory([]);
  }

  // ─── Loading / auth check ──────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050a08] flex items-center justify-center">
        <div className="flex items-center gap-3 text-surface-400">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050a08] flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl p-10 max-w-sm"
          >
            <Shield className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-sm text-surface-400 mb-6">Please sign in to access your dashboard.</p>
            <Link
              to="/login"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050a08] flex">
      {/* Desktop Sidebar */}
      <Sidebar
        userEmail={user?.email || ""}
        onLogout={handleLogout}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        userEmail={user?.email || ""}
        onLogout={handleLogout}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <DashNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto w-full">
          {/* Assistant Tab */}
          {activeTab === "assistant" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Welcome */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Welcome back, <span className="gradient-text">{user?.email?.split("@")[0]}</span>
                </h1>
                <p className="text-surface-400 text-sm sm:text-base">
                  Paste your code below and let AI help you fix, explain, or optimize it.
                </p>
              </div>

              {/* Input */}
              <div className="glass rounded-2xl p-5 sm:p-6">
                <CodeInput
                  onSubmit={handleSubmit}
                  isLoading={aiLoading}
                  initialCode={inputCode}
                />
              </div>

              {/* Output */}
              <div className="glass rounded-2xl p-5 sm:p-6">
                <OutputBox response={aiResponse} error={aiError} />
              </div>
            </motion.div>
          )}

          {/* History Tab (mobile — desktop shows it in sidebar) */}
          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden"
            >
              <h2 className="text-xl font-bold text-white mb-4">History</h2>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-8 h-8 text-surface-700 mx-auto mb-3" />
                  <p className="text-sm text-surface-500">No history yet. Start by submitting code!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectHistory(item)}
                      className="w-full text-left glass rounded-xl p-4 card-hover"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          item.action === "fix" ? "bg-rose-500/15 text-rose-400" :
                          item.action === "explain" ? "bg-sky-500/15 text-sky-400" :
                          "bg-amber-500/15 text-amber-400"
                        }`}>
                          {item.action}
                        </span>
                        <span className="text-xs text-surface-600">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-surface-400 truncate">{item.preview}</p>
                    </button>
                  ))}
                  <button
                    onClick={handleClearHistory}
                    className="w-full text-center text-sm text-red-400 hover:text-red-300 py-3 transition-colors"
                  >
                    Clear all history
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-surface-400" />
                Settings
              </h2>
              <div className="space-y-4">
                {/* Account info */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Account</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-sm text-surface-400">Email</span>
                      <span className="text-sm text-white">{user?.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-sm text-surface-400">Plan</span>
                      <span className="text-sm text-primary-400">Pro</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-surface-400">Member since</span>
                      <span className="text-sm text-surface-300">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Danger zone */}
                <div className="glass rounded-2xl p-6 border-red-500/10">
                  <h3 className="text-sm font-semibold text-white mb-4">Danger Zone</h3>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all duration-200"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
