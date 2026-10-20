# Ayesha Iqbal — Personal Portfolio

A modern personal portfolio built with Next.js and TypeScript, showcasing full-stack web development, AI integration, AI agents, premium UI/UX and production-oriented projects. Includes a built-in AI portfolio assistant and an auto-generated, ATS-friendly CV — both driven from a single source-of-truth content file.

**Live site:** _add your deployed URL here once live_

---

## Overview

This is a single-page-app-style Next.js 14 (App Router) portfolio for **Ayesha Iqbal**, positioned as a **Full-Stack Developer | AI Integration & AI Agents**. It's built around one core idea: all portfolio content (profile, skills, services, and projects) lives in one JSON file, and every surface — the pages, the AI chatbot, and the generated CV — reads from it. Update the content once, and the site, the chatbot's knowledge, and the CV all stay in sync.

## Key Features

- Premium, responsive dark-mode UI with GSAP and AOS animations
- Categorized tech stack grid + animated tech icon marquee
- Case-study style featured project cards with dedicated case-study pages
- A curated, job-ready project list (featured), with older learning projects kept out of the main flow
- A floating **AI portfolio assistant** backed by a real OpenAI API route
- An automatically generated, one-page, ATS-friendly **PDF CV**
- Dark/light theme toggle, custom cursor, accessible navigation
- SEO metadata and Open Graph tags

## Featured Projects

### SmartDesk — AI Customer Support Agent

**Live:** https://smartdesk-ai-mwnk.vercel.app/

An AI customer-support platform where businesses provide FAQs, policies and knowledge to an AI support agent. The agent answers customer questions from that knowledge base and escalates to a human when it can't confidently resolve a query.

**Stack:** Next.js, TypeScript, Supabase, PostgreSQL, OpenAI Agents SDK, Vercel


## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS |
| **Backend** | Node.js, Express, Python, REST APIs |
| **Database / Backend Services** | Supabase, PostgreSQL |
| **AI** | OpenAI API, OpenAI Agents SDK, AI Agents, AI Integration |
| **Tools** | Git, GitHub, Vercel, Docker, Stripe |

## AI Chatbot

The site includes a floating **"Portfolio Assistant"** chat widget that can answer questions about Ayesha, her skills, services, and featured projects, and can point visitors to her CV, GitHub, LinkedIn and Instagram.

- `app/api/chat/route.ts` — a Next.js API route that calls the OpenAI API **server-side only**. The API key is never exposed to the browser.
- `lib/chatContext.ts` — builds the assistant's system prompt directly from `data/site-content.json`, so it can't invent experience, clients, or project features that aren't real.
- The model is configurable via the `OPENAI_MODEL` environment variable (defaults to `gpt-4o-mini`).
- If asked about something outside the portfolio data, the assistant says so honestly instead of guessing.

## CV / Resume

A clean, one-page, ATS-friendly CV is generated from the same `data/site-content.json` file used by the site, so it's always consistent with what's on the page.

- **File:** `public/cv/Ayesha-Iqbal-CV-Professional.pdf`
- **Generator:** `scripts/generate_cv.py` (Python, using `reportlab`)
- **Download it from:** the hero section, the about section, the navbar, the footer, and the chatbot

To regenerate after editing content:

```bash
pip install reportlab
python3 scripts/generate_cv.py
```

## Architecture

- **Framework:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Single source of truth:** `data/site-content.json` — profile, about copy, tech stack, services, and project data. Imported by the homepage, `/projects`, `/services`, the contact page, the hero, the case-study pages, and `lib/chatContext.ts`.
- **Animations:** GSAP (hero word-cycle), AOS (scroll reveals, initialized once via `app/components/aosInit.tsx`)
- **Theming:** `next-themes` with CSS-variable-based Tailwind colors (`bg`, `surface`, `primary`, `muted`, `accent`, `border`) for light/dark mode

## Project Structure

