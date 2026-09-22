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
    id: 'project-concierge',
    agentNumber: 6,
    title: 'Edit Theory Concierge',
    category: 'Full-Stack AI Product',
    badge: 'Flagship Product',
    isFlagship: true,
    oneLiner: 'Full-stack AI booking platform (React/TypeScript + n8n) for local service businesses.',
    description: 'A customer-facing, full-stack product combining a clean React frontend with an autonomous n8n orchestration engine, resolving spatial venue inquiries, validating reservation parameters, and coordinating booking workflows.',
    overview: 'Local service businesses—restaurants, studios, salons, and boutique parlours—lose high-intent clients due to manual booking latency. Edit Theory Concierge was built as a complete customer-facing product (React/TypeScript frontend + autonomous n8n backend) rather than an internal automation script. It pairs a live client interface with a deterministic orchestration engine, resolving spatial venue inquiries, validating reservation parameters, logging atomic state to Google Sheets CRM, and dispatching instant confirmation itineraries via Gmail.',
    demoModeNote: 'Runs in demo mode by design (free venue data, simulated venue confirmation). Production integrations (Google Places API, WhatsApp Business API) are fully built and swap-ready pending client credentials—a deliberate architectural design for zero-cost, verifiable client evaluation.',
    architectureImage: '/images/concierge-workflow.png',
    architectureExplanation: 'Full-stack reactive orchestration. The React/TypeScript client interface communicates through a deterministic n8n webhook core that coordinates geo-spatial search, atomic transaction locking in Google Sheets CRM, and multi-channel notification dispatch.',
    howItWorks: [
      {
        step: '01',
        title: 'VENUE DISCOVERY',
        description: 'Natural-language location and category queries are interpreted with AI spatial extraction to identify relevant nearby venues.'
      },
      {
        step: '02',
        title: 'VALIDATION & BOOKING',
        description: 'Availability and reservation parameters are deterministically validated, reserving time slots and generating unique atomic booking IDs (#BK-7729).'
      },
      {
        step: '03',
        title: 'CONFIRMATION',
        description: 'The system routes automated booking requests to venue managers and locks transaction state upon reservation confirmation.'
      },
      {
        step: '04',
        title: 'ITINERARY DISPATCH',
        description: 'Confirmation details, venue directions, booking references, and calendar invite attachments are delivered automatically via Gmail API.'
      },
      {
        step: '05',
        title: 'LIVE STATUS',
        description: 'The client interface polls reservation state in real time, tracking state transitions with zero page refreshes.'
      }
    ],
    technologyLine: 'React · TypeScript · n8n · Groq · OpenStreetMap · Google Sheets · Gmail API',
    githubUrl: 'https://github.com/Samhita1008/edit-theory-concierge',
    liveUrl: 'https://edit-theory-concierge-s6ra.vercel.app',
    images: [
      '/images/concierge-workflow.png',
      '/images/concierge-website.png',
      '/images/concierge-leads.png',
      '/images/concierge-mail.png'
    ],
    outputImages: [
      {
        url: '/images/concierge-workflow.png',
        title: 'Orchestration Workflow (n8n)',
        caption: 'Autonomous multi-node n8n orchestration workflow connecting webhooks, spatial discovery, and verification.'
      },
      {
        url: '/images/concierge-website.png',
        title: 'Website Client Interface',
        caption: 'Customer-facing React frontend interface with real-time state polling and dynamic reservation booking form.'
      },
      {
        url: '/images/concierge-leads.png',
        title: 'Google Sheets Lead CRM',
        caption: 'Atomic reservation records, unique tracking IDs, party size parameters, and synchronized lead states.'
      },
      {
        url: '/images/concierge-mail.png',
        title: 'Confirmation Email Dispatched',
        caption: 'Automated itinerary confirmation email with booking reference, calendar details, and venue directions.'
      }
    ],
    mockupSlides: [
      {
        title: 'AI Venue Discovery',
        description: 'Parses natural user search queries, resolves spatial coordinates, and queries local venue catalogs with categorized metadata.',
        metrics: 'Sub-second spatial extraction'
      },
      {
        title: 'Validation & Booking Engine',
        description: 'Validates party parameters, reserves time slots, and generates unique tracking IDs with instant logging to Google Sheets CRM.',
        metrics: 'Deterministic transaction integrity'
      },
      {
        title: 'Confirmation & Direct Venue Contact',
        description: 'Dispatches automated booking requests to venue managers and transitions states upon reservation lock.',
        metrics: 'Multi-channel status routing'
      },
      {
        title: 'Customer Itinerary Dispatch',
        description: 'Delivers professional booking confirmation emails with venue directions, reservation references, and calendar invite attachments.',
        metrics: 'Automated delivery confirmation'
      },
      {
        title: 'Real-Time Status Polling',
        description: 'Zero-refresh live status client polling providing customers transparent tracking throughout the reservation lifecycle.',
        metrics: 'Live state tracking'
      }
    ],
    tags: ['React + TypeScript', 'n8n Orchestration', 'Groq', 'Google Sheets CRM', 'Gmail API', 'Full-Stack Product']
  },
  {
    id: 'project-glossier',
    agentNumber: 1,
    title: 'Content Repurposing System',
    category: 'Content Repurposing',
    badge: 'Workflow Published on GitHub',
    oneLiner: 'Transforms long-form founder podcasts into 10 multi-platform editorial assets with brand-voice consistency.',
    description: 'An automated content extraction engine that parses long-form interview transcripts, extracts core narrative hooks, and generates 10 tailored distribution assets synced directly to Notion.',
    overview: 'Producing high-caliber founder interviews requires substantial creative energy, but manually extracting quotes, drafting carousels, writing newsletter segments, and formatting video reel scripts creates a heavy editorial bottleneck. This system ingests long-form transcripts via webhook, processes narrative hooks with Groq AI, and automatically generates 10 distinct distribution assets synced directly into a structured Notion database.',
    architectureImage: '/images/agent1-notion.jpg',
    architectureExplanation: 'Cloud-hosted n8n workflow on Railway. Ingests raw audio/video transcripts, executes prompt pipelines via Groq AI, and writes 10 categorized deliverables to a relational Notion Kanban board.',
    howItWorks: [
      {
        step: '01',
        title: 'TRANSCRIPT INGESTION',
        description: 'Long-form podcast transcripts are ingested via webhook, normalized, and partitioned into thematic paragraph segments.'
      },
      {
        step: '02',
        title: 'NARRATIVE HOOK EXTRACTION',
        description: 'Groq AI analyzes the speaker’s tone, identifying high-resonance insights, counter-intuitive arguments, and core thesis quotes.'
      },
      {
        step: '03',
        title: 'MULTI-FORMAT SYNTHESIS',
        description: 'Simultaneously generates 10 format-specific assets: LinkedIn carousels, reel scripts, newsletters, quote graphics, and ad angles.'
      },
      {
        step: '04',
        title: 'NOTION PIPELINE POPULATION',
        description: 'Assets are populated directly into an editorial Notion database with metadata, hashtags, and review status tags.'
      }
    ],
    technologyLine: 'n8n · Groq AI · Notion CRM · Railway · Media Processing',
    githubUrl: 'https://github.com/Samhita1008/edit-theory-agents/blob/main/1-content-repurposing/workflow.json',
    notionUrl: 'https://www.notion.so/How-I-would-turn-a-D2C-founder-podcast-into-10-assets-for-skincare-brand-growth-362fd196edb080cbdb6eaf166c36b0e?source=copy_link',
    loomUrl: 'https://www.loom.com/share/24a0f13f63ad440787e40cb3967c8e24',
    liveUrl: '/projects.html',
    images: [
      '/images/agent1-notion1.jpg',
      '/images/agent1-notion2.jpg'
    ],
    outputImages: [
      {
        url: '/images/agent1-notion1.jpg',
        title: 'Notion Editorial Database (Columns 1–5)',
        caption: 'Generated long-form YouTube video concepts, LinkedIn carousel structures, and short-form video hooks.'
      },
      {
        url: '/images/agent1-notion2.jpg',
        title: 'Notion Editorial Database (Columns 6–10)',
        caption: 'Brand newsletters, standalone quote cards, Twitter/X threads, and conversion-focused social ads.'
      }
    ],
    mockupSlides: [
      {
        title: 'n8n Railway Workflow Canvas',
        description: 'The automated pipeline running on cloud containers. Processes webhooks, retrieves transcript paragraphs, cleans narrative hooks, and injects Notion records automatically.',
        metrics: '1 long-form file → 10 micro-assets'
      },
      {
        title: 'Notion Assets: Columns 1-5',
        description: 'First half of the Notion pipeline database showing generated content assets (YouTube video URL, LinkedIn carousel structures, and Reelscript captions).',
        metrics: 'Generated 10 Content Assets total'
      },
      {
        title: 'Notion Assets: Columns 6-10',
        description: 'Second half of the Notion asset grid containing automated Newsletters, Quote Posts, Instagram Captions, X Threads, and complete Ad Concepts.',
        metrics: 'Tone-matched asset synthesis'
      }
    ],
    tags: ['Media Processing', 'n8n', 'Groq AI', 'Notion CRM', 'Railway']
  },
  {
    id: 'project-dew-co',
    agentNumber: 2,
    title: 'AI Outreach System',
    category: 'Outreach Automation',
    badge: 'Private Implementation',
    codeAvailabilityNote: 'Implementation kept private (available on request)',
    oneLiner: 'Multi-stage cold email sequence with dynamic ICP segmentation and automated reply tracking.',
    description: 'An automated outreach sequence that dynamically segments prospect accounts, tailors introductory hooks, and coordinates a 3-stage follow-up cadence.',
    overview: 'Outreach campaigns often fail due to lack of contextual nuance across customer segments or failure to follow up systematically. This system personalizes cold outreach across three target buyer personas, dispatches intelligent follow-ups at 3, 7, and 10 days, and routes incoming replies into appropriate conversion stages inside Google Sheets and CRM.',
    architectureImage: '/images/agent2-aioutreach.jpg',
    architectureExplanation: 'Multi-branch n8n outreach pipeline with dynamic persona routing, automated time-delay follow-ups, and webhook-driven reply sentiment categorization.',
    howItWorks: [
      {
        step: '01',
        title: 'DYNAMIC ICP SEGMENTATION',
        description: 'Prospect accounts are classified into discrete buyer tiers to determine customized messaging angles and value propositions.'
      },
      {
        step: '02',
        title: 'CONTEXTUAL OPENER SYNTHESIS',
        description: 'The engine generates tailored introductory hooks based on prospect-specific brand signals and recent public activity.'
      },
      {
        step: '03',
        title: '3-STAGE CADENCE DISPATCH',
        description: 'Executes automated follow-up sequences on days 3, 7, and 10, adapting calls-to-action based on prior engagement.'
      },
      {
        step: '04',
        title: 'INBOX SENTIMENT MONITORING',
        description: 'Tracks incoming replies in real time, classifies response sentiment, and updates prospect lifecycle status across CRM sheets.'
      }
    ],
    technologyLine: 'n8n · HubSpot · Google Sheets · Gmail API · Groq AI',
    notionUrl: 'https://www.notion.so/How-I-would-build-an-AI-cold-email-LinkedIn-DM-system-for-a-D2C-brand-363fd196edb080f28d6cd3ae7d48c1d7?source=copy_link',
    loomUrl: 'https://www.loom.com/share/1c2acb8161024c3db8c19366a59c162b',
    liveUrl: '/projects.html',
    images: [
      '/images/agent2-followupsequence.jpg',
      '/images/agent2-replytracker.jpg',
      '/images/agent2-excel.jpg',
      '/images/agent2-email.jpg'
    ],
    outputImages: [
      {
        url: '/images/agent2-followupsequence.jpg',
        title: 'Multi-Stage Follow-Up Sequence',
        caption: 'Automated 3-day, 7-day, and 10-day conditional cadence branches.'
      },
      {
        url: '/images/agent2-replytracker.jpg',
        title: 'Reply Sentiment Classifier',
        caption: 'Webhook listener processing customer inbox replies and sentiment transitions.'
      },
      {
        url: '/images/agent2-excel.jpg',
        title: 'CRM Lead Synchronization',
        caption: 'Structured Google Sheets database with verified contact metrics and sequence timestamps.'
      }
    ],
    mockupSlides: [
      {
        title: 'AI Outreach Engine',
        description: 'Core n8n sequence that ingests prospects, executes persona-based opener personalization, and manages initial cold email dispatch.',
        metrics: '3 target profiles segmented dynamically'
      },
      {
        title: 'Multi-Step Follow-Up Sequence',
        description: 'Follows up dynamically with prospect accounts after 3, 7, and 10 days, delivering customized marketing angles.',
        metrics: 'Followup dispatch: 3 / 7 / 10 days'
      },
      {
        title: 'Objection & Reply Tracker',
        description: 'Background processor detecting incoming replies, categorizing sentiment, and updating CRM conversion stages.',
        metrics: 'Active CRM tracking loop'
      }
    ],
    tags: ['Cold Outreach', 'n8n', 'HubSpot', 'Google Sheets', 'Gmail API']
  },
  {
    id: 'project-lead-discovery',
    agentNumber: 3,
    title: 'Lead Discovery System',
    category: 'Lead Extraction',
    badge: 'Workflow Published on GitHub',
    oneLiner: 'Automated prospect scraping and qualification workflow indexing target retail niches.',
    description: 'A robust lead scraping engine that queries public platforms, evaluates lead qualification parameters, and outputs clean structured records.',
    overview: 'Manual prospecting and email verification is a major drain on sales capacity. This extraction system automates directory indexing, evaluates domain health and engagement metrics against strict criteria, and exports structured CSV and Google Sheet databases ready for direct outreach campaigns.',
    architectureImage: '/images/agent3-workflow.jpg',
    architectureExplanation: 'High-throughput scraping pipeline running on cloud containers. Manages pagination, concurrency throttling, and regex email validation before database export.',
    howItWorks: [
      {
        step: '01',
        title: 'API WEBHOOK TRIGGER',
        description: 'Ingests target search queries with customizable filters (niche keywords, follower thresholds, geographic parameters).'
      },
      {
        step: '02',
        title: 'CONCURRENT SCRAPING CORE',
        description: 'Extracts profile data, bio descriptions, website URLs, and public contact handles with built-in rate-limit protection.'
      },
      {
        step: '03',
        title: 'QUALIFICATION & EMAIL VERIFICATION',
        description: 'Filters out dormant or invalid accounts, verifies MX records, and scores lead suitability based on ICP criteria.'
      },
      {
        step: '04',
        title: 'CRM SPREADSHEET EXPORT',
        description: 'Populates verified prospect records into formatted Google Sheets tables complete with tailored introductory hooks.'
      }
    ],
    technologyLine: 'n8n · Web Scraping · Google Sheets CRM · Railway',
    githubUrl: 'https://github.com/Samhita1008/edit-theory-agents/blob/main/3-lead-scraper/workflow.json',
    notionUrl: 'https://www.notion.so/How-I-would-market-a-D2C-skincare-product-using-content-outreach-and-repurposing-363fd196edb0809890b1da9223fa9c5c?source=copy_link',
    liveUrl: '/projects.html',
    images: [
      '/images/agent3-commandprompt.jpg',
      '/images/agent3-excel.jpg'
    ],
    outputImages: [
      {
        url: '/images/agent3-commandprompt.jpg',
        title: 'API & Extraction Execution Log',
        caption: 'Real-time terminal execution demonstrating HTTP 200 payload verification and profile batching.'
      },
      {
        url: '/images/agent3-excel.jpg',
        title: 'Verified Google Sheets CRM',
        caption: 'Exported pipeline displaying qualified leads with cleaned company names and verified emails.'
      }
    ],
    mockupSlides: [
      {
        title: 'API curl Trigger',
        description: 'Webhook trigger with target parameters (niche, follower boundaries, geo locations) to initiate automated extraction.',
        metrics: 'HTTP 200 webhook dispatch'
      },
      {
        title: 'n8n Scraper Engine',
        description: 'Automated extraction canvas on Railway. Expands search tags, parses public profiles, scores leads, and validates contacts.',
        metrics: 'Concurrent profile extraction'
      },
      {
        title: 'Google Sheets Lead Database',
        description: 'Final verified CRM sheet populated with clean business names, niches, post topics, personalized intro hooks, and verified emails.',
        metrics: 'Exported pipeline verified'
      }
    ],
    tags: ['Web Scraping', 'Data Extraction', 'Google Sheets CRM', 'n8n Pipeline']
  },
  {
    id: 'project-restaurant-outreach',
    agentNumber: 4,
    title: 'Restaurant Outreach AI System',
    category: 'Outreach Architecture',
    badge: 'Private Implementation',
    codeAvailabilityNote: 'Implementation kept private (available on request)',
    oneLiner: 'High-reliability B2B outreach engine with structured 8-point auditing and idempotent dispatch protection.',
    description: 'A production-hardened outreach pipeline engineered with an objective 8-point website audit engine, exception-safe scraping boundaries, deduplication logic, and rate-safe Gmail dispatch.',
    overview: 'Cold outreach campaigns frequently fail from two flaws: generic templates that get ignored, and fragile scraping scripts that drop leads when websites crash or send duplicate emails. This system hardens outreach into a deployable product. It deterministically audits prospect websites across 8 operational criteria, handles timeouts gracefully without dropping leads, enforces idempotent deduplication before dispatch, and respects mailbox safety caps with live Telegram reply alerts.',
    architectureImage: '/images/restaurant-workflow.png',
    architectureExplanation: 'Decoupled outreach pipeline. Separates credentials from workflow logic, applies an 8-point website audit checklist, and filters through a deduplication shield before dispatching through Gmail API.',
    howItWorks: [
      {
        step: '01',
        title: 'STRUCTURED 8-POINT AUDIT',
        description: 'Deterministically evaluates restaurant websites across 8 criteria (HTTP status, load speed, mobile viewport, menus, contact info, booking widgets, and UI layout) with written rationale.'
      },
      {
        step: '02',
        title: 'EXCEPTION BOUNDARIES',
        description: 'Traps timeouts, SSL drops, and DNS resolution failures without dropping leads, tagging records cleanly as Site_Unreachable in CRM.'
      },
      {
        step: '03',
        title: 'DEDUPLICATION SHIELD',
        description: 'Prevents race conditions in Google Sheets row synchronization and blocks duplicate outbound emails using idempotent lead hashing.'
      },
      {
        step: '04',
        title: 'CONTEXTUAL PITCH GENERATION',
        description: 'Groq Llama 3.3 drafts hyper-personalized outreach pitches specifically citing the findings and strengths identified during the audit.'
      },
      {
        step: '05',
        title: 'RATE-SAFE DISPATCH & ALERTS',
        description: 'Enforces human-in-the-loop review gates, respects 15 emails/hr domain safety limits, and fires instant Telegram alerts upon incoming replies.'
      }
    ],
    technologyLine: 'n8n · Groq Llama 3.3 · Gmail API · Google Sheets · Telegram Alerts',
    liveUrl: '/projects.html',
    images: [
      '/images/restaurant-workflow.png',
      '/images/restaurant-leads.png',
      '/images/restaurant-mail.png',
      '/images/restaurant-telegram.png'
    ],
    outputImages: [
      {
        url: '/images/restaurant-workflow.png',
        title: 'n8n Outreach & Audit Workflow',
        caption: 'Autonomous orchestration pipeline with structured 8-point auditing, deduplication, and conditional routing.'
      },
      {
        url: '/images/restaurant-leads.png',
        title: 'Google Sheets Lead Database',
        caption: 'Enriched restaurant leads, site audit scoring, contact details, and tracked delivery status.'
      },
      {
        url: '/images/restaurant-mail.png',
        title: 'Personalized Outreach Email',
        caption: 'Cold email tailored with dynamic audit insights, mobile booking evaluation, and direct value proposition.'
      },
      {
        url: '/images/restaurant-telegram.png',
        title: 'Instant Telegram Notification',
        caption: 'Real-time mobile alerting for positive reply detection, lead notifications, and workflow alerts.'
      }
    ],
    mockupSlides: [
      {
        title: 'Structured 8-Point Audit Engine',
        description: 'Deterministically evaluates restaurant sites across 8 operational criteria (HTTP status, load speed, mobile viewport, menu availability, booking widgets, and UI layout) with explicit written rationale.',
        metrics: '8-point objective evaluation'
      },
      {
        title: 'Graceful Error Boundaries',
        description: 'Traps timeouts, SSL drops, and DNS resolution failures without dropping leads, tagging records cleanly as Site_Unreachable in CRM.',
        metrics: 'Zero unhandled lead drops'
      },
      {
        title: 'Row-Match & Deduplication Shield',
        description: 'Prevents race conditions in Google Sheets row synchronization and blocks duplicate outbound emails using lead hash checks.',
        metrics: 'Idempotent dispatch protection'
      },
      {
        title: 'Customer-Deployable Packaging',
        description: 'Decoupled environment variables and credentials from canvas logic, paired with a standardized onboarding sheet template for turnkey deployment.',
        metrics: 'Turnkey deployment architecture'
      },
      {
        title: 'Rate-Throttled Dispatch & Reply Alerts',
        description: 'Enforces human-in-the-loop review blocks, respects 15 emails/hr domain safety limits, and fires instant Telegram alerts upon incoming replies.',
        metrics: '15/hr safe delivery cap'
      }
    ],
    tags: ['n8n', 'Groq Llama 3.3', 'Audit Engine', 'Gmail API', 'Google Sheets', 'Telegram Alerts']
  },
  {
    id: 'project-email-summary',
    agentNumber: 5,
    title: 'Email Digest Agent',
    category: 'Autonomous Triage',
    badge: 'Workflow Published on GitHub',
    oneLiner: 'Continuous background daemon that monitors priority email threads and delivers mobile action digests.',
    description: 'An autonomous inbox assistant that continuously monitors priority email threads, extracts actionable items with Groq LLM, and pushes real-time alerts to Telegram.',
    overview: 'High-volume communication causes critical requests and client deadlines to get lost in inbox clutter. Operating as a continuous background daemon, this agent polls incoming emails via the Gmail API, analyzes urgency and required deliverables with Groq LLM inference, and sends succinct, actionable digests straight to a private Telegram channel.',
    architectureImage: '/images/agent5-architecture.svg',
    architectureExplanation: 'Event-driven background daemon. Secure Gmail API polling with automated OAuth token refresh, Groq LLM action-item extraction, and instant Telegram Bot webhook notification.',
    howItWorks: [
      {
        step: '01',
        title: 'SCHEDULED GMAIL POLLING',
        description: 'Runs on a continuous background interval, retrieving unread priority messages with OAuth token refresh.'
      },
      {
        step: '02',
        title: 'NOISE FILTERING',
        description: 'Automatically screens out newsletter marketing, promotional notifications, and low-priority automated threads.'
      },
      {
        step: '03',
        title: 'GROQ ACTION EXTRACTION',
        description: 'Extracts core intent, deadline sensitivity, and required next steps in sub-second inference time.'
      },
      {
        step: '04',
        title: 'TELEGRAM MOBILE PUSH',
        description: 'Formats high-priority summaries and pushes actionable digests directly to the user’s mobile Telegram channel.'
      }
    ],
    technologyLine: 'Gmail API · Groq LLM · Telegram Bot · Python / n8n · Cron Automation',
    githubUrl: 'https://github.com/Samhita1008/edit-theory-agents/blob/main/5-email-digest/workflow.json',
    liveUrl: '/projects.html',
    images: ['/images/agent5-output.svg'],
    outputImages: [
      {
        url: '/images/agent5-output.svg',
        title: 'Real-Time Telegram Digest Stream',
        caption: 'Actionable digests pushed to mobile with urgency ranking, sender intent, and direct action items.'
      }
    ],
    mockupSlides: [
      {
        title: 'Gmail API 24h Polling',
        description: 'Scheduled fetch of unread priority messages with OAuth token refresh and state preservation.',
        metrics: 'Continuous polling interval'
      },
      {
        title: 'Groq LLM Action Extraction',
        description: 'Extracts core intent, deadline sensitivity, and required next steps in a structured format.',
        metrics: 'Sub-second inference speed'
      },
      {
        title: 'Telegram Alert Push',
        description: 'Formats high-priority digests and pushes actionable summaries directly to private Telegram channel.',
        metrics: 'Instant mobile delivery'
      }
    ],
    tags: ['Gmail API', 'Groq LLM', 'Telegram Bot', 'Cron Automation', 'Python / n8n']
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
