import { useEffect, useRef } from 'react';
import { Theme } from '../types';

// Multi-functional Canvas Particle System with dark/light themes
export function ParticleBackground({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track state on parent container resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 45;

    // Seed initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Pulse colors according to dark/light theme
      const particleColor = theme === 'dark' ? '79, 255, 176' : '6, 8, 16';

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.shadowColor = theme === 'dark' ? '#4fffb0' : 'transparent';
        ctx.shadowBlur = theme === 'dark' ? 4 : 0;
        ctx.fill();

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if drifted off screen or faded fully
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
          p.opacity = 0.1;
        }
        if (p.x < 0 || p.x > width) {
          p.speedX = -p.speedX;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

// DrawIcon renders clean outline SVGs with stroke draw-in hover animations
export function DrawIcon({
  name,
  className = "w-12 h-12 text-zinc-300 dark:text-zinc-100",
}: {
  name: 'repurposing' | 'outreach' | 'scraping' | 'glossier' | 'dew' | 'discovery';
  className?: string;
}) {
  const strokeColor = "#4fffb0"; // Mint green highlight

  // SVG parameters customizable
  switch (name) {
    case 'repurposing':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          {/* Main flow line input split into three output branches */}
          <path
            d="M3 12h5"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            className="draw-icon-path"
          />
          <circle cx="8" cy="12" r="2" stroke="currentColor" fill="currentColor" />
          <path
            d="M10 12c2 0 3-4 5-4h6M10 12h11M10 12c2 0 3 4 5 4h6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <circle cx="21" cy="8" r="1.5" stroke="currentColor" />
          <circle cx="21" cy="12" r="1.5" stroke="currentColor" />
          <circle cx="21" cy="16" r="1.5" stroke="currentColor" />
        </svg>
      );

    case 'outreach':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          {/* Main Envelope layout with an ascending target arrow in mint green */}
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <path
            d="M3 7l9 6 9-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <path
            d="M18 13l3.5 3.5M18 16.5l3.5-3.5"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            className="draw-icon-path"
          />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );

    case 'scraping':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          {/* Grid layout with targeted extraction nodes highlight */}
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <path
            d="M21 9H3M21 15H3M9 3v18M15 3v18"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          {/* Distinct nodes highlighted as scraped */}
          <circle
            cx="9"
            cy="9"
            r="2"
            stroke={strokeColor}
            strokeWidth="2"
            className="draw-icon-path"
          />
          <path d="M15 15l4 4" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <polyline points="13 15 15 15 15 13" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 'glossier':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          <path
            d="M6 10v10a2 2 0 002 2h8a2 2 0 002-2V10M12 2v4M4 6h16v4H4V6z"
            stroke="currentColor"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <path
            d="M9 14l2 2 4-4"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
        </svg>
      );

    case 'dew':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          <path
            d="M12 2s7 5.5 7 11.5a7 7 0 11-14 0C5 7.5 12 2 12 2z"
            stroke="currentColor"
            strokeLinejoin="round"
            className="draw-icon-path"
          />
          <path
            d="M9 13h6"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            className="draw-icon-path"
          />
          <path d="M12 10v6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'discovery':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`${className} draw-icon-wrapper`}
        >
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            className="draw-icon-path"
          />
          <path
            d="M20 20l-4.35-4.35"
            stroke="currentColor"
            strokeLinecap="round"
            className="draw-icon-path"
          />
          {/* Embedded micro star/automation */}
          <path
            d="M10 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"
            fill={strokeColor}
            stroke={strokeColor}
            className="draw-icon-path"
          />
        </svg>
      );

    default:
      return null;
  }
}

// Custom Process connecting line animation mimicking active pipeline pulses
export function ProcessConnectLine() {
  return (
    <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 hidden md:block select-none pointer-events-none z-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#4fffb0"
          strokeWidth="3"
          className="animate-flow-dash opacity-70"
        />
      </svg>
    </div>
  );
}
