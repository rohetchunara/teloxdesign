import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassLogo3D from "./GlassLogo3D";
import { TeloxUniverse } from "./TeloxUniverse";

interface Point { x: number; y: number; }
interface Ripple { x: number; y: number; radius: number; opacity: number; born: number; }

const CELL_SIZE = 80;
const INFLUENCE_RADIUS = 180;
const MAX_WARP = 16;
const LERP_SPEED = 0.08;

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.06 };
const NODE_BASE_RADIUS = 1.2;
const NODE_ACTIVE_RADIUS = 2.2;

function lerpN(a: number, b: number, t: number) { return a + (b - a) * t; }

function lerpColor(
  base: { r: number; g: number; b: number; a: number },
  active: { r: number; g: number; b: number; a: number },
  t: number,
): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function KineticGrid({ children }: { children?: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const getWarpedPoint = useCallback(
    (gx: number, gy: number, col: number, row: number, mouse: Point, ripples: Ripple[], cols: number, rows: number): { pt: Point; proximity: number } => {
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      let rx = 0, ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 14 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return { pt: { x: gx - Math.cos(angle) * warpAmt + rx, y: gy - Math.sin(angle) * warpAmt + ry }, proximity };
      }
      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w: W, h: H } = sizeRef.current;
    const mouse = mouseRef.current;
    const ripples = ripplesRef.current;
    const lineActive = { r: 20, g: 74, b: 140, a: 0.85 };
    const nodeActive = { r: 35, g: 105, b: 200, a: 0.95 };

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, W, H);

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 400);
      r.opacity = Math.max(0, 1 - age * 1.2);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
    const cellW = W / (cols - 1);
    const cellH = H / (rows - 1);

    const pts: Point[][] = [];
    const prox: number[][] = [];

    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col++) {
        const { pt, proximity } = getWarpedPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows);
        pts[row][col] = pt;
        prox[row][col] = proximity;
      }
    }

    const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
      const avg = (pr1 + pr2) / 2;
      const t = avg * avg * (3 - 2 * avg);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(LINE_BASE, lineActive, t);
      ctx.lineWidth = lerpN(0.6, 1.2, t);
      ctx.stroke();
    };

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols - 1; col++)
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);

    for (let col = 0; col < cols; col++)
      for (let row = 0; row < rows - 1; row++)
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const pr = prox[row][col];
        if (pr < 0.02) continue;
        const t = pr * pr * (3 - 2 * pr);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.1 }, nodeActive, t);
        ctx.fill();
      }
    }
  }, [getWarpedPoint]);

  const animate = useCallback((now: number) => {
    const m = mouseRef.current;
    const t = targetMouseRef.current;
    m.x = lerpN(m.x, t.x, LERP_SPEED);
    m.y = lerpN(m.y, t.y, LERP_SPEED);
    draw(now);
    rafRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { w, h };
    };
    setSize();
    window.addEventListener("resize", setSize);

    const updatePointer = (x: number, y: number) => {
      targetMouseRef.current = { x, y };
    };

    const onMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const triggerRipple = (x: number, y: number) => {
      ripplesRef.current.push({ x, y, radius: 0, opacity: 1, born: performance.now() });
    };

    const onClick = (e: MouseEvent) => {
      triggerRipple(e.clientX, e.clientY);
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'CANVAS' || target.classList.contains('hero-empty-space'))) {
        window.dispatchEvent(new Event('open-telox-nav'));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        triggerRipple(touch.clientX, touch.clientY);
        const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
        if (target && (target.tagName === 'CANVAS' || target.classList.contains('hero-empty-space'))) {
          window.dispatchEvent(new Event('open-telox-nav'));
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("touchend", onTouchEnd);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className={cn("relative w-full h-screen overflow-hidden bg-[#0d0d0d]")}>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-auto cursor-pointer touch-none" />
      <div className="relative z-10 w-full h-full hero-empty-space">{children}</div>
    </div>
  );
}

function HoldToWarpButton({ onWarp }: { onWarp: () => void }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setHolding(true);
    startTimeRef.current = performance.now();

    const DURATION = 550;
    const updateProgress = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const p = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(p);

      if (p >= 100) {
        setHolding(false);
        setProgress(0);
        onWarp();
      } else {
        timerRef.current = requestAnimationFrame(updateProgress);
      }
    };

    timerRef.current = requestAnimationFrame(updateProgress);
  };

  const endHold = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setHolding(false);
    setProgress(0);
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className="relative micro-label hover:text-foreground transition-colors duration-300 pointer-events-auto cursor-pointer select-none py-1 group flex flex-col items-center justify-center text-center"
      aria-label="Click and hold to enter 2D universe"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {holding ? `Warping (${Math.round(progress)}%)` : 'Click & Hold'}
      </span>
      <span className="block h-[1.5px] bg-muted-foreground/20 w-full mt-1 overflow-hidden rounded-full">
        <span
          className="block h-full bg-foreground transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </span>
    </button>
  );
}

export function Hero() {
  const [showUniverse, setShowUniverse] = useState(false);
  const [showHeroText, setShowHeroText] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
  const hoverTimerRef = useRef<number | null>(null);

  const handleLogoHover = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    setShowHeroText(true);
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = window.setTimeout(() => {
      setShowHeroText(false);
    }, 7000);
  };

  const handleLogoLeave = () => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    setShowHeroText(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <KineticGrid>
        {/* 3D logo — centered focal point */}
        <div
          className="absolute inset-0 z-0 w-full h-full pointer-events-auto flex items-center justify-center"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <div className="w-[460px] h-[460px] md:w-[620px] md:h-[620px]">
            <GlassLogo3D />
          </div>
        </div>

        {/* Centered editorial typography over the 3D logo — visible on hover for 7s */}
        <AnimatePresence>
          {showHeroText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
            >
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-foreground text-center leading-[1.05]">
                Telox
                <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-muted-foreground/50 mx-3 md:mx-5 align-middle" />
                Creative Studio
              </h1>
              <p className="mt-4 md:mt-6 micro-label">
                Est. 2026
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top anchor label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center justify-center text-center"
        >
          <Link
            to="/work"
            className="micro-label hover:text-foreground transition-colors duration-300 pointer-events-auto"
          >
            View All Projects
          </Link>
        </motion.div>

        {/* Bottom anchor minimal Click & Hold button — perfectly centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-center justify-center text-center"
        >
          <HoldToWarpButton onWarp={() => setShowUniverse(true)} />
        </motion.div>
      </KineticGrid>

      {/* Cosmic Telox Universe Modal */}
      <AnimatePresence>
        {showUniverse && (
          <TeloxUniverse onClose={() => setShowUniverse(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
