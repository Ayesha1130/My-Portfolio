# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Environment

Copy `.env.example` to `.env` and fill in:

- `OPENAI_API_KEY` — required for the AI portfolio assistant (`app/api/chat/route.ts`). Server-side only, never exposed to the browser.
- `OPENAI_MODEL` — optional, defaults to `gpt-4o-mini` if unset.
- `NEXT_PUBLIC_SITE_URL` — optional, used to resolve Open Graph/Twitter metadata.

## Architecture

Next.js 14 App Router, Tailwind CSS, TypeScript.

**Single source of truth:** `data/site-content.json` holds the profile, about copy, tech stack, services, and project data (all featured projects, each with an `image` path under `public/images/projects/`). It's imported directly by the homepage, `/projects`, `/services`, the footer/contact page, the hero section, and by `lib/chatContext.ts` (which builds the chatbot's system prompt) — so updating content in one place updates the site and the chatbot's knowledge together.

**Pages:**
- `app/page.tsx` — homepage: hero, about, tech stack, services preview, featured project case studies, contact CTA
- `app/projects/page.tsx` — filterable grid of all featured projects
- `app/services/page.tsx` — services grid, sourced from `site-content.json`
- `app/contact/page.tsx` — email, socials, CV download

**Key components:**
- `heroSection.tsx` — client component, GSAP word-cycle animation, CTAs (View Projects / Download CV / Let's Work Together), social links
- `featuredProjectCard.tsx` — case-study style card (large visual, problem, features, stack, live/GitHub links)
- `techStackGrid.tsx` — categorized skills grid, sourced from `site-content.json`
- `autoSroll.tsx` — tech icon marquee (kept alongside the categorized grid)
- `InteractiveSkills3D.tsx` — Expertise & Tech Stack: CSS-3D floating, tilting glass tech cards (styles in `globals.css`, `tech-*` classes; respects reduced motion)
- `projectCard.tsx` / `Card/card.tsx` — legacy simple cards (currently unused)
- `chat/chatWidget.tsx` — floating AI assistant widget; posts to `/api/chat`
- `aosInit.tsx` — initializes AOS scroll animations once, globally (mounted in `layout.tsx`)
- `navbar.tsx` / `footer.tsx` — nav (with Download CV CTA) and footer (with social links + Download CV)

**AI chatbot:**
- `app/api/chat/route.ts` — Next.js API route, calls the OpenAI API server-side using `OPENAI_API_KEY`. Never expose this key client-side. Errors return real status codes (400 invalid input, 429 rate limit, 503 not configured / network unreachable / auth, 504 timeout, 502 upstream) with a friendly `{ ok:false, code, message, retryable }` body; `GET /api/chat` reports whether a key is configured.
- `lib/chatContext.ts` — builds the system prompt from `data/site-content.json`. The assistant is instructed to answer only from this content and say "I don't have that information in Ayesha's portfolio" otherwise.

**CV:**
- `public/cv/Ayesha-Iqbal-CV-Professional.pdf` — the CV, linked everywhere via `profile.cvUrl` in `data/site-content.json` (hero, about/contact, navbar, footer, chatbot). Phone, education and the hero portrait (`profile.image`) also live in that file; project/certification counts are derived in `lib/siteStats.ts`.
- `scripts/generate_cv.py` — legacy script that writes a *different* file (`Ayesha-Iqbal-CV.pdf`); it is not used by the site. It regenerates a PDF from `data/site-content.json` (run `python3 scripts/generate_cv.py` after editing content; requires `reportlab`).

**Styling conventions:**
- Custom Tailwind colors via CSS variables in `tailwind.config.ts` / `globals.css`: `bg`, `surface`, `primary`, `muted`, `accent`, `border` — with light/dark theme tokens (`.dark` class, via `next-themes`)
- `cn()` utility in `lib/utils.ts` combines `clsx` + `tailwind-merge`
- AOS is initialized once via `AOSInit` in `layout.tsx` — don't add additional `AOS.init()` calls elsewhere

**Static assets** (`public/images/projects/`) hold the six genuine project screenshots (`.jpg`) plus three clearly-labelled illustrative SVG thumbnails (TaskFlow, Physical AI, Marketplace Admin) that are NOT screenshots. Project images are referenced by the `image` field in `data/site-content.json`. Replace an SVG with a real screenshot by updating that path.