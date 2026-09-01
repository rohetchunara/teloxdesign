import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal } from '@/components/reveal';

const services = [
  {
    icon: 'Code2',
    title: 'Web Development',
    shortDesc: 'Custom websites built with modern frameworks for speed and scalability.',
    fullDesc: 'We build custom websites and web applications using modern frameworks like React and Next.js. Every line of code is written for performance, scalability, and maintainability. From marketing sites to complex dashboards, we engineer solutions that grow with your business.',
    features: ['React & Next.js', 'Headless CMS', 'E-commerce', 'API Integration'],
  },
  {
    icon: 'Palette',
    title: 'UI/UX Design',
    shortDesc: 'Beautiful, intuitive interfaces that convert visitors into customers.',
    fullDesc: 'Great design is invisible. We craft intuitive interfaces that guide users naturally toward their goals. Our process includes user research, wireframing, prototyping, and comprehensive design systems — all tested and refined until the experience feels effortless.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: 'Rocket',
    title: 'SaaS Platforms',
    shortDesc: 'End-to-end SaaS product development from MVP to full launch.',
    fullDesc: 'From zero to launch and beyond. We build SaaS platforms with subscription billing, admin dashboards, and scalable architecture that handles growth gracefully. Whether it\'s an MVP or a multi-tenant enterprise product, we engineer for reliability from day one.',
    features: ['MVP Development', 'Subscription Billing', 'Admin Dashboards', 'Scalable Architecture'],
  },
  {
    icon: 'LineChart',
    title: 'SEO & Growth',
    shortDesc: 'Data-driven optimization to rank higher and grow organically.',
    fullDesc: 'Visibility is everything. We combine technical SEO, content strategy, and analytics setup to build sustainable organic growth. Every change is measured, every hypothesis tested, and every win documented so you understand exactly what moves the needle.',
    features: ['Technical SEO', 'Content Strategy', 'Analytics Setup', 'Conversion Optimization'],
  },
  {
    icon: 'Layers',
    title: 'Branding',
    shortDesc: 'Cohesive brand identities that make your business unforgettable.',
    fullDesc: 'Your brand is more than a logo. We develop complete visual identities — from typography and color systems to brand guidelines and asset creation — that ensure every touchpoint feels considered, cohesive, and unmistakably yours.',
    features: ['Logo & Identity', 'Brand Guidelines', 'Visual Language', 'Asset Creation'],
  },
  {
    icon: 'Zap',
    title: 'Automation',
    shortDesc: 'Streamline operations with custom integrations and workflows.',
    fullDesc: 'Eliminate repetitive work and reduce human error with custom automation. We design workflows, integrate APIs, set up CRMs, and build process automation that saves your team hours every week — time better spent on work that actually matters.',
    features: ['Workflow Design', 'API Integration', 'CRM Setup', 'Process Automation'],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Palette: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  Rocket: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  LineChart: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  Layers: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Zap: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
};

export function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const service = services[currentIndex];
  const Icon = iconMap[service.icon];

  const goTo = (index: number) => {
    setExpanded(false);
    setCurrentIndex(index);
  };

  const next = () => goTo((currentIndex + 1) % services.length);
  const prev = () => goTo((currentIndex - 1 + services.length) % services.length);

  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Our Services</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
            What we <span className="text-gradient">build</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Full-stack digital services to take your business from idea to impact.
          </p>
        </Reveal>

        {/* Single Service View */}
        <Reveal>
          <div className="relative">
            <div className="rounded-3xl bg-card/40 border border-border overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Service</div>
                    <h3 className="text-3xl md:text-4xl font-display font-semibold text-white">{service.title}</h3>
                  </div>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  {service.shortDesc}
                </p>
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex items-center gap-2">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Expanded Service View */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
            >
              <div className="min-h-screen px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  <button
                    onClick={() => setExpanded(false)}
                    className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Close
                  </button>

                  <div className="rounded-3xl overflow-hidden bg-card/40 border border-border">
                    <div className="p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Service</div>
                          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">{service.title}</h2>
                        </div>
                      </div>
                      <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        {service.fullDesc}
                      </p>
                      <div className="space-y-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            {f}
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* In-expanded navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={prev}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous Service
                    </button>
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
                    >
                      Next Service
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <Reveal className="mt-20">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-card/60 to-secondary/40 border border-border overflow-hidden text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Not sure which service you need?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Book a free consultation and we'll help you map out the right plan for your business.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Book a Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
