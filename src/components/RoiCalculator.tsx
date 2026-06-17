import React, { useState, useEffect } from 'react';
import { Theme } from '../types';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  Zap, 
  HelpCircle,
  Play,
  ArrowRight
} from 'lucide-react';

interface RoiCalculatorProps {
  theme: Theme;
}

// Business Focus types which set realistic pre-populated slider defaults
type BusinessType = 'd2c' | 'agency' | 'saas' | 'creator';

interface Preset {
  name: string;
  monthlyRevenue: number;
  manualHours: number;
  laborRate: number;
  conversionRate: number;
  description: string;
}

const PRESETS: Record<BusinessType, Preset> = {
  d2c: {
    name: 'D2C E-commerce Brand',
    monthlyRevenue: 150000,
    manualHours: 25,
    laborRate: 75,
    conversionRate: 2.2,
    description: 'Brands spending hours daily researching influencers, sifting customer reviews, and tailoring custom promotional offers.',
  },
  agency: {
    name: 'Growth / Ad Agency',
    monthlyRevenue: 80000,
    manualHours: 35,
    laborRate: 100,
    conversionRate: 3.5,
    description: 'Services relying heavily on manual LinkedIn profiling, cold email outreach sequences, and constant reporting.',
  },
  saas: {
    name: 'SaaS / Tech Startup',
    monthlyRevenue: 120000,
    manualHours: 20,
    laborRate: 120,
    conversionRate: 1.8,
    description: 'Founders and product leads manually sourcing onboarding signals, scoring outbound leads, and drafting custom demos.',
  },
  creator: {
    name: 'Creator / Media Business',
    monthlyRevenue: 40000,
    manualHours: 30,
    laborRate: 50,
    conversionRate: 4.8,
    description: 'Podcasters and course creators manually cutting down high-performing clips, social writing, and distributing to channels.',
  }
};

