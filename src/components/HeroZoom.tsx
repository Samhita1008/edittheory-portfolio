import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/**
 * Hero: "EDIT THEORY" set huge. The letters are windows onto the next scene.
 * Scrolling dives into the stem of the T in EDIT; the intro and About scene
 * open up inside it, then the page keeps scrolling normally.
 */

const MOCHA = '#2e211a';
const PLATINUM = '#e5e4e2';
const LAVENDER = '#dcd6ee';
const FONT = '"Anton", Impact, sans-serif';
const LINES = ['EDIT', 'THEORY'];

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

type Glyph = { ch: string; x: number; y: number; line: number; i: number };
type Layout = {
  F: number;
  cap: number;
  glyphs: Glyph[];
  clips: { y: number; h: number }[];
  tx: number;
  ty: number;
  bulb: { cx: number; cy: number; r: number };
  kmax: number;
};

function computeLayout(vw: number, vh: number): Layout | null {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return null;
  ctx.font = `100px ${FONT}`;
  const cap100 = ctx.measureText('E').actualBoundingBoxAscent;
  const w100 = LINES.map((l) => ctx.measureText(l).width);
  if (!cap100 || !w100[0]) return null;
  const capRatio = cap100 / 100;
  // Measure the real ink of the T (stem and top bar) at 400px, so the zoom
  // lands exactly on the junction and ends once the strokes fill the screen.
  const probe = document.createElement('canvas');
  probe.width = 700;
  probe.height = 700;
  const pc = probe.getContext('2d', { willReadFrequently: true });
  let stemL = 0.4;
  let stemR = 0.6;
  let barL = 0.1;
  let barR = 0.9;
  let barT = 0.2;
  if (pc) {
    pc.font = `400px ${FONT}`;
    pc.textBaseline = 'alphabetic';
    pc.fillStyle = '#000';
    const OX = 100;
    const BASE = 560;
    pc.fillText('T', OX, BASE);
    const capPx = pc.measureText('T').actualBoundingBoxAscent;
    const ink = (x: number, y: number) => pc.getImageData(x, y, 1, 1).data[3] > 128;
    const span = (y: number) => {
      let a = -1;
      let b = -1;
      for (let x = 0; x < 700; x++) if (ink(x, y)) { if (a < 0) a = x; b = x; }
      return [a, b] as const;
    };
    const [sa, sb] = span(Math.round(BASE - capPx * 0.4));
    const [ba, bb] = span(Math.round(BASE - capPx + 4));
    if (sa >= 0) { stemL = (sa - OX) / 400; stemR = (sb + 1 - OX) / 400; }
    if (ba >= 0) { barL = (ba - OX) / 400; barR = (bb + 1 - OX) / 400; }
    const col = Math.max(0, sa - 10);
    let y = Math.round(BASE - capPx + 2);
    while (y < BASE && ink(col, y)) y++;
    barT = Math.max(0.05, (y - (BASE - capPx)) / 400);
  }
  const stemCenterEm = (stemL + stemR) / 2;
  const barWEm = Math.max(0.2, barR - barL);
  const F = Math.min((vw * 0.9) / (Math.max(...w100) / 100), (0.28 * vh) / capRatio);
  const k = F / 100;
  const cap = cap100 * k;
  const gap = 0.16 * cap;
  const bulbR = 0.26 * cap;
  const headroom = 0.55 * cap;
  const total = headroom + 2 * cap + gap;
  const top = (vh - total) / 2 + 0.04 * vh;
  const capTop1 = top + headroom;
  const base = [capTop1 + cap, capTop1 + cap + gap + cap];

  const glyphs: Glyph[] = [];
  let tx = 0;
  LINES.forEach((line, li) => {
    const left = (vw - w100[li] * k) / 2;
    [...line].forEach((ch, i) => {
      const x = left + ctx.measureText(line.slice(0, i)).width * k;
      glyphs.push({ ch, x, y: base[li], line: li, i });
      if (li === 0 && i === 3) tx = x + stemCenterEm * F;
    });
  });
  const ty = base[0] - cap + (barT * F) / 2;
  return {
    F,
    cap,
    glyphs,
    clips: base.map((b) => ({ y: b - cap - 4, h: cap + 8 })),
    tx,
    ty,
    bulb: { cx: tx, cy: capTop1 - bulbR * 0.98, r: bulbR },
    kmax: Math.max((1.3 * vh) / (barT * F), (1.2 * vw) / (barWEm * F)),
  };
}

