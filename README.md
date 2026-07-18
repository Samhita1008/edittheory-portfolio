# Edit Theory: AI Automation Systems for D2C Brands

Portfolio site for **Edit Theory**, an AI automation practice built by [Samhita Tavutu](mailto:samhitatavutu@gmail.com), a first-year CSE student building working automation agents for D2C brands, using n8n, Groq, and Google Workspace APIs.

**Live site:** [Portfolio](https://edittheory-portfolio.vercel.app/)

---

## What this is

Most portfolios show finished screenshots. This one shows working systems: every project links to the actual automation canvas, the AI prompts used, and a walkthrough video, not just a polished mockup.

## Projects showcased

1. **Content Repurposing System:** Turns one long-form video/podcast into 10 platform-ready content assets (reels, carousels, newsletters) using Supadata + Groq.
2. **AI Outreach System:** Personalized cold email generation with automated follow-up sequences and reply tracking, built on Groq + Gmail + Google Sheets CRM.
3. **Lead Discovery System:** Automated Instagram/hashtag lead scraping and qualification pipeline feeding directly into the outreach system.
4. **Restaurant Outreach AI System:** A 3-workflow system covering lead draft generation, human-reviewed sending, and reply tracking with instant Telegram alerts.
5. **Email Digest Agent:** Daily inbox triage: pulls the last 24 hours of email, filters noise, categorizes by urgency (🔴/🟡/🟢) via Groq, and delivers a morning summary to Telegram.

Full workflow files (n8n JSON exports) for each agent live in a separate repo: [edit-theory-agents](https://github.com/Samhita1008/edit-theory-agents)

## Stack

- **Automation:** n8n
- **AI:** Groq (Llama 3.3 70B)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Integrations:** Gmail API, Google Sheets, Telegram Bot API, Apify

## Note on projects

Some projects shown are spec/concept builds created to demonstrate technical capability, not paid client engagements. This is stated explicitly on each relevant project.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

## Contact

- Email: samhitatavutu@gmail.com
- LinkedIn: https://linkedin.com/in/samhita-tavutu-b17b2a37b/
