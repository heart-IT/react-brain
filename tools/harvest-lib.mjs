// ── harvest-lib — shared primitives for the acquisition tools ──────────────────
// Imported by react-brain-harvest.mjs (inventory/coverage/watchlist),
// react-brain-firsthand.mjs (watch graph) and react-brain-verify-diff.mjs
// (the CI receipts gate). Pure functions + fetch helpers, no CLI dispatch —
// safe to import from anywhere.
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs';

export const UA_BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
export const UA_BOT = 'react-brain (+https://github.com/heart-IT/react-brain)';

// retry-once on transient failures (never on 4xx — those are answers, not noise)
export async function get(url, { accept, ua = UA_BOT, timeout = 20000 } = {}, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': ua, ...(accept ? { accept } : {}) }, redirect: 'follow', signal: AbortSignal.timeout(timeout) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  } catch (err) {
    if (attempt < 2 && !/HTTP 4\d\d/.test(String(err))) { await new Promise((r) => setTimeout(r, 500)); return get(url, { accept, ua, timeout }, attempt + 1); }
    throw err;
  }
}

export async function pool(tasks, size = 8) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(size, tasks.length) }, async () => {
    while (i < tasks.length) { const n = i++; out[n] = await tasks[n]().catch((err) => ({ err: String(err).slice(0, 120) })); }
  }));
  return out;
}

