/* ==========================================================================
   app.js — rendering, language, motion.
   No framework, no build step: this file runs as-is in the browser.
   ========================================================================== */

import { PROFILE, STATS, ABOUT, STACK, EXPERIENCE, EDUCATION, LANGUAGES,
         FEATURED_REPOS, BEHANCE, UI } from './data.js';

/* ------------------------------------------------------------ i18n ------ */

const EXTRA = {
  skip: { en: 'Skip to content', ru: 'К содержанию' },
  hero: {
    first: { en: 'Vitaliy', ru: 'Виталий' },
    last: { en: 'Vostrikov', ru: 'Востриков' },
    ctaWork: { en: 'See the work', ru: 'Смотреть работы' },
    ctaMail: { en: 'Get in touch', ru: 'Написать' },
    ctaDesign: { en: 'Behance', ru: 'Behance' },
  },
  contact: {
    cv: { en: 'Résumé on Habr Career', ru: 'Резюме на Хабр Карьере' },
  },
};

const TREE = { PROFILE, STATS, ABOUT, STACK, EXPERIENCE, EDUCATION, LANGUAGES, UI, ...EXTRA };

let lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';

/** Resolve a { en, ru } pair, or pass a plain value through untouched. */
const t = (v) => (v && typeof v === 'object' && 'en' in v ? (v[lang] ?? v.en) : v);

/** Look up a dotted path in the content tree. */
function lookup(path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), TREE);
}

/** Minimal **bold** support for the short marketing lines. */
const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/* ------------------------------------------------------------ icons ----- */

const ICON = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 16.1 12 21 12 21Z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C17.5 5 18.5 5.3 18.5 5.3c.7 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>',
  behance: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.5c1.6 0 2.8.4 3.6 1.1.8.7 1.2 1.7 1.2 3 0 1.4-.6 2.4-1.9 3.1 1.7.5 2.6 1.8 2.6 3.8 0 1.5-.5 2.7-1.5 3.5-1 .8-2.4 1.2-4.2 1.2H0V5.5h7.5Zm-.4 5.9c1.3 0 1.9-.5 1.9-1.6S8.4 8.2 7.1 8.2H3.3v3.2h3.8Zm.2 6c1.5 0 2.2-.6 2.2-1.8s-.7-1.8-2.2-1.8H3.3v3.6h4ZM19 18.4c1 0 1.8-.5 2.1-1.4h2.6c-.7 2.4-2.6 3.7-4.8 3.7-3.2 0-5.4-2.2-5.4-5.5s2.2-5.6 5.3-5.6c3.3 0 5.2 2.6 5 6.1h-7.5c.2 1.7 1.1 2.7 2.7 2.7Zm2.1-4.4c-.2-1.5-1-2.2-2.3-2.2-1.4 0-2.3.8-2.5 2.2h4.8ZM15.6 6.4h6v1.7h-6V6.4Z"/></svg>',
  habr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5v14M20 5v14M4 12h16M8 8v8M16 8v8"/></svg>',
  rank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
};

const LANG_COLOR = {
  Dart: '#00B4AB', Go: '#00ADD8', Rust: '#DEA584', Lua: '#000080',
  JavaScript: '#F1E05A', TypeScript: '#3178C6', HTML: '#E34C26', CSS: '#563D7C',
  Ruby: '#701516', Kotlin: '#A97BFF', Java: '#B07219', 'C#': '#178600',
  Haxe: '#DF7900', PHP: '#4F5D95', Mathematica: '#DD1100', Shell: '#89E051',
  HCL: '#844FBA', Batchfile: '#C1F12E', Theme: '#FF2E93',
};

/* ------------------------------------------------------- rendering ------ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function renderStatic() {
  /* every data-i18n node in the HTML */
  $$('[data-i18n]').forEach((el) => {
    const v = lookup(el.dataset.i18n);
    if (v !== undefined) el.textContent = t(v);
  });

  document.documentElement.lang = lang;
  $$('.lang-switch button').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

  $('#repo-search').placeholder = t(UI.searchRepos);
  $('#theme-btn').title = t(UI.themeToggle);
  $('#theme-btn').setAttribute('aria-label', t(UI.themeToggle));
  $('#to-top').setAttribute('aria-label', t(UI.backToTop));
  $('#year').textContent = new Date().getFullYear();
}

