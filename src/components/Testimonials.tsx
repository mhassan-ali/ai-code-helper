import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Engineer at Stripe',
    avatar: 'SC',
    avatarGradient: 'from-emerald-400 to-teal-600',
    quote: 'CodePilot has completely transformed my workflow. I ship features in half the time and the code quality is consistently excellent. It\'s like having a brilliant pair programmer available 24/7.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CS Student at MIT',
    avatar: 'MJ',
    avatarGradient: 'from-amber-400 to-orange-600',
    quote: 'As a student, CodePilot helps me understand complex concepts by generating examples and explanations. My grades improved dramatically and I actually enjoy coding now.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Tech Lead at Startup',
    avatar: 'ER',
    avatarGradient: 'from-sky-400 to-blue-600',
    quote: 'We rolled out CodePilot to our 15-person team. Within a month, our sprint velocity increased by 40%. The code review suggestions alone save us hours every week.',
    rating: 5,
  },
  {
    name: 'Akira Tanaka',
    role: 'Freelance Developer',
    avatar: 'AT',
    avatarGradient: 'from-rose-400 to-red-600',
    quote: 'As a freelancer, time is money. CodePilot helps me deliver projects faster and take on more clients. The ROI was immediate — paid for itself in the first week.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'DevOps Engineer at AWS',
    avatar: 'PP',
    avatarGradient: 'from-primary-400 to-primary-600',
    quote: 'The infrastructure-as-code suggestions are incredible. CodePilot understands Terraform and CloudFormation better than most engineers I know. A must-have tool.',
    rating: 5,
  },
  {
    name: 'James O\'Brien',
    role: 'Indie App Developer',
    avatar: 'JO',
    avatarGradient: 'from-yellow-400 to-amber-600',
    quote: 'I built my entire SaaS app with CodePilot as my copilot. From the API layer to the React frontend, it understood my vision and helped me ship in 3 months instead of 6.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-[130px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-primary-600/5 blur-[120px]" />
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
            <Quote className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300 uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Loved by{' '}
            <span className="gradient-text">developers worldwide</span>
          </h2>
          <p className="text-lg text-surface-400 leading-relaxed">
            Don't just take our word for it. Here's what developers are saying about CodePilot.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass rounded-2xl p-7 card-hover relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary-500/10">
                <Quote className="w-8 h-8" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent-400 fill-accent-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-surface-400 leading-relaxed mb-6 group-hover:text-surface-300 transition-colors duration-300">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs text-surface-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
