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
    description: 'A customer-facing, full-stack product combining a clean React frontend with an n8n workflow engine that handles venue search, booking parameters, and reservation workflows.',
    overview: 'Local service businesses—restaurants, studios, salons, and wellness practices—often miss high-intent clients because manual booking takes too long. Edit Theory Concierge was built as a complete customer-facing product (React/TypeScript frontend + n8n backend) rather than an internal script. It pairs a live client interface with a workflow engine that searches nearby venues, validates dates and times to prevent double-booking, logs new reservations directly to a Google Sheets CRM, and sends instant confirmation itineraries with calendar invites via Gmail.',
    demoModeNote: 'Runs in demo mode by design (free venue data, simulated venue confirmation). Production integrations (Google Places API, WhatsApp Business API) are fully built and swap-ready pending client credentials—a deliberate architectural design for zero-cost, verifiable client evaluation.',
    architectureImage: '/images/concierge-workflow.png',
    architectureExplanation: 'Full-stack booking workflow. The React/TypeScript client interface communicates through an n8n webhook that coordinates local venue search, prevents double-booking the same slot in Google Sheets, and sends confirmation emails.',
    howItWorks: [
      {
        step: '01',
        title: 'VENUE DISCOVERY',
        description: 'Customer location and category searches are matched against local listings to find nearby venues.'
      },
      {
        step: '02',
        title: 'VALIDATION & BOOKING',
        description: 'Dates, party sizes, and open time slots are checked to prevent double-booking, assigning a unique booking reference number.'
      },
      {
        step: '03',
        title: 'CONFIRMATION',
        description: 'The system routes booking requests to venue managers and updates reservation status once confirmed.'
      },
      {
        step: '04',
        title: 'ITINERARY DISPATCH',
        description: 'Booking confirmations, directions, reference numbers, and calendar invite attachments are delivered automatically via Gmail.'
      },
      {
        step: '05',
        title: 'LIVE STATUS',
        description: 'The client interface checks reservation status in real time so customers see updates without refreshing the page.'
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
        caption: 'Multi-node n8n workflow connecting webhooks, venue discovery, and booking checks.'
      },
      {
        url: '/images/concierge-website.png',
        title: 'Website Client Interface',
        caption: 'Customer-facing React frontend interface with live status checks and reservation booking form.'
      },
      {
        url: '/images/concierge-leads.png',
        title: 'Google Sheets Lead CRM',
        caption: 'Reservation records, booking reference IDs, party sizes, and synchronized lead status.'
      },
      {
        url: '/images/concierge-mail.png',
        title: 'Confirmation Email Dispatched',
        caption: 'Automated itinerary confirmation email with booking reference, calendar details, and venue directions.'
      }
    ],
    mockupSlides: [
      {
        title: 'Venue Discovery',
        description: 'Parses customer search requests and queries local venue catalogs with categorized metadata.',
        metrics: 'Category & location matching'
      },
      {
        title: 'Validation & Booking Engine',
        description: 'Validates party parameters, checks open slots to prevent double-booking, and logs new records to Google Sheets.',
        metrics: 'Prevents double-booking'
      },
      {
        title: 'Confirmation & Direct Venue Contact',
        description: 'Routes booking requests to venue managers and updates status upon confirmation.',
        metrics: 'Automated status routing'
      },
      {
        title: 'Customer Itinerary Dispatch',
        description: 'Delivers booking confirmation emails with venue directions, reservation references, and calendar invite attachments.',
        metrics: 'Automated email delivery'
      },
      {
        title: 'Real-Time Status Tracking',
        description: 'Client-side status checks that give customers clear visibility throughout the booking process.',
        metrics: 'Live booking updates'
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
    engagementNote: 'Concept Build — not a paid client engagement',
    oneLiner: 'Transforms long-form founder podcasts into 10 multi-platform editorial assets with brand-voice consistency.',
    description: 'An automated content extraction engine that parses long-form interview transcripts, extracts core narrative hooks, and generates 10 tailored distribution assets synced directly to Notion.',
    overview: 'Producing high-caliber founder interviews requires substantial creative energy, but manually extracting quotes, drafting carousels, writing newsletter segments, and formatting video reel scripts creates a heavy editorial bottleneck. This system ingests long-form transcripts via webhook, processes narrative hooks with Groq AI, and automatically generates 10 distinct distribution assets synced directly into a structured Notion database.',
    architectureImage: '/images/agent1-notion.jpg',
    architectureExplanation: 'Cloud-hosted n8n workflow on Railway. Ingests raw audio/video transcripts, runs prompt pipelines via Groq AI, and writes 10 categorized deliverables to a relational Notion Kanban board.',
    howItWorks: [
      {
        step: '01',
        title: 'TRANSCRIPT INGESTION',
        description: 'Long-form podcast transcripts are ingested via webhook, normalized, and partitioned into thematic paragraph segments.'
      },
      {
        step: '02',
        title: 'NARRATIVE HOOK EXTRACTION',
        description: 'Groq AI analyzes the transcript, identifying key takeaways, counter-intuitive arguments, and memorable quotes.'
      },
      {
        step: '03',
        title: 'MULTI-FORMAT SYNTHESIS',
        description: 'Generates 10 format-specific assets: LinkedIn carousels, reel scripts, newsletters, quote graphics, and ad copy.'
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
        description: 'The automated pipeline running on cloud containers. Processes webhooks, retrieves transcript paragraphs, extracts hooks, and creates Notion records.',
        metrics: '1 transcript → 10 assets'
      },
      {
        title: 'Notion Assets: Columns 1-5',
        description: 'First half of the Notion database showing generated content assets (YouTube video concepts, LinkedIn carousels, and video reel hooks).',
        metrics: '10 content formats'
      },
      {
        title: 'Notion Assets: Columns 6-10',
        description: 'Second half of the Notion asset grid containing automated newsletters, quote cards, captions, threads, and ad concepts.',
        metrics: 'Notion Kanban sync'
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
    engagementNote: 'Spec Project — not a paid client engagement',
    oneLiner: 'Multi-stage cold email sequence with dynamic ICP segmentation and automated reply tracking.',
    description: 'An automated outreach sequence that segments prospect accounts, tailors introductory hooks, and runs a 3-stage follow-up cadence.',
    overview: 'Outreach campaigns often fail due to generic messaging or failure to follow up systematically. This system personalizes cold outreach across three target buyer personas, dispatches follow-ups at 3, 7, and 10 days, and routes incoming replies into appropriate stages inside Google Sheets and CRM.',
    architectureImage: '/images/agent2-aioutreach.jpg',
    architectureExplanation: 'Multi-branch n8n outreach pipeline with persona routing, automated time-delay follow-ups, and webhook-driven reply categorization.',
    howItWorks: [
      {
        step: '01',
        title: 'DYNAMIC ICP SEGMENTATION',
        description: 'Prospect accounts are grouped into buyer tiers to determine customized messaging angles.'
      },
      {
        step: '02',
        title: 'CONTEXTUAL OPENER SYNTHESIS',
        description: 'The engine generates introductory hooks based on prospect brand signals and recent public activity.'
      },
      {
        step: '03',
        title: '3-STAGE CADENCE DISPATCH',
        description: 'Executes automated follow-up emails on days 3, 7, and 10, adapting calls-to-action based on prior engagement.'
      },
      {
        step: '04',
        title: 'INBOX SENTIMENT MONITORING',
        description: 'Tracks replies in real time, classifies response sentiment, and updates prospect status in the CRM sheet.'
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
        caption: 'Automated 3-day, 7-day, and 10-day follow-up branches.'
      },
      {
        url: '/images/agent2-replytracker.jpg',
        title: 'Reply Sentiment Classifier',
        caption: 'Webhook listener processing inbox replies and categorization.'
      },
      {
        url: '/images/agent2-excel.jpg',
        title: 'CRM Lead Synchronization',
        caption: 'Structured Google Sheets database with contact info and sequence timestamps.'
      }
    ],
    mockupSlides: [
      {
        title: 'AI Outreach Engine',
        description: 'Core n8n sequence that ingests prospects, personalizes openers by persona, and manages initial cold email dispatch.',
        metrics: '3 target profiles'
      },
      {
        title: 'Multi-Step Follow-Up Sequence',
        description: 'Follows up automatically with prospect accounts after 3, 7, and 10 days with tailored angles.',
        metrics: 'Cadence: 3 / 7 / 10 days'
      },
      {
        title: 'Reply Tracker',
        description: 'Detects incoming replies, categorizes sentiment, and updates CRM conversion stages.',
        metrics: 'Automated reply logging'
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
    description: 'A lead scraping engine that queries public platforms, evaluates lead qualification parameters, and outputs clean structured records.',
    overview: 'Manual prospecting and email verification is a major drain on sales capacity. This extraction system automates directory indexing, checks email validity, and exports clean CSV and Google Sheet databases ready for outreach campaigns.',
    architectureImage: '/images/agent3-workflow.jpg',
    architectureExplanation: 'Scraping pipeline running on cloud containers. Manages pagination, request throttling, and email validation before exporting to sheets.',
    howItWorks: [
      {
        step: '01',
        title: 'API WEBHOOK TRIGGER',
        description: 'Ingests target search queries with filters for niche keywords, audience thresholds, and geographic location.'
      },
      {
        step: '02',
        title: 'DATA EXTRACTION',
        description: 'Extracts public profile information, website links, and contact handles with rate-limit pacing.'
      },
      {
        step: '03',
        title: 'QUALIFICATION & EMAIL VERIFICATION',
        description: 'Filters out inactive accounts, checks email syntax and domain records, and scores leads against criteria.'
      },
      {
        step: '04',
        title: 'CRM SPREADSHEET EXPORT',
        description: 'Appends qualified prospect records into Google Sheets with personalized introductory hooks.'
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
        caption: 'Terminal execution log showing webhook verification and profile batching.'
      },
      {
        url: '/images/agent3-excel.jpg',
        title: 'Verified Google Sheets CRM',
        caption: 'Exported sheet with qualified leads, company names, and verified email addresses.'
      }
    ],
    mockupSlides: [
      {
        title: 'Webhook Trigger',
        description: 'Trigger with search parameters (niche, follower counts, geographic region) to start scraping.',
        metrics: 'Custom parameter filters'
      },
      {
        title: 'n8n Scraper Engine',
        description: 'Workflow on Railway that queries profiles, checks eligibility, and validates contacts.',
        metrics: 'Automated batching'
      },
      {
        title: 'Google Sheets Lead Database',
        description: 'Lead sheet populated with business names, niches, post topics, personalized intro hooks, and verified emails.',
        metrics: 'Direct Google Sheets export'
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
    oneLiner: 'B2B outreach engine with structured 8-point website auditing, deduplication, and rate-safe email dispatch.',
    description: 'An outreach pipeline that audits restaurant websites against 8 practical criteria, handles site timeouts without dropping leads, checks for duplicate rows, and sends personalized cold emails.',
    overview: 'Cold outreach campaigns frequently fail from two flaws: generic templates that get ignored, and fragile scripts that crash or send duplicate emails. This system audits prospect websites across 8 specific criteria (such as mobile viewports and online menus), logs errors cleanly if a website is offline, checks for duplicate records before emailing, and sends personalized pitches with Telegram reply alerts.',
    architectureImage: '/images/restaurant-workflow.png',
    architectureExplanation: 'Outreach pipeline built in n8n. Evaluates restaurant websites using an 8-point checklist, filters out duplicates, and sends emails through the Gmail API with rate limits.',
    howItWorks: [
      {
        step: '01',
        title: 'STRUCTURED 8-POINT AUDIT',
        description: 'Evaluates restaurant websites across 8 practical criteria: HTTP status, load time, mobile layout, online menus, contact details, booking forms, and overall UI.'
      },
      {
        step: '02',
        title: 'ERROR HANDLING',
        description: 'Catches timeouts and broken links without dropping leads, marking records clearly as Site_Unreachable in the CRM.'
      },
      {
        step: '03',
        title: 'DEDUPLICATION CHECK',
        description: 'Checks existing rows in Google Sheets and email logs to ensure no prospect receives duplicate outreach.'
      },
      {
        step: '04',
        title: 'PITCH GENERATION',
        description: 'Groq Llama 3.3 writes a personalized outreach email citing specific findings and strengths from the 8-point audit.'
      },
      {
        step: '05',
        title: 'RATE-SAFE DISPATCH & ALERTS',
        description: 'Limits sending to 15 emails/hr for domain safety, with optional review steps and real-time Telegram notifications when prospects reply.'
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
        caption: 'Workflow pipeline with 8-point website checks, deduplication, and conditional routing.'
      },
      {
        url: '/images/restaurant-leads.png',
        title: 'Google Sheets Lead Database',
        caption: 'Lead sheet with audit notes, contact info, and email delivery status.'
      },
      {
        url: '/images/restaurant-mail.png',
        title: 'Personalized Outreach Email',
        caption: 'Cold email referencing specific observations from the website audit.'
      },
      {
        url: '/images/restaurant-telegram.png',
        title: 'Instant Telegram Notification',
        caption: 'Mobile alerts sent to Telegram when prospects reply.'
      }
    ],
    mockupSlides: [
      {
        title: '8-Point Website Audit',
        description: 'Evaluates restaurant sites across 8 criteria (HTTP response, page speed, mobile layout, online menu, booking forms, and design) with written notes.',
        metrics: '8-point audit checklist'
      },
      {
        title: 'Error Handling',
        description: 'Catches timeouts and broken links without stopping the workflow, logging unreachable sites properly in the CRM.',
        metrics: 'Handles timeouts gracefully'
      },
      {
        title: 'Deduplication Check',
        description: 'Checks for existing records in Google Sheets to prevent sending duplicate emails to the same recipient.',
        metrics: 'Prevents duplicate sends'
      },
      {
        title: 'Turnkey Template Setup',
        description: 'Keeps credentials and sheet IDs configured in separate variables so the workflow can be reused for new campaigns.',
        metrics: 'Reusable configuration'
      },
      {
        title: 'Safe Sending & Reply Alerts',
        description: 'Caps outbound emails at 15/hr to protect sender reputation and sends immediate Telegram alerts when leads reply.',
        metrics: '15 emails/hr cap'
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
    oneLiner: 'Background inbox monitor that triages priority emails and delivers mobile action summaries to Telegram.',
    description: 'An inbox monitor that checks for priority emails, extracts key action items with Groq, and sends concise summaries directly to Telegram.',
    overview: 'High email volume makes it easy for important client requests and deadlines to get buried. This agent periodically checks incoming emails via the Gmail API, summarizes urgency and next steps using Groq LLM, and sends clear action summaries directly to a private Telegram channel.',
    architectureImage: '/images/agent5-architecture.svg',
    architectureExplanation: 'Email summary workflow. Polls Gmail with OAuth, summarizes key action items with Groq LLM, and sends alerts via Telegram Bot.',
    howItWorks: [
      {
        step: '01',
        title: 'GMAIL INBOX POLLING',
        description: 'Checks for unread priority emails on a scheduled interval using the Gmail API.'
      },
      {
        step: '02',
        title: 'NOISE FILTERING',
        description: 'Filters out newsletters, marketing promotions, and routine automated notifications.'
      },
      {
        step: '03',
        title: 'ACTION EXTRACTION',
        description: 'Identifies the main topic, deadlines, and required next steps from the email thread.'
      },
      {
        step: '04',
        title: 'TELEGRAM NOTIFICATION',
        description: 'Sends a formatted summary directly to a private Telegram channel for quick review on mobile.'
      }
    ],
    technologyLine: 'Gmail API · Groq LLM · Telegram Bot · Python / n8n · Cron Automation',
    githubUrl: 'https://github.com/Samhita1008/edit-theory-agents/blob/main/5-email-digest/workflow.json',
    liveUrl: '/projects.html',
    images: ['/images/agent5-output.svg'],
    outputImages: [
      {
        url: '/images/agent5-output.svg',
        title: 'Telegram Digest Stream',
        caption: 'Action summaries sent to Telegram with sender info and next steps.'
      }
    ],
    mockupSlides: [
      {
        title: 'Gmail API Polling',
        description: 'Scheduled fetch of unread priority messages with OAuth token refresh.',
        metrics: 'Scheduled inbox polling'
      },
      {
        title: 'Action Item Extraction',
        description: 'Extracts core intent, deadline sensitivity, and required next steps in a structured format.',
        metrics: 'Groq-powered summary'
      },
      {
        title: 'Telegram Alert Push',
        description: 'Formats high-priority digests and pushes actionable summaries directly to private Telegram channel.',
        metrics: 'Direct Telegram alerts'
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