function renderHeroStats() {
  $('#hero-stats').innerHTML = STATS.map((s) => `
    <div class="stat">
      <div class="stat-value">${esc(s.value)}</div>
      <div class="stat-label">${esc(t(s.label))}</div>
    </div>`).join('');
}

function renderAbout() {
  $('#about-body').innerHTML = t(ABOUT.body).map((p) => `<p>${esc(p)}</p>`).join('');

  $('#about-meta').innerHTML = `
    <div><b>${lang === 'ru' ? 'Где' : 'Based'}</b><span>${esc(t(PROFILE.location))}</span></div>
    <div><b>${lang === 'ru' ? 'Роль' : 'Role'}</b><span>${esc(t(PROFILE.role))}</span></div>
    <div><b>GitHub</b><a href="${PROFILE.links.github}" target="_blank" rel="noopener">${esc(PROFILE.handle)}</a></div>
    <div><b>Behance</b><a href="${PROFILE.links.behance}" target="_blank" rel="noopener">${esc(PROFILE.handle)}</a></div>`;

  $('#what-grid').innerHTML = ABOUT.columns.map((c) => `
    <div class="what-col">
      <h3>${esc(t(c.title))}</h3>
      ${t(c.lines).map((l) => `<p>${bold(l)}</p>`).join('')}
    </div>`).join('');

  $('#tools').innerHTML = ABOUT.tools.map((x) => `<span class="tag">${esc(x)}</span>`).join('');
  $('#brands').innerHTML = ABOUT.brands.map((x) => `<span>${esc(x)}</span>`).join('');

  $('#education').innerHTML = EDUCATION.map((e) => `
    <div class="edu-item">
      <div class="edu-year">${esc(e.year)}</div>
      <div>
        <div class="edu-place">${esc(t(e.place))}</div>
        <div class="edu-detail">${esc(t(e.detail))}</div>
      </div>
    </div>`).join('');

  $('#languages').innerHTML = LANGUAGES.map((l) => `
    <div class="edu-item">
      <div class="edu-year">${lang === 'ru' ? (l.name.ru === 'Русский' ? 'RU' : 'EN') : (l.name.en === 'Russian' ? 'RU' : 'EN')}</div>
      <div>
        <div class="edu-place">${esc(t(l.name))}</div>
        <div class="edu-detail">${esc(t(l.level))}</div>
      </div>
    </div>`).join('');
}

function renderTimeline() {
  $('#timeline').innerHTML = EXPERIENCE.map((job, i) => `
    <article class="job reveal" style="--d:${i * 80}ms">
      <div class="job-head">
        <div class="job-when">
          <span class="period">${esc(t(job.period))}</span>
          <span class="dur">${esc(t(job.duration))}</span>
          ${job.current ? `<span class="badge-now"><span class="pulse"></span>${lang === 'ru' ? 'Сейчас' : 'Current'}</span>` : ''}
        </div>
        <div>
          <h3 class="job-title">${esc(t(job.company))}</h3>
          <p class="job-role">${esc(t(job.position))}</p>
          <p class="job-field">${esc(t(job.field))}</p>
          <p class="job-summary">${esc(t(job.summary))}</p>
          ${job.tech ? `<div class="tech-row">${job.tech.map((x) => `<span class="tech">${esc(x)}</span>`).join('')}</div>` : ''}
        </div>
      </div>
      ${job.projects?.length ? `<div class="proj-grid">${job.projects.map(renderProject).join('')}</div>` : ''}
    </article>`).join('');
}

function renderProject(p) {
  return `
    <div class="proj">
      <h4>${esc(t(p.title))}</h4>
      <p>${esc(t(p.text))}</p>
      ${p.impact ? `<p class="impact">${ICON.bolt}${esc(t(p.impact))}</p>` : ''}
      <div class="tech-row">${p.tech.map((x) => `<span class="tech">${esc(x)}</span>`).join('')}</div>
    </div>`;
}

function renderStack() {
  $('#stack-grid').innerHTML = STACK.map((g) => `
    <div class="stack-col">
      <h3>${esc(t(g.group))}</h3>
      ${g.items.map((s, i) => `
        <div class="skill">
          <div class="skill-name">
            <span>${esc(s.name)}</span>
            <span class="skill-dots">${[1, 2, 3, 4, 5].map((n) =>
              `<i class="${n <= s.level ? 'on' : ''}"></i>`).join('')}</span>
          </div>
          <div class="skill-bar"><span style="--w:${s.level / 5};--d:${i * 70}ms"></span></div>
        </div>`).join('')}
    </div>`).join('');
}

