#!/usr/bin/env node
// ── react-brain harvest firsthand — the corpus watches its own sources ─────────
// Newsletters are aggregators: a weekly, human-filtered batch that can't surface
// what its editor skipped. But the corpus already NAMES everything it cares
// about — detect rows name the npm packages, sources/readings name the GitHub
// repos, `by:` fields name the vetted authors' blogs. This tool derives that
// watch graph (zero new knowledge, pure derivation — the doctor/learn/stack
// move applied to the acquisition pipeline), polls it, and diffs against
// tools/.firsthand-state.json. Result: known-entity events (releases, npm
// deprecation flips, author posts) arrive with ZERO editorial filter and zero
// latency, routed by entry. Newsletters demote to what they're actually good
// at: discovering unknown unknowns.
//
//   node tools/react-brain-firsthand.mjs            poll + diff + update state
//   node tools/react-brain-firsthand.mjs --graph    print the derived graph, no network
//   node tools/react-brain-firsthand.mjs --json     events as JSON
//   node tools/react-brain-firsthand.mjs --manifest write tools/harvest-log/firsthand-<date>.md skeleton
//
// First run (no state file) establishes the baseline and reports no events.
// Every event is a TRIAGE CANDIDATE — same manifest/verify discipline as a
// newsletter item (tools/upkeep-routine.md step 2).
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEntries } from './detect.mjs';
import { get as libGet, pool, satisfiesTripwire } from './harvest-lib.mjs';

const TOOLS = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(TOOLS, '.firsthand-state.json');
const argv = process.argv.slice(2);
const GRAPH_ONLY = argv.includes('--graph'), JSON_OUT = argv.includes('--json'), MANIFEST = argv.includes('--manifest');
const TODAY = ((argv.find((a) => a.startsWith('--today=')) || '').split('=')[1]) || new Date().toISOString().slice(0, 10);

// hosts that are never author blogs (platforms, registries, media)
const NOT_BLOG = /(^|\.)(github\.com|npmjs\.com|registry\.npmjs\.org|youtube\.com|youtu\.be|twitter\.com|x\.com|bsky\.app|dev\.to|medium\.com|archive\.org|web\.archive\.org)$/;

// ── derive the watch graph from the corpus ─────────────────────────────────────
function deriveGraph() {
  const entries = loadEntries();
  const npm = new Map();      // pkg → [entryIds]
  const github = new Map();   // owner/repo → [entryIds]
  const hostHits = new Map(); // host → { n, entries:Set }
  const tripwires = [];       // {entry, when, then} — standing caveats as conditions
  let globsSkipped = 0;

  const urlsOf = (e) => [
    ...(e.sources || []),
    ...(e.reading || []).map((r) => r.url),
    ...(e.watching || []).map((w) => w.url),
    ...(e.migrate || []).flatMap((m) => m.receipts || []),
  ].filter(Boolean);

  for (const e of Object.values(entries)) {
    for (const d of e.detect || []) {
      if (/[*]/.test(d.pkg)) { globsSkipped++; continue; }   // globs name families, not packages
      (npm.get(d.pkg) || npm.set(d.pkg, []).get(d.pkg)).push(e.id);
    }
    for (const m of e.migrate || []) {
      for (const p of [m.from?.pkg, m.requires?.pkg]) if (p && !/[*]/.test(p)) (npm.get(p) || npm.set(p, []).get(p)).push(e.id);
    }
    for (const t of e.tripwires || []) tripwires.push({ entry: e.id, when: t.when, then: t.then });
    for (const u of urlsOf(e)) {
      const gh = u.match(/github\.com\/([\w.-]+)\/([\w.-]+)/);
      if (gh && !/^(advisories|orgs|topics|features|search)$/.test(gh[1])) {
        const key = `${gh[1]}/${gh[2]}`.toLowerCase();
        (github.get(key) || github.set(key, []).get(key)).push(e.id);
        continue;
      }
      try {
        const host = new URL(u).host.replace(/^www\./, '');
        if (NOT_BLOG.test(host)) continue;
        const h = hostHits.get(host) || hostHits.set(host, { n: 0, entries: new Set() }).get(host);
        h.n++; h.entries.add(e.id);
      } catch { /* non-URL source string */ }
    }
  }
  // a host cited ≥2× across the corpus is a vetted-author signal; one-off article hosts stay out
  const blogs = new Map([...hostHits].filter(([, v]) => v.n >= 2).map(([host, v]) => [host, [...v.entries]]));
  const uniq = (m) => new Map([...m].map(([k, v]) => [k, [...new Set(v)]]));
  return { npm: uniq(npm), github: uniq(github), blogs: uniq(blogs), tripwires, globsSkipped };
}

