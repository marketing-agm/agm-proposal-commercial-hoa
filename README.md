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

## Access gate — custom password screen (Pages Functions)
The site is protected by a **custom-designed cover / login screen** (navy AGM cover with an
**Access** button → password prompt), served by a Cloudflare Pages Function
(`functions/_middleware.js`). This runs **server-side**: until the correct password is submitted, the
visitor only ever receives the cover page — the actual proposal (`index.html`) is never sent to the
browser. The password lives only as an encrypted Cloudflare secret, never in the code or the client.

This replaces the standard Zero Trust login screen with AGM's own branded page.

### One-time setup (required before the site will unlock)
Cloudflare dashboard → **Workers & Pages → this project → Settings → Variables and Secrets**. Add
both of these for **Production _and_ Preview**, then redeploy:

| Name | Value | Mark as |
|------|-------|---------|
| `SITE_PASSWORD` | the shared password you give recipients | **Secret** |
| `GATE_SECRET` | any long random string (40+ chars) — used to sign the session cookie | **Secret** |

- Until `SITE_PASSWORD` is set, the site fails closed (shows a "not configured yet" notice).
- **Change the password** anytime by editing `SITE_PASSWORD` (existing links keep working; open
  sessions stay valid because `GATE_SECRET` is unchanged).
- **Force everyone to re-enter** by rotating `GATE_SECRET` (or bumping `TOKEN_VERSION` in the
  middleware).
- Sessions last 7 days (`MAX_AGE`); `/__logout` clears the cookie.
- The property/association name on the cover is the `PROPERTY_NAME` constant at the top of
  `functions/_middleware.js`.

### Local preview
Copy `.dev.vars.example` → `.dev.vars` (git-ignored), fill in the two values, and run
`npx wrangler pages dev .`.

### Note on Zero Trust
This shared-password gate is intentionally simple and needs no per-user setup. If you ever need
**per-person access with an audit trail** (who opened it, when), use Cloudflare Zero Trust Access
instead — but that uses Cloudflare's own login flow, not this custom screen. Don't enable both at once.

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
