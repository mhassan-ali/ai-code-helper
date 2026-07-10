import { motion } from 'framer-motion';
import { Code2, Bug, Zap, GitBranch, Brain, Shield, MessageSquare, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Intelligent Autocomplete',
    description: 'AI-powered code suggestions that understand your intent. Get whole-line and multi-line completions as you type.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Bug,
    title: 'Instant Bug Detection',
    description: 'Catch bugs before they bite. Real-time error detection and one-click fixes that save hours of debugging.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Brain,
    title: 'Natural Language to Code',
    description: 'Describe what you want in plain English and watch CodePilot generate production-ready code instantly.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: GitBranch,
    title: 'Smart Refactoring',
    description: 'Restructure your codebase with confidence. AI-suggested refactors that improve quality without breaking changes.',
    gradient: 'from-primary-500 to-teal-500',
  },
  {
    icon: MessageSquare,
    title: 'Inline Chat Assistant',
    description: 'Ask questions about your code, get explanations, and receive suggestions — right inside your editor.',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Security Scanning',
    description: 'Automatically detect vulnerabilities and security issues in real-time with AI-powered security analysis.',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    icon: Lightbulb,
    title: 'Context-Aware Docs',
    description: 'Never leave your editor for documentation. Get relevant docs and examples surfaced automatically.',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-100ms response times. CodePilot runs locally and in the cloud for zero-latency AI assistance.',
    gradient: 'from-primary-400 to-accent-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary-600/5 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Zap className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to{' '}
            <span className="gradient-text">code smarter</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            CodePilot isn't just another autocomplete tool. It's a complete AI coding partner that
            understands your codebase, anticipates your needs, and helps you ship with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group glass rounded-2xl p-6 card-hover relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed group-hover:text-surface-400 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
