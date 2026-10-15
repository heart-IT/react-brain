#!/usr/bin/env node
// Structural regression checks over the BUILT site (site/dist). Zero dependencies,
// Node 22. Run after `npm run build` (with ASTRO_BASE=/react-brain/ to mirror
// production): `npm test`. Exits 1 with a readable list of every failure.
//
// These are deliberately markup-agnostic: they test invariants every page must hold
// (one h1, canonical, resolvable links, no leaked undefined/NaN, …), not the shape
// of any particular page.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = process.argv[2] ? resolve(process.argv[2]) : join(SITE, 'dist');
const MAX_PAGE_BYTES = 200 * 1024;
// Pages already over budget when this check landed (2026-10-15), each pinned to a
// ceiling just above its size then so it cannot GROW. Ratchet: lower these as the
// pages shrink, delete the line once under 200 KB, never raise one. (decide/ left
// the list the same day once its corpus slice moved to a lazily fetched JSON;
// reading/ is one long index of real content.)
const PAGE_BUDGET_EXCEPTIONS = {
  'reading/index.html': 264 * 1024,
};

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('check-dist: dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

// ── collect pages ──
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
const files = walk(DIST);
const pages = files.filter((f) => f.endsWith('.html') && !relative(DIST, f).startsWith('pagefind'));
const rel = (f) => relative(DIST, f).split('\\').join('/');

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const stripScripts = (h) => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const stripNonText = (h) => stripScripts(h)
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]));
const home = html.get(join(DIST, 'index.html'));

// The base path the site was built with: Base.astro stamps it on <body data-base>.
const BASE = (home.match(/<body[^>]*\sdata-base="([^"]*)"/) || [])[1] || process.env.ASTRO_BASE || '/';

const failures = [];
const fail = (check, where, detail) => failures.push({ check, where, detail });

