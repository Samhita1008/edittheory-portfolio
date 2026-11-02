import { MotionValue, motion, useTransform, useMotionValue } from 'motion/react';
import { useId } from 'react';

/**
 * The girl silhouette. Inside her body runs a small automation pipeline:
 * nodes joined by flowing lines. Pass a scroll `progress` (0..1) to light the
 * nodes one by one; without it, everything stays lit and the lines keep flowing.
 */

const NODES: [number, number][] = [
  [200, 96],
  [200, 196],
  [150, 330],
  [250, 330],
  [200, 460],
  [138, 610],
  [262, 610],
  [200, 740],
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 7],
  [6, 7],
];

export const SILHOUETTE_SHAPES = [
  'M167 92a33 38 0 1 0 66 0a33 38 0 1 0 -66 0Z', // head
  'M226 66C262 44 322 60 338 112C350 152 322 192 292 214C308 176 300 140 270 124C250 114 232 100 226 66Z', // ponytail
  'M190 120h20v40h-20Z', // neck
  'M148 168C160 152 184 150 200 156C216 150 240 152 252 168C262 192 256 236 240 292C286 410 336 600 362 780C300 792 240 774 200 786C160 774 100 792 38 780C64 600 114 410 160 292C144 236 138 192 148 168Z', // dress
  'M150 170C128 224 114 304 122 392C124 408 146 408 148 392C150 330 160 262 172 206Z', // left arm
  'M250 170C272 224 286 304 278 392C276 408 254 408 252 392C250 330 240 262 228 206Z', // right arm
];

function PipeNode({ x, y, i, progress }: { x: number; y: number; i: number; progress?: MotionValue<number> }) {
  const fallback = useMotionValue(1);
  const lit = useTransform(progress ?? fallback, (p) => {
    if (!progress) return 1;
    const v = p * (NODES.length + 1) - i;
    return Math.max(0.12, Math.min(1, v));
  });
  return (
    <motion.g style={{ opacity: lit }}>
      <circle cx={x} cy={y} r={15} fill="#1e0f2e" />
      <circle cx={x} cy={y} r={6} fill="#f7ebdd" />
    </motion.g>
  );
}

export function Silhouette({
  className = '',
  progress,
  tone = 'warm',
  label = 'Silhouette of a girl with a ponytail, with an automation pipeline running through her',
}: {
  className?: string;
  progress?: MotionValue<number>;
  tone?: 'warm' | 'plum';
  label?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const stops = tone === 'warm' ? ['#ffb224', '#ee5a7e'] : ['#7a52a0', '#ee5a7e'];
  return (
    <svg viewBox="0 0 400 800" role="img" aria-label={label} className={className}>
      <defs>
        <clipPath id={`sil-${uid}`}>
          {SILHOUETTE_SHAPES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
        <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="1" stopColor={stops[1]} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#sil-${uid})`}>
        <rect width="400" height="800" fill={`url(#grad-${uid})`} />
        <g stroke="#1e0f2e" strokeWidth="3" strokeOpacity="0.55" fill="none" strokeLinecap="round">
          {LINKS.map(([a, b], i) => (
            <line key={i} className="flow-line" x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
          ))}
        </g>
        {NODES.map(([x, y], i) => (
          <PipeNode key={i} x={x} y={y} i={i} progress={progress} />
        ))}
      </g>
    </svg>
  );
}
