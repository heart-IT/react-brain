#!/usr/bin/env node
// ── react-brain pulse ──────────────────────────────────────────────────────────
// The autonomy layer: turns the corpus from a snapshot into a self-maintaining
// system. Deterministic health + drift checks (no agents). Designed to run on a
// schedule (see tools/pulse-routine.md for the agentic growth half).
//
//   §1 LINK HEALTH — every reading/source URL: ok / DEAD(404) / blocked(403) / unreachable
//   §2 STALENESS   — per-entry `updated:` age + entries with no freshness stamp
//   §3 DRIFT       — detect across given repos, diff vs a stored baseline
//
// GUARDRAIL: pulse PROPOSES (reports). It never edits the corpus. Deterministic flags
// are safe to surface; knowledge changes stay a human-reviewed diff.
//
// Usage:  node tools/react-brain-pulse.mjs [--today=YYYY-MM-DD] [--no-links] [repo ...]
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadEntries, analyzeRepo } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const BASELINE = resolve(__dir, '.pulse-baseline.json');

const args = process.argv.slice(2);
const todayArg = args.find((a) => a.startsWith('--today='));
const today = todayArg ? new Date(todayArg.split('=')[1] + 'T00:00:00Z') : new Date();
const noLinks = args.includes('--no-links');
const repos = args.filter((a) => !a.startsWith('--'));
const ageDays = (d) => Math.round((today - new Date(d + 'T00:00:00Z')) / 86400000);

const entries = loadEntries();
const list = Object.values(entries);
console.log(`\n${'═'.repeat(78)}`);
console.log(`💓  react-brain PULSE — corpus health & drift   (today=${today.toISOString().slice(0, 10)})`);
console.log(`${'═'.repeat(78)}`);
console.log(`${list.length} entries · guardrail: pulse PROPOSES, never rewrites.`);

// ── §1 LINK HEALTH ──────────────────────────────────────────────────────────
function classify(s) {
  if (s >= 200 && s < 400) return 'ok';
  if (s === 404 || s === 410) return 'DEAD';
  if (s === 401 || s === 403 || s === 429) return 'blocked';
  if (s >= 500) return 'server';
  if (s === 0) return 'unreachable';
  return 'other';
}
async function checkUrl(url) {
  // Browser-ish UA: many hosts (medium.com, personal blogs behind bot-gates) 403/timeout a
  // tool UA but serve a browser one fine — the same lesson as the harvest playbook's curl -A
  // fallback (tools/upkeep-routine.md). Cuts false "unreachable/blocked" noise from §1.
  const opt = (m, ms) => ({ method: m, redirect: 'follow', signal: AbortSignal.timeout(ms), headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 react-brain-pulse/0.1' } });
  try {
    let r = await fetch(url, opt('HEAD', 9000));
    if ([403, 405, 501, 0].includes(r.status)) { try { r = await fetch(url, opt('GET', 13000)); } catch { /* keep HEAD result */ } }
    return { url, status: r.status, klass: classify(r.status) };
  } catch (e) { return { url, status: 0, klass: 'unreachable', err: e.code || e.name || String(e.message || e).slice(0, 32) }; }
}
async function pool(items, n, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]); }
  }));
  return out;
}

const urlMap = new Map(); // url -> {entries:Set, kind:'reading'|'source'|'watching'}
for (const e of list) {
  for (const u of (e.sources || [])) { (urlMap.get(u) || urlMap.set(u, { entries: new Set(), kind: 'source' }).get(u)).entries.add(e.id); }
  for (const r of (e.reading || [])) { (urlMap.get(r.url) || urlMap.set(r.url, { entries: new Set(), kind: 'reading' }).get(r.url)).entries.add(e.id); }
  for (const w of (e.watching || [])) { (urlMap.get(w.url) || urlMap.set(w.url, { entries: new Set(), kind: 'watching' }).get(w.url)).entries.add(e.id); }
}
const urls = [...urlMap.keys()];

