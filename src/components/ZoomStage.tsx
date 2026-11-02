import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Silhouette } from './Silhouette';

/* ------------------------------------------------------------------ */
/* Letters are stroked paths on a 100x100 board, so they stay vector   */
/* sharp at any zoom. `j` is the point the camera dives into.          */
/* ------------------------------------------------------------------ */
const SW = 20;
const LETTERS = {
  E: { d: 'M72 14H30V86H72M30 50H66', j: [30, 50], cap: 'butt' as const },
  T: { d: 'M12 16H88M50 16V90', j: [50, 16], cap: 'butt' as const },
  S: { d: 'M74 24C74 6 26 6 26 30C26 50 74 50 74 70C74 94 26 94 26 76', j: [50, 50], cap: 'round' as const },
};
type LetterKey = keyof typeof LETTERS;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const fade = (p: number, a: number, b: number) => 1 - clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

function useViewport() {
  const [v, setV] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const on = () => setV({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return v;
}

type Place = { cx: number; cy: number; size: number }; // centre as fraction of viewport, size as fraction of height

function geometry(letter: LetterKey, place: Place, vw: number, vh: number, t: number) {
  const [jx, jy] = LETTERS[letter].j;
  const s0 = (place.size * vh) / 100;
  const diag = Math.hypot(vw, vh);
  const s1 = (1.2 * diag) / SW;
  const s = s0 * Math.exp(Math.log(s1 / s0) * t);
  const p0x = place.cx * vw + s0 * (jx - 50);
  const p0y = place.cy * vh + s0 * (jy - 50);
  const e = smooth(t);
  const px = p0x + (vw / 2 - p0x) * e;
  const py = p0y + (vh / 2 - p0y) * e;
  return { s, s0, px, py, p0x, p0y, jx, jy };
}

function useZoom(
  progress: MotionValue<number>,
  letter: LetterKey,
  range: [number, number],
  place: Place,
  vw: number,
  vh: number,
) {
  const t = useTransform(progress, (p) => clamp((p - range[0]) / (range[1] - range[0])));
  const letterTransform = useTransform(t, (v) => {
    const g = geometry(letter, place, vw, vh, v);
    return `translate(${g.px} ${g.py}) scale(${g.s}) translate(${-g.jx} ${-g.jy})`;
  });
  const followTransform = useTransform(t, (v) => {
    const g = geometry(letter, place, vw, vh, v);
    const k = g.s / g.s0;
    return `translate(${g.px}px, ${g.py}px) scale(${k}) translate(${-g.p0x}px, ${-g.p0y}px)`;
  });
  const display = useTransform(t, (v) => (v >= 1 ? 'none' : 'block'));
  return { t, letterTransform, followTransform, display };
}

function Veil({
  id,
  letter,
  color,
  letterTransform,
  display,
}: {
  id: string;
  letter: LetterKey;
  color: string;
  letterTransform: MotionValue<string>;
  display: MotionValue<string>;
}) {
  const L = LETTERS[letter];
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const apply = (v: string) => gRef.current?.setAttribute('transform', v);
    apply(letterTransform.get());
    return letterTransform.on('change', apply);
  }, [letterTransform]);
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ display }}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" />
          <g ref={gRef}>
            <path d={L.d} fill="none" stroke="black" strokeWidth={SW} strokeLinecap={L.cap} strokeLinejoin="miter" />
          </g>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color} mask={`url(#${id})`} />
    </motion.svg>
  );
}

/** Lets a scene taller than the screen drift upward while it is held. */
function Pan({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (ref.current) setOver(Math.max(0, ref.current.scrollHeight - window.innerHeight));
    };
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

export function scrollToStage(stageRef: RefObject<HTMLElement | null>, p: number) {
  const el = stageRef.current;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + p * (el.offsetHeight - window.innerHeight), behavior: 'smooth' });
}

export const STAGE_STOPS = { about: 0.31, build: 0.72 };

const BUILD_ITEMS = [
  ['Custom AI Agents:', 'Self-running n8n, custom Node.js scripts.'],
  ['Lead Scraping & Sifting:', 'Active scrapers returning pre-qualified, clean leads on autopilot.'],
  ['Tone Master Engines:', 'Brand-specific prompt libraries modeled directly on your writing style.'],
];
const HELP_ITEMS = [
  ['D2C Founders & Operators:', 'Looking to generate high-intent pipeline growth with extremely lean teams.'],
  ['Outreach & Growth Leads:', 'Burdened by endless lead verification and custom outbound templates.'],
  ['Video Podcasters & Creators:', 'Needing to distribute organic clips instantly across multi-channels.'],
];

