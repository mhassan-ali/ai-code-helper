import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';

const floatingElements = [
  { delay: 0, x: '10%', y: '20%', size: 60, duration: 8 },
  { delay: 1, x: '85%', y: '15%', size: 45, duration: 10 },
  { delay: 2, x: '75%', y: '70%', size: 55, duration: 9 },
  { delay: 3, x: '15%', y: '75%', size: 40, duration: 11 },
  { delay: 4, x: '50%', y: '10%', size: 35, duration: 7 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/8 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-800/5 blur-[150px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating particles */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/10"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-sm font-medium text-surface-300">
                Now with GPT-4o & Claude 3.5 — 10x smarter
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary-400" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-white">Your AI-Powered</span>
            <br />
            <span className="gradient-text-hero">Coding Superpower</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-surface-400 leading-relaxed mb-10"
          >
            Write, debug, and ship code <span className="text-white font-semibold">10x faster</span> with the most
            intelligent AI assistant built for developers, students, and software engineers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/signup"
              className="btn-primary group px-8 py-4 text-base font-semibold text-white rounded-2xl inline-flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              Start Coding Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="#product"
              className="group px-8 py-4 text-base font-semibold text-surface-300 hover:text-white rounded-2xl inline-flex items-center gap-2.5 glass card-hover w-full sm:w-auto justify-center"
            >
              <Play className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
              Watch Demo
            </a>
          </motion.div>

          {/* Mini Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-surface-500"
          >
            <div className="flex -space-x-2">
              {[
                'bg-gradient-to-br from-emerald-400 to-teal-600',
                'bg-gradient-to-br from-amber-400 to-orange-600',
                'bg-gradient-to-br from-cyan-400 to-blue-600',
                'bg-gradient-to-br from-rose-400 to-pink-600',
                'bg-gradient-to-br from-yellow-400 to-amber-600',
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-[#050a08] flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {['A', 'S', 'M', 'K', 'J'][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
                ))}
              </div>
              <span className="text-surface-400">4.9/5 from 12,000+ developers</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - Code Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-16 sm:mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/10 to-primary-500/20 rounded-3xl blur-2xl" />
          <div className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Editor Top Bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-surface-500 font-mono">
                  app.tsx — CodePilot AI
                </div>
              </div>
            </div>
            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
              <div className="flex gap-6">
                <div className="text-right text-surface-700 select-none text-xs leading-7">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div><span className="text-primary-400">import</span> <span className="text-accent-400">{'{ useState }'}</span> <span className="text-primary-400">from</span> <span className="text-emerald-400">'react'</span><span className="text-surface-600">;</span></div>
                  <div><span className="text-primary-400">import</span> <span className="text-accent-400">{'{ CodePilot }'}</span> <span className="text-primary-400">from</span> <span className="text-emerald-400">'@codepilot/ai'</span><span className="text-surface-600">;</span></div>
                  <div className="text-surface-800">{'\u00A0'}</div>
                  <div><span className="text-primary-400">const</span> <span className="text-accent-400">App</span> <span className="text-primary-400">=</span> <span className="text-primary-400">()</span> <span className="text-primary-400">=&gt;</span> <span className="text-primary-400">{'{'}</span></div>
                  <div>{'  '}<span className="text-primary-400">const</span> <span className="text-sky-400">[code, setCode]</span> <span className="text-primary-400">=</span> <span className="text-accent-400">useState</span><span className="text-surface-400">(</span><span className="text-emerald-400">''</span><span className="text-surface-400">)</span><span className="text-surface-600">;</span></div>
                  <div className="text-surface-800">{'\u00A0'}</div>
                  <div className="relative">
                    <span className="text-surface-600">{'  '}// </span>
                    <span className="text-primary-300 bg-primary-500/10 px-1.5 py-0.5 rounded">✨ AI generates the rest...</span>
                    <span className="typing-cursor" />
                  </div>
                  <div className="text-surface-800">{'\u00A0'}</div>
                  <div>{'  '}<span className="text-primary-400">const</span> <span className="text-sky-400">suggestion</span> <span className="text-primary-400">=</span> <span className="text-accent-400">CodePilot</span><span className="text-surface-400">.</span><span className="text-amber-300">complete</span><span className="text-surface-400">(</span><span className="text-sky-400">code</span><span className="text-surface-400">)</span><span className="text-surface-600">;</span></div>
                  <div>{'  '}<span className="text-primary-400">return</span> <span className="text-primary-400">&lt;</span><span className="text-sky-400">div</span><span className="text-primary-400">&gt;</span><span className="text-primary-400">{'{'}suggestion{'}'}</span><span className="text-primary-400">&lt;/</span><span className="text-sky-400">div</span><span className="text-primary-400">&gt;</span></div>
                  <div><span className="text-primary-400">{'}'}</span><span className="text-surface-600">;</span></div>
                  <div className="text-surface-800">{'\u00A0'}</div>
                  <div><span className="text-primary-400">export default</span> <span className="text-accent-400">App</span><span className="text-surface-600">;</span></div>
                </div>
              </div>
            </div>
            {/* AI Suggestion overlay */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute right-4 top-16 glass-strong rounded-xl px-4 py-3 max-w-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary-300">CodePilot AI</span>
              </div>
              <p className="text-xs text-surface-400 leading-relaxed">
                I detected you're building a React component. Want me to add error handling and loading states?
              </p>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-colors">
                  Accept
                </button>
                <button className="px-3 py-1 text-xs font-medium text-surface-500 hover:text-surface-300 transition-colors">
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
