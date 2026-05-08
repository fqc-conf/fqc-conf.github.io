# FQC 2026 — workshop site

Static one-page site for the **Fourth Workshop on the Foundations of Quantum Computing**, University College London, 2–4 September 2026.

No build step, no framework, no JS dependencies. Three files do everything:

```
.
├── index.html        <- content + structure
├── style.css         <- everything visual
├── script.js         <- mobile nav + scroll reveal
├── assets/           <- speaker photos etc. (currently empty)
└── README.md         <- this file
```

Repo is the GitHub Pages source for **fqc-workshop.github.io** — served from `main` branch root, no Jekyll build.

## Local preview

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static server works (`npx serve`, `php -S`, etc.) — there's nothing to compile.

## Editing content

Everything text-y lives in `index.html`. Sections are clearly labelled with comments / headings:

| Section          | Where to edit                                  |
| ---------------- | ---------------------------------------------- |
| Hero / dates     | `<section class="hero">`                       |
| About            | `<section id="about">`                         |
| Speakers         | `<ul class="speaker-grid">` — one `<li>` each  |
| Program          | `<ol class="day-list">`                        |
| Application      | `<section id="register">` + `.dates-strip`     |
| Organizers       | `<ul class="org-list">`                        |
| Venue            | `<section id="venue">`                         |
| Past editions    | `<ol class="past-list">`                       |
| Contact          | `<section id="contact">` (`mailto:` link)      |

### Adding a real speaker photo

Replace the placeholder block in a speaker `<li>`:

```html
<div class="speaker-portrait" aria-hidden="true"><span>SA</span></div>
```

with:

```html
<img class="speaker-portrait" src="assets/abramsky.jpg" alt="" />
```

The `assets/` folder is already created. Photos crop to `4 / 5` aspect — supply 800×1000 ish.

## Things you should verify before going live

I worked from the EventCreate page and filled in a few reasonable defaults. Please double-check:

- **Venue photo.** The repo includes `assets/ucl-portico.jpg` (Wilkins Portico, Bloomsbury). It is NOT used on the page because the actual venue is UCL School of Management at One Canada Square, Canary Wharf — the portico is the wrong building and would mislead attendees. Either delete the asset, or supply a One Canada Square / Canary Wharf photo to put in the venue section.
- **Speaker spellings & affiliations.** I corrected *Lucian → Lucien* Hardy, and listed *Maria Schuld — Xanadu*. Verify both.
- **Past-edition themes.** Host institutions and dates are verified against the EventCreate pages. The one-line "theme" descriptions next to each year are placeholder summaries — replace with the actual workshop themes if needed.
- **Program day blurbs.** Currently placeholders ("Opening remarks, invited talks…"). Replace once finalized.
- **Contact email.** Placeholder is `fqc2026@cs.ucl.ac.uk`. Update in two places — the `mailto:` link in the contact section and any future `og:url`.
- **Open Graph URL.** `<meta property="og:url">` points at `https://fqc2026.cs.ucl.ac.uk/` — update to the real public URL (likely `https://fqc-workshop.github.io/` or a custom domain).
- **Hosting / sponsors / acknowledgements.** Footer currently has no hosting credit — add the correct host attribution once confirmed.
- **Partner / sponsor logos.** The Partners section (`#partners`) currently shows institution names as text placeholders. To swap in a real logo, replace the `<span class="logo-placeholder">…</span>` inside each `<a class="logo-tile">` with an `<img src="assets/logos/ucl.svg" alt="" />` (file in `assets/logos/`). Recommended: SVG, monochrome, ~200 px wide. Add sponsor `<li>` rows under the "Sponsors" group as they're confirmed.

## Deploying

GitHub Pages serves this repo (`fqc-workshop.github.io`) from `main` branch root. To publish:

```bash
git add -A
git commit -m "Update site"
git push origin main
```

Pages picks it up within a minute or two. No build step.

For a custom domain, add a `CNAME` file at the repo root with the bare domain inside, then point DNS at GitHub Pages' IPs (see [docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## Browser support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Tested at 390 px (phone), 820 px (tablet), 1440 px and 1920 px (desktop).
- Reveal animations gracefully degrade (everything visible) if JS or `IntersectionObserver` is unavailable.
- Honours `prefers-reduced-motion`.
- Backdrop-filter blur on the sticky header degrades to a solid translucent fill in older browsers.

## Design notes

- **Type:** Fraunces (display serif) for headlines, Inter for body, JetBrains Mono for labels — all from Google Fonts.
- **Palette:** `#0a0e27` ink, `#f6f4ee` warm paper, `#4cc6f0` cyan accent. CSS custom properties at the top of `style.css` — change once, propagates everywhere.
- **Layout grid:** content max width 1200 px, gutter `clamp(1.25rem, 3vw, 2.5rem)`. Section vertical rhythm `clamp(4.5rem, 10vw, 8rem)`.
- The hero's three "orbit" rings are decorative (CSS only, no images). Disable by removing the three `.orbit` divs.

## Licence

Content © FQC 2026 organising committee.