```
app/
├── api/chat/route.ts          # Server-side OpenAI chat endpoint
├── components/
│   ├── chat/chatWidget.tsx    # Floating AI assistant UI
│   ├── featuredProjectCard.tsx
│   ├── techStackGrid.tsx
│   ├── heroSection.tsx
│   ├── navbar.tsx / footer.tsx
│   └── background animations/ # Vanta/GSAP background effects
├── projects/
│   ├── page.tsx                # Featured projects
│   └── [slug]/page.tsx         # Case-study pages (/projects/smartdesk)
├── services/page.tsx
├── contact/page.tsx
├── layout.tsx                  # Metadata, theme, global providers
└── page.tsx                    # Homepage

data/
└── site-content.json           # Single source of truth for all portfolio content

lib/
├── chatContext.ts               # Builds the chatbot system prompt from site-content.json
└── utils.ts

scripts/
└── generate_cv.py               # Generates public/cv/Ayesha-Iqbal-CV-Professional.pdf

public/
├── cv/Ayesha-Iqbal-CV-Professional.pdf
└── images/                      # Project screenshots
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your own values. **Never commit real API keys or secrets** — `.env` is gitignored, and `.env.example` should only ever contain empty placeholders.

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes (for the chatbot) | Server-side only. Powers `/api/chat`. Never exposed to the browser. |
| `OPENAI_MODEL` | No | Overrides the chat model. Defaults to `gpt-4o-mini`. |
| `NEXT_PUBLIC_SITE_URL` | No | Used to resolve Open Graph/Twitter metadata for the deployed site. |

## Local Development

```bash
git clone <this-repo-url>
cd Milestone-02-Personal-Portfolio
npm install
cp .env.example .env   # then fill in OPENAI_API_KEY
npm run dev
```

Visit http://localhost:3000.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Start the production server (after `build`) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler in check-only mode |

## Deployment

Deploys cleanly to [Vercel](https://vercel.com) (or any Node.js-compatible host):

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`, `NEXT_PUBLIC_SITE_URL`) as environment variables in the Vercel project settings.
4. Deploy.

## Security

- `OPENAI_API_KEY` is read only inside the server-side API route (`app/api/chat/route.ts`) and is never sent to the client.
- `.env` and all local env files are gitignored; only `.env.example` (with empty placeholders) is committed.

## Author / Contact

**Ayesha Iqbal** — Full-Stack Developer | AI Integration & AI Agents

- Email: ayeshaiqbal.dev@gmail.com
- GitHub: https://github.com/Ayesha1130
- LinkedIn: https://www.linkedin.com/in/ayesha-iqbal-2613402b4/
- Instagram: https://www.instagram.com/ayeshaiqbal.dev/?hl=en

## AI assistant setup and troubleshooting

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY=` to your own key (never commit `.env`). Optionally set `OPENAI_MODEL`.
2. Restart `npm run dev` (Next.js reads `.env` at startup).
3. Check configuration: open `http://localhost:3000/api/chat`. It returns `{"configured":true|false,...}` and never reveals the key.

The portfolio works without a key: the chat widget shows a friendly message instead of failing.

| HTTP status | `code` | Meaning |
| --- | --- | --- |
| 400 | `INVALID_REQUEST` | Empty, malformed or over-long message |
| 429 | `RATE_LIMITED` | OpenAI rate limit or quota reached (honours `Retry-After`) |
| 502 | `UPSTREAM_ERROR` | OpenAI returned an error or an empty reply |
| 503 | `ASSISTANT_NOT_CONFIGURED` | `OPENAI_API_KEY` missing |
| 503 | `ASSISTANT_MISCONFIGURED` | OpenAI rejected the key (invalid, revoked or no access) |
| 503 | `NETWORK_UNREACHABLE` | The server can't reach OpenAI (DNS/connection failure) |
| 504 | `UPSTREAM_TIMEOUT` | No answer within 20 seconds |

Full details are logged in the terminal as `[chat-api] request failed` (never the key).

**`getaddrinfo ENOTFOUND api.openai.com`** is a DNS/network problem on the machine running Next.js, not a code bug. The app now reports it gracefully (503 `NETWORK_UNREACHABLE`) but cannot fix it. To diagnose:

- `nslookup api.openai.com` and `curl -I https://api.openai.com/v1/models` from the same machine.
- Check Wi-Fi/VPN, DNS (try 1.1.1.1 or 8.8.8.8), firewall/antivirus, and any required corporate proxy.
- If the network blocks OpenAI, try another network or deploy the app (for example on Vercel), where outbound access is normally open.
