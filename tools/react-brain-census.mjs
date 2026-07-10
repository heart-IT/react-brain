#!/usr/bin/env node
// ── react-brain census — observed adoption across real production apps ─────────
// The corpus's OTHER empirical anchor. `signals` asks npm (downloads — gameable:
// the 2026-07 Lovable-CI inflation proved a 60x "surge" can be one vendor's
// pipeline). census asks SHIPPED SOFTWARE: fetch the package.json of a curated
// cohort of active production OSS React/RN apps, run the corpus's own detectors
// over them, and report per-entry adoption — plus what CHANGED since the last
// snapshot (the pulse-baseline pattern → adoption *velocity* over time).
// Read-only by construction; feeds challenge/signals/entries as evidence.
//
//   node tools/react-brain-census.mjs [--json] [--cohort=path] [--today=YYYY-MM-DD]
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { matchDetector, loadEntries, GROUP_ORDER } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const ARGS = process.argv.slice(2);
const JSON_OUT = ARGS.includes('--json');
const COHORT_PATH = (ARGS.find((a) => a.startsWith('--cohort=')) || '').slice(9) || resolve(__dir, 'census-cohort.json');
const TODAY = (ARGS.find((a) => a.startsWith('--today=')) || '').slice(8) || new Date().toISOString().slice(0, 10);
const BASELINE_PATH = resolve(__dir, '.census-baseline.json');

const cohort = JSON.parse(readFileSync(COHORT_PATH, 'utf8'));
const entriesById = loadEntries();

// ── fetch the cohort's package.json files (concurrency-limited, loud failures) ──
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36 react-brain-census/0.1' };
async function fetchApp(app) {
  const url = `https://raw.githubusercontent.com/${app.repo}/${app.branch}/${app.path}`;
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
    if (!r.ok) return { ...app, error: `HTTP ${r.status}` };
    const pkg = await r.json();
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    return { ...app, deps };
  } catch (e) { return { ...app, error: e.name === 'TimeoutError' ? 'timeout' : (e.message || 'fetch failed').slice(0, 60) }; }
}
async function pool(items, n, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]); }
  }));
  return out;
}

const results = await pool(cohort.apps, 6, fetchApp);
const ok = results.filter((r) => r.deps);
const failed = results.filter((r) => r.error);

// ── detect: deps → entry-mapped stack facts, per app ────────────────────────────
const apps = {};   // id -> { name, platform, matches: {entryId: Set(label)} }
for (const r of ok) {
  const platform = r.deps['react-native'] ? 'react-native' : 'react';
  const matches = {};
  for (const dep of Object.keys(r.deps)) {
    const m = matchDetector(dep);              // DETECTORS row: [pkg, entryId, label, token]
    if (!m) continue;
    const [, entryId, label] = m;
    (matches[entryId] || (matches[entryId] = new Set())).add(label);
  }
  apps[r.id] = { name: r.name, platform, matches };
}
const rnApps = Object.values(apps).filter((a) => a.platform === 'react-native').length;
const webApps = ok.length - rnApps;

// denominator honesty: an RN-only entry is measured against RN apps, web-only vs web apps
const denomFor = (entry) => {
  const p = entry?.platforms || [];
  if (p.length === 1 && p[0] === 'react-native') return rnApps;
  if (p.length === 1 && p[0] === 'react') return webApps;
  return ok.length;
};

// ── aggregate per entry: app coverage + per-label adoption ──────────────────────
const agg = {};    // entryId -> { appCount, labels: {label: count}, denom }
for (const [, a] of Object.entries(apps)) {
  for (const [entryId, labels] of Object.entries(a.matches)) {
    const e = (agg[entryId] || (agg[entryId] = { appCount: 0, labels: {} }));
    e.appCount++;
    for (const l of labels) e.labels[l] = (e.labels[l] || 0) + 1;
  }
}
for (const id of Object.keys(agg)) agg[id].denom = denomFor(entriesById[id]);