function renderMarquee() {
  const words = ['Flutter', 'Dart', 'Go', 'Rust', 'gRPC', 'GraphQL', 'BPMN', 'Docker',
                 'Kubernetes', 'PostgreSQL', 'WebSocket', 'Neovim', 'WebAssembly', 'Design'];
  /* doubled so the -50% translate loops seamlessly */
  $('#marquee').innerHTML = [...words, ...words]
    .map((w) => `<span>${esc(w)}</span>`).join('');
}

function repoCard(r, featured = false) {
  const lc = LANG_COLOR[r.lang] || '#8b8f9c';
  const year = r.year || (r.updated ? r.updated.slice(0, 4) : '');
  const d = String(t(r.desc) || '').trim();
  return `
    <a class="repo${featured ? ' repo--featured' : ''}" href="${esc(r.url)}" target="_blank" rel="noopener">
      <div class="repo-top">
        <h3 class="repo-name"><span class="at">/</span>${esc(r.name)}</h3>
        ${r.stars > 0 ? `<span class="repo-stars${r.stars >= 4 ? ' hot' : ''}">${ICON.star}${r.stars}</span>` : ''}
      </div>
      <p class="repo-desc${d ? '' : ' repo-desc--empty'}">${d ? esc(d) : esc(lang === 'ru' ? 'Без описания' : 'No description')}</p>
      <div class="repo-foot">
        <span class="repo-lang"><i style="background:${lc}"></i>${esc(r.lang || '—')}</span>
        <span class="repo-meta">${year ? esc(year) : ''}<span class="repo-arrow">${ICON.arrow}</span></span>
      </div>
    </a>`;
}

function renderFeatured() {
  $('#featured-repos').innerHTML = FEATURED_REPOS.slice(0, 6).map((r) => repoCard(r, true)).join('');
}

function renderBehance() {
  /* the four strongest pieces run wide, the generative studies fill in around them */
  $('#work-grid').innerHTML = BEHANCE.map((w) => `
    <a class="work${w.featured ? ' work--lg' : ''}" href="${esc(w.url)}" target="_blank" rel="noopener">
      <img src="${esc(w.cover)}" alt="${esc(t(w.title))}" loading="lazy" decoding="async">
      <span class="work-veil"></span>
      <div class="work-body">
        <p class="work-kind">${esc(t(w.kind))} · ${esc(w.year)}</p>
        <h3 class="work-title">${esc(t(w.title))}</h3>
        <div class="work-stats">
          <span>${ICON.heart}${w.appreciations}</span>
          <span>${ICON.eye}${w.views}</span>
        </div>
      </div>
    </a>`).join('');
}

function renderSocials() {
  const rows = [
    { icon: ICON.github, name: 'GitHub', sub: PROFILE.handle, url: PROFILE.links.github },
    { icon: ICON.behance, name: 'Behance', sub: PROFILE.handle, url: PROFILE.links.behance },
    { icon: ICON.habr, name: 'Habr Career', sub: lang === 'ru' ? 'Резюме' : 'Résumé', url: PROFILE.links.habr },
    { icon: ICON.rank, name: 'CodersRank', sub: '@rasarts', url: PROFILE.links.codersrank },
    { icon: ICON.mail, name: 'Email', sub: lang === 'ru' ? 'Предпочтительно' : 'Preferred', url: `mailto:${PROFILE.email}` },
  ];
  $('#socials').innerHTML = rows.map((r) => `
    <a class="social" href="${esc(r.url)}"${r.url.startsWith('mailto') ? '' : ' target="_blank" rel="noopener"'}>
      ${r.icon}
      <span><b>${esc(r.name)}</b><small>${esc(r.sub)}</small></span>
    </a>`).join('');
}

/* ------------------------------------------------ GitHub repositories --- */

let allRepos = [];
let visible = 12;
let activeLang = null;
let query = '';
/** null while loading, 'live' once fetched, 'offline' if the API refused. */
let repoSource = null;

/** Kept out of the data-i18n sweep so a language switch cannot revert it. */
function paintRepoStatus() {
  const status = $('#repo-status');
  if (repoSource === null) status.textContent = t(UI.loadingRepos);
  else if (repoSource === 'offline') status.textContent = t(UI.reposOffline);
  else status.textContent = lang === 'ru'
    ? `${allRepos.length} собственных репозиториев`
    : `${allRepos.length} original repositories`;
}

