#!/usr/bin/env node
// ── react-brain harvest — deterministic newsletter-scan scaffolding ────────────
// The extraction layer of a harvest pass was the last INVISIBLE failure point:
// an LLM summarizer decided what I even saw, so a dropped item never reached the
// disposition manifest (tools/harvest-log/). These three modes close that hole
// mechanically (regex over fetched HTML, zero LLM):
//
//   inventory <url>              every link in the issue page — content links
//                                numbered (build the manifest FROM this list),
//                                same-site + chrome bucketed separately
//   coverage  <url> <manifest>   set-difference: external content links the
//                                manifest does NOT account for → exit 1
//                                (a silent extraction miss becomes a red gate)
//   watchlist                    scan tools/harvest-log/*.md for (a) URLs
//                                skipped in ≥2 issues, (b) reopen signals
//                                ("revisit…", "reopen if…") — cap/pre-ship
//                                skips are deferred, not terminal
//
//   node tools/react-brain-harvest.mjs inventory https://thisweekinreact.com/newsletter/290
//   node tools/react-brain-harvest.mjs coverage <url> tools/harvest-log/twir-290.md
//   node tools/react-brain-harvest.mjs watchlist
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOG_DIR = join(dirname(fileURLToPath(import.meta.url)), 'harvest-log');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// page chrome, share widgets, feeds — never content
const IGNORE_URL = [
  /\/(intent|sharer|share-offsite|sharing)\//, /facebook\.com\/sharer/, /mailto:/,
  /discord\.gg\//, /\.(png|jpe?g|gif|svg|webp|ico|css|js|xml|rss)(\?|$)/i,
  /fonts\.(googleapis|gstatic)\.com/, /web\.archive\.org/,
  /twitter\.com\/[^/]+$/, /x\.com\/[^/]+$/, /bsky\.app\/profile\/[^/]+$/,   // profiles (posts have /status/ | /post/)
  /unavatar\.io\//, /slo\.im\//, /linkedin\.com\/in\//,                     // share short-links + people profiles
  /dev\.to\/[^/]+$/, /hashnode\.com\/@[^/]+$/,                              // blog-host profile pages (articles have a slug)
  /github\.com\/[^/]+$/,                                                    // org/user pages (repos have a second segment)
  /\/(subscribe|unsubscribe|privacy|legal|terms)(\/|$)/,
];

// strip query+fragment, www., trailing slash → the comparison key
// (query is IDENTITY on a few hosts — youtube.com/watch?v= — keep it there)
export function normalize(url) {
  try {
    const u = new URL(url);
    let key = (u.host.replace(/^www\./, '') + u.pathname.replace(/\/$/, '')).toLowerCase();
    if (/youtube\.com$/.test(u.host.replace(/^www\./, '')) && u.searchParams.get('v')) key += `?v=${u.searchParams.get('v')}`;
    return key;
  } catch { return null; }
}

// display URL: drop tracking params (utm_*, ref), keep the rest (?v= matters)
function cleanUrl(href) {
  const u = new URL(href);
  for (const k of [...u.searchParams.keys()]) if (/^utm_|^ref$/i.test(k)) u.searchParams.delete(k);
  u.hash = '';
  return u.href.replace(/\?$/, '');
}

