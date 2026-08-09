---
version: alpha
name: "Adyen"
website: "https://www.adyen.com"
description: >-
  An enterprise-payments brand whose marketing chrome runs on near-black canvas with a single mint-green voltage in #00d16a — used only on the CTA button, the active-state indicator dot, and the heading-emphasis underline. The hero is a wide cinematic photograph (two hands exchanging a black payment card over a darkened studio backdrop), with the headline "Fintech you can bank on" floating in white at center and a small mint pill CTA underneath. Above the headline sits the brand's signature monospace eyebrow — "INTELLIGENT MONEY MOVEMENT" — rendered in 12px AdyenMono with +0 tracking and uppercase casing, the typographic move that ties every Adyen surface together. Type runs the proprietary Adyen sans across every spoken tier at unusual variable weights (436, 452, 484, 496 — not 400/500/700) plus AdyenMono for every annotation. The radius scale collapses to one value: 6px. Everything corner-rounded on the page uses the same 6px, including the mint CTA.

seo:
  title: "Adyen Design System for React — mint #00d16a on near-black, Adyen sans + AdyenMono, 17 components"
  metaDescription: "Adyen's marketing system pairs a near-black canvas with a single mint-green voltage — proprietary Adyen sans plus AdyenMono uppercase eyebrows over cinematic photography. Tokens for React, Next.js, and AI tools."
  highlights:
    - "Single mint voltage — #00d16a appears only on the CTA pill, the active dot, and emphasis underlines; every other chromatic moment on the page is photography"
    - "Variable-axis weights — Adyen sans renders at unusual numeric weights (436, 452, 484, 496) instead of the conventional 400/500/700 ladder"
    - "AdyenMono uppercase eyebrows — 12px monospace small-caps with mint indicator dot carries every section eyebrow on the page"
    - "Single radius value — 6px is the entire shape language; the CTA, cards, image masks, and feature blocks all share one corner-radius"
    - "Near-black canvas at #001222 — a deep navy-leaning black with measurable chroma, the system's deliberate alternative to pure #000000"
  tags:
    - "Banking & Payments"
    - "Fintech & Crypto"
  lastUpdated: "2026-05-19"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    Adyen's marketing chrome holds back. The hero is a cinematic dark photograph — two hands exchanging a black payment card across a low-key studio backdrop — and the headline "Fintech you can bank on" sits as a single line of white type at center. Above it, in 12px AdyenMono uppercase with a small mint indicator dot at the leading edge, sits "INTELLIGENT MONEY MOVEMENT" — the brand's signature monospace eyebrow, the device that ties every section header on the page together. Below the headline sits a single mint pill CTA in #00d16a, "Talk to our team" in compact black type on the green fill. There is nothing else above the fold: no secondary nav cluster, no logo wall, no gradient mesh, no decorative element. Where Stripe surrounds its hero with a saturated gradient and PayPal hands the hero to wide photography of customers, Adyen restricts every chromatic moment on the page to the photograph itself.

    The DESIGN.md file packages the system into a machine-readable spec for React tooling. Inside: 13 color tokens drawn from the `--color-black-*` ladder (a 5-step structural scale from #001222 through #6c7782 to #d1d5d8) plus the single mint voltage; 9 typography tokens running the proprietary Adyen sans at unusual numeric weights (436, 452, 484, 496) and AdyenMono at 12px uppercase for every annotation, eyebrow, and small-caps label; 2 corner-radius tokens — 6px appears 64 times and is the entire rounded shape language on the page; 8 spacing tokens on a 24px / 1.5rem base; and 17 component definitions covering the mint CTA, the dark hero band, the white-card carousel, the navy-on-near-black "Control every aspect" promo block, the photographic-mask asset cell, and the mono-eyebrow strip.

    Feed this file to an AI coding tool and it reproduces Adyen's specific moves: near-black canvas at the navy-leaning #001222 rather than pure black, single mint voltage held back to a CTA + indicator + emphasis-underline only, AdyenMono uppercase eyebrow strip on every section, the unusual variable-axis weights that read close to 500 but not quite, and the single 6px radius across every corner-rounded surface. One caveat: the canvas is dark in the hero but the body inverts to white below the fold, and the system asks for both surface modes on the same page — verify your dark-to-light section transitions explicitly rather than assuming Adyen's chrome is uniformly dark.
  related:
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "https://www.adyen.com"
      title: "Adyen — official site"
      description: "Adyen's public marketing site — the source of truth for the live tokens captured in this file."
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files — the format this page is built on."
  questions:
    - id: "primary-color"
      title: "What is Adyen's primary brand color?"
      answer: "Adyen's brand voltage is a saturated mint green wired into CSS as --active-primary, --color-green, and --color-green-900. Across the captured page the mint appears 9 times total — 5 as background, 2 as text, 2 as border — almost all of them on the single primary CTA, the mint indicator dot that leads each AdyenMono eyebrow strip, and the active-state underline beneath certain heading words. Every other color visible above the fold belongs to the photographic hero, not the brand chrome. This restraint is the brand signature: one scarce mint green, one near-black canvas, one inversion to white below the fold, photography for everything else."
    - id: "typography"
      title: "What typeface does Adyen use, and what should I use as a substitute?"
      answer: "Adyen runs two proprietary families: Adyen (a humanist sans) for every display, heading, body, button, and nav surface, plus AdyenMono for every uppercase eyebrow, small-caps label, and annotation. Display headlines sit at 32–80px, the hero h2 at 64px / weight 452 / +0 letter-spacing, body at 16-20px / weight 484-496 — unusual variable-axis weights that read close to but not exactly 500. AdyenMono eyebrows sit at 12px / weight 500 / uppercase / +0 tracking. Inter Variable at the same numeric weights is the closest open-source substitute for Adyen sans; JetBrains Mono at 12px uppercase substitutes for AdyenMono. The variable-axis weights are the move to preserve — don't snap them to 400/500/700."
    - id: "near-black"
      title: "Why is Adyen's canvas not pure black?"
      answer: "The dark canvas is #001222, wired as --color-black-3200, --main-solid, and --color-black. It is a navy-leaning near-black with measurable chroma (OKLCH lightness 0.176, chroma 0.043) rather than pure #000000. The choice softens the contrast against white headline text and signals warmth in cinematic photography — pure black would crush the shadow detail in the captured hero image and create a harder edge on the mint CTA's drop shadow. The same #001222 carries text on the white-canvas sections below the fold, so the brand uses one near-black token for both background-on-light and background-on-dark inversion. The dark gradient overlays use a translucent black at roughly 45% alpha, kept separate from the canvas value."
    - id: "radius-scale"
      title: "What is Adyen's corner-radius philosophy?"
      answer: "Adyen runs a single-value radius scale. The 6px radius appears 64 times in the captured page — on the mint CTA, the white-card carousel, the photographic-mask asset cells, the secondary segment buttons, and the feature-cards block. A second 5px value appears 3 times (effectively a sub-pixel variant). There is no 8px, 12px, 16px, or 24px tier. Even the round photographic asset masks are square containers with 6px rounded corners rather than oval / circular shapes. The result is that every corner-rounded surface on the page reads as the same shape — the consistency is the entire shape language."
    - id: "use-in-project"
      title: "Can I use this DESIGN.md to build my own React enterprise-payments marketing site?"
      answer: "Yes — the file is designed to be fed into Claude, Cursor, or any AI tool that reads structured design tokens. The agent will reproduce Adyen's specific moves: near-black #001222 canvas instead of pure black, single mint voltage held back to the CTA and indicator dot only, AdyenMono uppercase eyebrow strip with mint indicator dot, unusual variable-axis numeric weights for the Adyen sans tier, and 6px-everywhere radius. Tokens resolve cleanly: every hex, font name, radius, and spacing value is a quoted scalar you can paste into Tailwind config or CSS custom properties. One caveat: the restraint above the fold (no decorative chrome, no logo wall, no gradient) only works when paired with photography this strong — for a brand without comparable cinematic imagery, the discipline reads as emptiness rather than confidence."

mockups:
  - "marketing-hero"
  - "dashboard-card-grid"

colors:
  primary: "#00d16a"
  canvas: "#ffffff"
  canvas-dark: "#001222"
  surface-1: "#0d1e2e"
  surface-2: "#1a2b3b"
  surface-3: "#2f3e4d"
  surface-light: "#f4f5f6"
  surface-sand: "#e6e4e2"
  ink: "#001222"
  ink-soft: "#5c6874"
  ink-muted: "#6c7782"
  ink-tertiary: "#8c959d"
  hairline: "#d1d5d8"
  shadow: "#000000"

typography:
  display-xl:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 80px
    fontWeight: 436
    lineHeight: 81.6px
    letterSpacing: 0
  display-lg:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 64px
    fontWeight: 452
    lineHeight: 65.28px
    letterSpacing: 0
  display-md:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 484
    lineHeight: 37.76px
    letterSpacing: 0
  heading-md:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 496
    lineHeight: 26px
    letterSpacing: 0
  body-md:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 21.44px
    letterSpacing: 0
  body-sm:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 21.44px
    letterSpacing: 0
  button-md:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 16.5626px
    fontWeight: 400
    lineHeight: 26.5626px
    letterSpacing: 0
  mono-eyebrow:
    fontFamily: "AdyenMono, monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 13.44px
    letterSpacing: 0
  nav-link:
    fontFamily: "Adyen, Helvetica, Arial, sans-serif"
    fontSize: 16.5626px
    fontWeight: 400
    lineHeight: 26.5626px
    letterSpacing: 0

rounded:
  none: "0px"
  sm: "5px"
  md: "6px"

spacing:
  xs: "6px"
  sm: "8px"
  base: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "72px"
  3xl: "240px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "0px 16px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px"
    height: "35px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px"
    height: "35px"
  top-nav:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.none}"
    padding: "9px 24px"
    height: "60px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.md}"
    padding: "12px"
    height: "35px"
  hero-band:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.canvas}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: "240px 0px"
  hero-heading:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.display-lg}"
  section-heading:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
  display-headline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
  body-paragraph:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.heading-md}"
  body-paragraph-muted:
    backgroundColor: "transparent"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.body-md}"
  mono-eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.mono-eyebrow}"
    padding: "0"
  indicator-dot:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    height: "8px"
  promo-band:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.canvas}"
    typography: "{typography.display-md}"
    rounded: "{rounded.none}"
    padding: "240px 0px"
  asset-card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.md}"
    padding: "24px"
  photo-mask:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.canvas}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.md}"
    padding: "24px"
  use-case-row:
    backgroundColor: "transparent"
    textColor: "{colors.canvas}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.none}"
    padding: "24px 0px"
    borderColor: "{colors.surface-3}"
  footer:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "72px 24px"
