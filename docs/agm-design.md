# AGM Design System & UI Rules

> **What this file is:** the single source of truth for how our software should *look and feel*.
> Any web app, dashboard, report, or internal tool we build should follow these rules so
> everything we ship looks like it came from the same company.
>
> **Where these values come from:** they're not made up. They're pulled straight from our
> flagship app, the **AGM Corporate Library** (the React document-library + AI-chat app).
> Its design tokens live in `src/styles.css`. By copying *that* app's real colors, fonts,
> spacing, and component rules here, every new tool we build matches the one we've already
> shipped and polished. When this file and that app disagree, the app wins — update this file.
>
> **See it live:** open `design-reference.html` in a browser for a one-page preview of these
> components rendered with the tokens. Keep the two files in sync.

---

## 0. How to use this document

- **Designers/builders:** read this before starting any new screen. When in doubt, copy a
  value from here instead of inventing one.
- **Reviewers:** if a pull request (a proposed code change) breaks a rule here, point to the
  section number and ask for a fix.
- **Definitions inline:** a few terms you'll see repeatedly —
  - **Design token** = a named value for a design decision (e.g. `--accent = #2383e2`).
    We name them so we can change one value in one place and have it update everywhere.
  - **Hex code** = the 6-character code that defines a color, like `#2383e2`. The `#` plus
    three pairs of digits = red, green, blue.
  - **rem / px** = units of size on screen. `px` (pixels) is fixed. `rem` scales with the
    user's browser font setting, which is better for accessibility. `1rem = 16px` by default.
  - **Component** = a reusable piece of UI, like a button or a card. Build it once, use it everywhere.

> **One naming note:** the token names below (`--bg`, `--text-primary`, `--accent`, …) are the
> *exact* names used in the Corporate Library's `styles.css`. We kept them identical on purpose so
> code you copy from one project drops straight into another with no renaming.

---

## 1. Design Principles

These are our north star — the tie-breakers for when no specific rule below covers your situation.
When you're stuck, decide in this order:

1. **Clarity over cleverness.** A boring screen people understand beats a slick one they don't.
2. **Consistency over novelty.** Copy the nearest existing pattern. Sameness *is* the brand.
3. **Data first.** We're a numbers company. The numbers should be the easiest thing to read on the page.
4. **Calm, quiet surfaces.** Our look is light, near-white, and low-contrast in the chrome so the
   *content* stands out — not the toolbar. Borders are barely-there; shadows are subtle; color is
   used sparingly and only where it means something.
5. **Accessible by default.** If it doesn't work with a keyboard and readable contrast, it's not done.
6. **Fast beats fancy.** This is software people use all day. Speed and calm > animation and flair.
7. **When no rule exists,** copy the closest pattern already in the Corporate Library, then add the
   rule here so the next person doesn't have to guess.

---

## 2. Brand Foundations

### 2.1 Logo

| Item | Value |
|------|-------|
| Primary mark | A rounded near-black square (`#1a1a19`, `6px` corners) holding a simple white document/book outline. See `public/favicon.svg` in the Corporate Library. |
| In-app logo | `32×32px` rounded square (`--radius-md`), background `--text-primary` (`#1a1a19`), white mark inside, top-left of the sidebar header |
| Icon-only / favicon mark | `/favicon.svg` — the rounded-square document mark, used for browser tabs & app icons |
| Preferred file format | SVG for web (stays sharp at any size); PNG fallback |

**Logo rules**
- **Clear space:** keep empty space around the logo equal to at least the mark's corner radius
  (~6px); more is better. Don't crowd it.
- **Minimum size:** the in-app mark renders at `32px`; never show it smaller than `24px` or it loses legibility.
- **Don't:** stretch it, recolor the square to anything but `--text-primary`, add drop shadows, rotate it,
  or place it on a busy background that hurts contrast.
- **Where it goes:** top-left of every app's sidebar/header is the default, linking back to home.

### 2.2 Color Palette

> These are the **real** tokens from the Corporate Library's `:root` in `styles.css`. Use them as-is.
> The palette is deliberately quiet: a near-white set of background grays, one blue accent for
> interactive things, and one red for danger. Status colors come from the app's chips and badges.

**Surfaces & backgrounds** (the quiet grays that make up most of the screen)

| Token | Hex | Used for |
|-------|-----|----------|
| `--bg` | `#ffffff` | Default surface — cards, panels, main content, inputs |
| `--bg-secondary` | `#fbfbfa` | Sidebar background, dropzones — a hair off-white |
| `--bg-tertiary` | `#f7f6f3` | Table/list headers, subtle fills, hovered cards, count pills |
| `--bg-hover` | `#f1f1ef` | Hover state for rows, buttons, list items |
| `--bg-active` | `#ededeb` | Selected/active tree items |

**Borders & lines**