async function loadRepos() {
  try {
    const pages = await Promise.all([1, 2].map((p) =>
      fetch(`https://api.github.com/users/Hecatoncheir/repos?per_page=100&page=${p}&sort=updated`)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))));

    allRepos = pages.flat()
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        lang: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
        desc: r.description || '',
        updated: r.updated_at,
      }))
      .sort((a, b) => (b.stars - a.stars) || (b.updated < a.updated ? -1 : 1));

    repoSource = 'live';
  } catch {
    /* rate-limited or offline — the curated set still tells the story */
    allRepos = FEATURED_REPOS.map((r) => ({ ...r }));
    repoSource = 'offline';
  }
  paintRepoStatus();
  renderLangPills();
  renderAllRepos();
}

function renderLangPills() {
  const counts = new Map();
  allRepos.forEach((r) => {
    if (!r.lang) return;
    counts.set(r.lang, (counts.get(r.lang) || 0) + 1);
  });
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7);

  $('#lang-pills').innerHTML = [
    `<button type="button" class="pill" data-lang-filter="" aria-pressed="${activeLang === null}">${esc(t(UI.filterAll))}<em>${allRepos.length}</em></button>`,
    ...top.map(([l, n]) =>
      `<button type="button" class="pill" data-lang-filter="${esc(l)}" aria-pressed="${activeLang === l}">${esc(l)}<em>${n}</em></button>`),
  ].join('');
}

function filtered() {
  const q = query.trim().toLowerCase();
  return allRepos.filter((r) => {
    if (activeLang && r.lang !== activeLang) return false;
    if (!q) return true;
    return r.name.toLowerCase().includes(q) ||
           String(t(r.desc) || '').toLowerCase().includes(q);
  });
}

function renderAllRepos() {
  const list = filtered();
  const slice = list.slice(0, visible);

  /* the full listing is plain — the lifted treatment is reserved for the
     curated row above, so a repo appearing in both is not styled twice */
  $('#all-repos').innerHTML = slice.length
    ? slice.map((r) => repoCard(r)).join('')
    : `<p class="repo-status">${esc(t(UI.noResults))}</p>`;

  $('#more-wrap').hidden = list.length <= visible;
  bindTilt($('#all-repos'));
}

/* ---------------------------------------------------------- motion ------ */

/** Neon wave field behind the hero. Redraws only while the hero is on screen. */
function initWave() {
  const cv = $('#wave');
  if (!cv) return;
  const ctx = cv.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0, h = 0, dpr = 1, raf = 0, running = true;
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const LAYERS = 26;

  function draw(now) {
    const time = now * 0.00016;
    ctx.clearRect(0, 0, w, h);

    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.00, '#00e9f0');
    grad.addColorStop(0.34, '#4d7cff');
    grad.addColorStop(0.68, '#a855f7');
    grad.addColorStop(1.00, '#ff2e93');

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;

    const baseY = h * 0.62;
    const spread = h * 0.30;
    const amp = Math.min(h, w) * 0.055;

    for (let i = 0; i < LAYERS; i++) {
      const k = i / (LAYERS - 1);           // 0..1 across the stack
      const y0 = baseY - spread * 0.5 + spread * k;
      const phase = time + k * 1.9;
      /* layers nearest the middle of the stack read strongest */
      ctx.globalAlpha = 0.10 + 0.30 * Math.sin(Math.PI * k);

      ctx.beginPath();
      const step = w > 900 ? 8 : 12;
      for (let x = -step; x <= w + step; x += step) {
        const nx = x / w;
        /* distance from the pointer pushes the wave up into a bulge */
        const dx = nx - pointer.x;
        const dy = (y0 / h) - pointer.y;
        const bulge = Math.exp(-(dx * dx * 9 + dy * dy * 4)) * amp * 2.4;

        const y = y0
          + Math.sin(nx * 6.0 + phase * 2.1) * amp
          + Math.sin(nx * 11.0 - phase * 1.4 + k * 3.0) * amp * 0.45
          + Math.sin(nx * 2.3 + phase * 0.8) * amp * 0.7
          - bulge;

        if (x <= 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (running) raf = requestAnimationFrame(draw);
  }

  size();
  addEventListener('resize', () => { size(); if (reduce) draw(0); }, { passive: true });

  addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    pointer.tx = (e.clientX - r.left) / r.width;
    pointer.ty = (e.clientY - r.top) / r.height;
  }, { passive: true });

  if (reduce) { draw(0); return; }

  /* stop the loop once the hero has scrolled away */
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(draw); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }, { threshold: 0 }).observe(cv);

  raf = requestAnimationFrame(draw);
}

