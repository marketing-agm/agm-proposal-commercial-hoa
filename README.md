# AGM Real Estate Group — Commercial / HOA Proposal Micro-Site

**CONFIDENTIAL — proposal material. Private repository. Do not make public.**

A digital micro-site version of AGM's *Proposal for Management Services · Commercial Owners
Association / HOA*. Each proposal slide is its own page in a single-file static site
(`index.html`, no build step, no dependencies). Fonts load from Google Fonts; everything else is
inline.

## What this is
The deck's eight sections, rebuilt as an institutional, navigable micro-site:

1. About AGM · 2. Protecting the Association · 3. Management Team · 4. Governance & Board Support ·
5. Financial Management & Fiduciary Oversight · 6. Facilities, Maintenance & Capital Projects ·
7. Tools & Technology · 8. Fee Structure.

Slide copy is reproduced verbatim from the source deck. The layout, palette (navy `#00202F`, brand
blue `#3A8DDE`, serif/sans pairing), and rail-and-content structure follow the AGM proposal design
system shared with AGM's other proposal micro-sites. Each page adds whitespace and interaction — a
per-page navy/blue summary rail, an interactive history timeline, hover-reactive cards and pills,
reveal-on-scroll, prev/next paging, a reading-progress bar, and a light/dark toggle.

## Local preview
Open `index.html` in a browser. That's it. Deep-link a section with the URL hash, e.g.
`index.html#governance`.

## Deploy — Cloudflare Pages (AGM standard pattern)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select this repo.
2. Settings: Framework preset **None** · Build command **(empty)** · Build output directory **/**
3. Every push to `main` auto-deploys production; every branch/PR gets its own preview URL.

## REQUIRED before sharing any URL: Cloudflare Access
Zero Trust → Access → Applications → **Add self-hosted application**:
- Application domain: `<project>.pages.dev` **and** `*.<project>.pages.dev` (preview deployments are
  otherwise public).
- Policy: Allow → Emails → leadership / Board list. One-time PIN works without SSO setup.

## Analytics (PostHog)
The site is fully instrumented for PostHog. To turn it on, edit the marked block near the top of
`index.html` (`<head>`) and paste your **Project API Key** (PostHog → Settings → Project → *Project
API Key*, starts with `phc_`), plus set the region host (`us.i.posthog.com` or `eu.i.posthog.com`).
Until a real key is present, analytics stays off — no requests, no errors.

What it tracks once the key is set:
- **Visits** — a `$pageview` fires on load (each section is its own virtual pageview, URL carries the
  `#section` hash).
- **Tab navigation** — a `tab_click` event with `to`, `from`, and `method` (`nav_tab`, `pager`,
  `rail_ticker`, `keyboard`, `brand`).
- **Time on each tab** — a `section_time` event with `section`, `section_label`, and `seconds` when a
  section is left (plus the open section is flushed on tab-hide / exit via `capture_pageleave`).
- **Everything else** — `autocapture` (every click/interaction), **session replays**, and click/scroll
  **heatmaps** are enabled.

All events are tagged with `proposal: commercial-hoa-microsite` (useful if the same PostHog project
hosts more than one site).

## Operational notes
- `_headers` enforces `noindex` and security headers at the edge.
- Featured-asset tiles are placeholders; drop in property photography by swapping the `.asset-tile`
  elements for `<img>` tags when imagery is available.
- Fee figures (base management fee, onboarding fee) reflect the source proposal and are filled in per
  engagement.
