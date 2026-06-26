import { useState, useMemo, FormEvent } from 'react';
import { SERVICES, PROJECTS, PROCESS_STEPS, CLIENT_TIERS } from './data';
import { Project, Service, Theme } from './types';
import { 
  Sun, 
  Moon, 
  Search, 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  Compass, 
  Sparkles, 
  Sliders, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  Smartphone, 
  User,
  Instagram,
  Network,
  Cpu,
  Users,
  Wrench,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { ParticleBackground, DrawIcon, ProcessConnectLine } from './components/Effects';
import ClientPortal from './components/ClientPortal';
import RoiCalculator from './components/RoiCalculator';

// Edit Theory Custom High-Fidelity SVG Brand Logo Resource
const EDIT_THEORY_LOGO_URL = "/images/Edit Theory.png";

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sub-slide states for the 3 distinct project carousels
  const [projectSlideIndex, setProjectSlideIndex] = useState<{ [projectId: string]: number }>({
    'project-glossier': 0,
    'project-dew-co': 0,
    'project-lead-discovery': 0,
  });

  // Client Portal contact form dynamic values
  const [contactName, setContactName] = useState('');
  const [contactFormBrand, setContactFormBrand] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Toggle Theme helper
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Extract all distinct keywords for dynamic filters
  const allProjectTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  // Filter Projects and Services in real-time based on Search + Selected tag
  const filteredData = useMemo(() => {
    const sanitizedSearch = searchTerm.toLowerCase().trim();

    let matchedServices = SERVICES.filter(s => {
      const titleLower = s.title.toLowerCase();
      const descLower = s.description.toLowerCase();
      const bulletsLower = s.bullets.join(' ').toLowerCase();

      if (selectedTag) {
        const tagLower = selectedTag.toLowerCase();
        
        // Dynamic mapping of project tags to services to keep service channel visible
        if (
          tagLower.includes('agent') || 
          tagLower.includes('repurposing') || 
          tagLower.includes('media') || 
          tagLower.includes('tone') || 
          tagLower.includes('scheduling')
        ) {
          return s.id === 'service-repurposing';
        }
        if (
          tagLower.includes('email') || 
          tagLower.includes('outreach') || 
          tagLower.includes('linkedin') || 
          tagLower.includes('personalization') || 
          tagLower.includes('crm') || 
          tagLower.includes('hubspot')
        ) {
          return s.id === 'service-outreach';
        }
        if (
          tagLower.includes('scraping') || 
          tagLower.includes('sifting') || 
          tagLower.includes('enrichment') || 
          tagLower.includes('qualification')
        ) {
          return s.id === 'service-scraping';
        }
        
        return titleLower.includes(tagLower) || 
               descLower.includes(tagLower) || 
               bulletsLower.includes(tagLower);
      }

      return titleLower.includes(sanitizedSearch) || 
             descLower.includes(sanitizedSearch) ||
             bulletsLower.includes(sanitizedSearch);
    });

    // Fallback: display all services if filtered structure becomes empty
    if (matchedServices.length === 0) {
      matchedServices = SERVICES;
    }

    const matchedProjects = PROJECTS.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(sanitizedSearch) ||
                          p.category.toLowerCase().includes(sanitizedSearch) ||
                          p.description.toLowerCase().includes(sanitizedSearch) ||
                          p.tags.some(t => t.toLowerCase().includes(sanitizedSearch));
      
      const matchTag = selectedTag ? p.tags.includes(selectedTag) : true;
      return matchSearch && matchTag;
    });

    return {
      services: matchedServices,
      projects: matchedProjects
    };
  }, [searchTerm, selectedTag]);

  // Handle message send submission simulations
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // open user mail Client with target elements filled securely
      const subject = encodeURIComponent(`Edit Theory AI Systems Audit Request - ${contactFormBrand}`);
      const body = encodeURIComponent(`Hi Samhita,\n\nI'm ${contactName || 'Founder'} from ${contactFormBrand || 'my brand'}.\n\nHere is what I'm looking to automate: ${contactMessage || 'AI systems and marketing outreach workflows.'}\n\nLet's keep driving growth.`);
      window.location.href = `mailto:samhitatavutu@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
  };

  return (
    <div id="app-root-container" className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810] text-[#f4f4f7] theme-dark' : 'bg-[#f4f6fa] text-[#121826] theme-light'}`}>
      
      {/* GLOBAL NAVBAR */}
      <nav id="header-navbar" className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810]/80 border-zinc-900/60' : 'bg-white/80 border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-2.5 hover:opacity-90 transition">
            <img 
              src={EDIT_THEORY_LOGO_URL} 
              alt="Edit Theory Logo" 
              className="w-10 h-10 object-contain rounded-full shadow-[0_0_12px_rgba(79,255,176,0.2)]" 
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <span className="font-display font-bold text-base tracking-tight text-white block leading-none">Edit Theory</span>
              <span className="text-[9px] font-mono tracking-widest text-[#4fffb0] uppercase mt-0.5 block">AI Automation Systems</span>
            </div>
          </a>

          {/* Nav links for desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about-section" className="hover:text-[#4fffb0] transition-colors">About</a>
            <a href="#services-section" className="hover:text-[#4fffb0] transition-colors">Services</a>
            <a href="/projects.html" className="hover:text-[#4fffb0] transition-colors font-semibold text-[#4fffb0]">Systems Built</a>
            <a href="#process-section" className="hover:text-[#4fffb0] transition-colors">Work Process</a>
            <a href="#client-portal-section" className="hover:text-[#4fffb0] transition-colors text-xs font-mono px-3 py-1 rounded bg-[#4fffb0]/10 text-[#4fffb0] border border-[#4fffb0]/25">Portal Space</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border transition duration-300 cursor-pointer ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900 text-[#4fffb0] hover:bg-zinc-800' : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'}`}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a 
              href="#contact-section" 
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold text-xs transition shadow-md cursor-pointer"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="hero-section" className="relative pt-24 pb-20 md:py-32 overflow-hidden flex flex-col justify-center items-center min-h-[90vh]">
        {/* Particle System Canvas & Blurs */}
        <ParticleBackground theme={theme} />
        
        {/* Ambient Gradient Orbs in Dark Mode */}
        {theme === 'dark' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-[#4fffb0]/5 blur-[120px] rounded-full animate-float-orb-1 pointer-events-none z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-500/5 blur-[100px] rounded-full animate-float-orb-2 pointer-events-none z-0"></div>
          </>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-6 md:space-y-8">
          
          {/* Eyebrow Dot Banner - With slow breathing pulse expand/contract animation */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/40 dark:bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-[#4fffb0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4fffb0] animate-breathing-glow shadow-[0_0_12px_#4fffb0]"></span>
            <span>SYSTEM CONSOLE ONLINE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight max-w-3xl mx-auto text-sophisticated-glow">
            I build custom <span className="text-[#4fffb0] [-webkit-text-fill-color:#4fffb0]">AI systems</span> for D2C brands to solve growth and workflow bottlenecks.
          </h1>

          <p id="hero-subtitle" className="text-sm sm:text-base md:text-lg text-zinc-400 dark:text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Eliminate manual bottlenecks. I design and launch tailored AI workflows that scrape qualified leads daily, automate personalized outbound outreach, and scale organic content distribution on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="/projects.html" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold transition duration-300 text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(79,255,176,0.2)] hover:shadow-[0_0_28px_rgba(79,255,176,0.4)] cursor-pointer"
            >
              See My Work <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact-section" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-700 hover:border-[#4fffb0]/45 bg-zinc-950/20 hover:bg-zinc-900 text-zinc-200 hover:text-white font-semibold transition duration-300 text-sm flex items-center justify-center cursor-pointer"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </header>

      {/* ABOUT / WHO I AM SECTION */}
      <section id="about-section" className={`py-20 border-t border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#080b15]/60 border-zinc-900/60' : 'bg-white border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group p-1.5 rounded-2xl border border-zinc-800 bg-zinc-900/20 max-w-[280px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4fffb0] to-indigo-500 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300 blur-md"></div>
                <div className="w-56 h-56 rounded-2xl bg-[#060810] border border-zinc-900 flex flex-col items-center justify-center relative overflow-hidden text-center p-6 space-y-4">
                  
                  {/* Digital profile widget */}
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 relative overflow-hidden">
                    <img 
                      src="/images/sam.jpeg" 
                      alt="Samhita Tavutu Profile" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4fffb0] border-[#060810] border-2 rounded-full"></div>
                  </div>

                  <div>
                    <h4 className="text-sm font-display font-bold text-white">Samhita Tavutu</h4>
                    <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Systems Architect</p>
                  </div>

                  <span className="text-[10px] bg-[#4fffb0]/10 text-[#4fffb0] border border-[#4fffb0]/35 px-2.5 py-0.5 rounded-full font-mono">
                    Pondicherry, IN
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-left">
              <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">The Engineer</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-sophisticated-glow">
                Building custom automation systems for scaling brands.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 dark:text-zinc-300 leading-relaxed font-sans">
                I’m Samhita, a CSE student at Pondicherry Central University building AI-powered systems for D2C brands. I started this because I noticed how much time founders lose recreating content and writing cold messages manually — so I began building systems that automate that work.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 leading-relaxed font-sans">
                By modeling human research intuition in scripts and optimizing custom LLM prompts, I clear out routine manual tasks so brands can focus on high-intent relationship building.
              </p>

              {/* Dynamic educational badge anchors */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="text-[11px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-md">
                  💼 CSE @ Pondicherry Central University
                </span>
                <span className="text-[11px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-md">
                  🐍 Python & TypeScript Scraping
                </span>
                <span className="text-[11px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-md">
                  💡 Prompt Engineering & APIs
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPREHENSIVE SEARCH & CATALOG DISCOVERY SECTION */}
      <section id="discovery-section" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="search-console-container" className={`rounded-2xl p-6 relative transition-all duration-300 ${theme === 'dark' ? 'card-vibe' : 'bg-white border border-zinc-200'}`}>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-mono text-[#4fffb0] uppercase tracking-wider block">Real-time Catalog Engine</span>
              <h3 className={`text-lg font-display font-semibold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Dynamic Asset Search Console</h3>
            </div>
            
            {/* Search Input field */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedTag(null); // Clear tag selection when searching manually
                }}
                placeholder="Search tools, projects, tags..."
                className="w-full bg-[#060810] border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60 transition"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
            <span className="text-[11px] font-mono text-zinc-500 mr-2">Filter tags:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition capitalize cursor-pointer ${!selectedTag ? 'bg-[#4fffb0] text-[#060810] font-semibold' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
            >
              All Assets
            </button>
            {allProjectTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? null : tag);
                  setSearchTerm(''); // Clear text search to focus on tag
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-mono transition cursor-pointer ${selectedTag === tag ? 'bg-[#4fffb0] text-[#060810] font-semibold' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services-section" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">Strategic Offerings</span>
          <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>AI systems designed to grow without overhead.</h2>
        </div>

        {filteredData.services.length === 0 && (
          <p className="text-center text-zinc-500 text-xs py-8">No matching services in active filter query. Try searching for "Repurposing".</p>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {filteredData.services.map((svc) => (
            <div 
              key={svc.id}
              className={`draw-icon-wrapper p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:scale-[1.01] text-left hover:border-[#4fffb0]/50 ${theme === 'dark' ? 'card-vibe' : 'bg-white border-zinc-200'}`}
            >
              {/* Highlight background in dark theme */}
              {theme === 'dark' && (
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#4fffb0]/1 blur-2xl group-hover:bg-[#4fffb0]/5 transition duration-300"></div>
              )}

              {/* DrawIcon receives hovering events, outline triggers stroke drawing animation */}
              <div className="mb-6 inline-block">
                <DrawIcon name={svc.iconName} className="w-10 h-10" />
              </div>

              <h3 className={`text-lg font-display font-bold mb-3 group-hover:text-[#4fffb0] transition-colors ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>{svc.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">{svc.description}</p>
              
              <ul className="space-y-2.5">
                {svc.bullets.map((blt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] mt-1.5 shrink-0"></span>
                    <span className="text-zinc-500 dark:text-zinc-400">{blt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT I BUILD, WHO I HELP & CUSTOM SOLUTIONS SECTION */}
      <section id="custom-solutions-section" className={`py-20 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-[#080c18] border-zinc-900/60' : 'bg-[#f4f6fa] border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">Strategic Architecture</span>
            <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Focused on real client conversions.</h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              I don't build generic AI chatbots. I design highly specialized systems that replace hours of manual work with reliable autonomous pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Box 1: What I Build */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/30' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#4fffb0]/10 text-[#4fffb0] border border-[#4fffb0]/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-display font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>What I Build</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Specialized, single-purpose automation sequences connected directly to your existing workspace.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">✓</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>Custom AI Agents:</strong> Self-running n8n, Make, or custom Node script logic chains.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">✓</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>Lead Scraping & Sifting:</strong> Active scrapers returning pre-qualified, clean leads on autopilot.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">✓</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>Tone Master Engines:</strong> Brand-specific prompt libraries modeled directly on your writing style.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 2: Who I Help */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/30' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#4fffb0]/10 text-[#4fffb0] border border-[#4fffb0]/20">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-display font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>Who I Help</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Simplifying operations for founders, marketers, and operations leaders.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">→</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>D2C Founders & Operators:</strong> Looking to generate high-intent pipeline growth with extremely lean teams.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">→</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>Outreach & Growth Leads:</strong> Burdened by endless lead verification and custom outbound templates.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[#4fffb0] shrink-0 font-bold">→</span>
                    <span className="text-zinc-500 dark:text-zinc-400"><strong>Video Podcasters & Creators:</strong> Needing to distribute organic clips instantly across multi-channels.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 3: Custom Work / Bottleneck Buster */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between md:col-span-1 border-[#4fffb0]/20 bg-[#4fffb0]/[0.01] ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/40' : 'bg-teal-50/20 hover:border-zinc-300'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#4fffb0]/15 text-[#4fffb0] border border-[#4fffb0]/30 shadow-[0_0_12px_rgba(79,255,176,0.1)]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-display font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>Custom Solutions</h3>
                </div>
                <div className="p-3 bg-[#4fffb0]/5 rounded-lg border border-[#4fffb0]/20 text-xs text-[#4fffb0] font-sans font-medium">
                  💡 “If you have a workflow bottleneck, I can design a tailored AI solution for it.”
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  The three agents on this site are pre-built blueprints. But if your team spends hours on copy-pasting, multi-platform scrapers, custom DB loaders, or manual routing, I will engineer a custom script optimized for your exact system requirements on request.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-2.5">
                <a 
                  href="https://topmate.io/samhita_tavutu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center rounded bg-[#4fffb0] hover:bg-[#4fffb0]/90 text-[#060810] font-bold text-xs transition cursor-pointer"
                >
                  Book Audit Call
                </a>
                <a 
                  href="#contact-section"
                  className="flex-1 py-2 text-center rounded border border-zinc-700 hover:border-[#4fffb0]/40 text-zinc-300 hover:text-white font-semibold text-xs transition cursor-pointer"
                >
                  Message Custom Scope
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHAT I'VE BUILT / PROJECTS SECTION */}
      <section id="projects-section" className={`py-20 border-t border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810]/80 border-zinc-900/60' : 'bg-white border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">Strategic Case Studies</span>
            <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Systems Design & Mechanics</h2>
            <div className="text-xs text-zinc-500 max-w-2xl mx-auto font-sans bg-zinc-950/40 p-3 rounded border border-zinc-900/60 leading-relaxed text-center">
              Please note: The studies below showcase conceptual, custom high-fidelity workflow designs and pipeline structures mapped for brands. These represent spec work prototypes engineered to map system capabilities and are not live-production integrations serving customer endpoints.
            </div>
            <p className="text-[10px] text-[#4fffb0] mt-1 font-mono uppercase tracking-wider">
              Click the step buttons on any card to study core system mechanics.
            </p>
          </div>

          {filteredData.projects.length === 0 && (
            <div className="bg-zinc-950 p-8 rounded-lg text-center text-zinc-500 max-w-sm mx-auto text-xs">
              No results found matching your active tags or search terms.
              <button onClick={() => { setSearchTerm(''); setSelectedTag(null); }} className="block mx-auto mt-3 text-[#4fffb0] font-bold underline cursor-pointer">
                Clear all filters
              </button>
            </div>
          )}

          <div className="space-y-12">
            {filteredData.projects.map((proj) => {
              const activeSlideIdx = projectSlideIndex[proj.id] || 0;
              const activeSlide = proj.mockupSlides[activeSlideIdx] || proj.mockupSlides[0];

              return (
                <div 
                  key={proj.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 p-6 md:p-8 text-left ${theme === 'dark' ? 'card-vibe' : 'bg-[#fcfcfc] border-zinc-200'}`}
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Visual Asset Showcase Column */}
                    <div className="lg:col-span-6 space-y-4">
                      
                      {/* Image Viewer Container */}
                      <div className="relative rounded-xl border border-zinc-800 bg-[#060810] aspect-video overflow-hidden group">
                        
                        {/* If using the real generated image URL */}
                        {proj.images[activeSlideIdx] && !proj.images[activeSlideIdx].includes('slide-') ? (
                          <img 
                            src={proj.images[activeSlideIdx]} 
                            alt={activeSlide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          // High-fidelity fully responsive visual system mockup placeholder with pure CSS/SVG
                          <div className="w-full h-full p-6 flex flex-col justify-between relative bg-gradient-to-br from-[#0b0e1c] to-[#04060b] text-[#4fffb0] duration-300">
                            
                            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                              <span className="text-[10px] font-mono tracking-widest uppercase">Agent #{proj.agentNumber} Interactive Board</span>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#4fffb0] animate-pulse"></span>
                                <span className="text-[9px] font-mono text-zinc-500">Node Sync Active</span>
                              </div>
                            </div>

                            <div className="space-y-2 py-4">
                              <span className="text-[10px] bg-[#4fffb0]/10 border border-[#4fffb0]/30 text-[#4fffb0] px-2 py-0.5 rounded uppercase font-mono tracking-widest block w-max">
                                {activeSlide.metrics}
                              </span>
                              <p className="text-xl font-display font-medium text-white">{activeSlide.title}</p>
                              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{activeSlide.description}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-zinc-900/40 pt-2 text-[9px] text-zinc-500 font-mono">
                              <span>Step {activeSlideIdx + 1} of {proj.mockupSlides.length}</span>
                              <span>Target: Skincare Brand Growth</span>
                            </div>

                          </div>
                        )}

                        {/* Top layout banner on hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs bg-[#060810] text-[#4fffb0] border border-[#4fffb0]/30 px-3 py-1.5 rounded-full font-mono font-bold">
                            Interactive Studio Frame
                          </span>
                        </div>
                      </div>

                      {/* Interactive Slide selectors for controlling 3-5 images/slides */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500">Jump to section:</span>
                        {proj.mockupSlides.map((slide, sIdx) => {
                          let stepLabel = `Step ${sIdx + 1}: ${slide.title.split(' ')[0]}`;
                          if (proj.agentNumber === 1) {
                            const labels = ['workflow', 'notion', 'notion'];
                            stepLabel = `step 1: workflow`; // Custom match
                            if (sIdx === 0) stepLabel = `step 1: workflow`;
                            if (sIdx === 1) stepLabel = `step 2: notion`;
                            if (sIdx === 2) stepLabel = `step 3: notion`;
                          } else if (proj.agentNumber === 2) {
                            if (sIdx === 0) stepLabel = `step 1: outreach`;
                            if (sIdx === 1) stepLabel = `step 2: followup`;
                            if (sIdx === 2) stepLabel = `step 3: replytracker`;
                            if (sIdx === 3) stepLabel = `step 4: sheets`;
                            if (sIdx === 4) stepLabel = `step 5: mail`;
                          } else if (proj.agentNumber === 3) {
                            if (sIdx === 0) stepLabel = `step 1: curl`;
                            if (sIdx === 1) stepLabel = `step 2: workflow`;
                            if (sIdx === 2) stepLabel = `step 3: sheets`;
                          }
                          return (
                            <button
                              key={sIdx}
                              onClick={() => {
                                setProjectSlideIndex(prev => ({
                                  ...prev,
                                  [proj.id]: sIdx
                                }));
                              }}
                              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors duration-200 cursor-pointer ${activeSlideIdx === sIdx ? 'bg-[#4fffb0]/15 text-[#4fffb0] border border-[#4fffb0]/55 font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-transparent'}`}
                            >
                              {stepLabel}
                            </button>
                          );
                        })}
                      </div>

                    </div>

                    {/* Metadata Detail Copy Column */}
                    <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono px-3 py-1 rounded ${theme === 'dark' ? 'bg-[#060810] text-[#4fffb0] border border-white/5' : 'bg-zinc-100 text-[#0c101d] border border-zinc-200'}`}>
                            Agent #{proj.agentNumber}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{proj.category}</span>
                        </div>

                        <h3 className={`text-2xl font-display font-bold leading-normal ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>
                          {proj.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-350 leading-relaxed font-sans">
                          {proj.description}
                        </p>

                        {/* Slide specific descriptive callout */}
                        <div className={`p-3.5 rounded-xl space-y-1.5 transition-all duration-300 ${theme === 'dark' ? 'bg-[#060810]/80 border border-white/5' : 'bg-zinc-50 border border-zinc-200'}`}>
                          <div className="flex items-center gap-2">
                            <Sliders className="w-3.5 h-3.5 text-[#4fffb0]" />
                            <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Automated Metric Details</span>
                          </div>
                          <p className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>{activeSlide.title}</p>
                          <p className="text-[10px] text-zinc-400 leading-normal">{activeSlide.description}</p>
                          <p className="text-[10px] font-mono text-[#4fffb0] font-semibold">{activeSlide.metrics}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-zinc-900/60">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono bg-[#4fffb0]/5 text-zinc-500 border border-zinc-900 px-2.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Interactive Notion & Loom trigger links */}
                        <div className="flex flex-wrap gap-3">
                          {proj.notionUrl && (
                            <a 
                              href={proj.notionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[11px] font-mono flex items-center gap-1.5 transition"
                            >
                              📚 Notion Readout <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {proj.loomUrl && (
                            <a 
                              href={proj.loomUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-[11px] font-mono flex items-center gap-1.5 transition"
                            >
                              🎥 Loom Video <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Dedicated Systems built banner - keeping the option somewhere on the page, not just top nav */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#4fffb0]/10 via-[#4fffb0]/5 to-transparent border border-[#4fffb0]/25 text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#4fffb0] uppercase font-bold px-2 py-0.5 rounded bg-[#4fffb0]/10 border border-[#4fffb0]/20">
                LIVE TELEMETRY HUB
              </span>
              <h3 className="text-xl font-display font-extrabold text-white">
                Want to explore the live logs, scrapers, and cron schedulers?
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl font-sans leading-relaxed">
                I maintain a dedicated, fully-interactive system archive complete with real audit engine error detectors, templates AI outputs, and CRM rotators.
              </p>
            </div>
            <a 
              href="/projects.html" 
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold transition duration-300 text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0 text-center shadow-[0_0_20px_rgba(79,255,176,0.15)] hover:shadow-[0_0_25px_rgba(79,255,176,0.3)]"
            >
              Explore Interactive Systems <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* HOW I WORK PROCESS MAP */}
      <section id="process-section" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">The Implementation Pipeline</span>
          <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>How I transform ideas into engines.</h2>
          <p className="text-xs text-zinc-500 mt-2 font-mono">Observe the active data pulse travelling along the pipeline.</p>
        </div>

        <div className="relative">
          {/* Connecting line animation mimicking flow path active dot pipeline */}
          <ProcessConnectLine />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step) => (
              <div 
                key={step.stepNumber} 
                className={`p-6 rounded-2xl border flex flex-col justify-between min-h-[220px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left ${theme === 'dark' ? 'card-vibe' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-display font-black text-[#4fffb0]/20 group-hover:text-[#4fffb0]/40 font-mono select-none">
                      0{step.stepNumber}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${theme === 'dark' ? 'bg-[#060810] border border-white/5 text-[#4fffb0]' : 'bg-zinc-100 text-zinc-600'}`}>
                      {step.badge}
                    </span>
                  </div>

                  <h3 className={`text-sm font-display font-bold group-hover:text-[#4fffb0] transition-colors ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{step.description}</p>
                </div>

                <div className="text-[10px] font-mono text-zinc-600 mt-4 border-t border-zinc-900/60 pt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4fffb0]" /> Task validation: ok
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURE CLIENT HUB MOUNT */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientPortal theme={theme} />
      </section>

      {/* CLIENT RETAINER TIERS SECTION */}
      <section id="pricing-section" className={`py-20 border-t border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810]/80 border-zinc-900/60' : 'bg-white border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-2 text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">The Pricing Framework</span>
            <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>How I partner for leverage.</h2>
            <p className="text-xs text-zinc-500 mt-2 font-mono">I usually begin with a small, focused pilot build so you can see the workflow in action with zero risk.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {CLIENT_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:border-[#4fffb0]/55 hover:scale-[1.01] ${theme === 'dark' ? 'card-vibe' : 'bg-white border-zinc-200'}`}
              >
                <div className="space-y-6">
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-mono uppercase text-[#4fffb0] tracking-widest">Pricing Plan</span>
                    <h3 className={`text-lg font-display font-black ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>{tier.tier}</h3>
                    <p className="text-xs text-zinc-400 font-sans leading-normal">{tier.description}</p>
                  </div>

                  <hr className="border-zinc-900" />

                  <ul className="space-y-3 font-sans text-xs text-left">
                    {tier.deliverables.map((dlv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-[#4fffb0] shrink-0 mt-0.5" />
                        <span>{dlv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="#contact-section"
                    className="w-full py-2.5 rounded bg-zinc-950 border border-zinc-800 hover:border-[#4fffb0]/40 text-center text-xs font-medium text-zinc-300 hover:text-white transition block cursor-pointer"
                  >
                    Select Pilot Setup
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Client Note */}
          <div className="mt-12 p-4 rounded-xl bg-[#4fffb0]/5 border border-[#4fffb0]/20 max-w-2xl mx-auto text-center font-sans">
            <p className="text-xs text-teal-400 font-sans font-medium line-clamp-3">
              💡 <strong>System Hand-off Memo:</strong> Every system I build ships with solid setup checklists and video walkthroughs so you gain complete, unmanaged autonomy.
            </p>
          </div>

        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section id="roi-calculator-section" className={`py-20 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810]/95 border-zinc-900/60' : 'bg-zinc-50/50 border-zinc-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase font-bold">Capital & Time Leverage</span>
            <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Interactive ROI Calculator.</h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Estimate the hours reclaimed and direct financial uplift of moving from manual operations to self-running, automated pipelines.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <RoiCalculator theme={theme} />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq-section" className={`py-20 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-[#060810] border-zinc-900/60' : 'bg-white border-zinc-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-3 text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase font-bold flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </span>
            <h2 className={`text-3xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Clear Answers on Automation.</h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Everything you need to know about partnering for custom AI automation setups and custom workflow development.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What kind of problems do you solve?',
                answer: 'I eliminate routine, manual business bottlenecks. This includes scraping and qualifying leads from niche databases, auto-writing personalized outreach campaigns, and recycling a single audio/video piece into complete newsletter campaigns, short video scripts, and high-engagement social carousels matching your exact team or founder persona.'
              },
              {
                question: 'Do you only build the 3 listed agents?',
                answer: 'No. The 3 systems (Content Repurposing, AI Cold Outreach, and Lead Discovery) are ready-to-run blueprints that address the major pain points most D2C founders face. However, I specialize in custom AI automation and routinely design custom systems modeled after your unique operations.'
              },
              {
                question: 'Can you build custom workflows?',
                answer: 'Yes, absolutely. If you have a specific manual process or bottleneck (e.g. copying data between tools, tracking customer reviews, automating inventory logging, or syncing messaging tools), I can design a tailored AI solution for it.'
              },
              {
                question: 'How do clients work with you?',
                answer: 'We usually start with a quick, high-impact diagnostic review. This lets us map out your custom pipeline and evaluate potential time and cost savings. From there, we either kick off with a small Pilot Project or design a full custom system. Every deployment is complete with continuous coaching and walkthrough clips so you maintain full workspace independence.'
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? theme === 'dark' ? 'border-[#4fffb0]/45 bg-[#4fffb0]/[0.02]' : 'border-zinc-300 bg-zinc-50'
                      : theme === 'dark' ? 'border-zinc-900 bg-zinc-950/20' : 'border-zinc-200 bg-[#f9fafb]'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-sm font-bold font-display ${isOpen ? 'text-[#4fffb0]' : theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-zinc-500 hover:text-white">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#4fffb0]" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {/* FAQ Answer with smooth accordion transition */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-zinc-200/50 dark:border-zinc-900/60 py-4 px-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-[#4fffb0]/5 border border-[#4fffb0]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h4 className="text-xs font-bold text-white">Got a specific workflow bottleneck?</h4>
              <p className="text-[11px] text-zinc-400">Let's design a custom-tailored automation system optimized for your exact conversion rate requirements.</p>
            </div>
            <a 
              href="#contact-section"
              className="px-5 py-2.5 rounded-lg bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold text-xs transition duration-200 shrink-0 cursor-pointer text-center w-full sm:w-auto"
            >
              Get Custom Scope
            </a>
          </div>

        </div>
      </section>

      {/* CONTACT / LET'S BUILD SOMETHING */}
      <section id="contact-section" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#4fffb0] uppercase">Connect Today</span>
          <h2 className={`text-4xl font-display font-extrabold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>Let's Build Something.</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Reach out to schedule an automation review session. I respond within 24 hours with a personalized breakdown.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Quick Info Grid Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            
            <a 
              href="mailto:samhitatavutu@gmail.com" 
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 group ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/40' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
            >
              <Mail className="w-5 h-5 text-[#4fffb0] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block leading-none">Primary Email</span>
                <span className={`text-xs font-bold transition-colors truncate block mt-1 ${theme === 'dark' ? 'text-zinc-350 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'}`}>samhitatavutu@gmail.com</span>
              </div>
            </a>

            <a 
              href="https://topmate.io/samhita_tavutu"
              target="_blank"
              rel="noopener noreferrer" 
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 group ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/40' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
            >
              <Sliders className="w-5 h-5 text-[#4fffb0] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block leading-none">Schedule Call</span>
                <span className={`text-xs font-bold transition-colors truncate block mt-1 ${theme === 'dark' ? 'text-zinc-350 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'}`}>Topmate Hub Page →</span>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/edit_theory3124"
              target="_blank"
              rel="noopener noreferrer" 
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 group ${theme === 'dark' ? 'card-vibe hover:border-[#4fffb0]/40' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
            >
              <Instagram className="w-5 h-5 text-[#4fffb0] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block leading-none">Social Updates</span>
                <span className={`text-xs font-bold transition-colors truncate block mt-1 ${theme === 'dark' ? 'text-zinc-350 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'}`}>@edit_theory3124</span>
              </div>
            </a>

          </div>

          {/* Secure Interactive Email Composer Panel */}
          <div className={`md:col-span-8 rounded-2xl p-6 text-left transition-all duration-300 ${theme === 'dark' ? 'card-vibe' : 'bg-white border border-zinc-200'}`}>
            <p className="text-xs font-mono text-zinc-500 mb-4 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#4fffb0]" /> Live Mail Composer Router (Direct Callback)
            </p>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#4fffb0]/10 border border-[#4fffb0]/30 flex items-center justify-center mx-auto text-[#4fffb0]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Opening Mail Client...</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-normal">
                  Your customized automation outline metadata is loaded. Clicking ok launches your desktop composer immediately.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)} 
                  className="px-3 py-1.5 rounded border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60"
                      placeholder="e.g. Emily Weiss"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Your Brand Name</label>
                    <input
                      type="text"
                      required
                      value={contactFormBrand}
                      onChange={(e) => setContactFormBrand(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60"
                      placeholder="e.g. Glossier D2C"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Explain your manual bottleneck</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-[#060810] border border-zinc-800 rounded px-3  py-2 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60"
                    placeholder="e.g. Recreating newsletter articles from podcasts takes too many hours, or we need lead sifting lists..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4fffb0] hover:bg-[#4fffb0]/90 text-[#060810] font-bold rounded-lg text-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send Me a Message <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer-container" className="py-12 border-t transition-colors duration-300 bg-[#060810] border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-3">
            <img 
              src={EDIT_THEORY_LOGO_URL}
              alt="Edit Theory Logo" 
              className="w-8 h-8 rounded-full" 
              referrerPolicy="no-referrer"
            />
            <div className="text-left font-sans text-xs text-zinc-500">
              <strong className="text-white block">Edit Theory</strong>
              <span>© 2025 - 2026. AI Systems for D2C Brands.</span>
            </div>
          </div>

          {/* Quick Footer Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 font-mono my-4 sm:my-0">
            <a href="#about-section" className="hover:text-[#4fffb0] transition">About</a>
            <a href="#services-section" className="hover:text-[#4fffb0] transition">Services</a>
            <a href="/projects.html" className="hover:text-[#4fffb0] transition font-bold text-[#4fffb0]">Systems Built</a>
            <a href="#roi-calculator-section" className="hover:text-[#4fffb0] transition">ROI Calc</a>
            <a href="#contact-section" className="hover:text-[#4fffb0] transition">Contact</a>
          </div>

          {/* Social Links opening in brand-new tabs */}
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/edit_theory3124" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-[#4fffb0] transition"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://topmate.io/samhita_tavutu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-[#4fffb0] transition"
              title="Topmate Schedule Hub"
            >
              <Network className="w-5 h-5" />
            </a>
            <a 
              href="mailto:samhitatavutu@gmail.com" 
              className="text-zinc-500 hover:text-[#4fffb0] transition"
              title="Email Inbox Direct"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
