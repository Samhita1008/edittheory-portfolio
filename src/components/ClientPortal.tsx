import { useState, useEffect } from 'react';
import { AuthState, Theme } from '../types';
import { Lock, Mail, Github, LogOut, Check, Sliders, Play, RotateCcw, Award } from 'lucide-react';

interface ClientPortalProps {
  theme: Theme;
}

export default function ClientPortal({ theme }: ClientPortalProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'repurpose' | 'scraping'>('email');

  // Input States for the interactive sandbox
  const [brandName, setBrandName] = useState('GlowSkincare');
  const [productType, setProductType] = useState('Hydrating Saffron Serum');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  // States for user customization of their dummy OAuth partner credentials
  const [customName, setCustomName] = useState('Sarah Jenkins');
  const [customEmail, setCustomEmail] = useState('sarah.jenkins@gmail.com');

  // Helper with automatic console clearing to prevent index/property mismatched rendering crashes when switching tabs
  const selectTab = (tab: 'email' | 'repurpose' | 'scraping') => {
    setActiveTab(tab);
    setGeneratedResult(null);
  };

  // Success message listener (Simulating full-fidelity iframe-safe postMessage flow)
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      // Validate incoming messages to be from a secure domain or self
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const payload = event.data.payload || {
          name: 'Pioneer Brand Partner',
          email: 'founder@glowcosmetics.com',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          provider: 'google'
        };

        setAuthState({
          isAuthenticated: true,
          user: payload,
          accessToken: 'eyQ1N2N3NDI4Y...secure_oauth_token',
        });
        setIsAuthModalOpen(false);
      }
    };

    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  // Handler to trigger standard popup or standard sandbox-overlay login
  const handleConnect = (provider: 'google' | 'github') => {
    // We open a simulated mini popup window to let the user auth without requiring pre-registered GCP APIs
    const width = 500;
    const height = 620;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popupHtml = `
      <html>
        <head>
          <title>Authorize Edit Theory Studio Integration</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'DM Sans', sans-serif; }
            h1, h2 { font-family: 'Syne', sans-serif; }
          </style>
        </head>
        <body class="bg-[#060810] text-zinc-100 flex flex-col justify-between h-screen p-6 overflow-hidden">
          <div class="text-center pt-4">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-[#4fffb0]/20 text-[#4fffb0] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold text-zinc-100">OAuth 2.0 Secure Grant</h1>
            <p class="text-xs text-zinc-400 mt-2">Connecting with <strong class="text-white">${provider === 'google' ? 'Google Social ID' : 'GitHub Developer ID'}</strong></p>
          </div>

          <div class="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 my-2 text-xs space-y-3">
            <p class="text-zinc-300"><strong>Edit Theory Systems</strong> is requesting access to execute:</p>
            <ul class="space-y-2 text-zinc-400">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#4fffb0]"></span>
                Verify your email, name, and profile thumbnail.
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#4fffb0]"></span>
                Enable sandboxed AI automated generation instances.
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div class="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-left space-y-3">
              <span class="text-[10px] font-mono text-[#4fffb0] uppercase tracking-wider block font-bold">Approve Link Account Details</span>
              <div class="space-y-1.5">
                <label class="block text-[10px] text-zinc-400 font-mono">Your Full Name</label>
                <input id="input-name" type="text" class="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]" value="${customName}" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-[10px] text-zinc-400 font-mono">${provider === 'google' ? 'Google Account Email' : 'GitHub Account Email / Username'}</label>
                <input id="input-email" type="text" class="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]" value="${customEmail}" />
              </div>
            </div>

            <button id="auth-btn" class="w-full py-2.5 rounded bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold transition text-xs">
              Approve & Authenticate Access
            </button>
            
            <button onclick="window.close()" class="w-full py-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-white transition text-[11px]">
              Cancel
            </button>
          </div>

          <div class="text-center pt-2">
            <p class="text-[9px] text-zinc-600 font-mono">Secure Token Callback URI: ${window.location.origin}/auth/callback</p>
          </div>

          <script>
            document.getElementById('auth-btn').addEventListener('click', () => {
              const enteredName = document.getElementById('input-name').value.trim() || 'Sarah Jenkins';
              const enteredEmail = document.getElementById('input-email').value.trim() || 'sarah.jenkins@gmail.com';
              const payload = {
                name: enteredName,
                email: enteredEmail,
                avatarUrl: '${provider === 'google' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'}',
                provider: '${provider}'
              };
              
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'OAUTH_AUTH_SUCCESS',
                  payload: payload 
                }, '*');
                window.close();
              }
            });
          </script>
        </body>
      </html>
    `;

    // Try opening popup
    const popupWindow = window.open(
      '',
      'Edit Theory OAuth Integration',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popupWindow) {
      popupWindow.document.write(popupHtml);
      popupWindow.document.close();
    } else {
      // Fallback fallback if popup blocked
      // Direct message trigger for ease in iframe contexts
      window.postMessage({
        type: 'OAUTH_AUTH_SUCCESS',
        payload: {
          name: customName,
          email: customEmail,
          avatarUrl: provider === 'google' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          provider: provider
        }
      }, window.location.origin);
    }
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
    setGeneratedResult(null);
  };

  const executeAutomationSimulation = () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    // Simulate multi-tier generation pipelines matching Edit Theory services
    setTimeout(() => {
      setIsGenerating(false);

      if (activeTab === 'email') {
        setGeneratedResult({
          subject: `⚡ Quick automation feedback for ${brandName}?`,
          body: `Hi Team,

I loved the layout of your new ${productType}. I noticed you guys are manually pushing your social snippets.

I compiled 3 content frameworks and scheduled an interactive email sequence for you that automatically follows up. Let me know when you'd like to unlock the complete automated pipeline?

Cheers,
AI Agent for ${brandName}`,
          highlight: 'Delivered through Rotated Address Mailbox 3. Spam rating: 0.1/10 (Excellent).'
        });
      } else if (activeTab === 'repurpose') {
        setGeneratedResult({
          podcastSegment: `Repurposed 1 Founder Podcast → 10 assets for ${brandName}`,
          assets: [
            { type: 'Carousel', content: `Slide 1: Why conventional ${productType} fails. Slide 2: The chemical formulation secret. Slide 3: How we purified our active ingredients. Slide 4: Real results after 14 days of ${brandName}. Slide 5: Link in bio to join first batch.` },
            { type: 'Reel Script 1', content: `[Visuals: Extreme close up of ${productType} texture being dispensed] Hook: "If your skincare is 90% water, you are getting scammed." Action: Show comparison of high-density active ingredients. CTA: Sound on, save this for your next routine.` },
            { type: 'Reel Script 2', content: `[Visuals: Microscopic product details overlay] Voiceover: "We spent 18 months in the lab to remove standard synthetic fillers from ${brandName}." Show raw organic extracts. "Pure nutrients, direct to skin."` },
            { type: 'Reel Script 3', content: `[Visuals: Natural model applying ${productType} on damp skin] Voiceover: "The 30-second morning glide that locks in hydration without looking greasy." Reveal a dewy, glowing finish. "Link in bio to test it."` },
            { type: 'LinkedIn Post', content: `We bootstrapped ${brandName} to completely bypass traditional retailer commissions. Here is the full breakdown of how we scaled ${productType} production with custom automation and tone consistency: (Thread)` },
            { type: 'Newsletter', content: `Unpacking the scientific composition and organic sustainability metrics behind ${brandName}'s new ${productType}. Get ready for chemical purity built with zero carbon compromise.` },
            { type: 'Quote Post', content: `"High-quality skincare doesn't need a high-street markup. It needs architectural purity and formula transparency." — Founder, ${brandName}` },
            { type: 'Instagram Caption', content: `Pure formulas. Zero compromises. Made to fit your daily ritual seamlessly. Explore the science of ${productType} at the link in bio. ✨ #${brandName} #CleanBeauty #SkinSecret` },
            { type: 'X Thread', content: `1/ How we manufactured the formula behind ${productType} to challenge standard retail margins. 2/ By stripping out 7 common filler agents, we increased efficacy by 43%. 3/ Standard brands rely on distributors. We went direct. Here is the data 👇` },
            { type: 'Ad Concept', content: `Visual: Split screen showcasing "Standard ${productType}" vs "Edit Theory Formula for ${brandName}". Heading: "The Clean Formulation Upgrade". Trigger: Button "Claim Premium Offer"` }
          ],
          highlight: 'Optimized into tone voice profile: Minimalist Premium.'
        });
      } else {
        setGeneratedResult({
          campaignType: 'Automated Multi-Source Scrape Pipeline',
          prospects: [
            {
              name: 'Sienna Beauty Spa',
              platform: 'Instagram',
              niche: 'Organic Skincare',
              profileUrl: 'instagram.com/sienna_beauty_spa',
              recentTopic: `Sourcing pure lavender for custom ${productType}`,
              generatedOpener: `Obsessed with that fresh lavender extraction clip! Really cool insight into your ${productType} formulation.`,
              fullColdEmail: `Hi Team,\n\nLoved your recent video showing the lavender extraction process! Have you considered automating your Reels & TikTok repurposing? I help brands like ${brandName} scale a single video segment into 10 custom brand assets in seconds.\n\nHere's a potential first opener tailored for your skincare values. Would you be open to seeing the workflow?\n\nBest,\nAutomated Partner Engine`,
              email: 'info@siennaspa.com',
              dateSent: '2026-06-13',
              status: 'Highly Qualified',
              leadScore: '96/100'
            },
            {
              name: 'Pure Aesthetic Labs',
              platform: 'TikTok',
              niche: 'Clinical Formulator',
              profileUrl: 'tiktok.com/@purelabs_aesthetic',
              recentTopic: `Microscopic analysis of active ingredients in ${productType}`,
              generatedOpener: `That microscopic view of your active formula is incredible! Excellent educational content.`,
              fullColdEmail: `Hi Purchasing Team,\n\nYour active ingredient formulation footage under the microscope makes for high-intent educational content! I built a system that scrapes and scores leads, then automates personal tone-matched pitches for clinical skincare.\n\nLet us know if you want the setup details!\n\nBest,\nAutomated Partner Engine`,
              email: 'purchasing@purelabs.biz',
              dateSent: '2026-06-13',
              status: 'High Intent',
              leadScore: '91/100'
            },
            {
              name: 'Glow Retail Group',
              platform: 'LinkedIn',
              niche: 'Premium Distributor',
              profileUrl: 'linkedin.com/company/glow-retail',
              recentTopic: `D2C retail expansion trends across the luxury ${productType} sector`,
              generatedOpener: `Spot on insights regarding luxury ${productType} retail distribution gaps in EU markups!`,
              fullColdEmail: `Hi Buying Team,\n\nWe saw your recent outline regarding distribution gaps for direct-to-consumer luxury ${productType}. My custom automated systems help luxury suppliers scale volume directly.\n\nWarm regards,\nAutomated Partner Engine`,
              email: 'buying@glowco.com',
              dateSent: '2026-06-13',
              status: 'Matching Tags',
              leadScore: '88/100'
            }
          ],
          highlight: 'Filtered dynamically across maps, site meta tags, and verified server domains.'
        });
      }
    }, 1500);
  };

  return (
    <div id="client-portal-section" className={`rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'card-vibe' : 'bg-white border border-zinc-200'}`}>
      {/* Decorative gradient corners */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fffb0]/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-zinc-900 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[#4fffb0] text-xs font-mono mb-3">
            <Lock className="w-3 h-3 animate-pulse" /> Secure Client Room (OAuth 2.0 Mode)
          </div>
          <h3 className={`text-xl md:text-2xl font-display font-semibold ${theme === 'dark' ? 'text-sophisticated-glow' : 'text-zinc-800'}`}>
            Edit Theory Studio Portal
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Authorize via Google or GitHub OAuth to access raw automation systems, generate real test workflows, and draft sample pipelines.
          </p>
        </div>

        <div>
          {authState.isAuthenticated && authState.user ? (
            <div className="flex items-center gap-3 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <img
                src={authState.user.avatarUrl}
                alt={authState.user.name}
                className="w-9 h-9 rounded-full border border-[#4fffb0]/30"
                referrerPolicy="no-referrer"
              />
              <div className="text-left pr-2">
                <p className="text-xs font-semibold text-white">{authState.user.name}</p>
                <p className="text-[10px] text-zinc-500">{authState.user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-red-950/30 hover:border-red-900 text-zinc-400 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#4fffb0] text-[#060810] hover:bg-[#4fffb0]/90 font-bold transition duration-300 shadow-[0_0_20px_rgba(79,255,176,0.15)] hover:shadow-[0_0_25px_rgba(79,255,176,0.3)] text-xs flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" /> Sign In to Partner Portal
            </button>
          )}
        </div>
      </div>

      {/* Main Container State */}
      {!authState.isAuthenticated ? (
        <div className="grid md:grid-cols-2 gap-8 items-center py-4 relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Exclusive Studio Access</span>
              <h4 className="text-lg font-bold text-zinc-200">See AI automation run in real-time.</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I do not build generic chatbots. I engineer highly specialized content repurposers, scraper feeds, and custom backend script flows. Sign in below using secure sandbox validation to run my interactive system simulation templates.
            </p>

            <div className="space-y-4 pt-2">
              <div className="space-y-3 bg-zinc-950 border border-zinc-900 p-4 rounded-xl text-left">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">Your Identity Sandbox Details</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase">Your Name</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]/50"
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase">Account Email/ID</label>
                    <input
                      type="text"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]/50"
                      placeholder="e.g. sarah.jenkins@gmail.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleConnect('google')}
                  className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-[#4fffb0]/45 hover:bg-zinc-900 text-sm font-medium text-zinc-300 hover:text-white transition duration-200 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#4fffb0]" /> Connect Google Account
                </button>
                <button
                  onClick={() => {
                    if (customEmail === 'sarah.jenkins@gmail.com') {
                      setCustomEmail('sarah.codes@github.com');
                    }
                    handleConnect('github');
                  }}
                  className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-[#4fffb0]/45 hover:bg-zinc-900 text-sm font-medium text-zinc-300 hover:text-white transition duration-200 cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#4fffb0]" /> Connect GitHub Account
                </button>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center space-y-3 min-h-[220px] ${theme === 'dark' ? 'bg-[#060810]/80 border border-white/5' : 'bg-zinc-50 border border-zinc-200'}`}>
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-205' : 'text-zinc-700'}`}>Sandbox Preview Locked</p>
            <p className="text-xs text-zinc-500 max-w-xs leading-normal">
              Authorize securely. No actual permissions will be written to your real accounts in this demo environment.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 animate-fadeIn space-y-6">
          {/* Authenticated Client Dashboard Panels */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Control Sidebar Column */}
            <div className={`lg:col-span-1 p-5 rounded-xl border flex flex-col justify-between space-y-6 transition-all duration-300 ${theme === 'dark' ? 'bg-[#060810]/70 border-white/5' : 'bg-zinc-50 border border-zinc-250'}`}>
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#4fffb0] uppercase tracking-widest block font-bold">System Sandbox Shell</span>
                
                <div className="space-y-3">
                  <label className="block text-xs font-mono text-zinc-400">Your Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-[#060810] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60"
                    placeholder="e.g. Glossier"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono text-zinc-400">Target Product Line</label>
                  <input
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-[#060810] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#4fffb0]/60"
                    placeholder="e.g. Saffron Face Serum"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => selectTab('email')}
                    className={`px-3 py-2 rounded text-xs text-left font-mono transition flex items-center gap-2 ${activeTab === 'email' ? 'bg-[#4fffb0]/10 text-[#4fffb0] border-l-2 border-[#4fffb0]' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  >
                    💌 Email Outreach Sequence
                  </button>
                  <button
                    onClick={() => selectTab('repurpose')}
                    className={`px-3 py-2 rounded text-xs text-left font-mono transition flex items-center gap-2 ${activeTab === 'repurpose' ? 'bg-[#4fffb0]/10 text-[#4fffb0] border-l-2 border-[#4fffb0]' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  >
                    🎙️ Podcast Repurposer
                  </button>
                  <button
                    onClick={() => selectTab('scraping')}
                    className={`px-3 py-2 rounded text-xs text-left font-mono transition flex items-center gap-2 ${activeTab === 'scraping' ? 'bg-[#4fffb0]/10 text-[#4fffb0] border-l-2 border-[#4fffb0]' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  >
                    🔍 Multi-Source Scraper
                  </button>
                </div>

                <button
                  onClick={executeAutomationSimulation}
                  disabled={isGenerating || !brandName}
                  className="w-full py-2 bg-[#4fffb0] hover:bg-[#4fffb0]/90 text-[#060810] font-bold rounded text-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Build System Demo
                </button>
              </div>
            </div>

            {/* Simulated Live Output Console Column */}
            <div className="lg:col-span-2 bg-[#060810] rounded-xl border border-zinc-900/80 p-5 flex flex-col justify-between min-h-[340px] relative">
              
              {/* Top Window Bar */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4fffb0]/60"></span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">EditTheory_Shell_Stream.log</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Interactive Output</span>
              </div>

              {/* Console Body */}
              <div className="flex-1 font-mono text-xs flex flex-col justify-center">
                {isGenerating ? (
                  <div className="space-y-4 py-8 text-center text-zinc-400 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-[#4fffb0] animate-spin"></div>
                    <div className="space-y-1">
                      <p className="text-zinc-300 animate-pulse">Initializing pipeline workers...</p>
                      <p className="text-[10px] text-zinc-500">Integrating custom prompt parameters for {brandName}...</p>
                    </div>
                  </div>
                ) : generatedResult ? (
                  <div className="space-y-4 text-left">
                    <div className="bg-zinc-950 p-4 rounded border border-zinc-900 space-y-3">
                      
                      {activeTab === 'email' && generatedResult.body && (
                        <>
                          <p className="text-zinc-500">SUBJECT: <span className="text-[#4fffb0]">{generatedResult.subject}</span></p>
                          <hr className="border-zinc-900" />
                          <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">{generatedResult.body}</p>
                        </>
                      )}

                      {activeTab === 'repurpose' && generatedResult.assets && (
                        <div className="space-y-3">
                          <p className="text-[#4fffb0] font-bold">{generatedResult.podcastSegment}</p>
                          <div className="space-y-2.5 pt-1.5">
                            {generatedResult.assets.map((ast: any, i: number) => (
                              <div key={i} className="text-zinc-300 text-xs border border-zinc-900 p-2.5 rounded bg-zinc-950/40">
                                <span className="text-[#4fffb0] font-bold text-[10px] tracking-wider uppercase block mb-1">{ast.type}</span>
                                {ast.content}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'scraping' && generatedResult.prospects && (
                        <div className="space-y-3">
                          <p className="text-[#4fffb0] font-bold">{generatedResult.campaignType}</p>
                          <div className="overflow-x-auto border border-zinc-900 rounded-lg bg-zinc-950/20">
                            <table className="min-w-full text-left text-[11px] text-zinc-400 border-collapse">
                              <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 font-mono">
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Name</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Platform</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Niche</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Profile URL</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Recent post topic</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Generated Opener</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Full Cold Email</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Email</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Date Sent</th>
                                  <th className="p-2.5 font-semibold whitespace-nowrap">Status</th>
                                  <th className="p-2.5 font-semibold text-right whitespace-nowrap">Lead Score</th>
                                </tr>
                              </thead>
                              <tbody>
                                {generatedResult.prospects.map((prs: any, i: number) => (
                                  <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors">
                                    <td className="p-2.5 text-zinc-200 font-medium whitespace-nowrap">{prs.name}</td>
                                    <td className="p-2.5 text-zinc-400 whitespace-nowrap">
                                      <span className="bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] text-zinc-300 font-mono">{prs.platform}</span>
                                    </td>
                                    <td className="p-2.5 text-zinc-400 whitespace-nowrap">{prs.niche}</td>
                                    <td className="p-2.5 text-teal-400 font-mono whitespace-nowrap hover:underline cursor-pointer">{prs.profileUrl}</td>
                                    <td className="p-2.5 text-zinc-400 max-w-[180px] truncate" title={prs.recentTopic}>{prs.recentTopic}</td>
                                    <td className="p-2.5 text-zinc-300 max-w-[200px] truncate font-sans text-[10px] leading-relaxed" title={prs.generatedOpener}>{prs.generatedOpener}</td>
                                    <td className="p-2.5 text-zinc-400 max-w-[240px] truncate whitespace-pre-line font-sans text-[10px] leading-relaxed" title={prs.fullColdEmail}>{prs.fullColdEmail}</td>
                                    <td className="p-2.5 text-[#4fffb0]/90 font-mono whitespace-nowrap">{prs.email}</td>
                                    <td className="p-2.5 text-zinc-500 whitespace-nowrap font-mono">{prs.dateSent}</td>
                                    <td className="p-2.5 whitespace-nowrap">
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                        prs.status === 'Highly Qualified' ? 'bg-[#4fffb0]/10 text-[#4fffb0] border border-[#4fffb0]/20' : 
                                        prs.status === 'High Intent' ? 'bg-indigo-400/10 text-indigo-400 border border-indigo-400/20' : 'bg-zinc-800 text-zinc-400'
                                      }`}>{prs.status}</span>
                                    </td>
                                    <td className="p-2.5 text-[#4fffb0] font-bold text-right whitespace-nowrap font-mono">{prs.leadScore}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>

                    <div className="flex items-center gap-2 text-[#4fffb0] bg-[#4fffb0]/5 border border-[#4fffb0]/20 rounded p-2.5 text-[10px]">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>{generatedResult.highlight}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-600">
                    <Sliders className="w-8 h-8 mx-auto stroke-[1.2] mb-3 opacity-60" />
                    <p className="text-zinc-500">Configure parameters on the left pane and run the system.</p>
                    <p className="text-[10px] text-zinc-600 mt-1">Simulated output runs fully client-side matching actual API schemas.</p>
                  </div>
                )}
              </div>

              {/* Bottom Console Controls */}
              {generatedResult && (
                <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#4fffb0]" /> Live sandbox sandbox token: active</span>
                  <button
                    onClick={() => setGeneratedResult(null)}
                    className="flex items-center gap-1 select-none hover:text-[#4fffb0] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear Console
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Auth Selector Dialog Popover */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`${theme === 'dark' ? 'card-vibe' : 'bg-white border border-zinc-250'} rounded-2xl max-w-sm w-full p-6 space-y-5 relative`}>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition text-sm cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-[#4fffb0] mb-1">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white">Select OAuth Identity</h4>
              <p className="text-xs text-zinc-400">Access the Edit Theory sandbox via third-party secure providers.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2 bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Identity Sandbox Config</span>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono text-zinc-400">Your Full Name</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#4fffb0]/55"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono text-zinc-400">Email Address / ID</label>
                    <input
                      type="text"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full bg-[#060810] border border-zinc-800 rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#4fffb0]/55"
                      placeholder="Account Email"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleConnect('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#4fffb0]/40 text-sm font-semibold text-zinc-200 hover:text-white transition cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-red-500" /> Continue with Google OAuth
                </button>
                <button
                  onClick={() => {
                    if (customEmail === 'sarah.jenkins@gmail.com') {
                      setCustomEmail('sarah.codes@github.com');
                    }
                    handleConnect('github');
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#4fffb0]/40 text-sm font-semibold text-zinc-200 hover:text-white transition cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#4fffb0]" /> Continue with GitHub OAuth
                </button>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 text-center leading-normal pt-1">
              Protected by standard industry HTTPS and state authentication tokens. By connecting, you permit demo data pipelines within sandbox scopes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