| Token | Hex | Used for |
|-------|-----|----------|
| `--border` | `#e8e7e4` | Default borders — inputs, buttons, panels, dividers |
| `--border-light` | `#eeeeec` | Lighter dividers — card edges, list-row separators, section rules |

**Text** (a near-black, not pure black — softer on the eye)

| Token | Hex | Used for |
|-------|-----|----------|
| `--text-primary` | `#1a1a19` | Default body text, headings, **and the primary-button background** |
| `--text-secondary` | `#6b6b6a` | Secondary text, labels, sidebar items |
| `--text-tertiary` | `#9b9b99` | Muted captions, placeholders, icons, timestamps |

**Accent** (one interactive blue — links, focus, selected, "AI" affordances)

| Token | Hex | Used for |
|-------|-----|----------|
| `--accent` | `#2383e2` | Links, focus rings, selected/focused items, the accent ("Focus for AI") button |
| `--accent-light` | `#e8f0fe` | Accent backgrounds, the soft glow ring on focused inputs, selected rows |
| `--accent-hover` | `#1b6ec2` | Accent hover/pressed |

**Primary-button surface** (a role token, so the button doesn't invert in dark mode)

| Token | Value | Used for |
|-------|-------|----------|
| `--btn-primary-bg` | `var(--text-primary)` (light) → `var(--accent)` (dark) | Primary button background |
| `--btn-primary-bg-hover` | `#333` (light) → `--accent-hover` (dark) | Primary button hover |

> ⚠️ **Heads up — learned the hard way in the Corporate Library:** don't hardcode a button's
> background as `--text-primary`. In dark mode `--text-primary` becomes near-*white*, which would
> make the button invisible. Always use the **role token** `--btn-primary-bg`, which is defined
> per-theme. Why it matters: one wrong token and your "Save" button vanishes in dark mode.

**Danger** (errors, destructive actions, overdue)

| Token | Hex | Used for |
|-------|-----|----------|
| `--danger` | `#cc3333` | Error text, delete icons, danger button text/border |
| `--danger-light` | `#ffeaea` | Danger button hover background, error fills |

**Status / feedback colors** (from the app's chips & badges — color is paired with a dot + label, never alone)

| Role | Text | Background | Used for |
|------|------|-----------|----------|
| **Success** (paid / approved / posted / done) | `#1a7a3a` | `#e3f5e6` | "Approved", "Responded", success banners |
| **Warning** (draft / due soon / working) | `#8b6a00` | `#fdf3da` | "Draft" chips; "working" governance badge is `#9a6300` on `#fff3df` |
| **Info / in-progress** | `#1858b8` | `#e6efff` | "In progress" status (use the `--accent` family for plain info) |
| **Danger** (error / rejected / overdue) | `#b3261e` | `#fceae8` | "Rejected" chips, error banners (icon/border use `--danger`) |
| **Review** (in review) | `#5b3aa6` | `#efe6ff` | "In review", template tags — our purple |
| **Neutral** (new / inactive) | `#555` | `#f1f1ef` | "New", untouched items |

**Warm brand accent** (used sparingly for personality — the reputation portal header & star ratings)

| Color | Hex | Used for |
|-------|-----|----------|
| Terracotta | `#d97757` → `#c9582f` (gradient) | Reputation header, star icons. A warm highlight — **not** a primary UI color. |

**Color rules**
- **Contrast is non-negotiable.** Text must be readable against its background — aim for a
  contrast ratio of at least **4.5:1** for normal text (an accessibility standard called WCAG AA).
  Free checker: webaim.org/resources/contrastchecker.
- **Don't use color as the only signal.** Our status chips always pair the color with a **dot + a
  word** ("Overdue", "Approved") — about 1 in 12 men can't distinguish red/green. (See §4.5.)
- **Stick to the palette.** No one-off hex codes sprinkled in CSS — reference a token. If you need a
  new color, add it here first with a name and a reason.

### 2.3 Typography (Fonts)

The Corporate Library pairs a **serif for display** (titles, headings — gives reports a polished,
"published" feel) with a **clean sans for everything else** (UI, body, numbers).

| Item | Value |
|------|-------|
| Display font (titles & headings) | `'Source Serif 4', Georgia, serif` |
| Body / UI font | `'DM Sans', -apple-system, sans-serif` |
| Numbers / tables | Same DM Sans — the app has no separate mono font. For financial tables, add `font-variant-numeric: tabular-nums` so decimals line up (see typography rules). |
| Where the fonts are hosted | Google Fonts, loaded via `@import` at the top of `styles.css`: `Source Serif 4` (weights 300/400/600/700) and `DM Sans` (300–700 + italic) |

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600;8..60,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
```

**Type scale** (the real sizes from the app — don't freestyle font sizes)

| Use | Size | Weight | Font | Notes |
|-----|------|--------|------|-------|
| Page title | `28px` | 700 | Display (serif) | `letter-spacing: -0.02em`, `line-height: 1.2` |
| Modal / section heading | `18px` | 600 | Display (serif) | Modal & guide headers |
| Card / sub-title | `16px` | 600 | Display (serif) | Smaller headings inside cards/modals |
| Body (default) | `14px` | 400 | Body (sans) | App base size, `line-height: 1.5` |
| Secondary / compact | `13px` | 400–500 | Body (sans) | Buttons, tree items, list cells |
| Small / meta | `12px` | 400 | Body (sans) | Captions, table cells, hints |
| Label (micro) | `11px` | 600 | Body (sans) | **UPPERCASE**, `letter-spacing: 0.05em`, `--text-tertiary` — section/form labels |
| Tiny | `10–11px` | 400–500 | Body (sans) | Keyboard hints, badges — use sparingly |

**Typography rules**
- **The app's base size is `14px`, not 16px.** This is a dense internal tool, and that's deliberate.
  ⚠️ **But for owner/tenant-facing pages**, bump body to **16px** — small text is harder on people who
  aren't staring at this all day, and it's better for accessibility.
- **Headings are serif, UI is sans.** Don't set body copy in the serif or page titles in the sans — the
  contrast between the two *is* the brand.
- **Line height:** ~1.5 for body, ~1.2 for big titles. Tight body lines feel cramped.
- **Limit weights:** the app uses 400 / 500 / 600 / 700. Stick to those — more looks messy.
- **Numbers in tables:** right-align currency and add `font-variant-numeric: tabular-nums` so decimals
  line up. (The app has no mono font; tabular-nums gets you aligned digits without adding one.) This
  matters a lot for our financial reports.

---

## 3. Spacing, Layout & White Space

White space (empty space) is not wasted space — it's what makes a screen feel calm and professional
instead of cramped and amateur. The Corporate Library leans heavily on this: quiet borders, generous
padding, and lots of breathing room.

### 3.1 The spacing scale

Use a consistent set of spacing values for margins, padding, and gaps. The app builds on a **base of
~4px**; the values you'll see most often in `styles.css` are below.

| Token (suggested) | Value | Typical use in the app |
|-------------------|-------|------------------------|
| `space-xs` | 4px | Tight gaps inside small elements, icon-to-text |
| `space-sm` | 8px | Gap between buttons, label↔input, chip gaps |
| `space-md` | 12–16px | Padding inside cards, list rows, modal content |
| `space-lg` | 20–24px | Page gutters, modal header/footer padding, section gaps |
| `space-xl` | 32px | Content-area side padding, major section separation |
| `space-2xl` | 48px+ | Page-level breathing room |

**Rule:** if you're about to type a random number like `13px` or `27px`, stop — round to a scale value.

### 3.2 Radius, shadow & motion tokens (real, from the app)

These are global tokens you should reuse rather than re-deriving:

| Token | Value | Used for |
|-------|-------|----------|
| `--radius-sm` | `4px` | Small controls — icon buttons, tree items, tags |
| `--radius-md` | `6px` | Default — buttons, inputs, cards, panels |
| `--radius-lg` | `10px` | Large surfaces — modals, dropzones, chat bubbles |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Cards on hover — barely there |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` | Dropdowns, popovers, PDF page |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | Larger floating panels |
| `--shadow-xl` | `0 12px 48px rgba(0,0,0,0.16)` | Modals |
| `--transition` | `150ms ease` | Hovers, focus, panel toggles |

### 3.3 Layout

The Corporate Library is an **app shell**, not a centered page: a fixed-width sidebar, a flexible main
column, and an optional right-hand panel (AI chat). It fills the viewport (`height: 100vh`) and the
inner regions scroll independently.

| Item | Value (from the app) |
|------|----------------------|
| Sidebar width | `--sidebar-width: 260px` (collapsible to 0) |
| Right panel (AI chat) | `--chat-width: 380px` (resizable) |
| Top bar height | `52px` |
| Content side padding | `32px` (content area), `24px` (header/topbar) |
| Reading width for long text/reports | keep a comfortable measure (~`720–800px`); don't run prose the full width of a wide monitor |

**Layout rules**
- **App-shell tools** (dashboards, internal apps): use the sidebar + main + optional right-panel pattern.
- **Document/report content** inside the main column should be width-constrained for readability — don't
  stretch paragraphs or report tables edge-to-edge on a 27" monitor.
- **Breathing room around everything.** Give buttons, inputs, and cards padding — never let text touch an edge.
- **Group related things, separate unrelated things** using space, not just lines/boxes.

### 3.4 Responsive breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | < 640px | Single column, collapse the sidebar, larger tap targets |
| Tablet | 640–1024px | 1–2 columns; sidebar may overlay |
| Desktop | > 1024px | Full app-shell layout |

> Most of our internal tools are used on desktop, but owner/tenant-facing pages **will** be opened on
> phones. Design desktop-first, but always check the mobile view before shipping anything external.

---

## 4. Components

These are the reusable building blocks. Define them once here; reuse the same rules everywhere so a
button in the Report parser looks identical to a button in the Corporate Library.

### 4.1 Buttons

The app's base `.btn`: `padding: 7px 14px`, `border-radius: var(--radius-md)`, `font-size: 13px`,
`font-weight: 500`, `1px` border, `gap: 6px` for an optional icon.

| Variant | Background | Text / border | When to use |
|---------|-----------|---------------|-------------|
| **Primary** | `--btn-primary-bg` (near-black `#1a1a19`) | white | The main action ("Save", "Upload"). One per screen ideally. Hover → `--btn-primary-bg-hover`. |
| **Secondary** | `--bg` (white) | `--text-primary`, `1px --border` | Less important actions ("Cancel"). Hover → `--bg-tertiary`. |
| **Danger** | `--bg` (white) | `--danger` text, `--border` | Destructive actions. Hover → `--danger-light` background + `--danger` border. (Note: *not* a solid red button — danger is signalled by red text + a red hover.) |
| **Accent / "AI"** | `--accent` (blue) | white | Special accent actions like "Focus for AI". Hover → `--accent-hover`. |
| **Icon button** | transparent | `--text-tertiary` | 28×28 square, `--radius-sm`. Hover → `--bg-hover` + `--text-primary`. |

**Button rules**
- **Primary is near-black, not blue.** Blue (`--accent`) is reserved for links, focus, and AI affordances.
  This is the app's signature — a quiet UI with a single dark primary action.
- **Corner radius:** `--radius-md` (`6px`) on standard buttons; `--radius-sm` (`4px`) on icon buttons.
- **States:** every button needs a visible **hover**, **active** (pressed), **disabled**
  (`opacity: 0.4; cursor: not-allowed`), and **focus** (keyboard ring — see §8).
- **Label text:** use clear verbs — "Download CSV", not "OK" or "Submit".
- **One primary per view.** If everything is bold and dark, nothing stands out.

### 4.2 Forms & Inputs

- **Labels above inputs**, always visible. The app styles them as `11–12px`, `600`, **UPPERCASE**,
  `letter-spacing: ~0.03em`, color `--text-secondary` — small, quiet, and consistent.
- **Input:** `padding: 8px 12px`, `1px solid --border`, `--radius-md`, background `--bg`,
  `font-size: 14px`. Placeholder uses `--text-tertiary`.
- **Focus state (signature):** border turns `--accent` **and** a soft glow ring appears —
  `box-shadow: 0 0 0 3px var(--accent-light)`. Use this exact ring everywhere for consistency.
- **Error state:** red border + a short message *below* the field in `--danger`, explaining the fix
  ("Enter a valid date"). Never just turn it red with no explanation.
- **Required fields:** mark them clearly (asterisk `*` or the word "required").
- **Help text:** small `--text-tertiary` text under the field for hints/format examples.
- **Inline notices:** for read-only or contextual info inside a form, use the app's `.form-notice`
  pattern — a soft `--bg-hover` panel with an icon; the warning variant uses an amber tint.

### 4.3 Tables & Lists (critical for us — we live in financial data)

The app renders lists as CSS grids with a styled header row:

- **Header row:** `--bg-tertiary` background, text `11px`, `600`, **UPPERCASE**,
  `letter-spacing: 0.04em`, color `--text-tertiary`. Make it **sticky** on scroll for long tables.
- **Rows:** separated by `1px solid --border-light`; hover background `--bg-hover`; comfortable
  vertical padding (`10px`+). Don't cram.
- **Right-align numbers/currency**, left-align text, and use `tabular-nums` so decimals line up.
- **Row actions** (edit/delete) appear on hover (`opacity: 0` → `1`) so the row stays calm at rest.
- **Totals row:** make it visually distinct (bold + a top border) so it's obviously a sum.
- **Empty state:** if there's no data, say so ("No transactions for this period") — never a blank box. See §4.10.
- **Big tables:** see §4.9 for sorting, pagination, and search.

### 4.4 Cards / Panels

- Background `--bg`, `1px solid --border-light`, `--radius-md`, padding `12–16px`.
- **Hover** (for clickable cards): border brightens to `--border` and add `--shadow-sm`.
  Heavy shadows look dated — keep it subtle.
- Use cards to group one idea each (one document, one report summary, one metric).

### 4.5 Alerts / Notifications / Badges & Status Chips

| Type | Text / Background | Example |
|------|-------------------|---------|
| Success | `#1a7a3a` on `#e3f5e6` | "Report generated successfully" |
| Warning | `#8b6a00` on `#fdf3da` | "3 properties missing data" |
| Error | `#b3261e` on `#fceae8` (icon/border `--danger`) | "Upload failed — file too large" |
| Info | `#1858b8` on `#e6efff` (or `--accent` family) | "Data last synced 2 hours ago" |

- **Status chips (the app's signature pattern):** a small rounded pill containing a **colored dot +
  a label** — e.g. ● Approved, ● Draft, ● Rejected. The dot + word means status is **never conveyed
  by color alone** (an accessibility rule we actually follow in code — see `StatusChip.jsx`).
- **Governance/badge tints:** master → `--accent-light`/`--accent-hover`; restricted →
  `--danger-light`/`--danger`; working → `#fff3df`/`#9a6300`.
- **Toasts** (transient confirmations): fixed, **bottom-center**, near-black background
  (`--text-primary`), white text, `~8px` radius, slide-in ~180ms, auto-dismiss. Error toasts use
  `--danger` as the background. Don't put a *critical* error in a toast that disappears before it's read.
- **Inline vs. toast:** use an **inline** alert for things tied to a spot on screen (a form error); use
  a **toast** for "it worked" confirmations after an action.

### 4.6 Navigation

| Item | Value (from the app) |
|------|----------------------|
| Primary nav location | **Left sidebar** (`--sidebar-width: 260px`), collapsible. Logo + brand at the top. |
| Section labels | `11px`, `600`, UPPERCASE, `letter-spacing: 0.05em`, `--text-tertiary` |
| Item (resting) | `13px`, `--text-secondary`, `--radius-sm` |
| Item (hover) | background `--bg-hover`, text `--text-primary` |
| Item (active/selected) | background `--bg-active`, text `--text-primary`, `font-weight: 500` |
| Breadcrumbs | in the `52px` top bar; current crumb is `--text-primary`/500, others `--text-tertiary` |

### 4.7 Modals & Dialogs

A modal is a box that opens on top of the page and dims everything behind it, forcing one focused decision.
The app's modal recipe:

- **Overlay (scrim):** `rgba(0,0,0,0.3)` + `backdrop-filter: blur(2px)`, fading in over `150ms`.
- **The modal:** background `--bg`, `--radius-lg`, `--shadow-xl`, centered, slides up `200ms`.
  Sizes: small `400px`, default `520px`, medium `580px`; large doc views go near-fullscreen.
- **Header:** serif title at `18px`/`600`, with an `X` close button.
- **Footer:** actions **right-aligned** (`justify-content: flex-end`), primary on the right, "Cancel"
  to its left, separated from the body by a `1px --border-light` top rule.
- **Closing:** clicking the overlay, the `X`, or pressing `Esc` all close it — **except** destructive
  confirmations, which require an explicit button press.
- **Destructive confirmations:** the app shows a red icon chip (`--danger-light` background,
  `--danger` icon), names the exact thing being deleted, and uses the **Danger** action. Never make the
  dangerous action the default/auto-focused one.
- **Accessibility:** trap keyboard focus inside the modal while open, and return focus to the button that
  opened it on close (see §8). Layer it with the z-index scale (§12).

### 4.8 File Upload (AppFolio / Yardi / MRI imports)

We import exports constantly, so this needs to be solid. The app's `.upload-dropzone`:

- **Drag-and-drop zone:** `2px dashed --border`, `--radius-lg`, generous padding, `--bg-secondary`
  background, with a click-to-browse fallback (some people won't drag).
- **Drag-over / hover state:** border turns `--accent`, background `--accent-light`.
  *(Implementation note from the app: set `pointer-events: none` on the dropzone's children so the
  zone itself is always the drop target — otherwise drag-over flickers and drops get missed.)*
- **State it accepts:** show the allowed formats (`.csv`, `.xlsx`) and the max file size up front.
- **States to design:** idle → dragging-over → uploading (with progress) → success → error.
- **Validate and explain:** if the file is the wrong type, too big, or missing expected columns, say
  *exactly* what's wrong ("This CSV is missing a 'Property' column"). A generic "Upload failed" wastes time.
- **After selecting:** show the filename + size with a way to remove/replace before submitting.

### 4.9 Pagination, Sorting & Large Tables

- **Don't render 5,000 rows at once** — it's slow and unreadable. Paginate and show a count:
  "Showing 1–50 of 1,240".
- **Sortable columns:** clicking a header sorts by it; show an arrow for the current sort direction.
- **Search / filter:** for any list longer than ~25 rows, give a search box or filters. (The app's
  top-bar search is `280px`, with the same focus ring as inputs.)
- **Sticky header** so column labels stay visible while scrolling a long list.

### 4.10 Loading, Empty & Error States

Every screen that loads or shows data needs all three designed — not just the happy path.

- **Loading:** for content, prefer a **skeleton** (gray placeholder shapes) over a spinner — it feels
  faster. Use a spinner for button actions. Show it for anything over ~300ms.
- **Empty:** explain *why* it's empty and offer the next step — "No reports yet. **Generate your first
  report.**" The app has a dedicated `.empty-state` for exactly this. Never a blank screen that looks broken.
- **Error:** a friendly message + a **Retry** button. Never show a raw error/stack trace to a user — log
  the technical detail, show them plain language.

---

## 5. Data Visualization & Charts

We build financial dashboards, so charts are part of the brand. Consistency here is what makes a
dashboard feel trustworthy.

- **Charting approach:** the Corporate Library uses **dependency-free, hand-rolled SVG charts**
  (bar / line / pie) — *no* npm charting library. Why: it keeps the bundle small and avoids a
  supply-chain surface (extra third-party code that could break or be compromised). For simple snapshot
  charts, copy that approach. Only reach for a library (e.g. Recharts) if you genuinely need heavy,
  interactive dashboards — and if you do, flag it as a new dependency first (per our `CLAUDE.md` rules).
- **Chart color sequence** (the app's ordered `PALETTE` — 1st series is always the first color, etc.):

  | # | Color | Hex |
  |---|-------|-----|
  | 1 | Blue (accent) | `#2383e2` |
  | 2 | Green | `#6aa84f` |
  | 3 | Amber | `#e2a423` |
  | 4 | Red | `#cc3333` |
  | 5 | Purple | `#7b5ea7` |
  | 6 | Teal | `#3aa0a0` |

- **Same thing = same color, everywhere.** If "Vacancy" is amber on one chart, it's amber on all of them.
- **Pick the right chart:** lines for trends over time, bars for comparing categories, a single number
  ("KPI card") for one headline figure. **Avoid pie charts with many slices and anything 3D.**
- **Always label** axes and include units ($, %, units). Axis labels in the app use `--text-tertiary`.
- **Limit series** to ~5–7 (the palette has 6). Beyond that, group the small ones into "Other."
- **Positive vs. negative** uses success/danger colors **and** a `+`/`−` sign — never color alone (§2.2, §8).
- **When exact numbers matter, use a table, not a chart.** For us they usually do — a chart is for the
  *trend*, the table is for the *audit*. Often you want both.

---

## 6. Iconography & Imagery

- **Icon set:** the Corporate Library uses **inline SVG icons drawn in a clean, single-weight line style**
  (Lucide-like), with *no* icon-library dependency. If you'd rather not hand-draw icons, **Lucide** is the
  closest free match to the existing style — pick ONE set and use only it. Mixing icon styles looks unprofessional.
- **Icon size:** `~16px` default in dense app chrome (toolbars, list rows); scale up for empty-state or
  hero icons. Align icons vertically with adjacent text and color them `--text-tertiary` at rest.
- **Don't decorate for the sake of it** — icons should aid recognition, not clutter.
- **Photography/illustration style:** N/A for internal tools.

---

## 7. Motion & Interaction

- **Keep it fast and subtle.** The app's default is `--transition: 150ms ease` for hovers, focus, and
  panel toggles. Modals fade the overlay (`150ms`) and slide the panel up (`200ms`); the big document
  modal uses `250ms cubic-bezier(0.16, 1, 0.3, 1)`. Anything slower feels sluggish on a tool people use all day.
- **Animate purposefully** — to show something appeared, moved, or loaded. Not for decoration.
- **Loading states:** see §4.10. Never leave the user staring at a frozen screen.
- **Respect reduced motion:** honor the user's "reduce motion" setting (`prefers-reduced-motion`).

---

## 8. Accessibility (a11y) — baseline requirements

These aren't optional niceties; owner- and tenant-facing tools especially need them.

- **Color contrast** meets WCAG AA (4.5:1 for body text) — see §2.2.
- **Focus is visible.** The app's pattern is to replace the default outline with the **accent glow ring**
  (`box-shadow: 0 0 0 3px var(--accent-light)` + `--accent` border) on inputs, and a `2px solid --accent`
  outline on custom controls. ⚠️ Never just `outline: none` with nothing to replace it — that strands
  keyboard users.
- **Keyboard navigation:** every interactive element reachable by Tab, with that visible focus indicator.
- **Labels:** every input has a real `<label>`; every icon-only button has accessible text (`aria-label`).
- **Don't rely on color alone** — our status chips pair color with a dot **and** a word (§4.5). Follow that.
- **Text resizes** without breaking layout (use `rem` for font sizes on external pages).
- **Alt text** on meaningful images; empty alt on decorative ones.
- **Modals** trap focus while open and return it on close (§4.7).

---

## 9. Data Formatting Standards

We're a financial-reporting shop. How numbers and dates are *formatted* is part of the brand and a
common source of embarrassing inconsistency. Pick one rule for each and enforce it everywhere.

| What | Rule | Notes |
|------|------|-------|
| Currency | `$1,250.00` | Symbol, thousands separators, always 2 decimals |
| **Negative money** | `($1,250.00)` in `--danger`, **or** `-$1,250.00` | **PICK ONE.** Accountants expect parentheses; pick the one your owners expect and never mix |
| Zero vs. missing | `$0.00` means zero; `—` means "no data" | These are different facts — don't show one when you mean the other |
| Percentages | `12.5%` | Decide decimal places and keep them consistent |
| Large numbers | `1,234,567` (always separators) | On dashboards, `1.2M` / `45K` is OK for headline figures only |
| Dates | `Jun 24, 2026` | One format across all tools |
| Date ranges / periods | `May 2026` for a report month | |
| Relative time | "2 hours ago" only for recency (last synced), never for financial dates | |
| Rounding | Round at display only, keep 2 decimals | **Never let rounding make a column not add up to its total** |
| Units | Always labeled — `1,200 sq ft`, `24 units`, `3.5%` | A bare number is ambiguous |
| Number alignment | `font-variant-numeric: tabular-nums`, right-aligned | So decimals line up in tables (§2.3, §4.3) |

---

## 10. UI Voice & Copy

How our software *talks* is part of the brand too.

- **Tone:** clear, professional, plain-spoken. Calm and helpful — not cute, not jargon-y.
- **Be plain.** "Download the report" beats "Initiate report extraction."
- **Buttons = verbs** ("Save", "Export", "Delete").
- **Errors are helpful, not scary:** say what went wrong AND how to fix it (§4.10).
- **Numbers, money & dates:** follow the formatting standards in §9 — every screen, every report.

---

## 11. Print / PDF Export

We produce monthly property reports that get printed and emailed as PDFs. The screen layout is *not*
the print layout — design the print version on purpose. The Corporate Library ships a `print.css` you
can model on:

- **Print stylesheet** (`@media print`): hide nav, sidebars, toolbars, toasts, and buttons; switch to
  black text on a white background to save ink and improve readability.
- **Page breaks:** use `break-inside: avoid` (and `page-break-inside: avoid`) on sections, table rows,
  and charts so they don't get split across two pages. Use `break-after: avoid` to keep a heading with
  its content.
- **Strip raw URLs:** the app sets `a[href]::after { content: '' }` so links don't print their URLs.
- **Report header & footer:** every printed page should carry the **logo + property name + reporting
  period** at the top, and **page numbers + "Generated [date]"** at the bottom.
- **Paper fit:** target US **Letter** (8.5×11") with comfortable margins; check it actually fits before sending.
- **Readable in black & white:** don't rely on color to tell "paid" from "overdue" in a printed report
  (ties back to §2.2, §4.5). Use the dot + label.

---

## 12. Implementation: Design Tokens in Code

So the rules above actually get used, put them in code as **CSS variables** (named values you define
once and reuse). This block is copied from the Corporate Library's `:root` in `src/styles.css` — drop it
in a shared `tokens.css` and import it into every project. **These are the real values, not placeholders.**

```css
/* tokens.css — the single source of truth for design values.
   Copied from the AGM Corporate Library (src/styles.css).
   Change a value here and it updates across the whole app. */
:root {
  /* Surfaces & backgrounds */
  --bg:            #ffffff;
  --bg-secondary:  #fbfbfa;
  --bg-tertiary:   #f7f6f3;
  --bg-hover:      #f1f1ef;
  --bg-active:     #ededeb;

  /* Borders */
  --border:        #e8e7e4;
  --border-light:  #eeeeec;

  /* Text */
  --text-primary:   #1a1a19;
  --text-secondary: #6b6b6a;
  --text-tertiary:  #9b9b99;

  /* Accent (interactive blue) */
  --accent:        #2383e2;
  --accent-light:  #e8f0fe;
  --accent-hover:  #1b6ec2;

  /* Primary-button surface — a role token so it doesn't invert across themes */
  --btn-primary-bg:       var(--text-primary);
  --btn-primary-bg-hover: #333;

  /* Danger */
  --danger:        #cc3333;
  --danger-light:  #ffeaea;

  /* Fonts */
  --font-display:  'Source Serif 4', Georgia, serif;
  --font-body:     'DM Sans', -apple-system, sans-serif;

  /* Shape */
  --radius-sm:     4px;
  --radius-md:     6px;
  --radius-lg:     10px;

  /* Elevation */
  --shadow-sm:     0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.12);
  --shadow-xl:     0 12px 48px rgba(0,0,0,0.16);

  /* Motion */
  --transition:    150ms ease;

  /* Layout */
  --sidebar-width: 260px;
  --chat-width:    380px;
}

/* ─── Dark theme — overrides the color tokens; components consume the vars ─── */
[data-theme="dark"] {
  --bg:            #1a1a19;
  --bg-secondary:  #1f1f1d;
  --bg-tertiary:   #25241f;
  --bg-hover:      #2a2a27;
  --bg-active:     #323230;
  --border:        #36342f;
  --border-light:  #2c2b27;
  --text-primary:   #ededeb;
  --text-secondary: #a6a59f;
  --text-tertiary:  #747269;
  --accent:        #4a9eea;
  --accent-light:  #1f3550;
  --accent-hover:  #6cb2f0;
  --danger:        #e57373;
  --danger-light:  #3a2424;
  --btn-primary-bg:       var(--accent);
  --btn-primary-bg-hover: var(--accent-hover);
  --shadow-sm:     0 1px 2px rgba(0,0,0,0.35);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.45);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.55);
  --shadow-xl:     0 12px 48px rgba(0,0,0,0.65);
  color-scheme: dark;
}
```

Then in your styles you reference the token, never a raw value:

```css
/* Good — uses tokens, so it stays consistent and easy to change */
.btn-primary {
  background: var(--btn-primary-bg);
  color: #fff;
  border-radius: var(--radius-md);
  padding: 7px 14px;
}
.form-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light); /* the signature focus ring */
}
```

> **Dark mode is supported.** The Corporate Library implements it with a `data-theme="dark"` attribute
> that swaps the color tokens above — which is exactly why all colors are tokens and not raw hex codes.
> If your tool needs dark mode, ship the dark `[data-theme="dark"]` block too; if it doesn't, you still
> use the same light tokens, so adding dark later is cheap.

---

## 13. Browser & Device Support

Decide what we promise to support and test against — so "it's broken" has a clear meaning.

| Context | Support target |
|---------|----------------|
| Internal tools | Latest 2 versions of **Chrome** and **Edge** on desktop (what our team uses) |
| Owner/tenant-facing pages | The above **plus** mobile **Safari (iPhone)** and **Chrome (Android)** |
| Minimum screen width | `360px` |
| Not supported | Internet Explorer (it's retired) |

**Rules**
- **Test the external stuff on a real phone** before shipping — not just by shrinking the browser window.
- **Graceful degradation:** if a fancy feature isn't supported, the page should still be usable, not blank.
- If we choose to drop support for something, write it in the "Not supported" row so it's a decision, not a surprise.

---

## 14. Asset Organization & File Naming

Where files live and what we call them. Consistency here keeps repos navigable as we grow.

**Folder layout (suggested — adjust per project)**

```
/public
  favicon.svg   ← the rounded-square document mark (see §2.1)
/src
  styles.css    ← global tokens (the :root block from §12) + component styles
/assets
  /logos        ← logo-primary.svg, logo-reversed.svg
  /images       ← photos, illustrations
tokens.css      ← the shared design tokens, if split out (see §12)
```

**Naming rules** (these match our team standard in `CLAUDE.md`)
- **Lowercase with hyphens:** `logo-primary.svg`, `rent-roll-export.png` — never `Logo_Primary.SVG` or spaces.
- **Describe the content, not the context:** `logo-reversed.svg`, not `logo-for-dark-footer.svg`.
- **File formats:** **SVG** for logos and icons; **PNG** for transparency; **JPG** for photos;
  **WebP** for smaller photos where support allows. Provide a `favicon.svg`.
- **One source of truth:** tokens live in one place (the `:root` block), shared — not copy-pasted per project.

---

## 15. Quick Checklist (run through this before shipping any screen)

- [ ] Colors come only from the tokens (§2.2, §12) — no random hex codes
- [ ] Body text passes contrast; external pages use 16px+ body (§2.3, §8)
- [ ] Headings use the serif (`--font-display`); UI/body uses the sans (`--font-body`) (§2.3)
- [ ] Spacing uses the scale (§3.1) — no random pixel values
- [ ] Buttons follow the variants; primary is near-black, not blue; states present (§4.1)
- [ ] Inputs have visible UPPERCASE labels and the accent focus ring (§4.2, §8)
- [ ] Tables right-align money with `tabular-nums` and have a clear totals row (§4.3)
- [ ] Big tables paginate, sort, and have search (§4.9)
- [ ] Loading, empty, AND error states are all designed — not just the happy path (§4.10)
- [ ] Modals trap focus, right-align footer actions, and confirm destructive actions clearly (§4.7)
- [ ] File uploads show accepted formats and explain validation errors (§4.8)
- [ ] Charts use the standard 6-color palette and label their axes/units (§5)
- [ ] Status is shown with a dot + word, not color alone (§4.5, §8)
- [ ] Keyboard focus is visible everywhere (§8)
- [ ] Numbers, money, and dates follow the formatting standards (§9)
- [ ] If it gets printed/exported, the print layout was checked (§11)
- [ ] Checked the mobile view (on a real phone) if it's owner/tenant-facing (§3.4, §13)
- [ ] Assets are named lowercase-with-hyphens and in the right folder (§14)

---

## 16. Changelog

Track changes so the team knows when a rule moved.

| Date | Change | By |
|------|--------|-----|
| `2026-06-24` | Initial template created (placeholder values) | dev team |
| `2026-06-26` | Filled in with **real** colors, fonts, tokens, and UI/UX patterns pulled from the AGM Corporate Library (`src/styles.css`): quiet near-white palette, blue accent, near-black primary buttons, Source Serif 4 + DM Sans, radius/shadow/motion tokens, status chips, modals, dropzone, SVG chart palette, dark-mode tokens. | dev team |