export default function ZoomStage({ stageRef }: { stageRef: RefObject<HTMLElement | null> }) {
  const { w: vw, h: vh } = useViewport();
  const mobile = vw < 768;
  const { scrollYProgress: p } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });

  // Where each letter sits before its zoom starts.
  const eP: Place = mobile ? { cx: 0.68, cy: 0.8, size: 0.32 } : { cx: 0.77, cy: 0.52, size: 0.72 };
  const tP: Place = mobile ? { cx: 0.5, cy: 0.97, size: 0.18 } : { cx: 0.8, cy: 0.52, size: 0.62 };
  const sP: Place = mobile ? { cx: 0.86, cy: 0.12, size: 0.12 } : { cx: 0.88, cy: 0.2, size: 0.26 };

  const z1 = useZoom(p, 'E', [0.04, 0.24], eP, vw, vh);
  const z2 = useZoom(p, 'T', [0.38, 0.56], tP, vw, vh);
  const z3 = useZoom(p, 'S', [0.8, 0.96], sP, vw, vh);

  const heroOpacity = useTransform(p, (v) => fade(v, 0.04, 0.11));
  const heroEvents = useTransform(p, (v) => (v > 0.1 ? 'none' : 'auto'));
  const girlOpacity = useTransform(p, (v) => fade(v, 0.17, 0.235));
  const aboutOpacity = useTransform(p, (v) => fade(v, 0.38, 0.45));
  const aboutEvents = useTransform(p, (v) => (v > 0.24 && v < 0.4 ? 'auto' : 'none'));
  const buildOpacity = useTransform(p, (v) => fade(v, 0.8, 0.86));
  const buildEvents = useTransform(p, (v) => (v > 0.56 && v < 0.82 ? 'auto' : 'none'));
  const cueOpacity = useTransform(p, (v) => fade(v, 0, 0.03));

  // Girl, placed for t = 0.
  const girlH = mobile ? vh * 0.36 : vh * 0.8;
  const girlW = girlH / 2;
  const girlLeft = mobile ? vw * 0.04 : vw * 0.6 - girlW / 2;
  const girlTop = vh * 0.99 - girlH;

  return (
    <div className="sticky top-0 h-screen overflow-hidden bg-[#1e0f2e]" style={{ height: '100dvh' }}>
      {/* Scene 4: opens the case studies */}
      <div className="absolute inset-0 bg-[#1e0f2e]">
        <div className="mx-auto flex h-full max-w-5xl flex-col justify-center px-6 sm:px-10">
          <p className="mb-5 max-w-md text-base text-[#f7ebdd]/70">Strategic Case Studies</p>
          <h2 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-[#f7ebdd]">
            Systems Design &amp; Mechanics
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f7ebdd]/80">
            Production-grade systems engineering: architecture blueprints, orchestration logic, and end-to-end automation.
          </p>
        </div>
      </div>

      {/* Scene 3 (under the T veil): what I build */}
      <Veil id="veil-s" letter="S" color="#5b3a7a" letterTransform={z3.letterTransform} display={z3.display} />
      <motion.div
        id="build-scene"
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: buildOpacity, pointerEvents: buildEvents }}
      >
        <Pan progress={p} range={[0.58, 0.78]}>
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:px-10 sm:pt-28">
            <div className="max-w-3xl">
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.02] tracking-tight text-[#f7ebdd]">
                Focused on real client conversions.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f7ebdd]/80">
                I don't build generic AI chatbots. I design highly specialized systems that replace hours of manual work with reliable autonomous pipelines.
              </p>
            </div>

            <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-3">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#ffb224]">What I Build</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f7ebdd]/75">
                  Specialized, single-purpose automation sequences connected directly to your existing workspace.
                </p>
                <ul className="mt-4 space-y-3 border-t border-[#f7ebdd]/20 pt-4 text-sm leading-relaxed text-[#f7ebdd]/85">
                  {BUILD_ITEMS.map(([a, b]) => (
                    <li key={a}>
                      <strong className="font-semibold text-[#f7ebdd]">{a}</strong> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#ffb224]">Who I Help</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f7ebdd]/75">
                  Simplifying operations for founders, marketers, and operations leaders.
                </p>
                <ul className="mt-4 space-y-3 border-t border-[#f7ebdd]/20 pt-4 text-sm leading-relaxed text-[#f7ebdd]/85">
                  {HELP_ITEMS.map(([a, b]) => (
                    <li key={a}>
                      <strong className="font-semibold text-[#f7ebdd]">{a}</strong> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-[#ffb224]">
                  <Wrench className="h-5 w-5" aria-hidden="true" /> Custom Solutions
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#f7ebdd]">
                  “If you have a workflow bottleneck, I can design a tailored AI solution for it.”
                </p>
                <p className="mt-4 border-t border-[#f7ebdd]/20 pt-4 text-sm leading-relaxed text-[#f7ebdd]/80">
                  The systems and agent architectures shown on this site represent proven, production-tested blueprints. If your team spends hours on copy-pasting, multi-platform scrapers, custom DB loaders, or manual routing, I will engineer a custom script optimized for your exact system requirements on request.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://topmate.io/samhita_tavutu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#ffb224] px-5 py-2.5 text-sm font-bold text-[#1e0f2e] transition hover:bg-[#ffc24f]"
                  >
                    Book Audit Call
                  </a>
                  <a
                    href="#contact-section"
                    className="rounded-full border border-[#f7ebdd]/50 px-5 py-2.5 text-sm font-semibold text-[#f7ebdd] transition hover:border-[#ffb224] hover:text-[#ffb224]"
                  >
                    Message Custom Scope
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Pan>
      </motion.div>

      {/* Scene 2 (under the E veil): about */}
      <Veil id="veil-t" letter="T" color="#f7ebdd" letterTransform={z2.letterTransform} display={z2.display} />
      <motion.div
        id="about-scene"
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: aboutOpacity, pointerEvents: aboutEvents }}
      >
        <Pan progress={p} range={[0.26, 0.37]}>
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:px-10 sm:pt-28 md:pt-0">
            <div className="flex min-h-screen flex-col justify-center md:max-w-[54%]" style={{ minHeight: '100dvh' }}>
              <div className="flex items-center gap-4">
                <img
                  src="/images/sam.jpeg"
                  alt="Samhita Tavutu - Systems Architect and AI Automation Engineer"
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-[#ffb224]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-display text-lg font-bold text-[#1e0f2e]">Samhita Tavutu</p>
                  <p className="text-sm text-[#1e0f2e]/70">Systems Architect</p>
                  <p className="text-sm text-[#1e0f2e]/70">Pondicherry, IN</p>
                </div>
              </div>
              <p className="mt-8 text-base text-[#5b3a7a]">The Engineer</p>
              <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#1e0f2e]">
                Building custom automation systems for scaling brands.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#1e0f2e]/85">
                I’m Samhita, a CSE student at Pondicherry Central University building AI-powered systems for D2C brands. I started this because I noticed how much time founders lose recreating content and writing cold messages manually — so I began building systems that automate that work.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#1e0f2e]/70">
                By modeling human research intuition in scripts and optimizing custom LLM prompts, I clear out routine manual tasks so brands can focus on high-intent relationship building.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm text-[#1e0f2e]">
                {['💼 CSE @ Pondicherry Central University', '🐍 Python & TypeScript Scraping', '💡 Prompt Engineering & APIs'].map((b) => (
                  <li key={b} className="rounded-full border border-[#1e0f2e]/25 px-3 py-1">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Pan>
      </motion.div>

      {/* Scene 1: hero */}
      <Veil id="veil-e" letter="E" color="#1e0f2e" letterTransform={z1.letterTransform} display={z1.display} />

      <motion.div
        aria-hidden={false}
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: girlW,
          height: girlH,
          left: girlLeft,
          top: girlTop,
          transform: z1.followTransform,
          transformOrigin: '0 0',
          opacity: girlOpacity,
          display: z1.display,
        }}
      >
        <Silhouette className="h-full w-full" />
      </motion.div>

      <motion.div
        className={`absolute inset-0 flex ${mobile ? 'items-start pt-24' : 'items-center'}`}
        style={{ opacity: heroOpacity, pointerEvents: heroEvents }}
      >
        <div className="w-full px-6 sm:px-10 md:px-[6vw]">
          <div className={mobile ? 'max-w-full' : 'max-w-[40vw]'}>
            <h1 className="font-display text-[clamp(1.9rem,4.1vw,4rem)] font-bold leading-[1.03] tracking-tight text-[#f7ebdd]">
              I build custom <span className="text-[#ffb224]">AI systems</span> for D2C brands to solve growth and workflow bottlenecks.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#f7ebdd]/75 sm:text-base">
              Eliminate manual bottlenecks. I design and launch tailored AI workflows that scrape qualified leads daily, automate personalized outbound outreach, and scale organic content distribution on autopilot.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects-section"
                className="inline-flex items-center gap-2 rounded-full bg-[#ffb224] px-6 py-3 text-sm font-bold text-[#1e0f2e] transition hover:bg-[#ffc24f]"
              >
                See My Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact-section"
                className="rounded-full border border-[#f7ebdd]/50 px-6 py-3 text-sm font-semibold text-[#f7ebdd] transition hover:border-[#ffb224] hover:text-[#ffb224]"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="pointer-events-none absolute bottom-5 left-6 text-xs text-[#f7ebdd]/60 sm:left-10 md:left-[6vw]"
        style={{ opacity: cueOpacity }}
      >
        Scroll to zoom in
      </motion.p>
    </div>
  );
}