/**
 * Particle field rippling on a wave, standing in for the old divider image.
 * Same neon sweep as the hero, but built from dots, swinging wider, and
 * gathering toward the pointer.
 */
function initParticleWave() {
  const cv = $('#divider');
  if (!cv) return;
  const ctx = cv.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ROWS = 26;         // each row is its own spline through the field
  const GAP = 6;           // horizontal spacing between particles, in px
  const REACH = 165;       // how far the pointer's influence carries
  const PULL = 52;         // furthest a particle is drawn toward the pointer
  const TAU = Math.PI * 2;

  let w = 0, h = 0, dpr = 1, gap = GAP, cols = 0, grad = null;
  let raf = 0, running = false;
  /* parked far off-canvas until the pointer actually arrives */
  const ptr = { x: -1e4, y: -1e4, on: false };

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.clientWidth;
    h = cv.clientHeight;
    if (!w || !h) return;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    gap = w > 900 ? GAP : GAP * 0.8;
    cols = Math.ceil(w / gap) + 1;

    grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.00, '#00e9f0');
    grad.addColorStop(0.34, '#4d7cff');
    grad.addColorStop(0.68, '#a855f7');
    grad.addColorStop(1.00, '#ff2e93');
  }

  function draw(now) {
    if (!w || !h) { if (running) raf = requestAnimationFrame(draw); return; }

    const t = now * 0.0007;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = grad;

    /* A tight band of rows swinging wide reads better than a wide band
       swinging narrow, and it keeps the crests inside the canvas:
       half-spread (0.07h) + peak wave (0.28h * 1.26) leaves ~7% of the
       height clear top and bottom, so only a pointer shove reaches the edge. */
    const midY = h * 0.5;
    const spread = h * 0.14;
    const amp = h * 0.28;

    for (let r = 0; r < ROWS; r++) {
      const k = r / (ROWS - 1);
      const rowY = midY - spread / 2 + spread * k;
      const depth = Math.sin(Math.PI * k);   // rows nearest the middle read strongest
      const baseRad = 0.5 + depth * 0.62;

      /* 26 overlapping rows would read as a solid mass at the old alpha */
      ctx.globalAlpha = 0.15 + 0.45 * depth;
      /* one path per row, filled once — 26 fills a frame instead of ~6000 */
      ctx.beginPath();

      for (let c = 0; c < cols; c++) {
        const bx = c * gap;
        const nx = bx / w;

        /* Low spatial frequencies: roughly half a period of the primary
           across the width, so the field reads as a few long swells rather
           than a ripple. The per-row phase offsets are what separate the
           splines from each other. */
        let x = bx;
        let y = rowY
          + Math.sin(nx * 3.4 + t * 0.62 + k * 2.6) * amp
          + Math.sin(nx * 6.8 - t * 0.44 + k * 3.4) * amp * 0.26;
        let rad = baseRad;

        if (ptr.on) {
          const dx = ptr.x - x;          // toward the pointer, not away
          const dy = ptr.y - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 0.0001;
            const f = 1 - d / REACH;
            /* Capped short of the pointer itself: an uncapped pull makes the
               nearest particles overshoot and stream out the far side, which
               reads as a glitch rather than as gathering. */
            const pull = Math.min(PULL * f * f, d * 0.82);
            x += (dx / d) * pull;
            y += (dy / d) * pull;
            rad += f * 1.6;
          }
        }

        ctx.moveTo(x + rad, y);
        ctx.arc(x, y, rad, 0, TAU);
      }
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    if (running) raf = requestAnimationFrame(draw);
  }

  size();
  addEventListener('resize', () => { size(); if (reduce) draw(0); }, { passive: true });

  addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    ptr.x = e.clientX - r.left;
    ptr.y = e.clientY - r.top;
    /* only worth testing against when the pointer is anywhere near the strip */
    ptr.on = ptr.y > -REACH && ptr.y < h + REACH;
  }, { passive: true });

  if (reduce) { draw(0); return; }

  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) {
      running = true;
      if (!w) size();
      raf = requestAnimationFrame(draw);
    } else if (!e.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }, { threshold: 0 }).observe(cv);
}

