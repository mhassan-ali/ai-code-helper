/**
 * Dashboard Sidebar — navigation + history.
 * Collapsible on mobile, fixed on desktop.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

export interface HistoryItem {
  id: string;
  action: string;
  preview: string;
  code: string;       // Full code input for re-running
  timestamp: number;
}

interface SidebarProps {
  userEmail: string;
  onLogout: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "assistant", label: "Assistant", icon: Sparkles },
  { id: "history", label: "History", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  userEmail,
  onLogout,
  history,
  onSelectHistory,
  onClearHistory,
  activeTab,
  onTabChange,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 border-r border-white/5 bg-[#070c0a] transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-white whitespace-nowrap"
          >
            Code<span className="gradient-text">Pilot</span>
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? "bg-primary-500/15 text-primary-300"
                : "text-surface-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* History list (shown in history tab) */}
        {activeTab === "history" && !collapsed && (
          <div className="pt-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Recent
              </span>
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-surface-600 hover:text-red-400 transition-colors"
                  title="Clear history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto">
              {history.length === 0 && (
                <p className="text-xs text-surface-600 px-2 py-4 text-center">
                  No history yet
                </p>
              )}
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectHistory(item)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      item.action === "fix" ? "bg-rose-500/15 text-rose-400" :
                      item.action === "explain" ? "bg-sky-500/15 text-sky-400" :
                      "bg-amber-500/15 text-amber-400"
                    }`}>
                      {item.action}
                    </span>
                    <span className="text-[10px] text-surface-600">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 truncate group-hover:text-surface-300 transition-colors">
                    {item.preview}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-white/5 flex-shrink-0 space-y-2">
        {/* User info */}
        {!collapsed && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs text-surface-500 truncate">{userEmail}</p>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-surface-600 hover:text-surface-400 hover:bg-white/5 transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
