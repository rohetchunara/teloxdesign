import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Palette, Rocket, LineChart, Layers, Zap } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal';

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Custom websites built with modern frameworks for speed and scalability.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that convert visitors into customers.' },
  { icon: Rocket, title: 'SaaS Platforms', desc: 'End-to-end SaaS product development from MVP to full launch.' },
  { icon: LineChart, title: 'SEO & Growth', desc: 'Data-driven optimization to rank higher and grow organically.' },
  { icon: Layers, title: 'Branding', desc: 'Cohesive brand identities that make your business unforgettable.' },
  { icon: Zap, title: 'Automation', desc: 'Streamline operations with custom integrations and workflows.' },
];

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '9+', label: 'Clients' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
];

const process = [
  { step: '01', title: 'Discover', desc: 'We dive deep into your business, goals, and audience to define the right strategy.' },
  { step: '02', title: 'Design', desc: 'Wireframes, prototypes, and polished designs that bring your vision to life.' },
  { step: '03', title: 'Build', desc: 'Clean, scalable code and rigorous testing ensure a flawless product.' },
  { step: '04', title: 'Launch', desc: 'We deploy, monitor, and optimize for performance and growth.' },
];

export function HomePage() {
  return (
    <section className="relative">
      {/* Hero is rendered at the App level */}

      {/* Services preview */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Services that <span className="text-gradient">deliver results</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to launch, we cover every aspect of your digital presence.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <RevealItem key={service.title}>
                <div className="group relative p-8 rounded-2xl bg-card/40 border border-border hover:border-primary/40 transition-all duration-500 hover:bg-card/60 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="text-center mt-12" delay={0.2}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            >
              Explore all services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative py-20 px-6 border-y border-border/50 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl font-display font-bold text-gradient">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-widest">How We Work</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              A proven <span className="text-gradient">process</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="relative">
                  <div className="text-6xl font-display font-bold text-primary/20 mb-4">{p.step}</div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-border" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 md:p-20 rounded-3xl bg-gradient-to-br from-card/60 to-secondary/40 border border-border overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                Ready to build something <span className="text-gradient">great?</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                Let's turn your idea into a product your users will love. No friction, no fluff — just results.
              </p>
              <Link
                to="/contact"
                className="group mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Start a Project
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </section>
  );
}
