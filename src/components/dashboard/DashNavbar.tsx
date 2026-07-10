/**
 * Dashboard top navbar — mobile menu toggle, user avatar, branding.
 */

import { Sparkles, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface DashNavbarProps {
  onMobileMenuToggle: () => void;
}

export default function DashNavbar({ onMobileMenuToggle }: DashNavbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#050a08]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        {/* Left: mobile menu + brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 -ml-2 text-surface-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-bold text-white">
              Code<span className="gradient-text">Pilot</span>
            </span>
          </div>
          <h2 className="hidden md:block text-sm font-medium text-surface-400">
            AI Code Assistant
          </h2>
        </div>

        {/* Right: user avatar */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
