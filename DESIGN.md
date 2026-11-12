---
name: Dr Diet
description: Calorie-counted, high-protein Indian meals — warm, wholesome, and genuinely delicious
colors:
  brand-green: "#414C3C"
  cream: "#F8F4EC"
  lime-accent: "#E2E573"
  muted-cream-text: "#EBE0C9"
  border-stroke: "#DACAA9"
  label: "#646464"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "'Bethany Elingston', cursive"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: "0em"
  hero:
    fontFamily: "'Bethany Elingston', cursive"
    fontSize: "clamp(2.5rem, 7.8vw, 7rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0em"
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "'Inter', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1px"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  full: "9999px"
spacing:
  gutter: "24px"
  section: "96px"
  section-sm: "64px"
components:
  button-dark:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-outline-dark:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brand-green}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  order-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-green}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
---

# Design System: Dr Diet

## Overview

**Creative North Star: "The Wholesome Kitchen"**

Dr Diet looks like the brand feels: warm, hand-made, and honest. The whole world sits on two colours — a deep olive **brand green** and a warm **cream** — with a single lime-yellow accent kept for backgrounds only. Headlines are set in a flowing handwritten script, as if chalked on a kitchen board, while everything functional is clean Inter. Food photography does the selling: real dishes on a dark slate, shot close. Nothing is loud; the craft is in the warmth, the generous spacing, and a couple of authored moments (the hero bowl that fills as you scroll, the gently drifting reels and testimonials).

The green is the single ink colour — it is every heading, every body line, every icon on cream. There is no second text colour fighting it; hierarchy comes from the script-vs-sans contrast, size, and weight, not from more hues. Depth is soft and restrained: faint shadows that lift a card on hover, never a hard edge or a neon glow.

This is a **Persuade** surface (marketing). Ambition shows as appetite and trust, not as spectacle: the work earns a subscription by looking like food you'd actually want and a brand that tells the truth about it.

**Key Characteristics:**
- Two-colour world (olive green + cream) with lime accent reserved for fills.
- Handwritten script display face against clean Inter body.
- Real, close food photography on dark slate — never stock "healthy" clichés.
- Soft, state-driven depth; rounded, friendly forms.
- One or two authored motion moments per page; everything else is quiet.

## Colors

A warm, earthy two-tone palette: olive green and cream carry the whole site, with one lime accent used only as a background.

### Primary
- **Brand Green** (`#414C3C`): the single ink colour — all headings, body text, and icons on light surfaces — and the background of the hero, footer, and dark feature sections. This is the brand.

### Secondary
- **Lime Accent** (`#E2E573`): backgrounds only — the checklist bar, stats band, the footer's bottom strip, and the primary CTA fill. Never used as a text colour.

### Neutral
- **Cream** (`#F8F4EC`): every page, section, and card background on the light side; and the text/foreground colour on green sections.
- **Muted Cream Text** (`#EBE0C9`): secondary/subtitle text **on green sections** (tinted from the surface, not greyed).
- **Border Stroke** (`#DACAA9`): the actual border colour for cards, pills, and inputs.
- **Label** (`#646464`): muted meta/secondary text on light surfaces (kept ≥4.5:1 on cream and white).
- **White** (`#FFFFFF`): meal cards and form fields that need to lift off the cream.

### Named Rules
**The One-Ink Rule.** On any surface there is exactly one text colour: brand green on light, cream on dark. Secondary text is tinted from the surface (muted cream on green, `#646464` on cream) — never a generic grey, and never a second brand hue.

**The Accent-Is-A-Fill Rule.** Lime `#E2E573` is a background, not an ink. If you're tempted to colour text or an icon lime, use weight or size instead.

## Typography

**Display Font:** Bethany Elingston (self-hosted script), with `cursive` fallback.
**Body Font:** Inter, with `sans-serif` fallback.

**Character:** A warm, hand-lettered script for every headline — informal and appetising, like a daily special written by hand — paired with Inter's neutral clarity for everything you read or operate. The contrast between the two *is* the hierarchy.

### Hierarchy
- **Hero** (400, `clamp(2.5rem, 7.8vw, 7rem)`, line-height 1): the single pinned hero headline ("Your Protein Corner").
- **Display** (400, `clamp(2rem, 4vw, 3.25rem)`, line-height 1.38): every section headline ("A Menu Full of Goodness", "Loved By Cities").
- **Title** (400, `24–30px`, script): card titles (meal cards, why-cards).
- **Body** (400, `16px`, line-height 1.6, Inter): paragraphs and descriptions; keep measure ~65–75ch.
- **Label** (500, `14px`, letter-spacing `0.1px`, Inter): pills, meta rows, button text, nav links. Uppercase only for small eyebrow labels where present.

### Named Rules
**The Script-For-Voice Rule.** Script is for headings and card titles only. The moment it's used for body copy, a label, or a button, it stops being special and becomes unreadable.

