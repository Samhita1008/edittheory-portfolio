import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, ExternalLink, FileText, Github, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import { CLIENT_TIERS, PROCESS_STEPS, PROJECTS } from './data';
import { Project } from './types';
import ClientPortal from './components/ClientPortal';
import { ImageViewer, ViewerImage } from './components/ImageViewer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Silhouette } from './components/Silhouette';
import ZoomStage, { STAGE_STOPS, scrollToStage } from './components/ZoomStage';

const LOGO = '/images/Edit Theory.png';

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

function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const active = useTransform(scrollYProgress, (p) => Math.min(PROCESS_STEPS.length - 1, Math.floor(p * PROCESS_STEPS.length * 0.999)));
  const [idx, setIdx] = useState(0);
  useEffect(() => active.on('change', setIdx), [active]);
  const lit = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  return (
    <section id="process-section" ref={ref} className="relative bg-[#f7ebdd] text-[#1e0f2e]" style={{ height: '420vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ height: '100dvh' }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 pt-16 sm:px-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          <div className="hidden justify-center md:flex">
            <Silhouette progress={lit} tone="plum" className="h-[74vh] w-auto" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[1.04] tracking-tight">
              How I transform ideas into engines.
            </h2>
            <p className="mt-3 text-sm text-[#1e0f2e]/70">Observe the active data pulse travelling along the pipeline.</p>

            <ol className="mt-8 space-y-2">
              {PROCESS_STEPS.map((step, i) => {
                const on = i === idx;
                return (
                  <li
                    key={step.stepNumber}
                    className={`rounded-2xl border px-5 py-4 transition-all duration-500 ${
                      on ? 'border-[#1e0f2e] bg-[#1e0f2e] text-[#f7ebdd]' : 'border-[#1e0f2e]/15 text-[#1e0f2e]/55'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-bold sm:text-xl">
                        {step.stepNumber}. {step.title}
                      </h3>
                      <span className={`text-sm ${on ? 'text-[#ffb224]' : ''}`}>{step.badge}</span>
                    </div>
                    <div
                      className="grid transition-all duration-500"
                      style={{ gridTemplateRows: on ? '1fr' : '0fr' }}
                    >
                      <p className="overflow-hidden text-sm leading-relaxed text-[#f7ebdd]/85 sm:text-[15px]">
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

  const navLink = 'whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-[#f7ebdd]/80 transition hover:text-[#ffb224]';

  return (
    <div className="min-h-screen bg-[#1e0f2e] font-sans text-[#f7ebdd]">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 mix-blend-normal">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <a href="#" className="flex items-center gap-2.5 rounded-full bg-[#1e0f2e]/70 py-1 pl-1 pr-4 backdrop-blur" aria-label="Edit Theory, home">
            <img src={LOGO} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="whitespace-nowrap font-display text-sm font-bold leading-none">Edit Theory</span>
            <span className="hidden text-xs text-[#f7ebdd]/60 sm:inline">AI Automation Systems</span>
          </a>
          <div className="flex items-center gap-1 rounded-full bg-[#1e0f2e]/70 px-2 py-1 backdrop-blur">
            <button type="button" className={`${navLink} hidden sm:block`} onClick={() => scrollToStage(stageRef, STAGE_STOPS.about)}>
              About
            </button>
            <a href="#projects-section" className={navLink}>Systems Built</a>
            <a href="#process-section" className={`${navLink} hidden sm:block`}>Work Process</a>
            <a href="#client-portal-section" className={`${navLink} hidden md:block`}>Portal Space</a>
            <a href="#contact-section" className="rounded-full bg-[#ffb224] px-4 py-1.5 text-sm font-bold text-[#1e0f2e] transition hover:bg-[#ffc24f]">
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* HERO + ABOUT + WHAT I BUILD: one zoom through three letters */}
      <section id="about-section" ref={stageRef} className="relative" style={{ height: '700vh' }}>
        <ZoomStage stageRef={stageRef} />
      </section>

      {/* PROJECTS */}
      <section id="projects-section" className="bg-[#1e0f2e] px-4 pb-24 pt-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter systems by tag">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                aria-pressed={selectedTag === null}
                className={`rounded-full border px-3 py-1 text-sm transition ${selectedTag === null ? 'border-[#ffb224] bg-[#ffb224] text-[#1e0f2e]' : 'border-[#f7ebdd]/25 text-[#f7ebdd]/80 hover:border-[#ffb224]'}`}
              >
                All
              </button>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  aria-pressed={selectedTag === t}
                  className={`rounded-full border px-3 py-1 text-sm transition ${selectedTag === t ? 'border-[#ffb224] bg-[#ffb224] text-[#1e0f2e]' : 'border-[#f7ebdd]/25 text-[#f7ebdd]/80 hover:border-[#ffb224]'}`}
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
                className="w-full rounded-full border border-[#f7ebdd]/25 bg-transparent px-4 py-2 text-sm text-[#f7ebdd] placeholder:text-[#f7ebdd]/45 focus:border-[#ffb224]"
              />
            </label>
          </div>

          {filtered.length === 0 && (
            <div className="mx-auto max-w-sm rounded-2xl border border-[#f7ebdd]/20 p-8 text-center text-sm text-[#f7ebdd]/70">
              No results found matching your active tags or search terms.
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag(null);
                }}
                className="mt-3 block w-full text-[#ffb224] underline"
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
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[#f7ebdd]/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <span className="font-display text-5xl font-bold leading-none text-[#ffb224] md:text-6xl" aria-label={`Agent ${proj.agentNumber}`}>
                  {String(proj.agentNumber).padStart(2, '0')}
                </span>

                <div className="min-w-0 space-y-3">
                  <p className="text-sm text-[#f7ebdd]/65">
                    {proj.category}
                    {proj.badge ? ` — ${proj.badge}` : ''}
                  </p>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="text-left font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-tight transition-colors group-hover:text-[#ffb224]"
                    >
                      {proj.title}
                    </button>
                  </h3>
                  {proj.engagementNote && (
                    <p className="inline-block rounded-full bg-[#ee5a7e]/20 px-3 py-1 text-sm text-[#ffb7c9]">{proj.engagementNote}</p>
                  )}
                  <p className="max-w-3xl text-base leading-relaxed text-[#f7ebdd]/85">{proj.description}</p>
                  <p className="text-sm text-[#f7ebdd]/60">{proj.tags.join(', ')}</p>
                </div>

                <div className="flex flex-col gap-3 md:items-end md:justify-between">
                  {proj.isFlagship ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#ffb224] px-4 py-2 text-sm font-bold text-[#1e0f2e] transition hover:bg-[#ffc24f]"
                        >
                          Live Demo <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(proj)}
                        className="inline-flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-[#ffb224]"
                      >
                        Case Study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-[#ffb224]"
                    >
                      View System <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#f7ebdd]/65">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ffb224]">
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        {proj.isFlagship ? 'Case Study / Code' : proj.codeAvailabilityNote ? 'GitHub' : 'Workflow / Code'}
                      </a>
                    )}
                    {!proj.isFlagship && !proj.githubUrl && proj.notionUrl && (
                      <a href={proj.notionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ffb224]">
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Project &amp; architecture
                      </a>
                    )}
                    {proj.codeAvailabilityNote && (
                      <span>
                        🔒{' '}
                        {proj.codeAvailabilityNote.includes('request') && !proj.codeAvailabilityNote.includes('Workflow')
                          ? 'Available on request'
                          : proj.codeAvailabilityNote}
                      </span>
                    )}
                    {proj.loomUrl && (
                      <a href={proj.loomUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb224]">
                        Loom
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* GitHub spotlight */}
          <div className="mt-12 rounded-3xl bg-[#5b3a7a] p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <p className="flex flex-wrap items-center gap-2 text-sm text-[#f7ebdd]/80">
                  <Github className="h-4 w-4" aria-hidden="true" /> Repository: Samhita1008 / edit-theory-agents. 7 Production Systems &amp; Post-Mortems
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Production Architecture &amp; Incident Post-Mortems</h3>
                <p className="text-sm leading-relaxed text-[#f7ebdd]/85 sm:text-base">
                  Project workflows and architecture breakdowns for 7 deployed AI automation systems, alongside detailed post-mortems documenting production edge cases (API rate limits, webhook drops, non-deterministic outputs, proxy blocks) and their architectural remediations.
                </p>
              </div>
              <a
                href="https://github.com/Samhita1008/edit-theory-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f7ebdd] px-6 py-3 text-sm font-bold text-[#1e0f2e] transition hover:bg-white"
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
      <section id="pricing-section" className="bg-[#f7ebdd] px-4 py-24 text-[#1e0f2e] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-base text-[#5b3a7a]">The Pricing Framework</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.02] tracking-tight">How I partner for leverage.</h2>
          <p className="mt-4 max-w-2xl text-base text-[#1e0f2e]/75">
            I usually begin with a small, focused pilot build so you can see the workflow in action with zero risk.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CLIENT_TIERS.map((tier, i) => (
              <div
                key={tier.tier}
                className={`flex flex-col rounded-3xl p-7 ${i === 1 ? 'bg-[#1e0f2e] text-[#f7ebdd]' : 'border border-[#1e0f2e]/20'}`}
              >
                <p className={`text-sm ${i === 1 ? 'text-[#ffb224]' : 'text-[#5b3a7a]'}`}>Pricing Plan</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{tier.tier}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 1 ? 'text-[#f7ebdd]/80' : 'text-[#1e0f2e]/75'}`}>{tier.description}</p>
                <ul className={`mt-5 flex-1 space-y-2.5 border-t pt-5 text-sm leading-relaxed ${i === 1 ? 'border-[#f7ebdd]/20' : 'border-[#1e0f2e]/15'}`}>
                  {tier.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-[#ee5a7e]">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-section"
                  className={`mt-7 rounded-full px-5 py-3 text-center text-sm font-bold transition ${
                    i === 1 ? 'bg-[#ffb224] text-[#1e0f2e] hover:bg-[#ffc24f]' : 'border border-[#1e0f2e]/40 hover:bg-[#1e0f2e] hover:text-[#f7ebdd]'
                  }`}
                >
                  Select Pilot Setup
                </a>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-[#ffb224]/25 px-5 py-4 text-center text-sm">
            💡 <strong>System Hand-off Memo:</strong> Every system I build ships with solid setup checklists and video walkthroughs so you gain complete, unmanaged autonomy.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" className="bg-[#1e0f2e] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-base text-[#ffb224]">Frequently Asked Questions</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-tight">Clear Answers on Automation.</h2>
          <p className="mt-4 text-base text-[#f7ebdd]/75">
            Everything you need to know about partnering for custom AI automation setups and custom workflow development.
          </p>

          <div className="mt-10 divide-y divide-[#f7ebdd]/20 border-y border-[#f7ebdd]/20">
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
                      className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold transition hover:text-[#ffb224]"
                    >
                      {faq.question}
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? 'rotate-180 text-[#ffb224]' : ''}`} aria-hidden="true" />
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
                        <p className="pb-6 text-base leading-relaxed text-[#f7ebdd]/80">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#5b3a7a] p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-lg font-bold">Got a specific workflow bottleneck?</h3>
              <p className="mt-1 text-sm text-[#f7ebdd]/80">
                Let's design a custom-tailored automation system optimized for your exact conversion rate requirements.
              </p>
            </div>
            <a href="#contact-section" className="shrink-0 rounded-full bg-[#ffb224] px-6 py-3 text-sm font-bold text-[#1e0f2e] transition hover:bg-[#ffc24f]">
              Get Custom Scope
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-section" className="relative overflow-hidden bg-[#ee5a7e] px-4 py-24 text-[#1e0f2e] sm:px-8">
        <div className="pointer-events-none absolute -bottom-10 right-[-2rem] hidden opacity-90 lg:block">
          <Silhouette tone="plum" className="h-[34rem] w-auto" label="" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-base">Connect Today</p>
          <h2 className="mt-2 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.95] tracking-tight">Let's Build Something.</h2>
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
                  className="flex items-center gap-3 rounded-2xl bg-[#1e0f2e] p-4 text-[#f7ebdd] transition hover:bg-[#2b183f]"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#ffb224]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs text-[#f7ebdd]/60">{label}</span>
                    <span className="block truncate text-sm font-semibold">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-3xl bg-[#f7ebdd] p-6 sm:p-8 md:col-span-8 lg:col-span-6">
              {formSubmitted ? (
                <div className="py-10 text-center">
                  <h3 className="font-display text-xl font-bold">Opening Mail Client...</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-[#1e0f2e]/75">
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
                        className="mt-1 w-full rounded-xl border border-[#1e0f2e]/25 bg-white px-3 py-2.5 text-sm"
                      />
                    </label>
                    <label className="block text-sm font-medium">
                      Your Brand Name
                      <input
                        value={contactFormBrand}
                        onChange={(e) => setContactFormBrand(e.target.value)}
                        placeholder="e.g. Glossier D2C"
                        className="mt-1 w-full rounded-xl border border-[#1e0f2e]/25 bg-white px-3 py-2.5 text-sm"
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
                      className="mt-1 w-full resize-none rounded-xl border border-[#1e0f2e]/25 bg-white px-3 py-2.5 text-sm"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1e0f2e] px-6 py-3 text-sm font-bold text-[#f7ebdd] transition hover:bg-[#5b3a7a]"
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
      <footer className="bg-[#1e0f2e] px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#f7ebdd]/65 md:flex-row">
          <span>© 2025 - 2026. AI Systems for D2C Brands.</span>
          <div className="flex items-center gap-5">
            <a href="#about-section" className="hover:text-[#ffb224]">About</a>
            <a href="#projects-section" className="hover:text-[#ffb224]">Systems Built</a>
            <a href="#process-section" className="hover:text-[#ffb224]">Work Process</a>
            <a href="#contact-section" className="hover:text-[#ffb224]">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/fr_samhitaaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#ffb224]"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/samhita-tavutu-b17b2a37b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#ffb224]"><Linkedin className="h-4 w-4" /></a>
            <a href="https://github.com/Samhita1008/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#ffb224]"><Github className="h-4 w-4" /></a>
            <a href="mailto:samhitatavutu@gmail.com" aria-label="Email" className="hover:text-[#ffb224]"><Mail className="h-4 w-4" /></a>
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
  );
}
