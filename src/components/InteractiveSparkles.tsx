import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  shape: 'star' | 'circle' | 'sparkle';
}

const BRAND_COLORS = [
  '#F497A9', // Pink
  '#20969B', // Turquoise
  '#F26B4E', // Coral Orange
  '#F9A620', // Golden Yellow
  '#3B4B59', // Navy
];

export const InteractiveSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameId = useRef<number | null>(null);
  const lastMovePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    let isRunning = false;

    const startLoopIfNeeded = () => {
      if (!isRunning && particlesRef.current.length > 0) {
        isRunning = true;
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    // Spawn burst at coordinate
    const spawnBurst = (x: number, y: number, count?: number) => {
      const isMobile = window.innerWidth < 768;
      const actualCount = count ?? (isMobile ? 12 : 22);
      const shapes: ('star' | 'circle' | 'sparkle')[] = ['star', 'circle', 'sparkle'];

      for (let i = 0; i < actualCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 5 + 3,
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 6,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
      startLoopIfNeeded();
    };

    // Spawn trail particles on pointer move (desktop only for buttery mobile scroll)
    const spawnTrail = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.4,
          size: Math.random() * 3 + 2,
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
          alpha: 0.85,
          decay: Math.random() * 0.05 + 0.03,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 4,
          shape: Math.random() > 0.4 ? 'star' : 'sparkle',
        });
      }
      startLoopIfNeeded();
    };

    // Draw helper for 5-pointed star
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
    };

    // Draw helper for 4-pointed sparkle
    const drawSparkle = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number
    ) => {
      context.beginPath();
      context.moveTo(cx, cy - size);
      context.quadraticCurveTo(cx, cy, cx + size, cy);
      context.quadraticCurveTo(cx, cy, cx, cy + size);
      context.quadraticCurveTo(cx, cy, cx - size, cy);
      context.quadraticCurveTo(cx, cy, cx, cy - size);
      context.closePath();
    };

    // On-demand Animation Loop: stops when particles reach 0
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length === 0) {
        isRunning = false;
        return;
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 5, p.size, p.size * 0.45);
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          drawSparkle(ctx, 0, 0, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particlesRef.current.length > 0) {
        animFrameId.current = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Global click listener for celebration burst
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      spawnBurst(clientX, clientY);
    };

    // Desktop only mouse trailing to keep mobile scrolling instantaneous
    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (lastMovePos.current) {
        const dist = Math.hypot(
          clientX - lastMovePos.current.x,
          clientY - lastMovePos.current.y
        );
        if (dist > 24) {
          spawnTrail(clientX, clientY);
          lastMovePos.current = { x: clientX, y: clientY };
        }
      } else {
        lastMovePos.current = { x: clientX, y: clientY };
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
};
