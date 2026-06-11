# FQC 2026 — conference site

Static one-page site for the **Fourth Conference on the Foundations of Quantum Computing**, University College London, 2–4 September 2026.

> Editions 2023–2025 ran as *workshops*. The 2026 edition is the first held as a full *conference* — hence the rebrand in copy and the move of the repo / GitHub Pages URL from `fqc-workshop.github.io` to `fqc-conf.github.io`. The old URL serves a meta-refresh redirect to the new one.

No build step, no framework, no JS dependencies. The whole site is a handful of files:

```
.
├── index.html                  <- all content + page structure
├── style.css                   <- everything visual
├── script.js                   <- mobile nav + scroll-reveal animations
├── robots.txt                  <- search-engine crawl rules
├── sitemap.xml                 <- single-URL sitemap for Google
├── google…verification.html    <- Google Search Console ownership proof (do not delete)
├── assets/
│   ├── speakers/               <- speaker portraits
│   ├── logos/                  <- partner / sponsor logos
│   ├── ucl-portico.jpg         <- UCL Bloomsbury building (used as social-share image)
│   └── canary-wharf.jpg        <- Canary Wharf / actual venue area (currently unused)
└── README.md
```

The repo **is** the GitHub Pages source for **fqc-conf.github.io** — served from the `main` branch root, no Jekyll build.

## Local preview

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static server works (`npx serve`, `php -S localhost:8080`, etc.) — there's nothing to compile.

## Editing content

All text lives in `index.html`. Each section has an `id` and a labelled heading, so search the file for the section name. The most-edited sections:

| Section                | Where to edit                                              |
| ---------------------- | --------------------------------------------------------- |
| Hero / dates           | `<section class="hero">`                                  |
| About                  | `<section id="about">`                                    |
| Speakers               | `<ul class="speaker-grid">` — one `<li class="speaker">` each |
| Program                | `<section id="program">` → `<ol class="day-list">`        |
| Venue                  | `<section id="venue">`                                     |
| Register / fees / dates| `<section id="register">`                                 |
| Organisers             | `<section id="organisers">` → `<ul class="org-list">`     |
| Past editions          | `<section id="past">` → `<ol class="past-list">`          |
| Partners / sponsors    | `<section id="partners">` → `<a class="logo-tile">` tiles |
| Contact                | `<section id="contact">` (`mailto:` link, currently hidden)|

### Adding or changing a speaker

Each speaker is one `<li class="speaker">` in a `<ul class="speaker-grid">` (there are two grids: an *Academic session* and an *Industry session*). The portrait, name, and affiliation are the three things to set:

```html
<li class="speaker">
  <div class="speaker-portrait" aria-hidden="true">
    <img src="assets/speakers/jane-doe.jpg" alt="" loading="lazy" />
  </div>
  <h3><a class="speaker-link" href="https://example.org/" target="_blank" rel="noopener">Jane Doe<span class="speaker-arrow" aria-hidden="true">↗</span></a></h3>
  <p class="affil">Some University</p>
</li>
```

- Portraits crop to a `4 / 5` aspect ratio — supply roughly **800×1000 px** JPG/PNG and drop it in `assets/speakers/`.
- Omit the `<a>` wrapper if the speaker has no homepage — just put the bare name in `<h3>`.
- Mark a still-unconfirmed speaker by adding `<span class="tbc">TBC</span>` after the name.
- **Keep the JSON-LD in sync:** the `<script type="application/ld+json">` block in `<head>` lists every speaker under `"performer"`. Add/remove names there when you change the speaker grid (see *SEO* below).

### Adding a partner or sponsor logo

Partner/sponsor tiles live in `<section id="partners">`. A real logo tile looks like:

```html
<a class="logo-tile" href="https://example.org/" target="_blank" rel="noopener">
  <img src="assets/logos/example.png" alt="" loading="lazy" />
  <span class="logo-tile-name">Example Institution</span>
</a>
```

Sponsors currently show a single `logo-tile-empty` placeholder ("Sponsor logos to be added") — replace it with real tiles as sponsors are confirmed. Logos look best as monochrome SVG/PNG, ~200 px wide.

## SEO & Google Search Console

The site is set up to be indexed by Google:

- **`robots.txt`** allows all crawlers and points to the sitemap.
- **`sitemap.xml`** lists the single homepage URL. Update `<lastmod>` when you make significant content changes.
- **`<head>` of `index.html`** contains a JSON-LD `Event` block (Google reads this to show a rich event card with dates, venue, fee, and speakers), plus a canonical URL, Open Graph, and Twitter-card tags.
- **Ownership** is verified in [Google Search Console](https://search.google.com/search-console) as a **URL-prefix** property for `https://fqc-conf.github.io/`, via the `google…verification.html` file in the repo root. **Do not delete that file** — removing it un-verifies the property. (Domain-property verification is not possible because we don't control DNS for `github.io`.)

After editing structured data or major content, open the property in Search Console → **URL Inspection** → enter the homepage → **Request Indexing**, so Google re-crawls promptly instead of waiting.

> **Known issue — social/search preview image.** `og:image`, `twitter:image`, and the JSON-LD `image` all point to `assets/ucl-portico.jpg`, which is the UCL Wilkins Portico in Bloomsbury — *not* the actual venue (UCL School of Management, One Canada Square, Canary Wharf). Consider swapping in a Canary Wharf image (`assets/canary-wharf.jpg` is already in the repo) so the share preview shows the right place. Update all three references in `<head>` if you do.

## Still to confirm before / during the event

- **TBC speakers.** Peter Coveney and Masoud Mohseni are marked `TBC` — remove the tag once confirmed, or remove the speaker if they drop.
- **Program day blurbs.** Check the per-day descriptions in `<section id="program">` are final.
- **Past-edition themes.** The one-line theme next to each past year in `<section id="past">` — verify or update.
- **Sponsor logos.** Replace the sponsor placeholder once sponsors are confirmed.
- **Contact email.** The contact section uses `mailto:fqc2026@cs.ucl.ac.uk` and is currently `hidden`. Update the address and unhide the section (`<section id="contact" … hidden>` → remove `hidden`) if you want it shown.

## Deploying

GitHub Pages serves this repo from the `main` branch root. The git remote uses **SSH** (`git@github.com:fqc-conf/fqc-conf.github.io.git`), so you need an SSH key on your GitHub account with push access. To publish:

```bash
git add -A
git commit -m "Update site"
git push
```

Pages rebuilds and serves the change within a minute or two — there is no build step.

For a **custom domain**: add a `CNAME` file at the repo root containing the bare domain, point DNS at GitHub Pages ([docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)), and update `og:url`, `canonical`, the sitemap URL, and the JSON-LD `url`/`offers.url` in `index.html` to match.

## Browser support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Tested at 390 px (phone), 820 px (tablet), 1440 px and 1920 px (desktop).
- Scroll-reveal animations gracefully degrade (everything stays visible) if JS or `IntersectionObserver` is unavailable, and honour `prefers-reduced-motion`.
- The sticky header's backdrop blur falls back to a solid translucent fill in older browsers.

## Design notes

- **Type:** Fraunces (display serif) for headlines, Inter for body, JetBrains Mono for labels — all from Google Fonts.
- **Palette & spacing:** defined as CSS custom properties at the top of `style.css` — change them once and they propagate everywhere.
- The hero's three "orbit" rings are pure CSS decoration (no images); remove the three `.orbit` divs to disable them.

## Licence

Content © FQC 2026 organising committee.
