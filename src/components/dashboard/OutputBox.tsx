/**
 * Output box — displays AI response with syntax styling and copy button.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import type { AIResponse } from "../../lib/api";

interface OutputBoxProps {
  response: AIResponse | null;
  error: string | null;
}

const actionLabels: Record<string, string> = {
  fix: "⚡ Fixed Code",
  explain: "📖 Explanation",
  optimize: "⚡ Optimized Code",
};

const actionColors: Record<string, string> = {
  fix: "text-rose-400 bg-rose-400/10",
  explain: "text-sky-400 bg-sky-400/10",
  optimize: "text-amber-400 bg-amber-400/10",
};

export default function OutputBox({ response, error }: OutputBoxProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!response?.result) return;
    navigator.clipboard.writeText(response.result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Empty state
  if (!response && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-surface-600" />
        </div>
        <p className="text-sm text-surface-500 mb-1">No response yet</p>
        <p className="text-xs text-surface-700">Paste code above and click an action button</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/5 border border-red-500/20 rounded-xl px-5 py-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-400 mb-1">Request Failed</p>
            <p className="text-sm text-surface-400">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Response state
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${actionColors[response!.action] || "text-primary-400 bg-primary-400/10"}`}>
            {actionLabels[response!.action] || "Result"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-surface-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1.5 text-primary-400"
              >
                <Check className="w-3.5 h-3.5" />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Response content */}
      <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
        <pre className="p-5 text-sm font-mono text-surface-300 leading-6 overflow-x-auto whitespace-pre-wrap max-h-[500px] overflow-y-auto">
          {response!.result}
        </pre>
      </div>
    </motion.div>
  );
}