export default function RoiCalculator({ theme }: RoiCalculatorProps) {
  const [activeType, setActiveType] = useState<BusinessType>('d2c');
  
  // Interactive Slider States
  const [monthlyRevenue, setMonthlyRevenue] = useState(PRESETS.d2c.monthlyRevenue);
  const [manualHours, setManualHours] = useState(PRESETS.d2c.manualHours);
  const [laborRate, setLaborRate] = useState(PRESETS.d2c.laborRate);
  const [includeOrganicLift, setIncludeOrganicLift] = useState(true);
  const [showMethodology, setShowMethodology] = useState(false);

  // Apply preset defaults when business type changes
  const selectPreset = (type: BusinessType) => {
    setActiveType(type);
    const preset = PRESETS[type];
    setMonthlyRevenue(preset.monthlyRevenue);
    setManualHours(preset.manualHours);
    setLaborRate(preset.laborRate);
  };

  // Calculations
  const automationEfficiencyFactor = 0.84; // 84% of manual bottlenecks automated
  const monthlyHoursSaved = Math.round(manualHours * 4.33 * automationEfficiencyFactor);
  const annualHoursSaved = Math.round(monthlyHoursSaved * 12);
  
  const monthlyCostSaved = Math.round(monthlyHoursSaved * laborRate);
  const annualCostSaved = Math.round(monthlyCostSaved * 12);

  // Growth projection calculation
  // Let us assume reclaiming these hours and routing active AI lead finders/outbound systems creates
  // a conservative 6% to 15% expansion in top-line pipeline conversion based on the business' size.
  const estimatedRevenueLiftMultiplier = includeOrganicLift ? 0.085 : 0.045; // 8.5% scale vs 4.5% scale
  const estimatedMonthlyRevenueLift = Math.round(monthlyRevenue * estimatedRevenueLiftMultiplier);
  const estimatedAnnualRevenueLift = estimatedMonthlyRevenueLift * 12;

  const totalAnnualValue = annualCostSaved + estimatedAnnualRevenueLift;

  // Render Currency helper
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="w-full">
      {/* Upper toggle headers */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(Object.keys(PRESETS) as BusinessType[]).map((key) => {
          const preset = PRESETS[key];
          const isSelected = activeType === key;
          return (
            <button
              key={key}
              onClick={() => selectPreset(key)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 border cursor-pointer ${
                isSelected
                  ? 'bg-[#4fffb0] text-[#060810] border-[#4fffb0] shadow-[0_0_15px_rgba(79,255,176,0.25)]'
                  : theme === 'dark'
                  ? 'bg-zinc-950/40 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900 hover:bg-zinc-55'
              }`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive Sliders Column */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
          theme === 'dark' ? 'bg-[#090e1a]/60 border-zinc-900/80 shadow-inner' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-zinc-200/10 pb-4">
              <h3 className={`text-base font-display font-extrabold flex items-center gap-2 ${
                theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
              }`}>
                <Calculator className="w-4 h-4 text-[#4fffb0]" /> Parameterize Your Bottlenecks
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {PRESETS[activeType].description} Adjust values to match your team.
              </p>
            </div>

            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className={`text-xs font-bold font-sans ${theme === 'dark' ? 'text-zinc-350' : 'text-zinc-700'}`}>
                  Average Monthly Revenue:
                </label>
                <span className="text-sm font-mono font-semibold text-[#4fffb0] bg-[#4fffb0]/10 px-2.5 py-0.5 rounded-md border border-[#4fffb0]/20">
                  {formatCurrency(monthlyRevenue)} / mo
                </span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="1000000" 
                step="10000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full accent-[#4fffb0] h-1.5 bg-zinc-850 rounded-lg cursor-pointer transition-all focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$10k</span>
                <span>$250k</span>
                <span>$500k</span>
                <span>$750k</span>
                <span>$1.0M+</span>
              </div>
            </div>

            {/* Slider 2: Weekly Manual Hours Spent */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className={`text-xs font-bold font-sans ${theme === 'dark' ? 'text-zinc-350' : 'text-zinc-700'}`}>
                  Weekly Hours Spent Sourcing Leads/Outreach/Content:
                </label>
                <span className="text-sm font-mono font-semibold text-[#4fffb0] bg-[#4fffb0]/10 px-2.5 py-0.5 rounded-md border border-[#4fffb0]/20">
                  {manualHours} Hrs / wk
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="80" 
                step="1"
                value={manualHours}
                onChange={(e) => setManualHours(Number(e.target.value))}
                className="w-full accent-[#4fffb0] h-1.5 bg-zinc-850 rounded-lg cursor-pointer transition-all focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>5 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs (Full-time)</span>
                <span>60 hrs</span>
                <span>80 hrs+</span>
              </div>
            </div>

            {/* Slider 3: Cost Rate per Hour */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className={`text-xs font-bold font-sans ${theme === 'dark' ? 'text-zinc-350' : 'text-zinc-700'}`}>
                  Labor / Opp Cost Rate per Hour (Founder/Staff time value):
                </label>
                <span className="text-sm font-mono font-semibold text-[#4fffb0] bg-[#4fffb0]/10 px-2.5 py-0.5 rounded-md border border-[#4fffb0]/20">
                  ${laborRate} / hr
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="250" 
                step="5"
                value={laborRate}
                onChange={(e) => setLaborRate(Number(e.target.value))}
                className="w-full accent-[#4fffb0] h-1.5 bg-zinc-850 rounded-lg cursor-pointer transition-all focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$20/hr</span>
                <span>$75/hr</span>
                <span>$150/hr</span>
                <span>$200/hr</span>
                <span>$250/hr</span>
              </div>
            </div>

            {/* Dynamic Checkbox toggle for incremental revenue features */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
              theme === 'dark' ? 'bg-[#060810]/40 border-zinc-900/60' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="text-left space-y-0.5">
                <span id="label-organic-boost" className={`text-xs font-bold leading-none ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  Include Lead Outbound & Organic Brand Lift
                </span>
                <p className="text-[10px] text-zinc-400">
                  Adds projection of 8.5% scale increase from automated 24/7 social clips and tailored lead discovery.
                </p>
              </div>
              <button
                aria-labelledby="label-organic-boost"
                onClick={() => setIncludeOrganicLift(!includeOrganicLift)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  includeOrganicLift ? 'bg-[#4fffb0]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    includeOrganicLift ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-200/10 text-[10px] text-zinc-500 flex items-center gap-1.5 font-sans leading-relaxed">
            <Sparkles className="w-3.5 h-3.5 text-[#4fffb0]" /> 
            Projections assume safe 84% workflow automation rates and standardized n8n or Node background schedules.
          </div>
        </div>

        {/* Math & Value Impact Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
          
          {/* Card 1: Annual Reclaimed Financial Impact */}
          <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all ${
            theme === 'dark' 
              ? 'bg-[#090e21] border-[#4fffb0]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_24px_-8px_rgba(79,255,176,0.08)]' 
              : 'bg-[#f4faf7] border-[#4fffb0]/40 shadow-sm'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fffb0]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-wider text-[#4fffb0] uppercase font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#4fffb0] fill-[#4fffb0]/20" /> Projected Annual Value Reclaimed
              </span>
              
              <div className="space-y-0.5">
                <h4 className={`text-4xl sm:text-5xl font-mono font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
                }`}>
                  {formatCurrency(totalAnnualValue)}
                </h4>
                <p className="text-xs text-[#4fffb0] font-sans font-medium">
                  reclaimed per single calendar year
                </p>
              </div>

              {/* Breakdown detail list */}
              <div className="space-y-3 pt-4 border-t border-zinc-200/15">
                {/* Hours saved */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Annual hours saved</span>
                  </div>
                  <span className="font-mono font-bold text-zinc-200 dark:text-zinc-150">
                    {annualHoursSaved} hrs / yr
                  </span>
                </div>

                {/* Operations Costs Saved */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Labor / Ops cash saved</span>
                  </div>
                  <span className="font-mono font-bold text-zinc-200 dark:text-zinc-150">
                    {formatCurrency(annualCostSaved)}
                  </span>
                </div>

                {/* Extra Pipeline Revenue Opportunity */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Automated conversion lift</span>
                  </div>
                  <span className="font-mono font-bold text-[#4fffb0]">
                    +{formatCurrency(estimatedAnnualRevenueLift)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://topmate.io/samhita_tavutu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#4fffb0] hover:bg-[#4fffb0]/90 text-[#060810] font-bold text-xs transition duration-250 cursor-pointer shadow-[0_4px_12px_rgba(79,255,176,0.2)]"
              >
                Claim This Pipeline Value <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Interactive Breakdown of System Time Savings */}
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#090e1a]/40 border-zinc-900/60' : 'bg-white border-zinc-200'
          }`}>
            <h4 className={`text-xs font-bold font-display uppercase tracking-wider mb-4 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              Where does the time go back?
            </h4>
            
            <div className="space-y-3.5">
              {[
                { label: 'Outbound & Client Sourcing Automation', pct: 40, desc: 'Scraping target brand accounts & verifying corporate data' },
                { label: 'Content Recast & Format Pipelines', pct: 35, desc: 'Clipping high-engagement segments & drafting text copy' },
                { label: 'Outreach & Messaging Sequencing', pct: 25, desc: 'Generating drafts tailored precisely to corporate signals' }
              ].map((bar, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-zinc-450 dark:text-zinc-300">{bar.label}</span>
                    <span className="font-mono font-bold text-[#4fffb0]">{bar.pct}% Saved</span>
                  </div>
                  <div className="w-full bg-zinc-200/10 dark:bg-zinc-850 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#4fffb0] h-full rounded-full transition-all duration-700" 
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-none">{bar.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CALCULATOR METHODOLOGY SECTION */}
      <div className={`mt-10 p-6 rounded-2xl border transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-[#090e1a]/40 border-zinc-900/60 hover:border-zinc-800' 
          : 'bg-white border-zinc-200 hover:border-zinc-300'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className={`text-sm font-bold font-display flex items-baseline gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-zinc-800'
            }`}>
              <HelpCircle className="w-4 h-4 text-[#4fffb0] self-center" /> 
              Calculator Methodology & Verification
            </h4>
            <p className="text-xs text-zinc-400">
              Review formulas, average variables, and underlying structural growth assumptions used.
            </p>
          </div>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white dark:hover:border-[#4fffb0]/40 text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {showMethodology ? 'Hide Methodology' : 'Show Methodology & Formulas'}
          </button>
        </div>

        {/* Expandable Explanation Block */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showMethodology ? 'max-h-[800px] border-t border-zinc-200/10 mt-6 pt-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="grid md:grid-cols-2 gap-8 text-left font-sans text-xs leading-relaxed text-zinc-400">
            
            {/* Column 1: Step-by-Step Math Breakdown */}
            <div className="space-y-4">
              <h5 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#4fffb0]`}>
                1. Standard Live Formulas & Calculations
              </h5>
              
              <div className="space-y-3.5">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-[#060810]/60' : 'bg-zinc-50'}`}>
                  <strong className={`block text-xs mb-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Reclaimed Work Hours:
                  </strong>
                  <div className="font-mono text-zinc-300 text-[11px] space-y-1">
                    <div>Formula: <code className="text-teal-400">Weekly manual hours * 4.33 weeks/month * 84% reduction</code></div>
                    <div className="text-zinc-400 text-[10px] mt-1 bg-black/10 p-1.5 rounded border border-zinc-800">
                      Your current variables: {manualHours} hrs/wk &times; 4.33 weeks &times; 84% = <span className="text-[#4fffb0] font-bold">{monthlyHoursSaved} hours/mo saved</span> ({annualHoursSaved} hrs/yr).
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">
                    *We apply an 84% efficiency reduction based on standard background scripts, allowing 16% of total system time as safety buffer for human-in-the-loop auditing and review.
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-[#060810]/60' : 'bg-zinc-50'}`}>
                  <strong className={`block text-xs mb-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Direct Core Operations Cost Saved:
                  </strong>
                  <div className="font-mono text-zinc-300 text-[11px] space-y-1">
                    <div>Formula: <code className="text-teal-400">Reclaimed monthly hours * Labor & Opp Cost rate</code></div>
                    <div className="text-zinc-400 text-[10px] mt-1 bg-black/10 p-1.5 rounded border border-zinc-800">
                      Your current variables: {monthlyHoursSaved} hours &times; ${laborRate}/hr = <span className="text-[#4fffb0] font-bold">${(monthlyCostSaved).toLocaleString()}/mo saved</span> (${(annualCostSaved).toLocaleString()}/yr).
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">
                    *Refers to the actual opportunity cost or staffing replacement rate. For founders, time is calculated based on market rate value reclaimed for high-leverage strategic work.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Growth Multiplier & Business Model Assumptions */}
            <div className="space-y-4">
              <h5 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#4fffb0]`}>
                2. Automated Growth Projections & Assumptions
              </h5>

              <div className="space-y-3.5">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-[#060810]/60' : 'bg-zinc-50'}`}>
                  <strong className={`block text-xs mb-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Active Pipeline & Organic Conversion Lift:
                  </strong>
                  <div className="font-mono text-zinc-350 text-[11px] space-y-1">
                    <div>Formula: <code className="text-teal-400">Monthly Revenue &times; growth multiplier (4.5% or 8.5%)</code></div>
                    <div className="text-zinc-400 text-[10px] mt-1 bg-black/10 p-1.5 rounded border border-zinc-800">
                      Your current variables: ${(monthlyRevenue).toLocaleString()}/mo rev &times; {includeOrganicLift ? '8.5%' : '4.5%'} scale = <span className="text-[#4fffb0] font-bold">${(estimatedMonthlyRevenueLift).toLocaleString()}/mo increase</span> (${(estimatedAnnualRevenueLift).toLocaleString()}/yr).
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">
                    *Moving outbound leads away from custom manual research to 24/7 AI discoverers yields a conservative 4.5% lift. Activating automated short-form multi-channel distribution raises top-of-funnel reach, modeling a combined 8.5% scale growth.
                  </p>
                </div>

                <div className="space-y-2 text-[11px] pl-1">
                  <h6 className={`font-mono text-[11px] font-bold ${theme === 'dark' ? 'text-zinc-250' : 'text-zinc-800'}`}>
                    Grounding Validation Parameters:
                  </h6>
                  <ul className="space-y-1.5 list-disc list-inside text-zinc-400 pl-1">
                    <li>
                      <span className="font-semibold text-zinc-300">Average Order Value (AOV) / Contract Value:</span> Scale percentages scale relative to existing checkout volumes safely. Large AOV relies on personalized email chains.
                    </li>
                    <li>
                      <span className="font-semibold text-zinc-300">Operational Realism:</span> Projections avoid &quot;laughable&quot; multi-million claims. We assume a conservative, steady growth ceiling of up to 8.5% from automation rather than promising unreal 100%+ gains.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
