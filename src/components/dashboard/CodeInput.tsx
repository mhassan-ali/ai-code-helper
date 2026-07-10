/**
 * Code input area — textarea with action buttons.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, BookOpen, Zap, Loader2 } from "lucide-react";

interface CodeInputProps {
  onSubmit: (code: string, action: "fix" | "explain" | "optimize") => void;
  isLoading: boolean;
  initialCode?: string;
}

const actions = [
  { id: "fix" as const, label: "Fix Code", icon: Wrench, hoverBg: "hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400" },
  { id: "explain" as const, label: "Explain Code", icon: BookOpen, hoverBg: "hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-400" },
  { id: "optimize" as const, label: "Optimize Code", icon: Zap, hoverBg: "hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400" },
];

export default function CodeInput({ onSubmit, isLoading, initialCode = "" }: CodeInputProps) {
  const [code, setCode] = useState(initialCode);

  // Sync initialCode when it changes externally (e.g. history selection)
  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  function handleSubmit(action: "fix" | "explain" | "optimize") {
    if (!code.trim() || isLoading) return;
    onSubmit(code, action);
  }

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label htmlFor="code-input" className="text-sm font-medium text-surface-300">
          Paste your code or question
        </label>
        <span className="text-xs text-surface-600">
          {code.length > 0 ? `${code.split("\n").length} lines` : ""}
        </span>
      </div>

      {/* Textarea */}
      <div className="relative group">
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste your code here...\nfunction hello() {\n  console.log("Hello world")\n}\n\n// Or ask a question:\n// How do I handle async errors in TypeScript?`}
          rows={12}
          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-mono text-surface-200 placeholder:text-surface-700 focus:outline-none focus:border-primary-500/40 focus:ring-2 focus:ring-primary-500/15 transition-all duration-300 resize-y min-h-[200px]"
          disabled={isLoading}
        />
        {/* Subtle line numbers background effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/[0.01] rounded-l-xl border-r border-white/5 pointer-events-none" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubmit(action.id)}
            disabled={isLoading || !code.trim()}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-white/10 text-surface-300 ${action.hoverBg} transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/10 disabled:hover:text-surface-300`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <action.icon className="w-4 h-4" />
            )}
            {isLoading ? "Processing…" : action.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