// fetch + pool live in harvest-lib; keep the old (url, accept) call shape locally
const get = (url, accept) => libGet(url, { accept });
const unesc = (s) => (s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

// newest-first items from an Atom or RSS feed (both appear in the wild)
function feedItems(xml) {
  const items = [];
  for (const m of xml.matchAll(/<(entry|item)\b[\s\S]*?<\/\1>/g)) {
    const b = m[0];
    const link = b.match(/<link[^>]*href=["']([^"']+)["']/)?.[1] || unesc(b.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '');
    const title = unesc(b.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || '');
    const id = unesc(b.match(/<(?:id|guid)[^>]*>([\s\S]*?)<\/(?:id|guid)>/)?.[1] || link);
    if (id || link) items.push({ id: id || link, link: link || id, title });
  }
  return items;
}
function discoverFeed(html, base) {
  for (const m of html.matchAll(/<link\b[^>]+>/gi)) {
    const tag = m[0];
    if (!/rel=["']alternate["']/i.test(tag) || !/(rss|atom)\+xml/i.test(tag)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (href) try { return new URL(href, base).href; } catch { /* skip */ }
  }
  return null;
}

// docusaurus & friends link the feed on /blog, not the homepage <head> — probe
// the well-known paths and accept the first response that actually parses as a feed
const WELL_KNOWN = ['/blog/rss.xml', '/blog/atom.xml', '/blog/feed.xml', '/rss.xml', '/atom.xml', '/feed.xml', '/feed', '/changelog/rss.xml'];
async function probeFeed(host) {
  for (const p of WELL_KNOWN) {
    try {
      const xml = await get(`https://${host}${p}`);
      if (/<(rss|feed)\b/i.test(xml) && feedItems(xml).length) return `https://${host}${p}`;
    } catch { /* next candidate */ }
  }
  return null;
}

// ── main ────────────────────────────────────────────────────────────────────────
const graph = deriveGraph();
const stats = `npm ${graph.npm.size} packages (+${graph.globsSkipped} globs skipped) · github ${graph.github.size} repos · blogs ${graph.blogs.size} feeds (hosts cited ≥2×) · tripwires ${graph.tripwires.length} armed`;

if (GRAPH_ONLY) {
  console.log(`harvest firsthand — derived watch graph\n  ${stats}\n`);
  console.log('npm:', [...graph.npm.keys()].join(', '));
  console.log('\ngithub:', [...graph.github.keys()].join(', '));
  console.log('\nblogs:', [...graph.blogs.keys()].join(', '));
  console.log('\ntripwires:', graph.tripwires.map((t) => `${t.entry} → ${t.when.pkg} ${t.when.atleast ? `≥${t.when.atleast}` : 'deprecated'}`).join(' · ') || '(none)');
  process.exit(0);
}

const first = !existsSync(STATE_FILE);
const state = first ? { npm: {}, github: {}, blogs: {} } : JSON.parse(readFileSync(STATE_FILE, 'utf8'));
const events = [], failures = [];

// npm — abbreviated metadata: dist-tags + per-version deprecated flag.
// Tripwire packages join the fetch set even when no detect row names them
// (react, solid-js) — they're watched solely for their condition.
const npmKeys = [...new Set([...graph.npm.keys(), ...graph.tripwires.map((t) => t.when.pkg)])];
const npmRes = await pool(npmKeys.map((pkg) => async () => {
  if (state.npm[pkg]?.gone) return state.npm[pkg];   // 404'd before (renamed/unpublished) — reported once, stay quiet
  try {
    const d = JSON.parse(await get(`https://registry.npmjs.org/${pkg.replace('/', '%2F')}`, 'application/vnd.npm.install-v1+json'));
    const latest = d['dist-tags']?.latest;
    return { latest, deprecated: Boolean(d.versions?.[latest]?.deprecated) };
  } catch (err) {
    if (/HTTP 404/.test(String(err))) return { gone: true, note: 'first seen 404 — renamed or unpublished; will not re-report' };
    throw err;
  }
}));
npmKeys.forEach((pkg, i) => {
  const r = npmRes[i];
  if (r.err) return failures.push(`npm ${pkg}: ${r.err}`);
  if (r.gone && !state.npm[pkg]?.gone) failures.push(`npm ${pkg}: 404 (renamed/unpublished) — recorded as gone, won't re-report`);
  const prev = state.npm[pkg];
  if (graph.npm.has(pkg)) {   // tripwire-only pkgs emit no version-change noise — only their condition matters
    if (prev && r.latest && prev.latest !== r.latest)
      events.push({ kind: 'npm', entries: graph.npm.get(pkg), what: `${pkg}  ${prev.latest} → ${r.latest}${r.deprecated ? '  (latest is DEPRECATED)' : ''}`, url: `https://registry.npmjs.org/${pkg}/latest` });
    else if (prev && !prev.deprecated && r.deprecated)
      events.push({ kind: 'npm', entries: graph.npm.get(pkg), what: `${pkg}  DEPRECATED flag flipped on npm (still ${r.latest})`, url: `https://registry.npmjs.org/${pkg}/latest` });
  }
  state.npm[pkg] = r;
});

// ── tripwires — the corpus's standing caveats, evaluated against the fresh data ─
// A fired tripwire is a WORK ITEM: do its `then:`, update the entry's prose, and
// REMOVE the row (removal prunes the fired-memory below, keeping state clean).
state.tripwires ||= {};
const armed = new Set();
for (const t of graph.tripwires) {
  const cond = t.when.atleast ? `atleast:${t.when.atleast}` : 'deprecated';
  const key = `${t.entry}:${t.when.pkg}:${cond}`;
  armed.add(key);
  const info = state.npm[t.when.pkg];
  if (info && !info.gone && !info.err && satisfiesTripwire(t.when, info) && !state.tripwires[key]) {
    state.tripwires[key] = { fired: TODAY, latest: info.latest };
    events.push({ kind: '⚡TRIP', entries: [t.entry], what: `${t.when.pkg} ${t.when.deprecated ? 'DEPRECATED flag flipped' : `reached ${info.latest} (≥ ${t.when.atleast})`} — ACT: ${t.then}`, url: `https://registry.npmjs.org/${t.when.pkg}/latest` });
  }
}
for (const k of Object.keys(state.tripwires)) if (!armed.has(k)) delete state.tripwires[k];

// github — releases.atom newest entry
const ghKeys = [...graph.github.keys()];
const ghRes = await pool(ghKeys.map((repo) => async () => {
  const newest = feedItems(await get(`https://github.com/${repo}/releases.atom`))[0];
  return { id: newest?.id || null, title: newest?.title || null, link: newest?.link || null };
}));
ghKeys.forEach((repo, i) => {
  const r = ghRes[i];
  if (r.err) return failures.push(`github ${repo}: ${r.err}`);
  const prev = state.github[repo];
  if (prev && r.id && prev.id !== r.id)
    events.push({ kind: 'release', entries: graph.github.get(repo), what: `${repo}: ${r.title}`, url: r.link || `https://github.com/${repo}/releases` });
  state.github[repo] = { id: r.id, title: r.title };
});

// blogs — autodiscover the feed once (cached in state, null = no feed), then poll
const blogKeys = [...graph.blogs.keys()];
const blogRes = await pool(blogKeys.map((host) => async () => {
  let feed = state.blogs[host]?.feed;
  if (feed === undefined) feed = discoverFeed(await get(`https://${host}/`).catch(() => ''), `https://${host}/`) || await probeFeed(host);
  if (!feed) return { feed: feed ?? null, items: [] };
  return { feed, items: feedItems(await get(feed)).slice(0, 20) };
}));
blogKeys.forEach((host, i) => {
  const r = blogRes[i];
  if (r.err) return failures.push(`blog ${host}: ${r.err}`);
  const prev = state.blogs[host];
  if (prev?.feed && r.items.length && prev.lastId) {
    const fresh = [];
    for (const it of r.items) { if (it.id === prev.lastId) break; fresh.push(it); }
    for (const it of fresh.slice(0, 3))
      events.push({ kind: 'post', entries: graph.blogs.get(host), what: `${host}: "${it.title}"`, url: it.link });
    if (fresh.length > 3) events.push({ kind: 'post', entries: graph.blogs.get(host), what: `${host}: +${fresh.length - 3} more new posts (high-volume feed — consider dropping this host)`, url: r.feed });
  }
  state.blogs[host] = { feed: r.feed ?? null, lastId: r.items[0]?.id || prev?.lastId || null };
});

state.updated = TODAY;
writeFileSync(STATE_FILE, JSON.stringify(state, null, 1) + '\n');

if (JSON_OUT) { console.log(JSON.stringify({ baseline: first, stats, events, failures }, null, 1)); process.exit(0); }

console.log(`harvest firsthand — ${stats}`);
const awaiting = Object.keys(state.tripwires || {}).length;
if (awaiting) console.log(`   ⚡ ${awaiting} fired tripwire(s) awaiting action — act on the then:, then remove the row from the entry`);
if (first) {
  console.log(`\nbaseline established (${STATE_FILE.split('/').pop()}) — commit it; next run reports deltas.`);
} else if (!events.length) {
  console.log('\nno new events since last run.');
} else {
  const byEntry = new Map();
  for (const ev of events) for (const id of ev.entries) (byEntry.get(id) || byEntry.set(id, []).get(id)).push(ev);
  console.log(`\n${events.length} event(s) since last run — triage like newsletter items:\n`);
  for (const [id, evs] of [...byEntry].sort()) {
    console.log(`${id}`);
    for (const ev of [...new Set(evs)]) console.log(`   ${ev.kind.padEnd(7)} ${ev.what}\n           ${ev.url}`);
  }
  console.log(`\nmanifest: tools/harvest-log/firsthand-${TODAY}.md (verify + disposition discipline apply; run with --manifest for a skeleton)`);
}
if (failures.length) console.log(`\n${failures.length} endpoint failure(s) (state kept for these):\n   ${failures.join('\n   ')}`);

if (MANIFEST && events.length) {
  const path = join(TOOLS, 'harvest-log', `firsthand-${TODAY}.md`);
  if (existsSync(path)) { console.error(`\nrefusing to overwrite ${path}`); process.exit(1); }
  const rows = [...new Set(events)].map((ev) => `| [${ev.what.replace(/\|/g, '·')}](${ev.url}) → ${ev.entries.join(', ')} | TODO |`).join('\n');
  writeFileSync(path, `# Harvest manifest — firsthand watch (${TODAY})\nissue: firsthand\n\nEvents from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).\nSame disposition discipline as newsletter manifests; verify before keeping.\n\n| event | disposition |\n|---|---|\n${rows}\n`);
  console.log(`\nwrote ${path}`);
}
