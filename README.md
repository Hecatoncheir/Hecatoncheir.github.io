# hecatoncheir.github.io

Personal site — [hecatoncheir.github.io](https://hecatoncheir.github.io/)

Plain HTML, CSS and JavaScript. No framework, no bundler, no build step: what is
in this repository is exactly what the browser gets.

## Layout

```
index.html               structure, meta, JSON-LD, pre-paint theme script
manifest.webmanifest     PWA manifest
.nojekyll                stops GitHub Pages running Jekyll over the files
assets/css/style.css     design tokens + every component
assets/js/data.js        all content, each string an { en, ru } pair
assets/js/app.js         rendering, i18n, GitHub fetch, canvas, interactions
assets/img/              portrait, wave divider, favicon
```

## Editing content

Everything user-visible lives in `assets/js/data.js`. Adding a highlighted
repository, a Behance project or a job means editing an array there — no HTML
changes needed.

The GitHub section fetches the live repository list from the public API on load
and falls back to `FEATURED_REPOS` if the API is rate-limited or unreachable, so
the page is never empty.

Behance covers are hot-linked from Behance's CDN; that is the only external
content the page loads apart from Google Fonts.

## Local preview

Any static server will do — ES modules need `http://`, not `file://`:

```bash
python3 -m http.server 4319
```

## Deployment

GitHub Pages serves the `main` branch at the repository root. Push to `main` and
it is live.

> **Note:** the old `rework_2021` branch holds a 2021 Flutter version of this
> site, and its `.github/workflows/release.yml` builds that branch and force-pushes
> the result over `main`. Disable or delete that workflow before pushing here, or
> it will overwrite this site the next time it runs.

## Browser support

Modern evergreen browsers. Uses ES modules, `IntersectionObserver`,
`color-mix()` and CSS nesting-free custom properties. Respects
`prefers-reduced-motion` (the canvas draws one static frame and transitions are
disabled) and `prefers-color-scheme`, with an explicit theme toggle that wins
over both.
