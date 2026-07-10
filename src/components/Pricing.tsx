import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started and personal projects.',
    gradient: 'from-surface-600 to-surface-500',
    features: [
      '50 AI completions/day',
      'Basic code generation',
      'Single IDE support',
      'Community support',
      '5 languages',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'glass hover:bg-white/10 text-white',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    price: '$19',
    period: '/month',
    description: 'For professional developers who want the full power of AI.',
    gradient: 'from-primary-500 to-accent-500',
    features: [
      'Unlimited AI completions',
      'Advanced code generation',
      'All IDEs supported',
      'Priority support',
      '50+ languages',
      'Smart refactoring',
      'Inline chat assistant',
      'Security scanning',
    ],
    cta: 'Start Pro Trial',
    ctaStyle: 'btn-primary text-white',
    popular: true,
  },
  {
    name: 'Team',
    icon: Building2,
    price: '$49',
    period: '/seat/month',
    description: 'For teams that want to scale with AI-powered collaboration.',
    gradient: 'from-teal-500 to-emerald-600',
    features: [
      'Everything in Pro',
      'Team analytics dashboard',
      'Shared codebase context',
      'Centralized billing',
      'SSO & SAML',
      'Custom AI models',
      'On-premise option',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'glass hover:bg-white/10 text-white border-primary-500/20 hover:border-primary-500/40',
    popular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-600/5 blur-[180px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Zap className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300 uppercase tracking-wider">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-surface-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/15"
            aria-label="Toggle annual pricing"
          >
            <motion.div
              animate={{ x: isAnnual ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-primary-400"
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-surface-500'}`}>
            Annual
            <span className="ml-1.5 text-xs font-semibold text-primary-400 bg-primary-400/10 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative glass rounded-2xl p-7 sm:p-8 card-hover ${
                plan.popular ? 'border-primary-500/30 ring-1 ring-primary-500/20' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-xs font-semibold text-white shadow-lg shadow-primary-500/25">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-surface-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {isAnnual && plan.price !== '$0'
                      ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                      : plan.price}
                  </span>
                  <span className="text-sm text-surface-500">{plan.period}</span>
                </div>
                {isAnnual && plan.price !== '$0' && (
                  <p className="text-xs text-surface-600 mt-1">
                    Billed annually (${Math.round(parseInt(plan.price.slice(1)) * 0.8 * 12)}/year)
                  </p>
                )}
              </div>

              {/* CTA */}
              <Link
                to="/signup"
                className={`block text-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 mb-6 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-surface-400">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary-400' : 'text-surface-600'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
