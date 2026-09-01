import { useEffect, useRef, useCallback } from 'react';

interface ReactiveLineProps {
  className?: string;
}

export function ReactiveLine({ className = '' }: ReactiveLineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const wobbleRef = useRef<{ offset: number; velocity: number; time: number }[]>([]);

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const mouse = mouseRef.current;
    const lineY = H / 2;

    ctx.clearRect(0, 0, W, H);

    const segments = 60;
    const segWidth = W / segments;

    if (wobbleRef.current.length !== segments) {
      wobbleRef.current = Array.from({ length: segments }, () => ({
        offset: 0,
        velocity: 0,
        time: 0,
      }));
    }

    for (let i = 0; i < segments; i++) {
      const x = i * segWidth + segWidth / 2;
      const dx = x - mouse.x;
      const dy = lineY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 120);

      const wobble = wobbleRef.current[i];

      if (influence > 0) {
        const push = influence * 18;
        const direction = dy > 0 ? -1 : 1;
        wobble.velocity += direction * push * 0.15;
        wobble.time = time;
      }

      const timeSinceHover = (time - wobble.time) / 1000;
      const damping = Math.exp(-2.5 * timeSinceHover);
      const rubberOscillation = Math.sin(timeSinceHover * 12) * 6 * damping;

      wobble.velocity *= 0.92;
      wobble.offset += wobble.velocity;
      wobble.offset += rubberOscillation * 0.05;
      wobble.offset *= 0.96;
    }

    ctx.beginPath();
    ctx.moveTo(0, lineY + wobbleRef.current[0].offset);

    for (let i = 1; i <= segments; i++) {
      const x = i * segWidth;
      const prevX = (i - 1) * segWidth;
      const cpX = (prevX + x) / 2;
      const y = lineY + (wobbleRef.current[i]?.offset || 0);
      const prevY = lineY + wobbleRef.current[i - 1].offset;
      const cpY = (prevY + y) / 2;

      if (i === 1) {
        ctx.lineTo(cpX, cpY);
      } else if (i === segments) {
        ctx.quadraticCurveTo(prevX, prevY, x, y);
      } else {
        ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
      }
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, lineY + wobbleRef.current[0].offset);

    for (let i = 1; i <= segments; i++) {
      const x = i * segWidth;
      const prevX = (i - 1) * segWidth;
      const y = lineY + (wobbleRef.current[i]?.offset || 0);
      const prevY = lineY + wobbleRef.current[i - 1].offset;

      if (i === 1) {
        ctx.lineTo(prevX + segWidth / 2, (prevY + y) / 2);
      } else if (i === segments) {
        ctx.quadraticCurveTo(prevX, prevY, x, y);
      } else {
        ctx.quadraticCurveTo(prevX, prevY, prevX + segWidth / 2, (prevY + y) / 2);
      }
    }

    const gradient = ctx.createLinearGradient(0, 0, W, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.stroke();

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-12 ${className}`}
      style={{ display: 'block' }}
    />
  );
}
