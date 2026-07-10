import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does CodePilot work?',
    answer: 'CodePilot uses advanced AI models (including GPT-4o and Claude 3.5) trained on billions of lines of code. It analyzes your codebase context in real-time and provides intelligent suggestions, completions, and explanations right inside your editor. Simply start typing or describe what you want in natural language.',
  },
  {
    question: 'Is my code private and secure?',
    answer: 'Absolutely. We take privacy seriously. Your code is never stored or used for training. All data is encrypted in transit and at rest. We\'re SOC2 Type II compliant and offer on-premise deployment for enterprise teams that need complete data sovereignty.',
  },
  {
    question: 'Which IDEs and editors are supported?',
    answer: 'CodePilot supports VS Code, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), Neovim, Sublime Text, and more. We also offer a CLI tool for terminal-based workflows and a web app for browser-based coding.',
  },
  {
    question: 'What programming languages does CodePilot support?',
    answer: 'CodePilot supports 50+ programming languages including Python, JavaScript, TypeScript, Go, Rust, Java, C++, C#, Ruby, PHP, Swift, Kotlin, and many more. Our AI models are trained on diverse codebases and understand language-specific idioms and best practices.',
  },
  {
    question: 'Can I use CodePilot for free?',
    answer: 'Yes! Our Free plan includes 50 AI completions per day, basic code generation, and support for 5 programming languages. It\'s perfect for personal projects and learning. Upgrade to Pro anytime for unlimited access and advanced features.',
  },
  {
    question: 'How accurate are the AI suggestions?',
    answer: 'Our AI achieves a 99.2% accuracy rate on accepted suggestions. The more you use CodePilot, the better it understands your coding style and preferences. You can always review, modify, or reject any suggestion before accepting it.',
  },
  {
    question: 'Does CodePilot work offline?',
    answer: 'Our Pro and Team plans include a local model option for basic completions that works offline. For advanced features like natural language to code and complex refactoring, an internet connection is required to access our cloud AI models.',
  },
  {
    question: 'How is CodePilot different from GitHub Copilot?',
    answer: 'CodePilot offers several unique advantages: inline chat assistance, real-time security scanning, smart refactoring suggestions, team analytics, and on-premise deployment options. We also support more IDEs and provide better context understanding across your entire codebase.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass rounded-xl overflow-hidden card-hover"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold text-white pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-surface-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 -mt-1">
              <p className="text-sm text-surface-400 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary-600/5 blur-[130px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            Everything you need to know about CodePilot. Can't find an answer?{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4">
              Contact us
            </a>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
