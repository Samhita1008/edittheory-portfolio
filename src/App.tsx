import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, MotionValue, motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, ExternalLink, FileText, Github, Instagram, Linkedin, Lock, Mail, Send } from 'lucide-react';
import { CLIENT_TIERS, PROCESS_STEPS, PROJECTS, SERVICES } from './data';
import { Project } from './types';
import ClientPortal from './components/ClientPortal';
import { ImageViewer, ViewerImage } from './components/ImageViewer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import HeroZoom, { STAGE_STOPS, scrollToStage } from './components/HeroZoom';

const LOGO = '/images/Edit Theory.png';

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Headline that rises out of a mask when it enters the screen. */
function RevealLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.14em]">
      <motion.span className="block" initial={{ y: '108%' }} animate={{ y: seen ? 0 : '108%' }} transition={{ duration: 0.95, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Quiet fade-and-lift for blocks, staggered by `i`. */
function Rise({ children, i = 0, className = '' }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#dcd6ee]" style={{ scaleX }} />;
}

/** Service names drift sideways as the band scrolls through. */
function ServiceBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-38%']);
  const words = [...SERVICES, ...SERVICES].map((s) => s.title);
  return (
    <div ref={ref} aria-label={SERVICES.map((s) => s.title).join(', ')} className="overflow-hidden bg-[#2e211a] py-10 md:py-14">
      <motion.div style={{ x }} className="flex w-max items-center gap-10 whitespace-nowrap font-anton text-[clamp(44px,8vw,112px)] uppercase leading-none text-[#e5e4e2]" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={i % 2 ? 'outline-text' : ''}>{w}</span>
            <span className="h-3 w-3 shrink-0 bg-[#dcd6ee]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** The end-of-page wordmark that slides sideways as you reach the bottom. */
function GiantName() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);
  return (
    <div ref={ref} className="overflow-hidden pb-4">
      <motion.div style={{ x }} className="whitespace-nowrap font-anton text-[clamp(80px,24vw,360px)] uppercase leading-[0.9] text-[#e5e4e2]" aria-label="Edit Theory">
        Edit Theory
      </motion.div>
    </div>
  );
}


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

function BuildSection() {
  return (
    <section id="build-section" className="bg-[#dcd6ee] px-4 py-24 text-[#2e211a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.03] tracking-tight"><RevealLine>Focused on real client conversions.</RevealLine></h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2e211a]/80">
          I don't build generic AI chatbots. I design highly specialized systems that replace hours of manual work with reliable autonomous pipelines.
        </p>
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            { h: 'What I Build', p: 'Specialized, single-purpose automation sequences connected directly to your existing workspace.', items: BUILD_ITEMS },
            { h: 'Who I Help', p: 'Simplifying operations for founders, marketers, and operations leaders.', items: HELP_ITEMS },
          ].map((col, ci) => (
            <Rise key={col.h} i={ci} className="border-t-2 border-[#2e211a] pt-5">
            <div>
              <h3 className="font-display text-2xl font-bold">{col.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2e211a]/75">{col.p}</p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed">
                {col.items.map(([a, b]) => (
                  <li key={a}>
                    <strong className="font-semibold">{a}</strong> {b}
                  </li>
                ))}
              </ul>
            </div>
            </Rise>
          ))}
          <Rise i={2} className="border-t-2 border-[#2e211a] pt-5">
          <div>
            <h3 className="font-display text-2xl font-bold">Custom Solutions</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed">“If you have a workflow bottleneck, I can design a tailored AI solution for it.”</p>
            <p className="mt-5 text-sm leading-relaxed text-[#2e211a]/80">
              The systems and agent architectures shown on this site represent proven, production-tested blueprints. If your team spends hours on copy-pasting, multi-platform scrapers, custom DB loaders, or manual routing, I will engineer a custom script optimized for your exact system requirements on request.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://topmate.io/samhita_tavutu" target="_blank" rel="noopener noreferrer" className="rounded-sm bg-[#2e211a] px-5 py-2.5 text-sm font-semibold text-[#e5e4e2] transition hover:bg-[#4a372c]">
                Book Audit Call
              </a>
              <a href="#contact-section" className="rounded-sm border border-[#2e211a]/60 px-5 py-2.5 text-sm font-semibold transition hover:bg-[#e5e4e2]">
                Message Custom Scope
              </a>
            </div>
          </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}


