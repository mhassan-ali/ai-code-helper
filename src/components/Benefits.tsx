import { motion } from 'framer-motion';
import { Clock, TrendingUp, Coffee, Users, Cpu, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Save 5+ Hours Weekly',
    description: 'Stop writing boilerplate and debugging trivial issues. CodePilot handles the repetitive work so you can focus on what matters.',
    stat: '5h+',
    statLabel: 'saved per week',
  },
  {
    icon: TrendingUp,
    title: 'Ship 10x Faster',
    description: 'From idea to deployment in record time. Our AI understands your codebase context and generates code that fits perfectly.',
    stat: '10x',
    statLabel: 'faster delivery',
  },
  {
    icon: Coffee,
    title: 'Reduce Burnout',
    description: 'No more frustrating debugging sessions or endless Stack Overflow searches. Let AI handle the tedious parts of coding.',
    stat: '67%',
    statLabel: 'less frustration',
  },
  {
    icon: Users,
    title: 'Better Collaboration',
    description: 'Consistent code style, auto-generated documentation, and intelligent code reviews make teamwork seamless.',
    stat: '3x',
    statLabel: 'faster reviews',
  },
  {
    icon: Cpu,
    title: 'Works Everywhere',
    description: 'VS Code, JetBrains, Neovim, and more. CodePilot integrates with your favorite tools and 50+ languages.',
    stat: '50+',
    statLabel: 'languages supported',
  },
  {
    icon: Globe,
    title: 'Privacy First',
    description: 'Your code stays yours. We never train on your proprietary code and offer on-premise deployment for enterprise teams.',
    stat: 'SOC2',
    statLabel: 'compliant',
  },
];

export default function Benefits() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-primary-600/5 blur-[150px]" />
      </div>

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
            <TrendingUp className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Why developers{' '}
            <span className="gradient-text">love CodePilot</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            Join thousands of developers who've transformed their workflow with AI-powered coding assistance.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass rounded-2xl p-7 card-hover relative overflow-hidden"
            >
              {/* Stat highlight */}
              <div className="absolute top-6 right-6 text-right">
                <div className="text-2xl font-bold gradient-text">{benefit.stat}</div>
                <div className="text-[10px] text-surface-600 font-medium uppercase tracking-wider">{benefit.statLabel}</div>
              </div>

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 pr-16">{benefit.title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed group-hover:text-surface-400 transition-colors duration-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