function Bulb({ r }: { r: number }) {
  // drawn on a 100-unit board, scaled to the circle's radius
  const s = r / 50;
  const rays = [-90, -50, -130, -20, -160].map((a) => a);
  return (
    <g transform={`scale(${s})`} className="bulb-on">
      <defs>
        <radialGradient id="bulb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={LAVENDER} stopOpacity="0.38" />
          <stop offset="0.55" stopColor={LAVENDER} stopOpacity="0.1" />
          <stop offset="1" stopColor={LAVENDER} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="92" fill="url(#bulb-glow)" />
      <circle r="49" fill="#5b4a40" fillOpacity="0.55" stroke={PLATINUM} strokeOpacity="0.45" strokeWidth="1.6" />
      <path
        d="M-14 8C-24 -2 -24 -24 -9 -31C0 -35 9 -35 16 -30C28 -22 27 -4 17 8C13 13 12 16 12 21H-9C-9 16 -10 12 -14 8Z"
        transform="translate(-1.5 -4)"
        fill="none"
        stroke={PLATINUM}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M-10 26H12M-9 31H11" transform="translate(-1.5 -4)" stroke={PLATINUM} strokeWidth="2.4" strokeLinecap="round" />
      <g stroke={PLATINUM} strokeOpacity="0.7" strokeWidth="2.6" strokeLinecap="round">
        {rays.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={Math.cos(rad) * 39}
              y1={Math.sin(rad) * 39 - 4}
              x2={Math.cos(rad) * 46}
              y2={Math.sin(rad) * 46 - 4}
              style={{ animation: `ray .5s ${1.5 + i * 0.12}s both` }}
            />
          );
        })}
      </g>
    </g>
  );
}

export function scrollToStage(stageRef: RefObject<HTMLElement | null>, p: number) {
  const el = stageRef.current;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + p * (el.offsetHeight - window.innerHeight), behavior: 'smooth' });
}
export const STAGE_STOPS = { about: 0.9 };