/** Soft light that trails the pointer. */
function initCursor() {
  const el = $('.cursor-glow');
  if (!el || !matchMedia('(hover: hover)').matches) return;
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;

  addEventListener('pointermove', (e) => {
    tx = e.clientX; ty = e.clientY;
    document.body.classList.add('has-pointer');
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  function tick() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) ? requestAnimationFrame(tick) : 0;
  }
}

/** Buttons lean toward the pointer — the Springel idea, in CSS transforms. */
function initMagnetic() {
  if (!matchMedia('(hover: hover)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest?.('.magnetic');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate(${dx * 14}px, ${dy * 10}px)`;
  }, { passive: true });

  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest?.('.magnetic');
    if (el) el.style.transform = '';
  }, { passive: true });
}

/** Repo cards light up under the pointer. */
function bindTilt(root) {
  $$('.repo', root).forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  });
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  $$('.reveal').forEach((el) => io.observe(el));
}

function initNav() {
  const nav = $('#nav');
  const toTop = $('#to-top');
  const sections = ['about', 'work', 'stack', 'code', 'design', 'contact']
    .map((id) => $(`#${id}`)).filter(Boolean);
  const links = new Map($$('.nav-links a').map((a) => [a.getAttribute('href').slice(1), a]));

  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-stuck', y > 24);
    toTop.classList.toggle('is-on', y > innerHeight);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () =>
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const a = links.get(e.target.id);
      if (a && e.isIntersecting) {
        links.forEach((l) => l.removeAttribute('aria-current'));
        a.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
}

/* ----------------------------------------------------------- chrome ----- */

/** Full-screen section menu for narrow viewports. */
function initMenu() {
  const menu = $('#menu');
  const btn = $('#menu-btn');
  const links = $$('.menu-links a', menu);
  links.forEach((a, i) => a.style.setProperty('--d', `${60 + i * 45}ms`));

  const open = () => {
    menu.hidden = false;
    /* let the browser lay it out before the transition starts */
    requestAnimationFrame(() => menu.classList.add('is-open'));
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    links[0]?.focus({ preventScroll: true });
  };

  const close = () => {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { menu.hidden = true; }, 350);
  };

  btn.addEventListener('click', open);
  $('#menu-close').addEventListener('click', close);
  links.forEach((a) => a.addEventListener('click', close));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); }
  });
  /* a rotation to desktop while it is open would leave it stuck over the page */
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
    if (e.matches && !menu.hidden) close();
  });
}

function initTheme() {
  const btn = $('#theme-btn');
  const sun = $('.i-sun'), moon = $('.i-moon');

  const paint = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    sun.hidden = !dark;      // in the dark, offer the sun
    moon.hidden = dark;
  };
  paint();

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('vv-theme', next); } catch { /* private mode */ }
    paint();
  });
}

function initLang() {
  $$('.lang-switch button').forEach((b) => {
    b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      try { localStorage.setItem('vv-lang', lang); } catch { /* private mode */ }
      renderAll();
    });
  });
}

function initRepoControls() {
  $('#repo-search').addEventListener('input', (e) => {
    query = e.target.value;
    visible = 12;
    renderAllRepos();
  });

  $('#lang-pills').addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang-filter]');
    if (!b) return;
    activeLang = b.dataset.langFilter || null;
    visible = 12;
    renderLangPills();
    renderAllRepos();
  });

  $('#more-btn').addEventListener('click', () => {
    visible += 12;
    renderAllRepos();
  });
}

function initCopy() {
  const btn = $('#copy-btn');
  const label = $('#copy-label');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      label.textContent = t(UI.copied);
      setTimeout(() => { label.textContent = t(UI.copyEmail); }, 1800);
    } catch {
      /* clipboard blocked — the address is right there as a mailto link */
      location.href = `mailto:${PROFILE.email}`;
    }
  });
}

/* -------------------------------------------------------------- boot ---- */

function renderAll() {
  renderStatic();
  renderHeroStats();
  renderAbout();
  renderTimeline();
  renderStack();
  renderBehance();
  renderSocials();
  renderFeatured();
  paintRepoStatus();
  renderLangPills();
  renderAllRepos();
  initReveal();
  bindTilt(document);
}

renderMarquee();
renderAll();
initWave();
initParticleWave();
initCursor();
initMagnetic();
initNav();
initMenu();
initTheme();
initLang();
initRepoControls();
initCopy();
loadRepos();