---

## Overview

Adyen's marketing chrome holds back where enterprise fintechs typically pile on. **Restraint as voltage**: the hero is a single dark cinematic photograph (two hands exchanging a black payment card across a low-key studio backdrop), with the headline "Fintech you can bank on" floating in white at center and a small mint pill CTA underneath. Above the headline sits a 12px AdyenMono uppercase eyebrow — "INTELLIGENT MONEY MOVEMENT" with a mint indicator dot at the leading edge — the signature device that ties every section header on the page together. Where Stripe surrounds its hero with a saturated indigo gradient mesh and Cloudflare hands its hero to a full-bleed orange canvas, Adyen restricts every chromatic moment above the fold to the photograph itself. The single brand color, mint green `{colors.primary}` (#00d16a), appears 9 times in the captured page — 5 backgrounds, 2 text occurrences, 2 borders — almost all of them on the CTA and its leading indicator dot.

The near-black canvas (`{colors.canvas-dark}` — #001222) is the brand's second deliberate move. Wired into CSS as `--color-black-3200`, `--main-solid`, and `--color-black`, the value is a navy-leaning near-black with measurable chroma (OKLCH lightness 0.176, chroma 0.043) rather than pure #000000. The same `#001222` carries text on the white-canvas sections below the fold — Adyen uses one near-black token for both background-on-light and background-on-dark inversion, which gives the entire page a unified neutral tone whether a band sits in dark or light mode.

Typography is the system's load-bearing signature. The proprietary **Adyen** sans renders at unusual variable-axis weights — 436, 452, 484, 496 — not the conventional 400 / 500 / 700 ladder. The hero h2 at 64px / weight 452 reads close to a regular weight but not quite; the section h3 at 32px / weight 484 reads close to medium but not quite. The variable-axis precision is the brand's typographic confidence move. **AdyenMono** at 12px / weight 500 / uppercase / +0 letter-spacing handles every eyebrow, small-caps label, and annotation; it is the only typeface allowed to carry an uppercase moment on the page.

**Key Characteristics:**
- Single mint voltage (`{colors.primary}` — #00d16a) reserved for the CTA pill, the eyebrow indicator dot, and emphasis underlines; total 9 occurrences across the captured page.
- Near-black canvas (`{colors.canvas-dark}` — #001222), a navy-leaning value with measurable chroma — wired as `--main-solid` and shared with the primary ink color on white-canvas sections.
- AdyenMono uppercase eyebrow strip — 12px monospace small-caps with a mint indicator dot leading each section's header, the device that organizes the entire page hierarchy.
- Variable-axis Adyen sans weights at 436 / 452 / 484 / 496 — unusual numeric values rather than the standard 400 / 500 / 700 ladder.
- Single 6px corner radius — appears 64 times in the captured page and is the entire rounded shape language. No 8 / 12 / 16 / 24px tier.
- 24px / 1.5rem base spacing unit — exposed as `--base-spacing` and used as the building block for `--spacing-2xl` (96px), `--spacing-3xl` (120px), `--spacing-4xl` (144px) etc.
- Dark-to-light band rhythm — hero on `{colors.canvas-dark}`, body inverts to white, then a second `{colors.canvas-dark}` promo block ("Control every aspect of your money") below the fold.
- Zero decorative chrome above the fold — no logo wall, no gradient mesh, no atmospheric texture, no secondary CTA. The photograph carries the entire visual load.

## Colors

### Brand

- **Mint Voltage** (`{colors.primary}` — #00d16a): frequency 9. Used as text (2), bg (5), border (2). Wired as `--active-primary`, `--color-green`, and `--color-green-900`. The single brand color — primary CTA fill, eyebrow indicator dot, emphasis underline. Outside these three contexts the mint does not appear.

### Surface (Dark)

- **Canvas Dark** (`{colors.canvas-dark}` — #001222): frequency 745 — used as text (364), border (363), background (17), gradient (1). Wired as `--main-solid`, `--color-black-3200`, and `--color-black`. The dominant tone in the entire system — carries the hero background, the second promo band, and the primary text on white-canvas sections. Navy-leaning rather than pure black.
- **Surface 1** (`{colors.surface-1}` — #0d1e2e): frequency 1 — bg. Wired as `--color-black-3000`. The slightly-lighter dark used as the gradient overlay underneath the hero photograph.
- **Surface 2** (`{colors.surface-2}` — #1a2b3b): wired as `--color-black-2800`. Reserved for elevated dark cards in product surfaces; not rendered above the fold.
- **Surface 3** (`{colors.surface-3}` — #2f3e4d): frequency 3 (all bg). Wired as `--color-black-2500`. The horizontal-rule divider tone between use-case rows on the dark promo band.

### Surface (Light)

- **Canvas** (`{colors.canvas}` — #ffffff): frequency 652 — text (316), border (316), bg (20). The body floor below the dark hero. Wired as `--main-surface`, `--color-white`, and `--color-black-000`.
- **Surface Light** (`{colors.surface-light}` — #f4f5f6): frequency 5 (all bg). Wired as `--color-black-100` and `--color-grey`. The card surface for the white-band carousel ("Compliance you can trust" / "Enterprise-grade reliability").
- **Surface Sand** (`{colors.surface-sand}` — #e6e4e2): frequency 6 (all bg). Wired as `--color-sand-300` and `--color-black-200`. A warmer off-white used for the second carousel card surface — the warmth provides a subtle horizontal-band differentiation against `{colors.surface-light}`.

### Text

- **Ink** (`{colors.ink}` — #001222): doubles with `{colors.canvas-dark}` — the brand uses one near-black token for both surface and text. The section h2 "Run your business with confidence" on the white band renders in this exact value.
- **Ink Soft** (`{colors.ink-soft}` — #5c6874): wired as `--color-black-1900`. A secondary text tone used inside body paragraphs where ink would feel too heavy.
- **Ink Muted** (`{colors.ink-muted}` — #6c7782): frequency 35 — text (20), border (15). Wired as `--color-black-1700`. The body-paragraph muted tone for sub-labels and feature captions. Carries the lead paragraph "Adyen delivers the control, reliability, and expertise" below the white-band section heading.
- **Ink Tertiary** (`{colors.ink-tertiary}` — #8c959d): frequency 4 — text (2), border (2). Wired as `--color-black-1300`. Tertiary captions and footer-link tones.

### Hairline

- **Hairline** (`{colors.hairline}` — #d1d5d8): frequency 6 (all border). Wired as `--color-black-500`. The only border tone in the captured surface — used for the carousel-card outlines and the horizontal rules separating use-case rows on the dark promo band (where it appears at low opacity).

### Shadow

- **Shadow** (`{colors.shadow}` — #000000): frequency 20 — text (7), bg (6), border (7). Wired as `--overlay-medium` (pure black at roughly 45% alpha) and `--tw-gradient-*`. The system uses pure black (not the navy-leaning canvas-dark) for shadow ink and overlay scrims — pure black at fractional opacity carries the gradient overlay that softens the bottom edge of the hero photograph.

## Typography

### Font Families

The system runs two proprietary families: **Adyen** (a humanist variable-axis sans) for every spoken surface (display, heading, body, button, nav) and **AdyenMono** (a proprietary monospace) for every annotated surface (uppercase eyebrows, small-caps labels, footnote captions). Fallbacks walk to `Helvetica, Arial, sans-serif` and `monospace` respectively.

The pairing is the brand's typographic signature. The Adyen sans handles spoken text at unusual variable-axis numeric weights (436, 452, 484, 496) — values that read close to but not exactly the conventional 400/500/700 tiers, suggesting the typeface was tuned to specific optical sizes rather than snapping to integer steps. AdyenMono carries every eyebrow strip and indicator label across the entire page, the device that organizes the section hierarchy.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80px | 436 | 81.6px | 0 | Largest display moments (below-fold splash) |
| `{typography.display-lg}` | 64px | 452 | 65.28px | 0 | Hero h2 ("If you're building for scale…") |
| `{typography.display-md}` | 32px | 484 | 37.76px | 0 | Section h2 ("Run your business with confidence.") |
| `{typography.heading-md}` | 20px | 496 | 26px | 0 | Sub-heading / lead paragraph |
| `{typography.body-md}` | 16px | 500 | 21.44px | 0 | Default body running text |
| `{typography.body-sm}` | 16px | 400 | 21.44px | 0 | Secondary body, mid-page captions |
| `{typography.button-md}` | 16.5626px | 400 | 26.5626px | 0 | Primary CTA labels |
| `{typography.mono-eyebrow}` | 12px | 500 | 13.44px | 0 | Uppercase eyebrow strip ("INTELLIGENT MONEY MOVEMENT") |
| `{typography.nav-link}` | 16.5626px | 400 | 26.5626px | 0 | Top-nav link labels |

### Principles

Display weight stays in the 436–496 range across every tier. The hero h2 at 64px / 452 is the loudest typographic moment — confidence through size and contrast rather than weight. There is no 700+ tier anywhere on the page. The variable-axis precision (436 instead of 400, 484 instead of 500) suggests typography tuned by visual rendering rather than by conventional weight steps.

AdyenMono carries the labor a label / caption tier would normally do. There are no uppercase-tracked sans labels in the system; the small-caps / annotation duty falls entirely to AdyenMono at 12px / weight 500 / +0 letter-spacing / uppercase casing. Each eyebrow strip leads with a mint indicator dot — the device organizes every section header on the page.

### Note on Font Substitutes

Adyen sans and AdyenMono are proprietary. **Inter Variable** at the same numeric weights is the closest open-source substitute for Adyen sans — Inter's variable axis accepts arbitrary values between 100 and 900, so you can set `font-weight: 484` directly. For AdyenMono, **JetBrains Mono** or **IBM Plex Mono** at 12px / weight 500 / uppercase with letter-spacing: 0 carry the same visual role. Don't snap the Adyen sans weights to 400/500/700 — the unusual variable-axis precision is the move worth preserving.

## Layout

### Spacing System

- **Base unit:** 24px / 1.5rem — exposed as `--base-spacing` and the building block for every multiplicative spacing value in the system.
- **Tokens:** `{spacing.xs}` 6px · `{spacing.sm}` 8px · `{spacing.base}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 48px · `{spacing.2xl}` 72px · `{spacing.3xl}` 240px.
- **Section padding (vertical):** 240px between the hero band and the next section, 72px on body bands below the fold — the spacing is unusually generous and signals confidence.
- **Card internal padding:** `{spacing.lg}` (24px) on the white-card carousel; the dark promo block uses the same 24px on use-case rows.
- **Nav padding:** 9px vertical, 24px horizontal — the top-nav is compact at 60px height with a 9px row-gap that keeps the navigation visually low-key relative to the cinematic hero.

### Grid & Container

- **Max content width:** 1280px (`--grid-max-width`) with 24px gutters (`--grid-gap`) on a 12-column grid (`--grid-unit: 12`).
- **Hero band:** full-bleed photographic image, with the headline + eyebrow + CTA stack centered at ~640-720px max-width over the image.
- **Below-fold sections:** centered display headlines at 1080-1280px, with body copy constrained to ~684px (the captured h2 width).
- **White-band carousel:** 3-up horizontal card row inside the white band, each card on `{colors.surface-light}` with paired left-arrow / right-arrow chevron controls.
- **Promo band:** full-bleed `{colors.canvas-dark}` block with 2-column layout — a wireframe-globe illustration on the left, use-case rows ("Accept payments / Send payouts globally / Adyen for Platforms") on the right.

### Rhythm

The page alternates between **dark and light** bands rather than holding a single tempo. Dark hero (240px vertical padding) → white body section ("Run your business with confidence") → white-band carousel → dark promo band ("Control every aspect of your money") → white footer band. Each band fully commits to its surface color rather than blending — there are no atmospheric gradients between bands and no edge-blending transitions. The dark-light alternation is the page's structural device.

## Elevation

The system has essentially **no shadow tier** on the captured marketing surface. Depth comes from full-bleed surface-color contrast (canvas-dark over canvas) rather than from layered shadow elevation.

- **Flat (no shadow):** hero, body bands, carousel cards, promo band, footer — every surface above the fold.
- **Gradient overlay:** the only "elevated" treatment is the subtle gradient overlay at the bottom edge of the hero photograph, fading from transparent into `{colors.surface-1}` to soften the transition into the white body band.
- **Hairline outlines:** `{colors.hairline}` (#d1d5d8) carries the carousel-card outlines and the horizontal rules separating use-case rows on the dark promo band.
- **Modal scrim:** `{colors.shadow}` at ~45% alpha — wired as `--overlay-medium`. Reserved for navigation flyout scrims; not rendered above the fold.

## Shapes

The radius scale **collapses to one value**: 6px. The 5px sub-pixel variant appears 3 times; otherwise 6px is the entire rounded shape language.

- `{rounded.none}` 0px — every full-bleed band (hero, body, promo, footer), every text block, every horizontal rule.
- `{rounded.sm}` 5px — frequency 3. A sub-pixel variant that reads identical to the 6px tier at most viewport sizes.
- `{rounded.md}` 6px — frequency 64. The mint CTA, the carousel cards, the photographic-mask asset cells, the secondary buttons, the form input outlines. Wired as `--base-radius` and `--radius-m`.

There is no 8 / 12 / 16 / 24px tier. Every clickable affordance and every container that breaks the flat-block default uses the same 6px. The consistency across the entire system is the entire shape language — there is no warmer-pill tier reserved for special CTAs.

## Components

**`button-primary`** — The signature CTA. Mint `{colors.primary}` fill, near-black text, `{rounded.md}` 6px radius, 0×16px padding, 48px height. "Talk to our team" is the captured instance — compact at 118px wide, the only mint moment in the hero composition.

**`button-secondary`** — Transparent fill, white text, 6px radius, 12px padding, 35px height. Used in the top-nav for "Pricing" and "Sign in" — reads as a quiet text affordance rather than a button.

**`button-ghost`** — Same geometry as `button-secondary` but with `{colors.ink}` text — the dark-canvas variant.

**`top-nav`** — Transparent surface overlay on the dark hero, 60px height, no bottom rule. Adyen wordmark flush left, product links centered ("Products," "Businesses we serve," "About," "Resources," "Pricing"), Search + Account + "Contact us" mint CTA flush right.

**`nav-link`** — White text in `{typography.nav-link}` (16.5626px / 400) — same size as the CTA label. 12px padding, 35px height. The nav reads as the same visual weight as the CTA, with only the mint fill distinguishing the primary action.

**`hero-band`** — Full-bleed `{colors.canvas-dark}` overlay on a cinematic photographic backdrop, 240px vertical padding, content centered. Holds the eyebrow strip + headline + lead paragraph + CTA stack in a single ~640px-wide column.

**`hero-heading`** — White text on the dark hero, `{typography.display-lg}` (64px / 452). The captured "Fintech you can bank on" is the canonical instance — confidence through size + photography contrast, not weight.

**`section-heading`** — `{typography.display-md}` (32px / 484) in `{colors.ink}` on the white body. The captured "Run your business with confidence." is the canonical instance — note the period, a deliberate editorial mark.

**`display-headline`** — The largest display tier at `{typography.display-xl}` (80px / 436), used for full-bleed display headlines below the fold.

**`body-paragraph`** — `{colors.ink-muted}` (#6c7782) running text at `{typography.heading-md}` (20px / 496). The lead paragraph beneath the section heading uses this tier — generous-large body that reads as a sub-heading.

**`body-paragraph-muted`** — `{colors.ink-tertiary}` text at `{typography.body-md}` for secondary captions and feature explanations.

**`mono-eyebrow`** — White text on dark, `{typography.mono-eyebrow}` (AdyenMono 12px / 500 / +0 tracking, uppercase). Leads each section with a small mint indicator dot at the leading edge. "INTELLIGENT MONEY MOVEMENT" is the captured instance.

**`indicator-dot`** — Mint `{colors.primary}` 8px square block sitting before each `mono-eyebrow`. Renders as a small square rather than a circular dot — the brand's deliberate sharpness move.

**`promo-band`** — Full-bleed `{colors.canvas-dark}` block, white text, 240px top padding. Holds the "Control every aspect of your money" headline plus the 2-column wireframe-globe + use-case-row layout below.

**`asset-card`** — `{colors.surface-light}` (#f4f5f6) fill, ink text, 6px radius, 24px padding. The white-band carousel cards ("Compliance you can trust," "Enterprise-grade reliability") use this surface.

**`photo-mask`** — `{colors.canvas-dark}` fill, white text, 6px radius. The first carousel card uses a photographic image masked into a 6px-cornered rectangle ("Compliance you can trust," with a nighttime city skyline behind the text).

**`use-case-row`** — Transparent row on the dark promo band, white text, `{typography.heading-md}` (20px / 496), `{colors.surface-3}` 1px bottom rule. The "Accept payments / Send payouts globally / Adyen for Platforms" navigation list inside the promo block uses this row pattern.

**`footer`** — `{colors.canvas-dark}` surface, `{colors.ink-tertiary}` text, 72×24px padding. No top rule against the promo band — the footer continues the dark canvas.

## Do's and Don'ts

**Do** treat the mint voltage as scarce. The system uses `{colors.primary}` (#00d16a) exactly 9 times in the captured page — only on the CTA fill, the eyebrow indicator dot, and emphasis underlines. Multiplying it into secondary buttons, link colors, or decorative accents dilutes the only chromatic brand signal on the page.

**Do** use `{colors.canvas-dark}` (#001222) — not pure `#000000` — for every dark surface. The navy-leaning chroma is intentional and softens the contrast with white headline text; pure black would crush the shadow detail in the captured hero image.

**Do** lead every section with a `{typography.mono-eyebrow}` + `{component.indicator-dot}` pair. The AdyenMono uppercase eyebrow is the device that organizes the entire page hierarchy; sections without one read as orphaned from the system.

**Do** keep the Adyen sans at variable-axis weights (436, 452, 484, 496). Snapping to 400/500/700 erases the brand's typographic precision; the unusual numeric values are the most recognizable typographic move.

**Don't** introduce any radius outside `{rounded.md}` 6px. The system uses one value 64 times in the captured page and nothing else. Adding an 8 / 12 / 16px tier breaks the single-value shape language and reads as borrowed from a different system.

**Don't** use AdyenMono for body or display copy — it is wired exclusively to the `mono-eyebrow` and small-caps annotation tiers. Reaching for it on a heading turns the page into a developer-tools site (Linear, Vercel) rather than an enterprise-fintech page.

**Don't** render the `{component.indicator-dot}` as a circle. Adyen's leading indicator is an 8px **square** — sharp corners on the dot mirror the system's flat 6px radius elsewhere. A circular dot would feel borrowed from a status-indicator UI convention.

**Don't** add a decorative gradient or texture above the fold. The brand's restraint above the fold (no logo wall, no atmospheric gradient, no secondary CTA cluster) is the entire visual move; adding chrome turns confident emptiness into ordinary marketing density.

## Known Gaps

- **Customer logo wall:** Adyen does run a customer-logo strip (Lightspeed, Meta, eBay, Adobe, Uber, Decathlon) below the hero photograph but it sits at the bottom of the hero band rather than as a separate component. Token captured implicitly via the `{component.hero-band}` background.
- **Hover and focus states:** documented for the primary CTA fill only. The full state matrix (focus rings, active press, disabled tints) is wired into CSS variables (`--tw-ring-color`, `--tw-ring-offset-color`) but not rendered on the captured surface.
- **Form input states:** the captured page does not expose a form input. The Adyen Dashboard and developer-portal surfaces use a separate component system not represented here.
- **Light vs. dark mode:** the page commits to band-by-band inversion rather than a true dark/light mode preference. Both surface modes carry tokens here, but no preference-driven theme switch exists in the marketing chrome.
- **Motion:** the page uses scroll-triggered fade-in on each band, with `--motion-default-duration` 0.6s and `--motion-default-ease` cubic-bezier(0.19, 1, 0.22, 1). Captures encode these as CSS variables but the live animation behavior lives in JavaScript.
- **Product surfaces:** this DESIGN.md captures the marketing site only. The Adyen Dashboard, Drop-in Checkout component, and Adyen for Platforms surfaces carry their own token systems (purples, blues, oranges declared in `--color-purple-1000`, `--color-blue-1700`, `--color-orange-1000`) that do not appear in the captured marketing chrome.
- **Subscription / pricing tiers:** the brand's pricing page is gated behind a contact-sales flow; no pricing-table component is exposed on the public marketing surface.
