# hecatoncheir.github.io

Personal site — [hecatoncheir.github.io](https://hecatoncheir.github.io/)

Plain HTML, CSS and JavaScript. No framework, no bundler, no build step: what is
in this repository is exactly what the browser gets.

## Layout

```
index.html               structure, meta, JSON-LD, pre-paint theme script
manifest.webmanifest     PWA manifest
.nojekyll                stops GitHub Pages running Jekyll over the files
assets/css/style.css     @font-face block, design tokens + every component
assets/fonts/            self-hosted woff2, latin / latin-ext / cyrillic
assets/js/data.js        all content, each string an { en, ru } pair
assets/js/app.js         rendering, i18n, GitHub fetch, canvas, interactions
assets/img/              portrait, icons, social card, Behance covers
```

## Regenerating the social card

`assets/img/og.png` is the 1200×630 image shared links unfurl to. It is
rendered from `assets/img/og.source.html`, which is kept beside it so the
card stays reproducible:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --window-size=1200,630 --virtual-time-budget=6000 --screenshot=assets/img/og.png --user-data-dir=/tmp/chrome-og "file://$PWD/assets/img/og.source.html"
```

## Regenerating the icons

`favicon.svg` is the mark. `icon.source.svg` is the same mark full-bleed with a
bit of inset, for the two consumers that apply their own mask. Both render with
Quick Look, which needs no extra tooling:

```bash
qlmanage -t -s 192 -o /tmp/icons assets/img/favicon.svg && mv /tmp/icons/favicon.svg.png assets/img/icon-192.png
```

Repeat at `-s 512` for `icon-512.png`, and against `icon.source.svg` at `-s 512`
for `icon-maskable-512.png` and `-s 180` for `apple-touch-icon.png`.

A 192 and a 512 are what Chrome checks before it will offer to install the app;
the portrait that used to stand in for them was 191x191 and missed by a pixel.

## Fonts

Self-hosted in `assets/fonts/`, because the Google Fonts stylesheet was
render-blocking on a third-party host and cost ~950ms of a ~1550ms first paint
on its own. Nunito and Nunito Sans are variable files covering 400-800; there is
deliberately no italic cut, so the handful of uppercase micro-labels that ask for
`font-style: italic` get the browser's synthetic oblique instead of a 65KB pair
of extra downloads.

Only latin and cyrillic are fetched by the current text. latin-ext ships anyway
because `unicode-range` keeps an unused subset from ever being downloaded.

To refresh them, pull the same subsets Google serves and keep the file names —
`assets/css/style.css` refers to them literally:

```bash
python3 - <<'EOF'
import re, urllib.request
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}
url = ('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700'
       '&family=Nunito:wght@400..900&family=Nunito+Sans:wght@400..800&display=swap')
css = urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read().decode()
WANT = {'U+0000-00FF': 'latin', 'U+0100-02BA': 'latin-ext', 'U+0301, U+0400-045F': 'cyrillic'}
SLUG = {'Nunito': 'nunito', 'Nunito Sans': 'nunito-sans', 'Anonymous Pro': 'anonymous-pro'}
for b in re.findall(r'@font-face \{(.*?)\}', css, re.S):
    fam = re.search(r"font-family: '([^']+)'", b).group(1)
    wt = re.search(r'font-weight: ([\d ]+)', b).group(1).strip()
    ur = re.search(r'unicode-range: (.*?);', b, re.S).group(1).strip()
    sub = next((v for k, v in WANT.items() if ur.startswith(k)), None)
    if not sub: continue
    name = f"{SLUG[fam]}{'' if ' ' in wt else '-' + wt}-{sub}.woff2"
    src = re.search(r'url\((https[^)]+)\)', b).group(1)
    open(f'assets/fonts/{name}', 'wb').write(urllib.request.urlopen(urllib.request.Request(src, headers=UA)).read())
    print(name)
EOF
```

## Regenerating the Behance covers

Covers are WebP, converted from the 800px JPEGs Behance serves:

```bash
cwebp -q 82 -m 6 -sharp_yuv <cover>.jpg -o assets/img/work/<gallery-id>.webp
```

## Editing content

Everything user-visible lives in `assets/js/data.js`. Adding a highlighted
repository, a Behance project or a job means editing an array there — no HTML
changes needed.

The GitHub section fetches the live repository list from the public API on load
and falls back to `FEATURED_REPOS` if the API is rate-limited or unreachable, so
the page is never empty.

Behance covers live in `assets/img/work/` as WebP. The page loads nothing from
a third-party origin at all.

## Local preview

Any static server will do — ES modules need `http://`, not `file://`:

```bash
python3 -m http.server 4319
```

## Deployment

GitHub Pages serves the `main` branch at the repository root. Push to `main` and
it is live. There is no workflow file in the repository — the only thing that
runs is Pages' own built-in `pages-build-deployment`.

`main` is the only branch. An earlier note here warned about a `rework_2021`
branch whose `.github/workflows/release.yml` force-pushed a 2021 Flutter build
over `main`; that branch is gone from the remote, so the hazard is gone with it.

## Browser support

Modern evergreen browsers. Uses ES modules, `IntersectionObserver`,
`color-mix()` and CSS nesting-free custom properties. Respects
`prefers-reduced-motion` (the canvas draws one static frame and transitions are
disabled) and `prefers-color-scheme`, with an explicit theme toggle that wins
over both.
