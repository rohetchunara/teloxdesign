import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  LineChart,
  Users,
  Palette,
  Rocket,
  Zap,
  X,
  ExternalLink,
  RotateCcw,
  Sparkles,
  GitBranch,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import GlassLogo3D from './GlassLogo3D';

export interface PlanetData {
  id: string;
  name: string;
  category: string;
  color: string;
  glowColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  icon: any;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  features: string[];
}

const PLANETS: PlanetData[] = [
  {
    id: 'code-repos',
    name: 'Code & Repositories',
    category: 'Development',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    orbitRadius: 150,
    orbitSpeed: 0.008,
    size: 22,
    icon: Code2,
    tagline: 'High-performance digital engines & open source repos',
    description:
      'Engineered with modern full-stack architectures, ultra-fast Vite/Next bundles, type-safe TypeScript models, and high-concurrency cloud backends.',
    stats: [
      { label: 'Lines of Code', value: '1.4M+' },
      { label: 'Public Repos', value: '120+' },
      { label: 'Avg Lighthouse Score', value: '99/100' },
      { label: 'Type Coverage', value: '100%' }
    ],
    technologies: ['TypeScript', 'React 18', 'Rust', 'Vite', 'Node.js', 'TailwindCSS'],
    features: [
      'Zero-latency bundle optimization',
      'Micro-frontend & decoupled API architecture',
      'Automated CI/CD test suites & security auditing'
    ]
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    category: 'Growth & ROI',
    color: '#e5e5e5',
    glowColor: 'rgba(255, 255, 255, 0.2)',
    orbitRadius: 230,
    orbitSpeed: 0.0055,
    size: 26,
    icon: LineChart,
    tagline: 'Data-driven roadmaps that convert strategy into revenue',
    description:
      'We align product architecture with revenue drivers, market positioning, and conversion rate optimization to build platforms that scale predictably.',
    stats: [
      { label: 'Avg Client ROI', value: '4.8x' },
      { label: 'Product Audits', value: '85+' },
      { label: 'Conversion Lift', value: '+340%' },
      { label: 'Retention Rate', value: '99%' }
    ],
    technologies: ['Cohort Analytics', 'Funnel Tracking', 'A/B Testing', 'Market Mapping'],
    features: [
      'Product-market fit calibration',
      'Scalable monetization models & subscription flows',
      'Executive KPI dashboards & custom telemetry'
    ]
  },
  {
    id: 'clients-partners',
    name: 'Clients & Partners',
    category: 'Ecosystem',
    color: '#d4d4d4',
    glowColor: 'rgba(255, 255, 255, 0.18)',
    orbitRadius: 310,
    orbitSpeed: 0.004,
    size: 24,
    icon: Users,
    tagline: 'Global brands, venture-backed startups & visionary founders',
    description:
      'Building long-term engineering and design partnerships with leaders in Fintech, AI, E-Commerce, and SaaS across 12 countries.',
    stats: [
      { label: 'Global Clients', value: '45+' },
      { label: 'NPS Score', value: '94' },
      { label: 'Countries Active', value: '12' },
      { label: 'Partner Years', value: '8+' }
    ],
    technologies: ['Dedicated Squads', 'Agile Sprints', 'Transparent Slack Channels', 'Jira/Linear'],
    features: [
      'Dedicated senior engineering & design squads',
      'Direct syncs with product founders and CTOs',
      'Continuous post-launch support and iteration'
    ]
  },
  {
    id: 'uiux-design',
    name: 'UI/UX Design Systems',
    category: 'Design Engineering',
    color: '#cccccc',
    glowColor: 'rgba(255, 255, 255, 0.15)',
    orbitRadius: 390,
    orbitSpeed: 0.003,
    size: 28,
    icon: Palette,
    tagline: 'Architectural design tokens, glassmorphism & fluid motion',
    description:
      'Crafting bespoke visual identities, high-contrast dark modes, interactive micro-animations, and complete reusable component libraries.',
    stats: [
      { label: 'Figma Tokens', value: '850+' },
      { label: 'Design Awards', value: '14' },
      { label: 'A11y Score', value: '100%' },
      { label: 'Component Library', value: '60+ Components' }
    ],
    technologies: ['Figma API', 'Framer Motion', 'Radix Primitives', 'CSS Variables', 'GLSL Shaders'],
    features: [
      'Bespoke design systems with unified design tokens',
      'Fluid micro-interactions and tactile feedback',
      'Strict WCAG 2.1 AAA accessibility compliance'
    ]
  },
  {
    id: 'saas-platforms',
    name: 'SaaS Platforms',
    category: 'Product Scaling',
    color: '#b8b8b8',
    glowColor: 'rgba(255, 255, 255, 0.12)',
    orbitRadius: 470,
    orbitSpeed: 0.0022,
    size: 30,
    icon: Rocket,
    tagline: 'End-to-end cloud platforms built to scale to millions of users',
    description:
      'From zero to MVP launch and multi-tenant cloud enterprise solutions. Seamless payment gateways, RBAC security, and automated database sharding.',
    stats: [
      { label: 'SaaS Apps Shipped', value: '18' },
      { label: 'Peak Concurrency', value: '1.2M Users' },
      { label: 'Avg API Latency', value: '<24ms' },
      { label: 'System Uptime', value: '99.99%' }
    ],
    technologies: ['Next.js', 'Supabase', 'PostgreSQL', 'Stripe API', 'Docker', 'AWS'],
    features: [
      'Multi-tenant database architecture & row-level security',
      'Stripe subscription & automated billing engine',
      'Real-time WebSocket sync and collaborative editing'
    ]
  },
  {
    id: 'automation-ai',
    name: 'Automation & AI',
    category: 'Intelligent Systems',
    color: '#a3a3a3',
    glowColor: 'rgba(255, 255, 255, 0.1)',
    orbitRadius: 550,
    orbitSpeed: 0.0016,
    size: 24,
    icon: Zap,
    tagline: 'Autonomous AI agents & high-efficiency backend workflows',
    description:
      'Embedding LLMs, custom vector search embeddings, background worker queues, and automated operational pipelines into existing products.',
    stats: [
      { label: 'Workflows Automated', value: '350+' },
      { label: 'Time Saved / Mo', value: '4,200 hrs' },
      { label: 'Vector Database', value: 'PgVector' },
      { label: 'AI Models Integrated', value: 'OpenAI / Claude / Gemini' }
    ],
    technologies: ['LangChain', 'Python', 'Redis Queues', 'FastAPI', 'Vector Search'],
    features: [
      'Custom RAG knowledge pipelines and AI assistants',
      'Event-driven background task processing',
      'Self-healing automated regression & API monitors'
    ]
  }
];