const FAQS = [
  {
    question: 'What kind of problems do you solve?',
    answer:
      'I eliminate routine, manual business bottlenecks. This includes scraping and qualifying leads from niche databases, auto-writing personalized outreach campaigns, and recycling a single audio/video piece into complete newsletter campaigns, short video scripts, and high-engagement social carousels matching your exact team or founder persona.',
  },
  {
    question: 'Do you only build the 3 listed agents?',
    answer:
      'No. The 3 systems (Content Repurposing, AI Cold Outreach, and Lead Discovery) are ready-to-run blueprints that address the major pain points most D2C founders face. However, I specialize in custom AI automation and routinely design custom systems modeled after your unique operations.',
  },
  {
    question: 'Can you build custom workflows?',
    answer:
      'Yes, absolutely. If you have a specific manual process or bottleneck (e.g. copying data between tools, tracking customer reviews, automating inventory logging, or syncing messaging tools), I can design a tailored AI solution for it.',
  },
  {
    question: 'How do clients work with you?',
    answer:
      'We usually start with a quick, high-impact diagnostic review. This lets us map out your custom pipeline and evaluate potential time and cost savings. From there, we either kick off with a small Pilot Project or design a full custom system. Every deployment is complete with continuous coaching and walkthrough clips so you maintain full workspace independence.',
  },
];


function Pipeline({ progress }: { progress: MotionValue<number> }) {
  const n = PROCESS_STEPS.length;
  const drawn = useTransform(progress, (v) => clampUnit(v));
  return (
    <svg viewBox="0 0 120 420" className="h-[66vh] w-auto" role="img" aria-label="Pipeline with four stages, filling in as you scroll">
      <line x1="60" y1="30" x2="60" y2="390" stroke="#2e211a" strokeOpacity="0.2" strokeWidth="2" />
      <motion.line x1="60" y1="30" x2="60" y2="390" stroke="#2e211a" strokeWidth="2" style={{ pathLength: drawn }} />
      {PROCESS_STEPS.map((s, i) => (
        <PipeStop key={s.stepNumber} y={30 + (360 / (n - 1)) * i} i={i} n={n} progress={progress} label={String(s.stepNumber)} />
      ))}
    </svg>
  );
}
function PipeStop({ y, i, n, progress, label }: { y: number; i: number; n: number; progress: MotionValue<number>; label: string }) {
  const on = useTransform(progress, (v) => (v >= i / n - 0.001 ? 1 : 0));
  return (
    <g>
      <circle cx="60" cy={y} r="17" fill="#e5e4e2" stroke="#2e211a" strokeWidth="2" />
      <motion.circle cx="60" cy={y} r="17" fill="#2e211a" style={{ opacity: on }} />
      <motion.text x="60" y={y + 5} textAnchor="middle" fontFamily="Archivo" fontWeight="700" fontSize="15" fill="#dcd6ee" style={{ opacity: on }}>
        {label}
      </motion.text>
      <text x="60" y={y + 5} textAnchor="middle" fontFamily="Archivo" fontWeight="700" fontSize="15" fill="#2e211a" opacity="0.5">
        {label}
      </text>
    </g>
  );
}
const clampUnit = (n: number) => Math.min(1, Math.max(0, n));

