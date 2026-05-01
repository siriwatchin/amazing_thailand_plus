"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  driftX: number;
  opacity: number;
  color: string;
  phase: number;
}

// Warm festival particles — antique gold, terracotta, jungle green, lotus pink, jade
const COLORS = [
  "#C9922A", // antique gold
  "#C4742A", // terracotta
  "#4A8C5C", // canopy green
  "#A8731A", // dark gold
  "#D6447A", // lotus pink
  "#0E8A6E", // jade
  "#2D5A3D", // jungle
  "#C9922A",
];

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = (forceBottom = false): Particle => ({
      x: Math.random() * (canvas?.width ?? window.innerWidth),
      y: forceBottom
        ? (canvas?.height ?? window.innerHeight) + Math.random() * 80
        : Math.random() * (canvas?.height ?? window.innerHeight),
      size:    0.8 + Math.random() * 2.2,
      speedY:  0.25 + Math.random() * 0.7,
      driftX:  (Math.random() - 0.5) * 0.35,
      opacity: 0.15 + Math.random() * 0.4,   // more subtle on light bg
      color:   COLORS[Math.floor(Math.random() * COLORS.length)],
      phase:   Math.random() * Math.PI * 2,
    });

    resize();
    for (let i = 0; i < 55; i++) particles.push(createParticle(false));

    const tick = (time: number) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.driftX + Math.sin(time * 0.0006 + p.phase) * 0.25;

        if (p.y < -10) Object.assign(p, createParticle(true));

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
