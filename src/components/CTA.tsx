import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-primary-900/40 to-accent-600/20" />
          <div className="absolute inset-0 noise-bg" />
          
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-500/15 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-500/10 blur-[80px]" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10" />

          <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-16 sm:py-20 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to code at the{' '}
              <span className="gradient-text-hero">speed of thought</span>?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-surface-300/80 mb-10 leading-relaxed">
              Join 50,000+ developers who've already transformed their workflow. Start for free — 
              no credit card required. Upgrade anytime.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/signup"
                className="btn-primary group px-8 py-4 text-base font-semibold text-white rounded-2xl inline-flex items-center gap-2.5 w-full sm:w-auto justify-center"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 text-base font-semibold text-surface-300 hover:text-white rounded-2xl inline-flex items-center gap-2.5 glass card-hover w-full sm:w-auto justify-center"
              >
                Sign In
              </Link>
            </div>

            <p className="text-sm text-surface-500">
              Free forever plan available · No credit card required · Setup in 2 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