function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const active = useTransform(scrollYProgress, (p) => Math.min(PROCESS_STEPS.length - 1, Math.floor(p * PROCESS_STEPS.length * 0.999)));
  const [idx, setIdx] = useState(0);
  useEffect(() => active.on('change', setIdx), [active]);
  const lit = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  return (
    <section id="process-section" ref={ref} className="relative bg-[#e5e4e2] text-[#2e211a]" style={{ height: '420vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ height: '100dvh' }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 pt-16 sm:px-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          <div className="hidden justify-center md:flex">
            <Pipeline progress={lit} />
          </div>
          <div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[1.04] tracking-tight"><RevealLine>How I transform ideas into engines.</RevealLine></h2>
            <p className="mt-3 text-sm text-[#2e211a]/70">Observe the active data pulse travelling along the pipeline.</p>

            <ol className="mt-8 space-y-2">
              {PROCESS_STEPS.map((step, i) => {
                const on = i === idx;
                return (
                  <li
                    key={step.stepNumber}
                    className={`rounded-sm border px-5 py-4 transition-all duration-500 ${
                      on ? 'border-[#2e211a] bg-[#2e211a] text-[#e5e4e2]' : 'border-[#2e211a]/15 text-[#2e211a]/55'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-bold sm:text-xl">
                        {step.stepNumber}. {step.title}
                      </h3>
                      <span className={`text-sm ${on ? 'text-[#dcd6ee]' : ''}`}>{step.badge}</span>
                    </div>
                    <div
                      className="grid transition-all duration-500"
                      style={{ gridTemplateRows: on ? '1fr' : '0fr' }}
                    >
                      <p className="overflow-hidden text-sm leading-relaxed text-[#e5e4e2]/85 sm:text-[15px]">
                        <span className="block pt-2">{step.description}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const stageRef = useRef<HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<ViewerImage[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactFormBrand, setContactFormBrand] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const route = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('project') || params.get('id') || (window.location.hash ? window.location.hash.replace('#', '') : null);
      if (!q) return;
      const alias: Record<string, string> = {
        concierge: '6', 'project-concierge': '6', restaurant: '4', 'restaurant-outreach': '4', 'project-restaurant-outreach': '4',
        glossier: '1', 'project-glossier': '1', dew: '2', 'dew-co': '2', 'project-dew-co': '2', lead: '3', 'lead-discovery': '3',
        'project-lead-discovery': '3', email: '5', 'email-summary': '5', 'project-email-summary': '5',
      };
      const n = alias[q] || q;
      const found = PROJECTS.find((p) => p.id === q || String(p.agentNumber) === n || p.id === n);
      if (found) setSelectedProject(found);
    };
    route();
    window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, []);

  const openLightbox = (images: string[], title: string, startIndex = 0) => {
    setViewerImages(
      images.map((img, i) => ({
        url: img,
        title: `${title} · Telemetry Review`,
        caption: `Visual architecture & system execution logs (${i + 1} of ${images.length})`,
      })),
    );
    setViewerIndex(startIndex);
    setViewerOpen(true);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return PROJECTS.filter((p) => {
      const s =
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return s && (selectedTag ? p.tags.includes(selectedTag) : true);
    });
  }, [searchTerm, selectedTag]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Edit Theory AI Systems Audit Request - ${contactFormBrand}`);
      const body = encodeURIComponent(
        `Hi Samhita,\n\nI'm ${contactName || 'Founder'} from ${contactFormBrand || 'my brand'}.\n\nHere is what I'm looking to automate: ${contactMessage || 'AI systems and marketing outreach workflows.'}\n\nLet's keep driving growth.`,
      );
      window.location.href = `mailto:samhitatavutu@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
  };

  const navLink = 'whitespace-nowrap rounded-sm px-3 py-1.5 text-sm text-[#e5e4e2]/80 transition hover:text-[#dcd6ee]';

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#2e211a] font-sans text-[#e5e4e2]">
      <ScrollBar />
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 mix-blend-normal">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <a href="#" className="flex items-center gap-2.5 rounded-sm bg-[#2e211a]/70 py-1 pl-1 pr-4 backdrop-blur" aria-label="Edit Theory, home">
            <img src={LOGO} alt="" className="h-8 w-8 rounded-sm object-cover" />
            <span className="whitespace-nowrap font-display text-sm font-bold leading-none">Edit Theory</span>
            <span className="hidden text-xs text-[#e5e4e2]/60 sm:inline">AI Automation Systems</span>
          </a>
          <div className="flex items-center gap-1 rounded-sm bg-[#2e211a]/70 px-2 py-1 backdrop-blur">
            <button type="button" className={`${navLink} hidden sm:block`} onClick={() => scrollToStage(stageRef, STAGE_STOPS.about)}>
              About
            </button>
            <a href="#projects-section" className={navLink}>Systems Built</a>
            <a href="#process-section" className={`${navLink} hidden sm:block`}>Work Process</a>
            <a href="#client-portal-section" className={`${navLink} hidden md:block`}>Portal Space</a>
            <a href="#contact-section" className="whitespace-nowrap rounded-sm bg-[#dcd6ee] px-4 py-1.5 text-sm font-bold text-[#2e211a] transition hover:bg-[#ece8f7]">
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* HERO + ABOUT + WHAT I BUILD: one zoom through three letters */}
      <section id="about-section" ref={stageRef} className="relative" style={{ height: '480vh' }}>
        <HeroZoom stageRef={stageRef} />
      </section>

      <ServiceBand />
      <BuildSection />

      {/* PROJECTS */}
      <section id="projects-section" className="bg-[#2e211a] px-4 pb-24 pt-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 pt-16">
            <p className="text-base text-[#dcd6ee]">Strategic Case Studies</p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight"><RevealLine>Systems Design &amp; Mechanics</RevealLine></h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#e5e4e2]/80">
              Production-grade systems engineering: architecture blueprints, orchestration logic, and end-to-end automation.
            </p>
          </div>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter systems by tag">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                aria-pressed={selectedTag === null}
                className={`rounded-sm border px-3 py-1 text-sm transition ${selectedTag === null ? 'border-[#dcd6ee] bg-[#dcd6ee] text-[#2e211a]' : 'border-[#e5e4e2]/25 text-[#e5e4e2]/80 hover:border-[#dcd6ee]'}`}
              >
                All
              </button>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  aria-pressed={selectedTag === t}
                  className={`rounded-sm border px-3 py-1 text-sm transition ${selectedTag === t ? 'border-[#dcd6ee] bg-[#dcd6ee] text-[#2e211a]' : 'border-[#e5e4e2]/25 text-[#e5e4e2]/80 hover:border-[#dcd6ee]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <label className="relative block md:w-64">
              <span className="sr-only">Search systems</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search systems"
                className="w-full rounded-sm border border-[#e5e4e2]/25 bg-transparent px-4 py-2 text-sm text-[#e5e4e2] placeholder:text-[#e5e4e2]/45 focus:border-[#dcd6ee]"
              />
            </label>
          </div>

          {filtered.length === 0 && (
            <div className="mx-auto max-w-sm rounded-sm border border-[#e5e4e2]/20 p-8 text-center text-sm text-[#e5e4e2]/70">
              No results found matching your active tags or search terms.
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag(null);
                }}
                className="mt-3 block w-full text-[#dcd6ee] underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <div>
            {filtered.map((proj) => (
              <motion.article
                key={proj.id}
                id={proj.id}
                className="group relative grid gap-5 py-9 md:grid-cols-[88px_minmax(0,1fr)_auto] md:gap-8"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[#e5e4e2]/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <span className="font-anton text-5xl leading-none text-[#dcd6ee] md:text-6xl" aria-label={`Agent ${proj.agentNumber}`}>
                  {String(proj.agentNumber).padStart(2, '0')}
                </span>

                <div className="min-w-0 space-y-3">
                  <p className="text-sm text-[#e5e4e2]/65">
                    {proj.category}
                    {proj.badge ? ` — ${proj.badge}` : ''}
                  </p>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="text-left font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-tight transition-colors group-hover:text-[#dcd6ee]"
                    >
                      {proj.title}
                    </button>
                  </h3>
                  {proj.engagementNote && (
                    <p className="inline-block rounded-sm bg-[#dcd6ee]/15 px-3 py-1 text-sm text-[#dcd6ee]">{proj.engagementNote}</p>
                  )}
                  <p className="max-w-3xl text-base leading-relaxed text-[#e5e4e2]/85">{proj.description}</p>
                  <p className="text-sm text-[#e5e4e2]/60">{proj.tags.join(', ')}</p>
                </div>

                <div className="flex flex-col gap-3 md:items-end md:justify-between">
                  {proj.isFlagship ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-sm bg-[#dcd6ee] px-4 py-2 text-sm font-bold text-[#2e211a] transition hover:bg-[#ece8f7]"
                        >
                          Live Demo <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(proj)}
                        className="inline-flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-[#dcd6ee]"
                      >
                        Case Study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-[#dcd6ee]"
                    >
                      View System <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#e5e4e2]/65">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#dcd6ee]">
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        {proj.isFlagship ? 'Case Study / Code' : proj.codeAvailabilityNote ? 'GitHub' : 'Workflow / Code'}
                      </a>
                    )}
                    {!proj.isFlagship && !proj.githubUrl && proj.notionUrl && (
                      <a href={proj.notionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#dcd6ee]">
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Project &amp; architecture
                      </a>
                    )}
                    {proj.codeAvailabilityNote && (
                      <span className="inline-flex items-center gap-1">
                        <Lock className="h-3.5 w-3.5" aria-hidden="true" />{' '}
                        {proj.codeAvailabilityNote.includes('request') && !proj.codeAvailabilityNote.includes('Workflow')
                          ? 'Available on request'
                          : proj.codeAvailabilityNote}
                      </span>
                    )}
                    {proj.loomUrl && (
                      <a href={proj.loomUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#dcd6ee]">
                        Loom
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* GitHub spotlight */}
          <div className="mt-12 rounded-sm bg-[#4a372c] p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <p className="flex flex-wrap items-center gap-2 text-sm text-[#e5e4e2]/80">
                  <Github className="h-4 w-4" aria-hidden="true" /> Repository: Samhita1008 / edit-theory-agents. 8 Systems &amp; Post-Mortems
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Production Architecture &amp; Incident Post-Mortems</h3>
                <p className="text-sm leading-relaxed text-[#e5e4e2]/85 sm:text-base">
                  Project workflows and architecture breakdowns for 8 AI automation systems, alongside detailed post-mortems documenting production edge cases (API rate limits, webhook drops, non-deterministic outputs, proxy blocks) and their architectural remediations.
                </p>
              </div>
              <a
                href="https://github.com/Samhita1008/edit-theory-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#e5e4e2] px-6 py-3 text-sm font-bold text-[#2e211a] transition hover:bg-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> View on GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS (pinned, silhouette lights up) */}
      <ProcessStory />

      {/* PORTAL */}
      <section id="client-portal-section" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <ClientPortal theme="dark" />
      </section>

      {/* PRICING */}
      <section id="pricing-section" className="bg-[#e5e4e2] px-4 py-24 text-[#2e211a] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-base text-[#4a372c]">The Pricing Framework</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.02] tracking-tight"><RevealLine>How I partner for leverage.</RevealLine></h2>
          <p className="mt-4 max-w-2xl text-base text-[#2e211a]/75">
            I usually begin with a small, focused pilot build so you can see the workflow in action with zero risk.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CLIENT_TIERS.map((tier, i) => (
              <Rise key={tier.tier} i={i} className="flex">
              <div
                key={tier.tier}
                className={`flex w-full flex-col rounded-sm p-7 ${i === 1 ? 'bg-[#2e211a] text-[#e5e4e2]' : 'border border-[#2e211a]/20'}`}
              >
                <p className={`text-sm ${i === 1 ? 'text-[#dcd6ee]' : 'text-[#4a372c]'}`}>Pricing Plan</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{tier.tier}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 1 ? 'text-[#e5e4e2]/80' : 'text-[#2e211a]/75'}`}>{tier.description}</p>
                <ul className={`mt-5 flex-1 space-y-2.5 border-t pt-5 text-sm leading-relaxed ${i === 1 ? 'border-[#e5e4e2]/20' : 'border-[#2e211a]/15'}`}>
                  {tier.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-[#4a372c]">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-section"
                  className={`mt-7 rounded-sm px-5 py-3 text-center text-sm font-bold transition ${
                    i === 1 ? 'bg-[#dcd6ee] text-[#2e211a] hover:bg-[#ece8f7]' : 'border border-[#2e211a]/40 hover:bg-[#2e211a] hover:text-[#e5e4e2]'
                  }`}
                >
                  Select Pilot Setup
                </a>
              </div>
              </Rise>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl rounded-sm bg-[#dcd6ee]/25 px-5 py-4 text-center text-sm">
            <strong>System Hand-off Memo:</strong> Every system I build ships with solid setup checklists and video walkthroughs so you gain complete, unmanaged autonomy.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" className="bg-[#2e211a] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-base text-[#dcd6ee]">Frequently Asked Questions</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-tight"><RevealLine>Clear Answers on Automation.</RevealLine></h2>
          <p className="mt-4 text-base text-[#e5e4e2]/75">
            Everything you need to know about partnering for custom AI automation setups and custom workflow development.
          </p>

          <div className="mt-10 divide-y divide-[#e5e4e2]/20 border-y border-[#e5e4e2]/20">
            {FAQS.map((faq, i) => {
              const open = activeFaq === i;
              return (
                <div key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      onClick={() => setActiveFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold transition hover:text-[#dcd6ee]"
                    >
                      {faq.question}
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? 'rotate-180 text-[#dcd6ee]' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-base leading-relaxed text-[#e5e4e2]/80">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-sm bg-[#4a372c] p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-lg font-bold">Got a specific workflow bottleneck?</h3>
              <p className="mt-1 text-sm text-[#e5e4e2]/80">
                Let's design a custom-tailored automation system optimized for your exact conversion rate requirements.
              </p>
            </div>
            <a href="#contact-section" className="shrink-0 rounded-sm bg-[#dcd6ee] px-6 py-3 text-sm font-bold text-[#2e211a] transition hover:bg-[#ece8f7]">
              Get Custom Scope
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-section" className="relative overflow-hidden bg-[#dcd6ee] px-4 py-24 text-[#2e211a] sm:px-8">
        <div className="relative mx-auto max-w-6xl">
          <p className="text-base">Connect Today</p>
          <h2 className="mt-2 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.95] tracking-tight"><RevealLine>Let's Build Something.</RevealLine></h2>
          <p className="mt-5 max-w-xl text-lg">
            Reach out to schedule an automation review session. I respond within 24 hours with a personalized breakdown.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <div className="space-y-3 md:col-span-4">
              {[
                { href: 'mailto:samhitatavutu@gmail.com', icon: Mail, label: 'Primary Email', value: 'samhitatavutu@gmail.com' },
                { href: 'https://github.com/Samhita1008/', icon: Github, label: 'GitHub Profile', value: '@Samhita1008 →' },
                { href: 'https://www.linkedin.com/in/samhita-tavutu-b17b2a37b/', icon: Linkedin, label: 'LinkedIn Profile', value: 'Samhita Tavutu →' },
                { href: 'https://www.instagram.com/fr_samhitaaa/', icon: Instagram, label: 'Instagram Handle', value: '@fr_samhitaaa' },
              ].map(({ href, icon: Icon, label, value }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-sm bg-[#2e211a] p-4 text-[#e5e4e2] transition hover:bg-[#40302a]"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#dcd6ee]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs text-[#e5e4e2]/60">{label}</span>
                    <span className="block truncate text-sm font-semibold">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-sm bg-[#e5e4e2] p-6 sm:p-8 md:col-span-8 lg:col-span-6">
              {formSubmitted ? (
                <div className="py-10 text-center">
                  <h3 className="font-display text-xl font-bold">Opening Mail Client...</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-[#2e211a]/75">
                    Your default mail app will open with your details filled in. If nothing happens, email samhitatavutu@gmail.com directly.
                  </p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="mt-4 text-sm font-semibold underline">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                      Your Name
                      <input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Emily Weiss"
                        className="mt-1 w-full rounded-sm border border-[#2e211a]/25 bg-white px-3 py-2.5 text-sm"
                      />
                    </label>
                    <label className="block text-sm font-medium">
                      Your Brand Name
                      <input
                        value={contactFormBrand}
                        onChange={(e) => setContactFormBrand(e.target.value)}
                        placeholder="e.g. Glossier D2C"
                        className="mt-1 w-full rounded-sm border border-[#2e211a]/25 bg-white px-3 py-2.5 text-sm"
                      />
                    </label>
                  </div>
                  <label className="block text-sm font-medium">
                    Explain your manual bottleneck
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="e.g. Recreating newsletter articles from podcasts takes too many hours, or we need lead sifting lists..."
                      className="mt-1 w-full resize-none rounded-sm border border-[#2e211a]/25 bg-white px-3 py-2.5 text-sm"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#2e211a] px-6 py-3 text-sm font-bold text-[#e5e4e2] transition hover:bg-[#4a372c]"
                  >
                    Send Me a Message <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="overflow-hidden bg-[#2e211a] px-4 pb-8 pt-20 sm:px-8">
        <GiantName />
        <div className="mt-6" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#e5e4e2]/65 md:flex-row">
          <span>© 2025 - 2026. AI Systems for D2C Brands.</span>
          <div className="flex items-center gap-5">
            <a href="#about-section" className="hover:text-[#dcd6ee]">About</a>
            <a href="#projects-section" className="hover:text-[#dcd6ee]">Systems Built</a>
            <a href="#process-section" className="hover:text-[#dcd6ee]">Work Process</a>
            <a href="#contact-section" className="hover:text-[#dcd6ee]">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/fr_samhitaaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#dcd6ee]"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/samhita-tavutu-b17b2a37b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#dcd6ee]"><Linkedin className="h-4 w-4" /></a>
            <a href="https://github.com/Samhita1008/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#dcd6ee]"><Github className="h-4 w-4" /></a>
            <a href="mailto:samhitatavutu@gmail.com" aria-label="Email" className="hover:text-[#dcd6ee]"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>

      <ProjectDetailModal
        project={selectedProject}
        allProjects={PROJECTS}
        isOpen={!!selectedProject}
        theme="dark"
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenLightbox={openLightbox}
      />
      <ImageViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={viewerImages}
        currentIndex={viewerIndex}
        onNavigate={setViewerIndex}
      />
    </div>
    </MotionConfig>
  );
}