## Layout

Centered, single-column flow of full-width sections, each on its own alternating ground (cream → green → cream → lime band). Content is held in a `1320px` max-width container with a `24px` gutter (`16px` on phones). Section rhythm is `6rem` top/bottom on desktop, `4rem` on mobile. Grids are generous and even: four why-cards, three meal cards, six city cards on desktop, collapsing to 2×2 / single-column / 3-up on mobile. A fixed header (promo bar + nav, `118px` total) offsets the first viewport. The feel is roomy and unhurried — more space above a heading than below it, wide gaps between sections.

## Elevation & Depth

Soft and state-driven, never structural. Surfaces are flat at rest; a shadow appears as a **response to interaction** — a card lifts on hover, a pill fills. Food images and stickers carry a gentle drop-shadow for warmth. No hard offset shadows, no coloured halos.

### Shadow Vocabulary
- **sm** (`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`): resting lift on light cards.
- **md** (`box-shadow: 0 8px 32px rgba(0,0,0,0.10)`): hover elevation, open FAQ item.
- **lg** (`box-shadow: 0 20px 60px rgba(0,0,0,0.14)`): rare, for the most-raised surfaces.

### Named Rules
**The Flat-By-Default Rule.** Cards sit flat on their ground and gain shadow only on hover/focus/open. Depth narrates interaction; it is never decoration at rest.

## Shapes

Rounded and friendly throughout. Pills (`9999px`) for every button, tag, filter, and meta chip; `12px` for meal cards and inputs; `20px` for stat/pricing cards; `32px` for the large city cards and feature bands. Borders are hairline (`1–1.5px`) in the stroke colour — never a thick or coloured `border-left` accent. Recurring organic motif: hand-drawn **wavy SVG dividers** between sections (the hero→green transition, the "why" cards, the inner-page hero edge), echoing the hand-made voice.

## Components

### Buttons
- **Shape:** full pill (`9999px`).
- **Dark (primary):** brand-green fill, cream text, `12px 28px`. Hover darkens via `filter: brightness(0.85)`.
- **Outline-dark (secondary):** transparent/cream ground, brand-green `1.5px` border and text; fills green on hover.
- **Order pill (meal cards):** white ground, green `1px` border and text; inverts to green fill + cream text on hover.

### Chips / Filters
- **Style:** pill with `1.5px` stroke, brand-green text on transparent.
- **State:** active filter inverts to brand-green fill + cream text. Filter rows scroll horizontally and drag on mobile.

### Cards / Containers
- **Corner:** `12px` meal cards, `20px` stat/pricing, `32px` city cards.
- **Background:** white (meal cards) or cream; green on dark feature bands.
- **Shadow:** flat at rest, `sm`→`md` on hover (see Elevation).
- **Border:** hairline `1–1.5px` stroke colour, transparent until hover on meal cards.
- **Padding:** `24px` typical.

### Inputs / Fields
- **Style:** white ground, `1.5px` stroke-colour border, `12px` radius, `14px 18px` padding.
- **Focus:** border shifts to brand green (plus the global `3px` green `:focus-visible` outline for keyboard users).
- **Error:** inline message in a muted red; **Disabled:** button shows "Sending…" and is disabled.

### Navigation
- Fixed header with a scrolling lime promo bar above a cream nav row; centered logo, links left/right, a dark "Order" pill. Links are Inter `14px`; active/hover gains a `2px` green underline. On mobile it collapses to logo-left, Order + hamburger right, with a full-screen slide-in menu.

### Signature: Scroll-Filling Hero Bowl
The homepage hero is a pinned, scroll-scrubbed composition: a bowl "fills" through seven plate frames as decorative stickers travel from a landing layout to a scrolled one. On mobile it degrades to a static composition with a gentle background parallax. This is the brand's one showpiece moment — don't duplicate its ambition elsewhere.

## Do's and Don'ts

### Do:
- **Do** keep one ink per surface: brand green on light, cream on dark. Tint secondary text from the surface.
- **Do** set every heading and card title in the script face, and everything functional in Inter.
- **Do** use real, close food photography on dark slate; pull dish names, protein, and price from the menu PDF.
- **Do** reserve lime `#E2E573` for background fills (CTA, bands) only.
- **Do** keep cards flat at rest and let shadow respond to hover/focus (`sm`→`md`).
- **Do** use pills for all buttons, tags, and filters; hairline stroke-colour borders.

### Don't:
- **Don't** introduce a third brand colour, gradient text, or a grey secondary text colour.
- **Don't** set body copy, labels, or buttons in the script face.
- **Don't** use stock "healthy lifestyle" photography, invented testimonials, press, or transformation before/afters.
- **Don't** add hard offset shadows, coloured halos, or thick coloured `border-left` accents.
- **Don't** claim outlet/city counts other than the real 17 outlets / 6 cities.