console.log(`\n${'─'.repeat(78)}\n§1  LINK HEALTH — ${urls.length} unique reading/source URLs\n${'─'.repeat(78)}`);
if (noLinks) {
  console.log('  (skipped: --no-links)');
} else {
  const results = await pool(urls, 8, checkUrl);
  const netErr = results.filter((r) => r.klass === 'unreachable' && ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED'].includes(r.err)).length;
  if (netErr === results.length && results.length) {
    console.log(`  ⚠ network unavailable in this environment (all fetches failed: ${results[0]?.err}).`);
    console.log(`    Run where outbound HTTP is allowed to get the link report. Staleness + drift below still valid.`);
  } else {
    const by = { DEAD: [], server: [], blocked: [], unreachable: [], other: [], ok: [] };
    for (const r of results) by[r.klass].push(r);
    const show = (k, label) => { if (by[k].length) { console.log(`\n  ${label} (${by[k].length}):`); for (const r of by[k]) console.log(`    ${String(r.status || r.err).padEnd(14)}${r.url}  [${[...urlMap.get(r.url).entries].map((x) => x.replace('RB-E-', '')).join(',')}]`); } };
    console.log(`  ok: ${by.ok.length}  ·  DEAD: ${by.DEAD.length}  ·  blocked: ${by.blocked.length}  ·  unreachable: ${by.unreachable.length}  ·  5xx: ${by.server.length}`);
    show('DEAD', '❌ DEAD — replace/remove (404/410)');
    show('server', '⚠ server error (5xx) — recheck');
    show('unreachable', '⚠ unreachable (timeout/DNS) — recheck');
    show('blocked', 'ℹ blocked (401/403/429) — likely live behind bot-protection; spot-check');
  }
}

// ── §2 STALENESS ────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(78)}\n§2  STALENESS — freshness of each entry's facts (today=${today.toISOString().slice(0, 10)})\n${'─'.repeat(78)}`);
// warn windows (days) by status/confidence — low-confidence = fast-moving = shorter
const windowFor = (e) => (e.confidence === 'low' ? 60 : e.status === 'reviewed' ? 180 : 120);
const dated = list.filter((e) => e.updated).map((e) => ({ e, age: ageDays(e.updated) }));
const aging = dated.filter((x) => x.age > windowFor(x.e)).sort((a, b) => b.age - a.age);
const undated = list.filter((e) => !e.updated).sort((a, b) => a.id.localeCompare(b.id));
console.log(`  dated: ${dated.length}  ·  undated (no \`updated:\`): ${undated.length}  ·  aging past window: ${aging.length}`);
if (aging.length) {
  console.log(`\n  ⏰ AGING past freshness window (status/conf-calibrated):`);
  for (const { e, age } of aging) console.log(`    ${String(age + 'd').padEnd(7)}${e.id.replace('RB-E-', '').padEnd(18)}${e.status}·${e.confidence} (window ${windowFor(e)}d)`);
}
if (undated.length) {
  console.log(`\n  📅 NO freshness stamp (\`updated: null\`) — can't track rot; add a date when next verified:`);
  console.log(`    ${undated.map((e) => e.id.replace('RB-E-', '')).join(', ')}`);
}

// ── §3 DRIFT ────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(78)}\n§3  DRIFT — corpus recommendations vs your apps' actual stacks\n${'─'.repeat(78)}`);
if (!repos.length) {
  console.log('  (no repos passed — give app paths to enable drift watch)');
} else {
  const live = repos.map(analyzeRepo).filter((a) => a && !a.missing && !a.notReact);
  const fp = {}; // repo -> { entryId: labels }
  for (const a of live) { fp[a.name] = {}; for (const [id, info] of Object.entries(a.byEntry)) fp[a.name][id] = [...info.labels].sort().join(', '); }
  const prev = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : null;
  if (!prev) {
    console.log(`  baseline established for ${live.length} repo(s): ${live.map((a) => a.name).join(', ')}.`);
    console.log(`  → drift (added/removed/changed ecosystem choices) will report on the next run.`);
  } else {
    let any = false;
    for (const a of live) {
      const now = fp[a.name] || {}, was = prev.fingerprints?.[a.name] || {};
      const ids = new Set([...Object.keys(now), ...Object.keys(was)]);
      const deltas = [];
      for (const id of ids) {
        if (!was[id] && now[id]) deltas.push(`+ ${id.replace('RB-E-', '')}: ${now[id]}`);
        else if (was[id] && !now[id]) deltas.push(`- ${id.replace('RB-E-', '')}: (removed) was ${was[id]}`);
        else if (was[id] !== now[id]) deltas.push(`~ ${id.replace('RB-E-', '')}: ${was[id]} → ${now[id]}`);
      }
      if (deltas.length) { any = true; console.log(`\n  ${a.name} (since ${prev.date}):`); for (const d of deltas) console.log(`    ${d}`); }
    }
    if (!any) console.log(`  no stack drift since baseline (${prev.date}).`);
  }
  writeFileSync(BASELINE, JSON.stringify({ date: today.toISOString().slice(0, 10), fingerprints: fp }, null, 2));
  console.log(`\n  baseline updated → ${BASELINE.replace(resolve(__dir, '..') + '/', '')}`);
}

console.log(`\n${'─'.repeat(78)}\nNEXT ACTIONS (proposed — review, don't auto-apply knowledge changes)\n${'─'.repeat(78)}`);
console.log(`  • Fix/replace any DEAD links; spot-check blocked ones.`);
console.log(`  • Add \`updated:\` to undated entries so rot is trackable.`);
console.log(`  • For autonomous growth (pull new newsletter issues + verify), wire`);
console.log(`    tools/pulse-routine.md into /schedule (weekly). pulse stays propose-only.\n`);