// ids per page (static markup only — ids injected by client scripts can't be linked to)
const idsOf = new Map();
const ids = (p) => {
  if (!idsOf.has(p)) idsOf.set(p, new Set([...stripScripts(html.get(p)).matchAll(/\s(?:id|name)="([^"]+)"/g)].map((m) => decode(m[1]))));
  return idsOf.get(p);
};

// resolve a URL path (no query/hash) to a dist file, or null
function target(fromPage, path) {
  let fsPath;
  if (path.startsWith('/')) {
    if (!path.startsWith(BASE)) return { outside: true };
    fsPath = join(DIST, decodeURIComponent(path.slice(BASE.length)));
  } else {
    fsPath = join(dirname(fromPage), decodeURIComponent(path));
  }
  if (!fsPath.startsWith(DIST)) return { outside: true };
  if (existsSync(fsPath) && statSync(fsPath).isDirectory()) fsPath = join(fsPath, 'index.html');
  return { file: existsSync(fsPath) ? fsPath : null };
}

// Every font-size / font shorthand in a block of CSS must come from the type scale.
// Allowed besides var(--fs-…): inherit, the .9em code idiom, a shorthand with no
// number (font: var(--font-mono)), and the h1's fluid clamp() — the one size outside
// the steps, by design.
function checkFontSizes(css, where) {
  for (const m of css.matchAll(/(?:^|[;{\s])(font(?:-size)?)\s*:\s*([^;}]*)/g)) {
    const v = m[2].trim();
    if (v.includes('var(--fs-') || /^inherit\b/.test(v) || /^\.9em\b/.test(v) || /clamp\(/.test(v)) continue;
    if (m[1] === 'font' && !/\d/.test(v.replace(/var\([^)]*\)/g, ''))) continue;
    fail('font-size token', where, `${m[1]}: ${v.slice(0, 60)}`);
  }
}
for (const f of files.filter((x) => x.endsWith('.css') && !rel(x).startsWith('pagefind/'))) checkFontSizes(readFileSync(f, 'utf8'), rel(f));   // pagefind's own UI css is not ours (and not loaded)

const today = new Date().toISOString().slice(0, 10);

for (const [p, raw] of html) {
  const where = rel(p);
  const markup = stripNonText(raw);

  // 1. exactly one <h1>
  const h1s = (markup.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) fail('one h1', where, `${h1s} <h1> elements`);

  // 2. canonical link
  if (!/<link\s[^>]*rel="canonical"[^>]*href="https?:\/\/[^"]+"/i.test(raw)) fail('canonical', where, 'no <link rel="canonical" href="https://…">');

  // 3. a real title
  const title = decode((raw.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  if (!title) fail('title', where, 'missing or empty <title>');
  else if (title === 'react-brain') fail('title', where, '<title> is just "react-brain"');

  // 4 + 5. internal links: inside the base path, and resolving (incl. #anchors)
  const urls = [
    ...[...markup.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]),
    ...[...raw.matchAll(/<script\b[^>]*\ssrc="([^"]*)"/gi)].map((m) => m[1]),
  ].map(decode);
  for (const u of urls) {
    if (!u || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u)) continue;   // external / mailto / data / protocol-relative
    const [beforeHash, hash = null] = u.split('#');
    const path = beforeHash.split('?')[0];
    if (!path) {                                                     // same-page anchor
      if (hash && !ids(p).has(hash)) fail('anchor', where, `#${hash} has no matching id on the page`);
      continue;
    }
    const t = target(p, path);
    if (t.outside) { fail('base path', where, `${u} is outside the base path ${BASE}`); continue; }
    if (!t.file) { fail('link', where, `${u} does not resolve to a file in dist/`); continue; }
    if (hash && t.file.endsWith('.html') && html.has(t.file) && !ids(t.file).has(hash))
      fail('anchor', where, `${u}: ${rel(t.file)} has no id "${hash}"`);
  }

  // 6. leaked template values in visible text (code samples excluded — they may
  //    legitimately say `undefined`)
  const text = decode(markup
    .replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
  for (const bad of ['undefined', 'NaN', '[object Object]']) {
    const re = bad === '[object Object]' ? /\[object Object\]/ : new RegExp(`(^|[^\\w-])${bad}(?![\\w-])`);
    const m = text.match(re);
    if (m) {
      const at = m.index;
      fail('leaked value', where, `"${bad}" in text: …${text.slice(Math.max(0, at - 40), at + 40).replace(/\s+/g, ' ').trim()}…`);
    }
  }
  const attrLeak = markup.match(/\s[\w:-]+="(?:undefined|NaN|\[object Object\]|null)"/);
  if (attrLeak) fail('leaked value', where, `attribute ${attrLeak[0].trim()}`);

  // 8. page weight
  const bytes = Buffer.byteLength(raw);
  const budget = PAGE_BUDGET_EXCEPTIONS[where] ?? MAX_PAGE_BYTES;
  if (bytes > budget) fail('page size', where, `${(bytes / 1024).toFixed(0)} KB > ${budget / 1024} KB budget`);

  // 11. every table header cell declares what it heads (scope="col" | "row")
  for (const m of markup.matchAll(/<th\b[^>]*>/gi))
    if (!/\sscope="/i.test(m[0])) fail('th scope', where, `${m[0].slice(0, 80)} has no scope=`);

  // 12. search indexes the page body (Base.astro marks <main data-pagefind-body>)
  if (where !== '404.html' && !/\sdata-pagefind-body\b/.test(markup)) fail('pagefind body', where, 'no data-pagefind-body element');

  // 13. no inline style="" in page markup — styling lives in <style> blocks. <img> and
  //     <svg> (and SVG children) may carry presentational inline styles.
  for (const m of markup.matchAll(/<([a-z][\w-]*)\b[^>]*\sstyle="[^"]*"[^>]*>/gi)) {
    if (/^(img|svg|path|g|rect|circle|line|polyline|polygon|text|tspan|use)$/i.test(m[1])) continue;
    fail('inline style', where, m[0].slice(0, 100));
  }

  // 14. font sizes come from the type scale: inside <style>, every font-size / font
  //     shorthand uses var(--fs-…) (inherit and the .9em code/sup idiom excepted).
  //     The emitted stylesheets (dist/_astro/*.css) get the same check below the loop.
  for (const block of raw.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) checkFontSizes(block[1], where);

  // 10. the top bar is rendered exactly once
  const bars = (markup.match(/<[a-z]+\s[^>]*class="(?:[^"]*\s)?bar(?:\s[^"]*)?"/gi) || []).length;
  if (bars !== 1) fail('nav bar', where, `${bars} .bar elements (expected 1)`);
}

// 7. homepage date labels: "built", "corpus changed", "last verified", each with a
//    <time datetime> that is a real date. "built" must be today or yesterday (UTC — a
//    build and this test may straddle midnight); the other two must not be after it.
const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
const dates = {};
for (const label of ['built', 'corpus changed', 'last verified']) {
  const re = new RegExp(`${label}\\s*<time\\b[^>]*datetime="([^"]*)"`, 'i');
  const m = home.match(re);
  if (!m) { fail('date labels', 'index.html', `no "${label} <time datetime=…>"`); continue; }
  const d = m[1];
  if (!/^\d{4}-\d{2}-\d{2}/.test(d) || Number.isNaN(Date.parse(d))) fail('date labels', 'index.html', `${label}: "${d}" is not an ISO date`);
  else if (d.slice(0, 10) > today) fail('date labels', 'index.html', `${label}: ${d} is after today (${today})`);
  else dates[label] = d.slice(0, 10);
}
if (dates.built && dates.built !== today && dates.built !== yesterday)
  fail('date labels', 'index.html', `built: ${dates.built} is neither today (${today}) nor yesterday — stale dist/ or a typed date`);
for (const label of ['corpus changed', 'last verified'])
  if (dates.built && dates[label] && dates[label] > dates.built)
    fail('date labels', 'index.html', `${label}: ${dates[label]} is after built (${dates.built})`);

// 15. the homepage demo is generated at build from the corpus — never a typed fixture
const demoFig = home.match(/<figure\b[^>]*class="[^"]*\bdemo\b[^"]*"[^>]*>([\s\S]*?)<\/figure>/i);
if (!demoFig) fail('demo', 'index.html', 'no <figure class="demo">');
else if (!/generated at build/i.test(demoFig[1])) fail('demo', 'index.html', 'demo figure does not say "generated at build"');

// 9. sitemap + robots
const sitemapPath = join(DIST, 'sitemap.xml');
if (!existsSync(sitemapPath)) fail('sitemap', 'sitemap.xml', 'missing');
else {
  const locs = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) fail('sitemap', 'sitemap.xml', 'no <loc> entries');
  for (const loc of locs) {
    let path;
    try { path = new URL(loc).pathname; } catch { fail('sitemap', 'sitemap.xml', `bad URL ${loc}`); continue; }
    const t = target(join(DIST, 'index.html'), path);
    if (t.outside || !t.file) fail('sitemap', 'sitemap.xml', `${loc} does not map to a page in dist/`);
  }
}
const robotsPath = join(DIST, 'robots.txt');
if (!existsSync(robotsPath)) fail('robots', 'robots.txt', 'missing');
else if (!/^Sitemap:\s*https?:\/\/\S+sitemap\.xml\s*$/im.test(readFileSync(robotsPath, 'utf8'))) fail('robots', 'robots.txt', 'no Sitemap: line pointing at sitemap.xml');

// lazily-fetched data islands must exist and parse (the doctor, console and decide fetch them)
// Each has a byte budget (KB) so a growing corpus slice can't silently become a
// multi-megabyte download — ratchet down, never up.
const DATA_BUDGET_KB = { 'doctor-data.json': 128, 'console-data.json': 512, 'decide-data.json': 256 };
for (const [f, kb] of Object.entries(DATA_BUDGET_KB)) {
  const p = join(DIST, f);
  if (!existsSync(p)) { fail('data', f, 'missing'); continue; }
  try { JSON.parse(readFileSync(p, 'utf8')); } catch (e) { fail('data', f, `invalid JSON: ${e.message}`); }
  const size = statSync(p).size;
  if (size > kb * 1024) fail('data', f, `${(size / 1024).toFixed(0)} KB > ${kb} KB budget`);
}

// ── report ──
if (failures.length) {
  const byCheck = Object.groupBy(failures, (f) => f.check);
  console.error(`check-dist: ${failures.length} failure(s) across ${pages.length} pages (base ${BASE})\n`);
  for (const [check, list] of Object.entries(byCheck)) {
    console.error(`✗ ${check} (${list.length})`);
    for (const f of list.slice(0, 25)) console.error(`    ${f.where}: ${f.detail}`);
    if (list.length > 25) console.error(`    … and ${list.length - 25} more`);
  }
  process.exit(1);
}
console.log(`check-dist: ✓ ${pages.length} pages passed (base ${BASE}) — h1, canonical, title, base path, links + anchors, leaked values, date labels, demo provenance, page size ≤ ${MAX_PAGE_BYTES / 1024} KB, sitemap/robots, nav bar, th scope, pagefind body, no inline styles, font-size tokens (incl. emitted CSS), data islands + budgets`);