interface TeloxUniverseProps {
  onClose: () => void;
}

export function TeloxUniverse({ onClose }: TeloxUniverseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePlanet, setActivePlanet] = useState<PlanetData | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const anglesRef = useRef<{ [key: string]: number }>({
    'code-repos': 0.2,
    'business-strategy': 1.4,
    'clients-partners': 2.8,
    'uiux-design': 4.1,
    'saas-platforms': 5.2,
    'automation-ai': 0.9
  });

  const starsRef = useRef<{ x: number; y: number; size: number; alpha: number; speed: number }[]>([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2 + dragOffset.x;
      const centerY = height / 2 + dragOffset.y;

      ctx.clearRect(0, 0, width, height);

      const spaceGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, width * 0.8);
      spaceGrad.addColorStop(0, '#0a0d16');
      spaceGrad.addColorStop(0.5, '#05070c');
      spaceGrad.addColorStop(1, '#020305');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoomLevel, zoomLevel);

      for (const star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        const twinkle = Math.sin(time * 0.002 * star.speed * 100 + star.x) * 0.25;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.max(0.1, star.alpha + twinkle))})`;
        ctx.fill();
      }

      if (!isPaused) {
        for (const planet of PLANETS) {
          const speedMultiplier = hoveredPlanet?.id === planet.id ? 0.2 : 1;
          anglesRef.current[planet.id] += planet.orbitSpeed * speedMultiplier * (dt * 60);
        }
      }

      for (const planet of PLANETS) {
        const isHovered = hoveredPlanet?.id === planet.id;
        const isActive = activePlanet?.id === planet.id;

        ctx.beginPath();
        ctx.arc(0, 0, planet.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered || isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = isHovered || isActive ? 1.2 : 0.5;
        if (!isHovered && !isActive) {
          ctx.setLineDash([2, 8]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        if (isHovered || isActive) {
          ctx.beginPath();
          ctx.arc(0, 0, planet.orbitRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 6;
          ctx.stroke();
        }
      }

      const sunGlowRad = 65 + Math.sin(time * 0.003) * 6;
      const sunGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, sunGlowRad + 40);
      sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      sunGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
      sunGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
      sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunGlowRad + 40, 0, Math.PI * 2);
      ctx.fill();

      const targetPlanet = hoveredPlanet || activePlanet;
      if (targetPlanet) {
        const angle = anglesRef.current[targetPlanet.id];
        const px = Math.cos(angle) * targetPlanet.orbitRadius;
        const py = Math.sin(angle) * targetPlanet.orbitRadius;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (const planet of PLANETS) {
        const angle = anglesRef.current[planet.id];
        const px = Math.cos(angle) * planet.orbitRadius;
        const py = Math.sin(angle) * planet.orbitRadius;
        const isHovered = hoveredPlanet?.id === planet.id;
        const isActive = activePlanet?.id === planet.id;

        const auraGrad = ctx.createRadialGradient(px, py, planet.size * 0.4, px, py, planet.size * 1.6);
        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        auraGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(px, py, planet.size * (isHovered ? 1.8 : 1.4), 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, planet.size * (isHovered ? 1.1 : 0.9), 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isActive ? '#ffffff' : '#a3a3a3';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px - planet.size * 0.3, py - planet.size * 0.3, planet.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();

        const moonCount = 1;
        for (let m = 0; m < moonCount; m++) {
          const moonAngle = time * 0.002 * (m + 1) + m * Math.PI;
          const moonDist = planet.size * 1.4 + m * 6;
          const mx = px + Math.cos(moonAngle) * moonDist;
          const my = py + Math.sin(moonAngle) * moonDist;

          ctx.beginPath();
          ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
        }

        ctx.font = `${isHovered ? '600 12px' : '400 10px'} "General Sans", sans-serif`;
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, px, py + planet.size + (isHovered ? 18 : 14));
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [dragOffset, zoomLevel, isPaused, hoveredPlanet, activePlanet]);

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (isDraggingRef.current) {
        const dx = touch.clientX - dragStartRef.current.x;
        const dy = touch.clientY - dragStartRef.current.y;
        setDragOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;
      const centerX = canvas.width / 2 + dragOffset.x;
      const centerY = canvas.height / 2 + dragOffset.y;

      const relX = (mx - centerX) / zoomLevel;
      const relY = (my - centerY) / zoomLevel;

      let found: PlanetData | null = null;
      for (const planet of PLANETS) {
        const angle = anglesRef.current[planet.id];
        const px = Math.cos(angle) * planet.orbitRadius;
        const py = Math.sin(angle) * planet.orbitRadius;
        const dist = Math.sqrt((relX - px) ** 2 + (relY - py) ** 2);

        if (dist <= planet.size * 1.8) {
          found = planet;
          break;
        }
      }

      setHoveredPlanet(found);
      canvas.style.cursor = found ? 'pointer' : 'grab';
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      isDraggingRef.current = true;
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;
      const centerX = canvas.width / 2 + dragOffset.x;
      const centerY = canvas.height / 2 + dragOffset.y;

      const relX = (mx - centerX) / zoomLevel;
      const relY = (my - centerY) / zoomLevel;

      let found: PlanetData | null = null;
      for (const planet of PLANETS) {
        const angle = anglesRef.current[planet.id];
        const px = Math.cos(angle) * planet.orbitRadius;
        const py = Math.sin(angle) * planet.orbitRadius;
        const dist = Math.sqrt((relX - px) ** 2 + (relY - py) ** 2);

        if (dist <= planet.size * 1.8) {
          found = planet;
          break;
        }
      }

      if (found) {
        setActivePlanet(found);
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setDragOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const centerX = canvas.width / 2 + dragOffset.x;
    const centerY = canvas.height / 2 + dragOffset.y;

    const relX = (mx - centerX) / zoomLevel;
    const relY = (my - centerY) / zoomLevel;

    let found: PlanetData | null = null;
    for (const planet of PLANETS) {
      const angle = anglesRef.current[planet.id];
      const px = Math.cos(angle) * planet.orbitRadius;
      const py = Math.sin(angle) * planet.orbitRadius;
      const dist = Math.sqrt((relX - px) ** 2 + (relY - py) ** 2);

      if (dist <= planet.size * 1.8) {
        found = planet;
        break;
      }
    }

    setHoveredPlanet(found);
    canvas.style.cursor = found ? 'pointer' : 'grab';
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;

    if (hoveredPlanet) {
      setActivePlanet(hoveredPlanet);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoomLevel((prev) => Math.min(Math.max(prev * zoomFactor, 0.6), 2.2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#04060a] overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ touchAction: 'none' }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate(calc(-50% + ${dragOffset.x}px), calc(-50% + ${dragOffset.y}px)) scale(${zoomLevel})`
        }}
      >
        <div className="w-28 h-28 md:w-40 md:h-40">
          <GlassLogo3D />
        </div>
      </div>

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto bg-card/60 backdrop-blur-xl px-4 py-2 rounded-full border border-border/60">
          <Sparkles className="w-4 h-4 text-white/80" />
          <span className="font-display text-sm font-light text-foreground tracking-wide">
            Telox Universe Dimension
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2.5 rounded-full bg-card/60 backdrop-blur-xl border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
            title={isPaused ? 'Resume Orbits' : 'Pause Orbits'}
          >
            <RotateCcw className={`w-4 h-4 ${isPaused ? '' : 'animate-spin-slow'}`} />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setDragOffset({ x: 0, y: 0 });
            }}
            className="p-2.5 rounded-full bg-card/60 backdrop-blur-xl border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium text-xs tracking-wider uppercase hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
          >
            <span>Exit Dimension</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <div className="bg-card/70 backdrop-blur-xl px-5 py-2.5 rounded-full border border-border/60 text-center">
          <p className="text-xs text-muted-foreground tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            Hover or click any revolving planet to inspect
          </p>
        </div>
      </div>

      <AnimatePresence>
        {hoveredPlanet && !activePlanet && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-80 md:w-96 p-5 rounded-2xl bg-card/90 backdrop-blur-2xl border border-border shadow-2xl"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white"
                >
                  <hoveredPlanet.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                    {hoveredPlanet.category}
                  </span>
                  <h4 className="font-display text-base font-medium text-white">{hoveredPlanet.name}</h4>
                </div>
              </div>
              <span className="text-xs text-white/60 font-mono flex items-center gap-1">
                Click to inspect <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {hoveredPlanet.tagline}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
              {hoveredPlanet.stats.slice(0, 2).map((s) => (
                <div key={s.label} className="bg-secondary/40 p-2 rounded-lg text-center">
                  <div className="text-sm font-display font-semibold text-white">{s.value}</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setActivePlanet(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-card/95 backdrop-blur-2xl border border-border rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6 border-b border-border/60 pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-white/10 text-white"
                  >
                    <activePlanet.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block">
                      {activePlanet.category} Node
                    </span>
                    <h3 className="text-2xl font-display font-semibold text-white mt-0.5">
                      {activePlanet.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActivePlanet(null)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{activePlanet.tagline}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activePlanet.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activePlanet.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 text-center"
                    >
                      <div className="text-lg font-display font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                    Core Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activePlanet.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                    System Architecture Capabilities
                  </span>
                  <ul className="space-y-2">
                    {activePlanet.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
