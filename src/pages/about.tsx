import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Award, Rocket, Zap, Code2, Palette, LineChart, Layers, Target, Eye } from 'lucide-react';
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

const milestones = [
  { year: '2024', title: 'Foundation', desc: 'Telox Design established with a vision to democratize digital craftsmanship' },
  { year: '2025', title: 'First Clients', desc: 'Delivered 10+ projects for local and international businesses' },
  { year: '2026', title: 'Growth', desc: 'Expanded services and built a reputation for excellence' },
];

export function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* 1. Compelling Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary font-mono text-sm uppercase tracking-widest inline-block mb-6"
            >
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05] mb-8"
            >
              We build digital products that <span className="text-gradient">businesses rely on</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Telox Design combines strategy, design, and engineering to ship products that move the needle.
              Great software should be accessible to every business — that's the baseline we design for.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-300"
              >
                View Our Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-primary/40 transition-all duration-300"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-3xl border border-border overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
        </motion.div>

        {/* Mission & Vision */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <RevealItem>
            <div className="p-8 rounded-2xl border border-border bg-card/40 hover:border-primary/40 transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize digital craftsmanship by making high-quality design and engineering accessible to every business, regardless of size or budget.
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="p-8 rounded-2xl border border-border bg-card/40 hover:border-primary/40 transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the go-to partner for businesses that want to build digital products that users love and that drive real, measurable growth.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>

        {/* 2. Strategic Framework & Growth Chart */}
        <section className="relative mb-32">
          <Reveal className="text-center mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-widest">Strategic Framework</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Growth & <span className="text-gradient">Trajectory</span>
            </h2>
          </Reveal>

          {/* Interactive Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full border border-border p-1 bg-card/20">
              {['Strategy', 'Engineering', 'Design'].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Area */}
          <Reveal>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-border bg-card/40 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center p-6 rounded-2xl bg-card/20 border border-border">
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Client Retention</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-card/20 border border-border">
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-card/20 border border-border">
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">3x</div>
                  <div className="text-sm text-muted-foreground">Avg. Conversion Lift</div>
                </div>
              </div>
              {/* Chart placeholder with loading animation */}
              <div className="relative h-48 rounded-2xl bg-card/20 border border-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/20 to-primary/5"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">Performance Metrics</span>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Milestones */}
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {milestones.map((m) => (
              <RevealItem key={m.year}>
                <div className="p-6 rounded-2xl border border-border bg-card/40 hover:border-primary/40 transition-all duration-300">
                  <span className="text-primary font-mono text-sm">{m.year}</span>
                  <h3 className="text-xl font-display font-semibold text-white mt-2 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* 3. Services Grid */}
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

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm uppercase tracking-widest">The Founder</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Meet the <span className="text-gradient">founder</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-card/40 border border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
                  <img
                    src="https://i.postimg.cc/7P0Btd6V/20260414_160314_0000.png"
                    alt="Rohet Chunara"
                    width="600"
                    height="750"
                    className="w-full h-full object-cover grayscale"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Rohet Chunara</h3>
                  <p className="text-primary font-mono text-sm uppercase tracking-widest mb-6">Founder</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Rohet founded Telox Design with a clear vision: make high-quality digital craftsmanship accessible to every business. He believes great design and solid engineering aren't luxuries — they're the baseline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <section className="relative py-32 px-6">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 md:p-20 rounded-3xl bg-gradient-to-br from-card/60 to-secondary/40 border border-border overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative">
                <Award className="w-10 h-10 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                  Want to work with us?
                </h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                  We're always looking for new challenges and great partners.
                </p>
                <Link
                  to="/contact"
                  className="group mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  );
}
