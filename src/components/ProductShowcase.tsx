import { motion } from 'framer-motion';
import { Terminal, FileCode, Braces, Wand2 } from 'lucide-react';

const capabilities = [
  {
    icon: Wand2,
    title: 'Natural Language → Production Code',
    input: '"Create a REST API with auth middleware and rate limiting"',
    output: `// Express API with JWT auth & rate limiting
const express = require('express');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch { res.status(403).json({ error: 'Invalid token' }); }
};`,
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    icon: Terminal,
    title: 'Smart Debugging & Error Resolution',
    input: 'TypeError: Cannot read property "map" of undefined at UserList',
    output: `// Fix: Add null check before mapping
// Before: {users.map(user => <UserCard key={user.id} />)}
// After:
{users?.map(user => <UserCard key={user.id} />) ?? <EmptyState />}

// 💡 Better approach: Add proper typing & default
interface UserListProps {
  users?: User[];  // Make optional
}

const UserList: React.FC<UserListProps> = ({ users = [] }) => {
  if (users.length === 0) return <EmptyState />;
  return users.map(user => <UserCard key={user.id} user={user} />);
};`,
    gradient: 'from-rose-500 to-orange-500',
  },
];

export default function ProductShowcase() {
  return (
    <section id="product" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-accent-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-primary-600/5 blur-[120px]" />
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
            <FileCode className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300 uppercase tracking-wider">Product</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            See CodePilot in{' '}
            <span className="gradient-text">action</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            From natural language to production-ready code. Watch how CodePilot transforms the way you write software.
          </p>
        </motion.div>

        {/* Showcase Items */}
        <div className="space-y-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center`}>
                  <cap.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{cap.title}</h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                {/* Input */}
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-surface-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-surface-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-surface-700" />
                    </div>
                    <span className="text-xs text-surface-600 ml-2">Input</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Braces className="w-3.5 h-3.5 text-primary-400" />
                      </div>
                      <p className="text-surface-300 text-sm font-mono leading-relaxed">{cap.input}</p>
                    </div>
                  </div>
                </div>

                {/* Output */}
                <div className="glass rounded-2xl overflow-hidden border-primary-500/10">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-primary-400 ml-2 font-medium">✨ CodePilot Output</span>
                  </div>
                  <div className="p-5 overflow-x-auto">
                    <pre className="text-xs sm:text-sm font-mono text-surface-400 leading-6 whitespace-pre-wrap">
                      {cap.output}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