function Pan({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(0);
  useEffect(() => {
    const measure = () => ref.current && setOver(Math.max(0, ref.current.scrollHeight - window.innerHeight));
    measure();
    const id = window.setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, []);
  const y = useTransform(progress, (p) => -over * clamp((p - range[0]) / (range[1] - range[0])));
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export default function HeroZoom({ stageRef }: { stageRef: RefObject<HTMLElement | null> }) {
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const [layout, setLayout] = useState<Layout | null>(null);
  const { scrollYProgress: p } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  useLayoutEffect(() => {
    let alive = true;
    const run = () => alive && setLayout(computeLayout(vp.w, vp.h));
    (document.fonts?.load ? document.fonts.load('100px Anton', 'EDIT THEORY') : Promise.resolve()).then(run, run);
    return () => {
      alive = false;
    };
  }, [vp]);

  const ZOOM: [number, number] = [0.06, 0.5];
  const t = useTransform(p, (v) => clamp((v - ZOOM[0]) / (ZOOM[1] - ZOOM[0])));
  const geo = (v: number) => {
    if (!layout) return { px: 0, py: 0, k: 1 };
    const e = smooth(v);
    return {
      px: layout.tx + (vp.w / 2 - layout.tx) * e,
      py: layout.ty + (vp.h / 2 - layout.ty) * e,
      k: Math.exp(Math.log(layout.kmax) * v),
    };
  };
  const attrTransform = useTransform(t, (v) => {
    const g = geo(v);
    return `translate(${g.px} ${g.py}) scale(${g.k}) translate(${-(layout?.tx ?? 0)} ${-(layout?.ty ?? 0)})`;
  });
  const cssTransform = useTransform(t, (v) => {
    const g = geo(v);
    return `translate(${g.px}px, ${g.py}px) scale(${g.k}) translate(${-(layout?.tx ?? 0)}px, ${-(layout?.ty ?? 0)}px)`;
  });
  const veilDisplay = useTransform(t, (v) => (v >= 1 ? 'none' : 'block'));
  const bulbOpacity = useTransform(t, (v) => 1 - clamp(v / 0.1));
  const cueOpacity = useTransform(p, (v) => 1 - clamp(v / 0.03));
  const sceneOpacity = useTransform(t, (v) => clamp((v - 0.45) / 0.4));
  const sceneEvents = useTransform(t, (v) => (v > 0.8 ? 'auto' : 'none'));

    const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const apply = (v: string) => gRef.current?.setAttribute('transform', v);
    apply(attrTransform.get());
    return attrTransform.on('change', apply);
  }, [attrTransform, layout]);

  return (
    <div className="sticky top-0 overflow-hidden" style={{ height: '100dvh', background: PLATINUM }}>
      {/* The scene the letters open onto */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: sceneOpacity, pointerEvents: sceneEvents }}>
        <Pan progress={p} range={[0.58, 0.98]}>
          {/* Intro */}
          <div className="mx-auto flex max-w-6xl flex-col justify-center px-6 sm:px-10" style={{ minHeight: '100dvh' }}>
            <h1 className="max-w-4xl font-display text-[clamp(2rem,4.6vw,4.2rem)] font-bold leading-[1.04] tracking-tight text-[#2e211a]">
              I build custom AI systems for D2C brands to solve growth and workflow bottlenecks.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#2e211a]/80 sm:text-lg">
              Eliminate manual bottlenecks. I design and launch tailored AI workflows that scrape qualified leads daily, automate personalized outbound outreach, and scale organic content distribution on autopilot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects-section"
                className="inline-flex items-center gap-2 rounded-sm bg-[#2e211a] px-6 py-3 text-sm font-semibold text-[#e5e4e2] transition hover:bg-[#4a372c]"
              >
                See My Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact-section"
                className="rounded-sm border border-[#2e211a]/60 px-6 py-3 text-sm font-semibold text-[#2e211a] transition hover:bg-[#dcd6ee]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* About */}
          <div className="mx-auto max-w-6xl px-6 sm:px-10" style={{ minHeight: '100dvh' }}>
            <div className="grid items-center gap-10 py-24 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16" style={{ minHeight: '100dvh' }}>
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-[#4a372c]">The Engineer</p>
                <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.06] tracking-tight text-[#2e211a]">
                  Building custom automation systems for scaling brands.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[#2e211a]/90">
                  I’m Samhita, a CSE student at Pondicherry Central University building AI-powered systems for D2C brands. I started this because I noticed how much time founders lose recreating content and writing cold messages manually — so I began building systems that automate that work.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2e211a]/70">
                  By modeling human research intuition in scripts and optimizing custom LLM prompts, I clear out routine manual tasks so brands can focus on high-intent relationship building.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 text-sm text-[#2e211a]">
                  {['CSE @ Pondicherry Central University', 'Python & TypeScript Scraping', 'Prompt Engineering & APIs'].map((b) => (
                    <li key={b} className="rounded-sm border border-[#2e211a]/30 bg-[#dcd6ee]/60 px-3 py-1.5">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="mx-auto flex max-w-[200px] flex-col items-center text-center md:mx-0">
                <img
                  src="/images/sam.jpeg"
                  alt="Samhita Tavutu - Systems Architect and AI Automation Engineer"
                  className="h-32 w-32 rounded-full object-cover ring-2 ring-[#2e211a]/20 md:h-36 md:w-36"
                  referrerPolicy="no-referrer"
                />
                <figcaption className="mt-3 text-sm text-[#2e211a]">
                  <span className="block font-bold">Samhita Tavutu</span>
                  <span className="block text-[#2e211a]/70">Systems Architect</span>
                  <span className="block text-[#2e211a]/70">Pondicherry, IN</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Pan>
      </motion.div>

      {/* Veil: mocha sheet with the letters cut out */}
      {layout && (
        <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" style={{ display: veilDisplay }}>
          <defs>
            <mask id="logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="white" />
              <g ref={gRef}>
                {layout.clips.map((c, i) => (
                  <clipPath key={i} id={`clip-${i}`} clipPathUnits="userSpaceOnUse">
                    <rect x={0} y={c.y} width={vp.w} height={c.h} />
                  </clipPath>
                ))}
                {[0, 1].map((li) => (
                  <g key={li} clipPath={`url(#clip-${li})`}>
                    {layout.glyphs
                      .filter((g) => g.line === li)
                      .map((g) => (
                        <text
                          key={`${li}-${g.i}`}
                          x={g.x}
                          y={g.y}
                          fontFamily={FONT}
                          fontSize={layout.F}
                          fill="black"
                          className="glyph-rise"
                          style={{
                            ['--rise' as string]: `${layout.cap * 1.3}px`,
                            animationDelay: `${(li === 0 ? 0 : 4) * 0.08 + g.i * 0.08}s`,
                          }}
                        >
                          {g.ch}
                        </text>
                      ))}
                  </g>
                ))}
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill={MOCHA} mask="url(#logo-mask)" />
        </motion.svg>
      )}

      {/* Light bulb above the T */}
      {layout && (
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: bulbOpacity, display: veilDisplay }}>
          <motion.svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ transform: cssTransform, transformOrigin: '0 0' }}
          >
            <g transform={`translate(${layout.bulb.cx} ${layout.bulb.cy})`}>
              <Bulb r={layout.bulb.r} />
            </g>
          </motion.svg>
        </motion.div>
      )}

      <h2 className="sr-only">Edit Theory</h2>
      <motion.p
        className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-sm tracking-wide text-[#e5e4e2]/60"
        style={{ opacity: cueOpacity, display: veilDisplay }}
      >
        Scroll to go inside
      </motion.p>
    </div>
  );
}
