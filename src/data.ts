import { Project, Service, ProcessStep, ClientTier } from './types';

export const SERVICES: Service[] = [
  {
    id: 'service-repurposing',
    title: 'Content Repurposing Systems',
    description: 'You record one podcast or high-quality video. I build an automated pipeline that produces 10 highly-optimized content assets distributed across media channels so you hold organic attention with zero re-editing overhead.',
    bullets: [
      '1 Long-form interview → 10 tailored distribution assets',
      'Automated format conversion (Reels, LinkedIn carousels, newsletters)',
      'Optimized copywriting matching your brand’s bespoke tone of voice',
      'Direct scheduling options into your media publishing tool'
    ],
    iconName: 'repurposing'
  },
  {
    id: 'service-outreach',
    title: 'AI Cold Email + DM Systems',
    description: 'Stop sending cold campaigns that net zero responses. I design custom cold outreach systems that execute micro-targeted campaigns, landing on-brand qualified leads directly into your inbox.',
    bullets: [
      'Personalized template generation',
      'Deliverability security planning and custom tracking subdomains',
      'Bespoke automatic follow-up and objection-handling sequences',
      'Real-time CRM logging and email notification alerts'
    ],
    iconName: 'outreach'
  },
  {
    id: 'service-scraping',
    title: 'Lead Scraping Systems',
    description: 'Ditch manual list building. I build custom extraction scripts to dynamically scrape, qualify, format, and filter prospects across search listings, websites, Maps, and social media networks.',
    bullets: [
      'Dynamic search querying tailored to your ideal customer profile',
      'Automated site and metadata scanning to verify lead quality',
      'Structured csv/sheets data exports complete with key metrics',
      'Active verification filters to help protect domain health'
    ],
    iconName: 'scraping'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-glossier',
    agentNumber: 1,
    title: 'Glossier Content Repurposing (Concept Build)',
    category: 'Content Repurposing',
    description: 'Turned one Emily Weiss founder interview into 10 high-impact content assets including carousels, reels, newsletters, and LinkedIn posts designed for skincare brand awareness and organic growth.',
    notionUrl: 'https://www.notion.so/How-I-would-turn-a-D2C-founder-podcast-into-10-assets-for-skincare-brand-growth-362fd196edb0800cbdb6eaf166c36b0e?source=copy_link',
    loomUrl: 'https://www.loom.com/share/24a0f13f63ad440787e40cb3967c8e24',
    images: [
      '/images/agent1-notion.jpg',
      '/images/agent1-notion1.jpg',
      '/images/agent1-notion2.jpg'
    ],
    mockupSlides: [
      {
        title: 'n8n Railway Workflow Canvas',
        description: 'The live, automated pipeline running on Railway cloud containers. Processes webhooks, retrieves transcript paragraphs, cleans narrative hooks, and injects Notion records automatically.',
        metrics: '1 long-form file → 10 micro-assets'
      },
      {
        title: 'Notion Assets: Columns 1-5',
        description: 'First half of the Notion pipeline database showing 5 generated content assets (YouTube video URL, LinkedIn carousel structures, and Reelscript 1, 2, and 3 captions).',
        metrics: 'Generated 10 Content Assets total'
      },
      {
        title: 'Notion Assets: Columns 6-10',
        description: 'Second half of the Notion asset grid containing automated Newsletters, Quote Posts, Instagram Captions, X Threads, and complete Ad Concepts.',
        metrics: '98.4% brand-voice tone matching rating'
      }
    ],
    tags: ['AI Agents', 'Media Processing', 'Tone Fine-Tuning', 'Multi-Platform Scheduling']
  },
  {
    id: 'project-dew-co',
    agentNumber: 2,
    title: 'Dew & Co. Outreach System (Concept Build)',
    category: 'Outreach System',
    description: 'Built a full, automated cold email and LinkedIn DM machine for dynamic D2C skincare outreach, engineered with intelligent lead extraction, segmentation, tailored template generation, CRM trackers, and custom personalization prompts.',
    notionUrl: 'https://www.notion.so/How-I-would-build-an-AI-cold-email-LinkedIn-DM-system-for-a-D2C-brand-363fd196edb080f28d6cd3ae7d48c1d7?source=copy_link',
    loomUrl: 'https://www.loom.com/share/1c2acb8161024c3db8c19366a59c162b',
    images: [
      '/images/agent2-aioutreach.jpg',
      '/images/agent2-followupsequence.jpg',
      '/images/agent2-replytracker.jpg',
      '/images/agent2-excel.jpg',
      '/images/agent2-email.jpg'
    ],
    mockupSlides: [
      {
        title: 'AI Outreach Agent',
        description: 'The core n8n sequence that ingests potential leads, runs automated personalization scripts to write natural first-line openers, and fires the warm primary cold email.',
        metrics: '3 target profiles segmented dynamically'
      },
      {
        title: 'Multi-Step Follow-Up Sequence',
        description: 'Follows up dynamically with prospect accounts after 3, 7, and 10 days, delivering customized marketing value angles optimized to convert.',
        metrics: 'Followup dispatch sequence: 3 / 7 / 10 days'
      },
      {
        title: 'Objection & Reply Tracker',
        description: 'An background processor detecting incoming inbox replies. Categorizes client sentiment and tracks booking conversions automatically while filtering spam.',
        metrics: 'Active CRM tracking loop'
      },
      {
        title: 'Master Campaign CRM',
        description: 'Google Sheets and HubSpot system pipeline logging every lead interaction history, personalized pitch copy, follow-up state, and sent metadata.',
        metrics: 'Zero administrative data-entry overhead'
      },
      {
        title: 'Outbox Delivery Proof',
        description: 'Active client conversation logs demonstrating personalized email delivery with positive engagement and reply patterns.',
        metrics: 'Automated deliverability practices: warm-up sequencing, personalized subject lines, no spam-trigger language'
      }
    ],
    tags: ['Cold Email', 'LinkedIn Automation', 'Personalization API', 'HubSpot / CRM Automation']
  },
  {
    id: 'project-lead-discovery',
    agentNumber: 3,
    title: 'Lead Discovery System',
    category: 'Lead Scraping',
    description: 'Designed an automated scraping workflow that filters qualified prospects for targeted retail outreach, saving hours of manual competitor and influencer research.',
    notionUrl: 'https://www.notion.so/How-I-would-market-a-D2C-skincare-product-using-content-outreach-and-repurposing-363fd196edb0809890b1da9223fa9c5c?source=copy_link',
    images: [
      '/images/agent3-commandprompt.jpg',
      '/images/agent3-workflow.jpg',
      '/images/agent3-excel.jpg'
    ],
    mockupSlides: [
      {
        title: 'Command Prompt curl Trigger',
        description: 'Sending a structured curl POST command with specific target parameters (skincare niche, follower boundaries, and locations) to trigger the automated scraping workflow on-demand.',
        metrics: 'Webhook active status: HTTP 200 OK'
      },
      {
        title: 'n8n Scraper Workflow Railway',
        description: 'The automated scraping canvas running on Railway. It expands search hashtags, crawls Instagram listings, bypasses captcha, formats raw profiles, scoring matching leads automatically.',
        metrics: 'Automated qualification pipeline, filters and scores leads without manual review'
      },
      {
        title: 'Google Sheets Lead Pipeline',
        description: 'Finalized database sheet where leads are produced automatically, loaded with brand names, niches, post topics, personalized intro lines, and cold emails ready for outreach.',
        metrics: 'Exported leads pipeline verified'
      }
    ],
    tags: ['Web Scraping', 'Data Sifting', 'Contact Enrichment', 'Automatic Qualification']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'One Strong Idea',
    description: 'I work with you to find your brand’s core message. Every system I build pivots around this core angle of value.',
    badge: 'Discovery'
  },
  {
    stepNumber: 2,
    title: 'Build the System',
    description: 'That core statement becomes an automated engine—be it a video processing pipeline, cold email workflow, or scraping stream.',
    badge: 'Engineering'
  },
  {
    stepNumber: 3,
    title: 'AI Does the Heavy Lifting',
    description: 'Formatting, persona matching, copy fitting, and distribution pipelines run autonomously, fueled by optimized AI prompts.',
    badge: 'Autopilot'
  },
  {
    stepNumber: 4,
    title: 'You Focus on Growth',
    description: 'Spend your weeks closing deals, talking to loyal customers, and leading the brand while my custom automations handle the engine.',
    badge: 'Scale'
  }
];

export const CLIENT_TIERS: ClientTier[] = [
  {
    tier: 'Small Projects',
    description: 'A focused, targeted pilot build engineered to prove system capabilities and demonstrate clear, measurable results.',
    deliverables: [
      'Single outreach flow or repurposing test',
      'Basic model configuration & customized prompts',
      'Direct CRM piping and webhook setup',
      '5-day transition and handoff training support'
    ]
  },
  {
    tier: 'Medium Projects',
    description: 'A complete custom platform build integrating multiple operations. This follows a transparent, structured 50/50 payment model.',
    deliverables: [
      'Two fully connected core automated systems',
      'Deep workspace integration (Sheets, Notion, or custom CRM)',
      'Prompt structures built around your brand voice',
      'Full deployment with continuous optimization rules (30 days)'
    ]
  },
  {
    tier: 'Larger Projects',
    description: 'Comprehensive, recurring partnerships designed to continually scope, optimize, and expand automations as your brand grows.',
    deliverables: [
      'Full studio automation architecture across entire operations',
      'Continuous workflow monitoring and monthly script updates',
      'Dedicated Slack channel for direct access',
      'Bi-weekly scaling consulting and database refinement'
    ]
  }
];
