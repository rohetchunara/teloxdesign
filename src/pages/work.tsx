import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal } from '@/components/reveal';

const projects = [
  {
    title: 'Nimbus Analytics',
    category: 'SaaS Platform',
    shortDesc: 'Real-time analytics dashboard for SaaS companies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
  },
  {
    title: 'Vault Banking',
    category: 'Fintech Web App',
    shortDesc: 'Digital banking with budgeting tools and instant transfers.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=800&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Plaid'],
  },
  {
    title: 'Lumen Commerce',
    category: 'E-commerce',
    shortDesc: 'Headless commerce with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    tags: ['Shopify', 'React', 'GraphQL', 'AI'],
  },
  {
    title: 'Atlas CRM',
    category: 'SaaS Platform',
    shortDesc: 'CRM built for agencies with pipeline management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    tags: ['Vue.js', 'Supabase', 'Tailwind', 'Vercel'],
  },
  {
    title: 'Orbit Health',
    category: 'Healthcare App',
    shortDesc: 'Telehealth platform connecting patients with doctors.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
    tags: ['React Native', 'WebRTC', 'Firebase', 'Node.js'],
  },
  {
    title: 'Forge Studio',
    category: 'Branding & Web',
    shortDesc: 'Complete brand identity and marketing website.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    tags: ['Branding', 'Webflow', 'Motion', 'SEO'],
  },
  {
    title: 'Crosus',
    category: 'Artisanal E-Commerce',
    shortDesc: 'Boutique e-commerce platform for handcrafted crochet business in Nepal.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    tags: ['E-Commerce', 'Branding', 'Webflow', 'Nepal'],
  },
  {
    title: 'Nikon the Beats',
    category: 'Sonic Architecture & Audio Production',
    shortDesc: 'Atmospheric web application for a premier music producer and audio engineer based in Nepal.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop',
    tags: ['Web App', 'Audio Platform', 'UI/UX', 'Nepal'],
  },
];

const caseStudies: Record<string, { sections: { image: string; title: string; desc: string }[] }> = {
  'Nimbus Analytics': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'SaaS founders were drowning in spreadsheets. Metrics lived in five different tools, and decisions were delayed by hours of manual reporting. The client needed a single source of truth that could keep up with their growth.',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We designed a real-time analytics layer around their existing data warehouse. Using Node.js streams and PostgreSQL, we built a pipeline that refreshes dashboards in under 200ms. D3.js visualizations were optimized to render thousands of points without jank.',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'The team now tracks MRR, churn, and engagement from one place. Decision time dropped from hours to minutes. The dashboard became the single most-used internal tool within the first week of launch.',
      },
    ],
  },
  'Vault Banking': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'Personal finance tools felt either too simple or too complex. The client wanted a banking experience that felt premium but remained approachable for everyday users.',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We rebuilt the interface from scratch with a focus on clarity and trust. Stripe and Plaid were integrated for seamless payments and bank connectivity. Every interaction was tested for accessibility and speed.',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f2?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'A digital banking product that feels as secure as it looks. Users reported higher confidence in managing finances, and the client saw a 40% increase in daily active users within the first month.',
      },
    ],
  },
  'Lumen Commerce': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'The client\'s existing storefront was slow and inflexible. They needed a headless setup that could support custom storefronts while keeping the backend reliable.',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We architected a headless commerce layer with Shopify as the backend and React for the storefront. GraphQL gave us precise control over data fetching, and AI recommendation models were trained on their catalog to personalize every visit.',
      },
      {
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'Page load times dropped by 60%, and conversion rates improved by 24%. The client now runs seasonal campaigns without touching the backend.',
      },
    ],
  },
  'Atlas CRM': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'Agencies were using CRMs built for sales teams, not creative teams. The client needed a tool that understood pipelines, client portals, and automated reporting — without the bloat.',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We built Atlas CRM from the ground up with Vue.js and Supabase. Real-time collaboration was a first-class feature, not an afterthought. The interface was stripped down to what agencies actually use.',
      },
      {
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'Agencies now onboard clients in half the time. Automated reporting freed up roughly 10 hours per week per team. The CRM became the central nervous system of their operations.',
      },
    ],
  },
  'Orbit Health': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'Patients struggled to connect with doctors. Existing telehealth platforms were clunky, unreliable, and often non-compliant with healthcare regulations.',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We built a HIPAA-compliant telehealth platform with React Native and WebRTC. Sub-second latency was non-negotiable. Firebase managed real-time presence, while Node.js handled the scheduling backend.',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'Doctors and patients connect in under 3 clicks. Appointment no-shows dropped by 35%. The platform now serves thousands of consultations per month with 99.9% uptime.',
      },
    ],
  },
  'Forge Studio': {
    sections: [
      {
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
        title: 'The Challenge',
        desc: 'Forge Studio had the creative talent but not the digital presence to match. Their existing website didn\'t reflect the quality of their work.',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        title: 'Our Approach',
        desc: 'We delivered a complete brand identity system — logo, typography, color language — and built a marketing site on Webflow with motion design and SEO baked in from day one.',
      },
      {
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=800&fit=crop',
        title: 'The Result',
        desc: 'The new identity and site became their best sales tool. Inbound leads increased by 70%, and the studio started getting recognized at industry events.',
      },
    ],
  },
};

export function WorkPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<'list' | 'study'>('list');
  const navigate = useNavigate();
  const project = projects[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setView('list');
  };

  const next = () => goTo((currentIndex + 1) % projects.length);
  const prev = () => goTo((currentIndex - 1 + projects.length) % projects.length);

  const openStudy = () => {
    if (project.title === 'Crosus') {
      navigate('/work/crosus');
    } else if (project.title === 'Nikon the Beats') {
      navigate('/work/nikon-the-beats');
    } else {
      setView('study');
    }
  };
  const closeStudy = () => setView('list');

  const study = caseStudies[project.title];

  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Our Work</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
            Projects we're <span className="text-gradient">proud of</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of products we've designed and built for clients across industries.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Single Project View */}
              <Reveal>
                <div className="relative">
                  <div className="rounded-3xl bg-card/40 border border-border overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden bg-secondary/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        width="1200"
                        height="800"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>

                    <div className="p-8 md:p-12">
                      <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {project.shortDesc}
                      </p>
                      <button
                        onClick={openStudy}
                        className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                      >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4" />
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
                      {projects.map((_, i) => (
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
            </motion.div>
          ) : (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Case Study View */}
              <div className="rounded-3xl bg-card/40 border border-border overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      width="1200"
                      height="800"
                      className="w-full h-full object-cover"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                      {project.category}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                      {project.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  {study?.sections.map((section, i) => {
                    const isReversed = i % 2 === 1;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 last:mb-0"
                      >
                        <div className={isReversed ? 'md:order-2' : 'md:order-1'}>
                          <div className="rounded-2xl overflow-hidden border border-border">
                            <img
                              src={section.image}
                              alt={section.title}
                              width="1200"
                              height="800"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                        <div className={isReversed ? 'md:order-1' : 'md:order-2'}>
                          <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
                            {section.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {section.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/50 border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prev}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Project
                </button>
                <button
                  onClick={closeStudy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                  Close Study
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  Next Project
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <Reveal className="mt-20 text-center">
          <p className="text-muted-foreground text-lg mb-6">Want to be our next success story?</p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Let's Talk
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