// page chrome, share widgets, feeds — never content
export const IGNORE_URL = [
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
export function cleanUrl(href) {
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

export function manifestKeys(path) {
  const md = readFileSync(path, 'utf8');
  return new Set([...md.matchAll(/https?:\/\/[^\s)|\]"'`]+/g)].map((m) => normalize(m[0])).filter(Boolean));
}

// coverage = the extraction red-gate: external links on the issue page that the
// manifest does not account for
export async function coverageCheck(issueUrl, manifestPath) {
  const links = extractLinks(await get(issueUrl, { ua: UA_BROWSER }), issueUrl).filter((l) => !l.sameSite);
  const have = manifestKeys(manifestPath);
  return { total: links.length, have: have.size, missing: links.filter((l) => !have.has(l.key)) };
}

// tripwires: an entry's standing caveat as an executable release condition.
// Pure + offline-testable. Prerelease-safe: 1.0.0-beta.6 does NOT satisfy
// atleast 1.0.0 (equal base + prerelease tag = not yet released), but a
// prerelease of a HIGHER base (2.1.0-rc.1 vs atleast 1.0.0) does.
function parseVer(v) {
  const m = String(v || '').match(/^(\d+)\.(\d+)\.(\d+)(-.+)?/);
  return m && { n: [+m[1], +m[2], +m[3]], pre: Boolean(m[4]) };
}
export function satisfiesTripwire(when, info) {
  if (!info) return false;
  if (when.deprecated === true) return info.deprecated === true;
  if (when.atleast) {
    const l = parseVer(info.latest), t = parseVer(when.atleast);
    if (!l || !t) return false;
    for (let i = 0; i < 3; i++) { if (l.n[i] > t.n[i]) return true; if (l.n[i] < t.n[i]) return false; }
    return !l.pre;
  }
  return false;
}

// ── triage scoring (harvest bench) — manifests are gold data ────────────────────
// Adjudicated disposition manifests double as a judgment benchmark: parse the
// gold rows, score a candidate's dispositions against them. Pure + offline.
export function coarseReason(cell) {
  const c = String(cell).toLowerCase();
  if (/pre-ship/.test(c)) return 'pre-ship';
  if (/too-early/.test(c)) return 'too-early';
  if (/corroborat|covered/.test(c)) return 'corroboration';
  if (/how-to|setup guide/.test(c)) return 'how-to';
  if (/\bcap\b/.test(c)) return 'cap';
  if (/unverifiable/.test(c)) return 'unverifiable';
  if (/off-scope|showcase|testimonial|affiliation/.test(c)) return 'off-scope';
  if (/sponsor/.test(c)) return 'sponsor';
  if (/minor[ -](feature[ -])?release/.test(c)) return 'minor-release';
  return 'other';
}

export function parseGoldManifest(md) {
  const rows = [];
  for (const line of md.split('\n')) {
    const t = line.trim();
    if (!t.startsWith('|') || /^\|\s*(item|event|-{3})/i.test(t)) continue;
    const urls = [...t.matchAll(/https?:\/\/[^\s)|\]"'`]+/g)].map((m) => m[0].replace(/[.,;:]+$/, ''));
    if (!urls.length) continue;
    const cell = (t.split('|')[2] || '');
    const disposition = /\*\*kept/i.test(cell) ? 'kept' : /already-held/i.test(cell) ? 'already-held' : 'skipped';
    const entries = [...new Set([...t.matchAll(/RB-E-[A-Z0-9-]+/g)].map((m) => m[0]))];
    const reason = disposition === 'skipped' ? coarseReason(cell) : null;
    for (const u of urls) rows.push({ key: normalize(u), url: u, disposition, entries, reason });
  }
  return rows;
}

// keys = the fixture's link set (what the candidate was actually asked about).
// False skips (gold kept, candidate skipped) are the feared failure — gold-kept
// links carry 3× weight, so silently dropping a keeper costs triple.
// knownIds (optional): entry ids that existed when the candidate judged — a gold
// keep routed to an entry CREATED BY the gold pass (a gap-fill) is excluded from
// routing scoring, since no candidate could have named it.
export function scoreTriage(goldRows, candRows, keys, knownIds) {
  const gold = new Map(goldRows.map((r) => [r.key, r]));
  const cand = new Map(candRows.map((r) => [r.key ?? normalize(r.url), r]));
  const s = { n: 0, weighted: 0, weightTotal: 0, falseSkips: [], overKeeps: [], mismatches: [], unanswered: [],
    routing: { n: 0, ok: 0, misses: [] }, reason: { n: 0, ok: 0 } };
  for (const key of keys) {
    const g = gold.get(key); if (!g) continue;
    s.n++;
    const w = g.disposition === 'kept' ? 3 : 1;
    s.weightTotal += w;
    const c = cand.get(key);
    if (!c) { s.unanswered.push(key); continue; }
    const cd = /kept/i.test(c.disposition) ? 'kept' : /already/i.test(c.disposition) ? 'already-held' : 'skipped';
    if (cd === g.disposition) s.weighted += w;
    else if (g.disposition === 'kept' && cd === 'skipped') s.falseSkips.push(key);
    else if (g.disposition !== 'kept' && cd === 'kept') s.overKeeps.push(key);
    else s.mismatches.push(`${key}: gold ${g.disposition} vs candidate ${cd}`);
    if (g.disposition === 'kept' && cd === 'kept' && (!knownIds || g.entries.some((id) => knownIds.has(id)))) {
      s.routing.n++;
      if (c.entry && g.entries.includes(c.entry)) s.routing.ok++;
      else s.routing.misses.push(`${key}: ${c.entry || '(none)'} vs gold ${g.entries.join('/') || '(none)'}`);
    }
    if (g.disposition === 'skipped' && cd === 'skipped' && g.reason && g.reason !== 'other' && c.reason) {
      s.reason.n++;
      if (coarseReason(c.reason) === g.reason) s.reason.ok++;
    }
  }
  s.score = s.weightTotal ? Math.round((100 * s.weighted) / s.weightTotal) : 0;
  return s;
}

// wayback: does an archived snapshot exist? (the third tier of the verify chain)
export async function waybackSnapshot(url) {
  try {
    const d = JSON.parse(await get(`http://archive.org/wayback/available?url=${encodeURIComponent(url)}`));
    return d.archived_snapshots?.closest?.available ? d.archived_snapshots.closest.url : null;
  } catch { return null; }
}
