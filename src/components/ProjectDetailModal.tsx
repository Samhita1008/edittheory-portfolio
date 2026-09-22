import React, { useEffect, useMemo, useRef } from 'react';
import { Project, Theme } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Video, 
  Maximize2,
  X
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  theme: Theme;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenLightbox: (images: string[], title: string, startIndex?: number) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  allProjects,
  isOpen,
  theme,
  onClose,
  onSelectProject,
  onOpenLightbox,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Reset scroll position when switching projects
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [project?.id]);

  // Collect all gallery images for lightbox navigation
  const allGalleryImages = useMemo(() => {
    if (!project) return [];
    const list: { url: string; title: string; caption?: string }[] = [];

    if (project.architectureImage) {
      list.push({
        url: project.architectureImage,
        title: `${project.title} — System Architecture`,
        caption: project.architectureExplanation || 'Visual workflow and execution topology'
      });
    }

    if (project.outputImages && project.outputImages.length > 0) {
      project.outputImages.forEach((out) => {
        if (!list.some(item => item.url === out.url)) {
          list.push({
            url: out.url,
            title: out.title || `${project.title} — System Output`,
            caption: out.caption
          });
        }
      });
    }

    if (project.images && project.images.length > 0) {
      project.images.forEach((img) => {
        if (!list.some(item => item.url === img)) {
          list.push({
            url: img,
            title: `${project.title} — System Output`,
            caption: 'Verified system output'
          });
        }
      });
    }

    return list;
  }, [project]);

  if (!isOpen || !project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const projectNumber = String(project.agentNumber).padStart(2, '0');
  const shortExplanation = project.oneLiner || project.description;
  const overviewText = project.overview || project.description;
  const techLine = project.technologyLine || project.tags.join(' · ');

  // Compact project metadata row (role, type, status)
  const metadata = (() => {
    switch (project.agentNumber) {
      case 6:
        return { role: 'SYSTEM DESIGN + AUTOMATION', type: 'CUSTOMER-FACING SYSTEM', status: 'BUILT' };
      case 4:
        return { role: 'WORKFLOW ARCHITECTURE', type: 'B2B OUTREACH ENGINE', status: 'BUILT' };
      case 1:
        return { role: 'AI CONTENT PIPELINE', type: 'EDITORIAL AUTOMATION', status: 'BUILT' };
      case 2:
        return { role: 'OUTREACH & SEQUENCING', type: 'EMAIL AUTOMATION', status: 'BUILT' };
      case 3:
        return { role: 'DATA SCRAPING & ENRICHMENT', type: 'LEAD DISCOVERY ENGINE', status: 'BUILT' };
      case 5:
        return { role: 'INBOX TRIAGE & SUMMARIZATION', type: 'AUTONOMOUS DAEMON', status: 'BUILT' };
      default:
        return { role: 'SYSTEM DESIGN + AUTOMATION', type: `${project.category.toUpperCase()} SYSTEM`, status: 'BUILT' };
    }
  })();

  // Steps for the numbered sequence
  const steps = project.howItWorks || project.mockupSlides.map((slide, idx) => ({
    step: String(idx + 1).padStart(2, '0'),
    title: slide.title.toUpperCase(),
    description: slide.description
  }));

  const handleOpenImage = (imageUrl: string) => {
    const targetIdx = allGalleryImages.findIndex(img => img.url === imageUrl);
    const urls = allGalleryImages.map(img => img.url);
    onOpenLightbox(urls.length > 0 ? urls : [imageUrl], project.title, targetIdx >= 0 ? targetIdx : 0);
  };

  // Output images (strictly excluding the architecture diagram so it never repeats)
  const rawOutputImages = project.outputImages && project.outputImages.length > 0
    ? project.outputImages
    : project.images.map((url, i) => ({
        url,
        title: project.mockupSlides[i]?.title || `System Output ${i + 1}`,
        caption: project.mockupSlides[i]?.description
      }));

  const outputImagesList = rawOutputImages.filter(
    item => !project.architectureImage || item.url !== project.architectureImage
  );

  const featuredOutput = outputImagesList[0];
  const supportingOutputs = outputImagesList.slice(1);

  return (
    <div 
      id="project-case-study-overlay"
      ref={scrollContainerRef}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        theme === 'dark' ? 'bg-[#07080f] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
      }`}
    >
      {/* Top Floating Bar: Minimal and Breathable */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md px-6 sm:px-12 py-3.5 transition-colors ${
        theme === 'dark' 
          ? 'bg-[#07080f]/90 border-zinc-800/60' 
          : 'bg-[#fafafa]/90 border-zinc-200/80'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to systems"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#4fffb0] transition-colors" />
            <span className="tracking-wide">Back to Systems</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-500">
              {currentIndex + 1} / {allProjects.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close page"
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Case Study Container */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-12 space-y-10 sm:space-y-14">

        {/* 1. HERO SECTION */}
        <section className="space-y-4 sm:space-y-5">
          {/* Subtle Category & Number */}
          <div className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2 select-none">
            <span className="text-[#4fffb0] font-semibold">{projectNumber}</span>
            <span className="text-zinc-600">/</span>
            <span className="uppercase">{project.category}</span>
          </div>

          {/* Dominant Project Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-white tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          {/* Short One- or Two-Sentence Explanation */}
          <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-[700px]">
            {shortExplanation}
          </p>

          {/* Project & Architecture Links */}
          <div className="pt-1 flex flex-wrap items-center gap-6 text-xs font-mono">
            {project.isFlagship && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4fffb0] text-[#060810] font-bold hover:bg-[#4fffb0]/90 transition-colors shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.isFlagship && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#4fffb0] hover:underline underline-offset-4 cursor-pointer font-medium"
              >
                <span>Case Study / Code</span>
                <span className="text-sm leading-none">→</span>
              </a>
            )}

            {!project.isFlagship && (project.githubUrl || project.notionUrl) && (
              <a
                href={project.githubUrl || project.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#4fffb0] hover:underline underline-offset-4 cursor-pointer font-medium"
              >
                <span>{project.githubUrl ? 'View Workflow / Code' : 'Project & architecture'}</span>
                <span className="text-sm leading-none">→</span>
              </a>
            )}

            {project.codeAvailabilityNote && (
              <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
                <span>🔒 {project.codeAvailabilityNote}</span>
              </span>
            )}

            {project.loomUrl && (
              <a
                href={project.loomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#4fffb0] hover:underline underline-offset-4 cursor-pointer transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-zinc-400" />
                <span>Video Walkthrough</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            )}
          </div>

          {/* Architecture / Demo Note */}
          {project.demoModeNote && (
            <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 leading-relaxed max-w-[700px]">
              <span className="text-[#4fffb0] font-semibold">Architecture Note: </span>
              {project.demoModeNote}
            </div>
          )}

          {/* Compact Project Metadata Row (Subtle, No Large Badges) */}
          <div className="pt-3.5 mt-2 border-t border-zinc-800/40 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-mono">
            <div>
              <span className="text-zinc-500">ROLE: </span>
              <span className="text-zinc-300 font-medium">{metadata.role}</span>
            </div>
            <div>
              <span className="text-zinc-500">TYPE: </span>
              <span className="text-zinc-300 font-medium">{metadata.type}</span>
            </div>
            <div>
              <span className="text-zinc-500">STATUS: </span>
              <span className="text-zinc-300 font-medium">{metadata.status}</span>
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW SECTION */}
        <section className="space-y-3 pt-6 border-t border-zinc-800/40">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase">
            OVERVIEW
          </h2>
          <p className="text-base sm:text-[17px] text-zinc-300 font-sans leading-relaxed max-w-[700px]">
            {overviewText}
          </p>
        </section>

        {/* 3. ARCHITECTURE SECTION (Visual Hero) */}
        <section className="space-y-4 pt-6 border-t border-zinc-800/40">
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase">
              ARCHITECTURE
            </h2>
            {project.architectureExplanation && (
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-[700px]">
                {project.architectureExplanation}
              </p>
            )}
          </div>

          {/* Large Architecture Visual Diagram */}
          {project.architectureImage && (
            <div 
              onClick={() => handleOpenImage(project.architectureImage!)}
              className="group relative rounded-xl overflow-hidden border border-zinc-800/80 bg-[#090b13] cursor-pointer shadow-xl transition-colors duration-200 hover:border-zinc-700/90"
            >
              <img
                src={project.architectureImage}
                alt={`${project.title} Architecture Workflow`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Minimal Hover Indicator */}
              <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Fullscreen</span>
              </div>
            </div>
          )}
        </section>

        {/* 4. HOW IT WORKS SECTION (Clean Numbered Sequence) */}
        <section className="space-y-6 pt-6 border-t border-zinc-800/40">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase">
            HOW IT WORKS
          </h2>

          <div className="space-y-6 max-w-[720px]">
            {steps.map((stepItem, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 sm:gap-6 pb-6 border-b border-zinc-800/30 last:border-b-0 last:pb-0"
              >
                {/* Visual Distinction: Prominent Monospace Number */}
                <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-400 select-none w-14 sm:w-16 shrink-0 pt-0.5 tracking-tight">
                  {stepItem.step}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
                    {stepItem.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-400 font-sans leading-relaxed mt-1 max-w-[660px]">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNOLOGY SECTION (Understated Single Line) */}
        <section className="space-y-2.5 pt-6 border-t border-zinc-800/40">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase">
            TECHNOLOGY
          </h2>
          <p className="text-sm sm:text-base font-mono text-zinc-300">
            {techLine}
          </p>
        </section>

        {/* 6. SYSTEM OUTPUT SECTION (Curated Gallery) */}
        {outputImagesList.length > 0 && (
          <section className="space-y-5 pt-6 border-t border-zinc-800/40">
            <div className="space-y-1">
              <h2 className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase">
                SYSTEM OUTPUT
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Click any image to inspect in full resolution
              </p>
            </div>

            <div className="space-y-4">
              {/* Featured Large Image */}
              {featuredOutput && (
                <div
                  onClick={() => handleOpenImage(featuredOutput.url)}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800/80 bg-[#090b13] cursor-pointer shadow-lg transition-colors duration-200 hover:border-zinc-700"
                >
                  <img
                    src={featuredOutput.url}
                    alt={featuredOutput.title || 'System Output'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  {featuredOutput.title && (
                    <div className="px-3.5 py-2.5 bg-zinc-900/40 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span className="truncate">{featuredOutput.title}</span>
                      <Maximize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                    </div>
                  )}
                </div>
              )}

              {/* Supporting Images Grid */}
              {supportingOutputs.length > 0 && (
                <div className={`grid gap-4 ${
                  supportingOutputs.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                }`}>
                  {supportingOutputs.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenImage(item.url)}
                      className="group rounded-lg overflow-hidden border border-zinc-800/80 bg-[#090b13] cursor-pointer transition-colors duration-200 hover:border-zinc-700 flex flex-col justify-between"
                    >
                      <div className="p-2 flex items-center justify-center bg-black/20">
                        <img
                          src={item.url}
                          alt={item.title || 'System Output'}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-44 sm:h-52 object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </div>
                      {item.title && (
                        <div className="px-3 py-2 border-t border-zinc-800/60 bg-zinc-900/30 text-[11px] font-mono text-zinc-400 truncate flex items-center justify-between">
                          <span className="truncate">{item.title}</span>
                          <Maximize2 className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 shrink-0 ml-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. NAVIGATION: Previous / Next System */}
        <nav className="pt-8 pb-12 border-t border-zinc-800/60 flex items-center justify-between text-sm font-mono">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject)}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#4fffb0] transition-colors" />
            <span className="hidden sm:inline text-xs text-zinc-500">Previous:</span>
            <span className="font-semibold text-zinc-300 group-hover:text-[#4fffb0] transition-colors">
              {prevProject.title}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline text-xs text-zinc-500">Next:</span>
            <span className="font-semibold text-zinc-300 group-hover:text-[#4fffb0] transition-colors">
              {nextProject.title}
            </span>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#4fffb0] transition-colors" />
          </button>
        </nav>

      </main>
    </div>
  );
};