// ── diff vs the last snapshot (adoption velocity) ───────────────────────────────
// snapshot carries the per-app label sets (for diffing) AND the aggregates + cohort meta
// (so the site's /census page builds straight from this file, like /libraries does from
// .signals-baseline.json). agg is attached after it's computed below.
const snapshot = { date: TODAY, cohort: { fetched: ok.length, total: cohort.apps.length, rn: rnApps, web: webApps },
  apps: Object.fromEntries(Object.entries(apps).map(([id, a]) =>
    [id, { name: a.name, platform: a.platform, labels: Object.values(a.matches).flatMap((s) => [...s]).sort() }])) };
snapshot.agg = agg;
const changes = [];
let baseline = null;
if (existsSync(BASELINE_PATH)) {
  baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  for (const [id, cur] of Object.entries(snapshot.apps)) {
    const prev = baseline.apps?.[id];
    if (!prev) { changes.push(`+ ${id}: new in cohort`); continue; }
    const added = cur.labels.filter((l) => !prev.labels.includes(l));
    const removed = prev.labels.filter((l) => !cur.labels.includes(l));
    if (added.length) changes.push(`~ ${id}: adopted ${added.join(', ')}`);
    if (removed.length) changes.push(`~ ${id}: dropped ${removed.join(', ')}`);
  }
  for (const id of Object.keys(baseline.apps || {})) if (!snapshot.apps[id]) changes.push(`- ${id}: left cohort / fetch failed`);
}
writeFileSync(BASELINE_PATH, JSON.stringify(snapshot, null, 1));

// ── report ──────────────────────────────────────────────────────────────────────
if (JSON_OUT) { console.log(JSON.stringify({ date: TODAY, cohort: ok.length, rnApps, webApps, failed: failed.map((f) => f.id), agg }, null, 2)); process.exit(0); }

const pct = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
console.log(`\n${'═'.repeat(78)}\n🏙   react-brain CENSUS — observed adoption in shipped apps   (as of ${TODAY})\n${'═'.repeat(78)}`);
console.log(`cohort: ${ok.length}/${cohort.apps.length} fetched (${rnApps} RN · ${webApps} web/desktop)${failed.length ? `  ·  ⚠ failed: ${failed.map((f) => `${f.id}(${f.error})`).join(', ')}` : ''}`);
console.log(`downloads can be gamed; shipped dependency choices can't. Read counts as evidence, not verdicts.`);

const ordered = Object.keys(agg).sort((a, b) =>
  GROUP_ORDER.indexOf(entriesById[a]?.group) - GROUP_ORDER.indexOf(entriesById[b]?.group) || a.localeCompare(b));
let lastGroup = null;
for (const id of ordered) {
  const e = agg[id];
  const group = entriesById[id]?.group;
  if (group !== lastGroup) { console.log(`\n  ── ${group} ${'─'.repeat(Math.max(0, 60 - group.length))}`); lastGroup = group; }
  const labels = Object.entries(e.labels).sort((a, b) => b[1] - a[1])
    .map(([l, n]) => `${l} ×${n}`).join(' · ');
  console.log(`  ${id.replace('RB-E-', '').padEnd(16)} ${String(e.appCount).padStart(2)}/${e.denom} apps (${pct(e.appCount, e.denom).padStart(4)})  ${labels}`);
}

console.log(`\n${'─'.repeat(78)}\nCHANGES since last snapshot${baseline ? ` (${baseline.date})` : ''}\n${'─'.repeat(78)}`);
if (!baseline) console.log('  (first run — baseline written; the next census reports adoption deltas)');
else if (!changes.length) console.log('  none — cohort stacks unchanged');
else for (const c of changes) console.log(`  ${c}`);
console.log(`\nbaseline → ${BASELINE_PATH.split('/').slice(-2).join('/')}\n`);
