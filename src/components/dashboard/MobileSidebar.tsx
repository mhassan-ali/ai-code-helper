/**
 * Mobile sidebar — slides in from the left as an overlay.
 */

import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Settings,
  LogOut,
  X,
  Trash2,
} from "lucide-react";
import type { HistoryItem } from "./Sidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function MobileSidebar({
  isOpen,
  onClose,
  userEmail,
  onLogout,
  history,
  onSelectHistory,
  onClearHistory,
  activeTab,
  onTabChange,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        exit={{ x: -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-[#070c0a] border-r border-white/5 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Code<span className="gradient-text">Pilot</span>
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-surface-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); if (item.id !== "history") onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-primary-500/15 text-primary-300"
                  : "text-surface-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}

          {/* History list */}
          {activeTab === "history" && (
            <div className="pt-4">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Recent</span>
                {history.length > 0 && (
                  <button onClick={onClearHistory} className="text-surface-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {history.length === 0 && (
                  <p className="text-xs text-surface-600 px-2 py-4 text-center">No history yet</p>
                )}
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onSelectHistory(item); onClose(); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
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
                    <p className="text-xs text-surface-500 truncate">{item.preview}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/5 space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs text-surface-500 truncate">{userEmail}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Log out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