export function extractLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const seen = new Map();
  // minified HTML ships UNQUOTED attributes (<a href=https://x target=_blank>) — the
  // quoted-only version of this regex silently missed ~80% of a real TWiR page
  for (const m of html.matchAll(/<a\b[^>]*?href=(?:"([^"]*)"|'([^']*)'|([^\s>"']+))[^>]*>([\s\S]*?)<\/a>/gi)) {
    let href = (m[1] ?? m[2] ?? m[3] ?? '').trim();
    if (!href || /^(javascript:|mailto:|#)/i.test(href)) continue;
    try { href = new URL(href, base).href; } catch { continue; }
    const key = normalize(href);
    if (!key || IGNORE_URL.some((re) => re.test(href))) continue;
    const text = (m[4] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
    if (!seen.has(key)) seen.set(key, { url: cleanUrl(href), key, text, sameSite: new URL(href).host === base.host });
  }
  return [...seen.values()];
}

async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
  if (!res.ok) { console.error(`fetch failed: HTTP ${res.status} ${url} — try the curl-UA / Wayback fallbacks (upkeep-routine playbook)`); process.exit(2); }
  return res.text();
}

function manifestKeys(path) {
  const md = readFileSync(path, 'utf8');
  return new Set([...md.matchAll(/https?:\/\/[^\s)|\]"'`]+/g)].map((m) => normalize(m[0])).filter(Boolean));
}

const [mode, ...args] = process.argv.slice(2);

if (mode === 'inventory') {
  if (!args[0]) { console.error('usage: harvest inventory <issue-url>'); process.exit(1); }
  const links = extractLinks(await fetchPage(args[0]), args[0]);
  const content = links.filter((l) => !l.sameSite), same = links.filter((l) => l.sameSite);
  console.log(`\nharvest inventory — ${args[0]}\n${content.length} external content link(s) — EVERY one needs a manifest disposition:\n`);
  content.forEach((l, i) => console.log(`  ${String(i + 1).padStart(3)}. ${l.url}\n       ${l.text || '(no anchor text)'}`));
  console.log(`\n${same.length} same-site link(s) (nav/anchors — disposition only if content):`);
  same.forEach((l) => console.log(`     · ${l.url}`));
} else if (mode === 'coverage') {
  if (args.length < 2) { console.error('usage: harvest coverage <issue-url> <manifest.md>'); process.exit(1); }
  const links = extractLinks(await fetchPage(args[0]), args[0]).filter((l) => !l.sameSite);
  const have = manifestKeys(args[1]);
  const missing = links.filter((l) => !have.has(l.key));
  console.log(`harvest coverage — ${links.length} external link(s) on page · ${have.size} URL(s) in ${args[1]}`);
  if (missing.length) {
    console.log(`\n✗ ${missing.length} UNACCOUNTED link(s) — extraction/triage missed these; add disposition rows:\n`);
    missing.forEach((l) => console.log(`   · ${l.url}\n     ${l.text || ''}`));
    process.exit(1);
  }
  console.log('✓ every external link on the page has a manifest disposition');
} else if (mode === 'watchlist') {
  let files = [];
  try { files = readdirSync(LOG_DIR).filter((f) => f.endsWith('.md')); } catch { /* no log dir yet */ }
  if (!files.length) { console.log('no manifests in tools/harvest-log/ yet'); process.exit(0); }
  const byUrl = new Map();   // key → [{file, skipped}]
  const signals = [];
  for (const f of files) {
    for (const line of readFileSync(join(LOG_DIR, f), 'utf8').split('\n')) {
      if (!line.trim().startsWith('|')) continue;
      const skipped = /\|\s*skipped/i.test(line);
      for (const m of line.matchAll(/https?:\/\/[^\s)|\]"'`]+/g)) {
        const k = normalize(m[0]);
        if (k) (byUrl.get(k) || byUrl.set(k, []).get(k)).push({ file: f, skipped });
      }
      // match reopen keywords in the DISPOSITION cell only — URLs contain /watch?v= etc.
      const cell = skipped ? line.split(/\|\s*skipped/i)[1] || '' : '';
      if (skipped && /revisit|reopen|recurs|watch\b|if it earns|candidate (if|when)/i.test(cell))
        signals.push({ file: f, line: line.replace(/\s+/g, ' ').trim().slice(0, 180) });
    }
  }
  const recurring = [...byUrl].filter(([, v]) => v.length >= 2 && v.some((x) => x.skipped));
  console.log(`harvest watchlist — ${files.length} manifest(s)\n`);
  console.log(recurring.length ? `RECURRING skipped URLs (≥2 issues) — re-triage these:` : 'no recurring skipped URLs yet.');
  recurring.forEach(([k, v]) => console.log(`   · ${k}   (${v.map((x) => x.file).join(', ')})`));
  console.log(`\n${signals.length} standing reopen signal(s):`);
  signals.forEach((s) => console.log(`   [${s.file}] ${s.line}`));
} else {
  console.error('usage: react-brain harvest <inventory <url> | coverage <url> <manifest.md> | watchlist>');
  process.exit(1);
}
