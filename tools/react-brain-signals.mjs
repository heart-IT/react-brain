#!/usr/bin/env node
// ── react-brain signals ────────────────────────────────────────────────────────
// The EMPIRICAL anchor. Every other trust primitive is self-refereed — evidence
// (vs 3 repos), challenge (an LLM arguing with itself), calibrate (scoring its own
// verdicts), pulse (link liveness). signals is the one EXTERNAL check: it grounds the
// encyclopedia's editorial picks in live npm telemetry and flags where opinion and
// market reality have diverged. Opinion → evidence.
//
// It also AUTOMATES the quantitative half of the manual verification passes (last
// publish, download volume, "is this actually in maintenance?") — zero LLM.
//
// For each entry it resolves the options to npm packages (reusing DETECTORS), fetches
// weekly downloads + (where it matters) last-publish, and raises three flags:
//   TRAILING  — the recommended default is badly out-downloaded by an alternative
//   STALE     — a recommended default hasn't published in >12mo (early warning)
//   CLAIM     — an entry calls a lib "maintenance/deprecated" but it just shipped
// Writes tools/.signals-baseline.json so later runs show ↑/↓ download deltas (pulse pattern).
//
// A confirmed CLAIM is a hard, deterministic contradiction (the corpus says a lib is in
// maintenance; npm says it just shipped) — so it can close the loop into the calibration
// ledger as a `weakened` verdict. Propose-only by default (knowledge changes are reviewed,
// per the project ethos); `--record` opts in to actually appending. CLAIM only — TRAILING/
// STALE are softer "verify" prompts and stay printed, never auto-recorded.
//
// Usage:
//   node tools/react-brain-signals.mjs [--today=YYYY-MM-DD]   fetch + report + snapshot
//   node tools/react-brain-signals.mjs --record              also append CLAIM contradictions to the ledger
//   node tools/react-brain-signals.mjs --list                 resolve packages only (no network)
//   node tools/react-brain-signals.mjs --no-registry          skip last-publish (downloads only)
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadDoc, entryPackages, pkgsForPick, GROUP_ORDER, trunc, readLedger, LEDGER_PATH } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const BASELINE = resolve(__dir, '.signals-baseline.json');
const MAINT_RE = /maintenance|deprecated|frozen|sunset|superseded|abandoned|unmaintained|no longer/i;
const STALE_MONTHS = 12;       // a recommended default silent this long → early warning
const FRESH_MONTHS = 6;        // "maintenance" claim contradicted if published within this

const flags = process.argv.slice(2);
const today = (flags.find((f) => f.startsWith('--today=')) || '').split('=')[1] || new Date().toISOString().slice(0, 10);
const LIST = flags.includes('--list');
const NO_REG = flags.includes('--no-registry');
const RECORD = flags.includes('--record');

const fmt = (n) => n == null ? '   —  ' : n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const monthsBetween = (iso) => {
  if (!iso) return null;
  const a = new Date(iso), b = new Date(today + 'T00:00:00Z');
  return Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24 * 30.44)));
};
const ageStr = (m) => m == null ? '?' : m < 1 ? 'days' : m < 24 ? `${m}mo` : `${(m / 12).toFixed(0)}y`;

async function getJSON(url, ms = 9000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { 'user-agent': 'react-brain-signals' } });
    return r.ok ? await r.json() : null;
  } catch { return null; } finally { clearTimeout(t); }
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); }
  }));
  return out;
}
const regName = (pkg) => pkg.startsWith('@') ? pkg.replace('/', '%2F') : pkg;

// The downloads point API rate-limits bursts, so use the BULK form for unscoped packages
// (one call per ≤128) and fall back to individual calls for scoped ones (bulk rejects @scope/*).
async function fetchDownloads(pkgs) {
  const out = {};
  const scoped = pkgs.filter((p) => p.startsWith('@'));
  const plain = pkgs.filter((p) => !p.startsWith('@'));
  for (let i = 0; i < plain.length; i += 100) {
    const chunk = plain.slice(i, i + 100);
    const res = await getJSON(`https://api.npmjs.org/downloads/point/last-week/${chunk.join(',')}`);
    for (const p of chunk) out[p] = res ? (res[p]?.downloads ?? (res.package === p ? res.downloads : null)) : null;
  }
  await mapLimit(scoped, 4, async (p) => {
    let n = (await getJSON(`https://api.npmjs.org/downloads/point/last-week/${p}`))?.downloads;
    if (n == null) n = (await getJSON(`https://api.npmjs.org/downloads/point/last-week/${p}`))?.downloads; // 1 retry
    out[p] = n ?? null;
  });
  return out;
}
async function lastPublish(pkg) {
  let doc = await getJSON(`https://registry.npmjs.org/${regName(pkg)}`);
  if (!doc?.time) doc = await getJSON(`https://registry.npmjs.org/${regName(pkg)}`); // 1 retry
  if (!doc?.time) return null;
  const latest = doc['dist-tags']?.latest;
  return doc.time[latest] || doc.time.modified || null;
}

// ── resolve the corpus → the package candidate set ────────────────────────────────
// A detect label that itself marks retirement ("CodePush (retired service)",
// "@expo/vector-icons (deprecated SDK 56)", "(legacy)", "(dormant)") is the corpus
// SAYING the package is dead — flagging it as a stale default or a trailing
// alternative would contradict the corpus's own verdict, so those rows are
// listed but never default-candidates and never flagged.
const RETIRED_LABEL_RE = /retired|deprecated|legacy|dormant|unmaintained|superseded/i;
const entries = loadDoc().entries;
const rows = [];   // { entryId, group, pkg, label, isDefault, retired }
for (const e of entries) {
  const pkgs = entryPackages(e.id);
  if (!pkgs.length) continue;
  const defSet = new Set(pkgsForPick(e.id, e.recommend?.default || ''));
  const text = [e.note, e.recommend?.default, ...(e.recommend?.when || [])].filter(Boolean).join(' ');
  for (const { pkg, label } of pkgs) {
    const retired = RETIRED_LABEL_RE.test(label);
    rows.push({ entryId: e.id, group: e.group, pkg, label, isDefault: !retired && defSet.has(pkg), retired });
  }
  e._text = text;
}
const uniquePkgs = [...new Set(rows.map((r) => r.pkg))];

if (LIST) {
  console.log(`\n${rows.length} option packages across ${new Set(rows.map((r) => r.entryId)).size} entries (${uniquePkgs.length} unique):\n`);
  let last = null;
  for (const r of rows.sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.entryId.localeCompare(b.entryId))) {
    if (r.entryId !== last) { console.log(`  ${r.entryId}`); last = r.entryId; }
    console.log(`    ${r.isDefault ? '▸' : ' '} ${r.pkg}`);
  }
  console.log('');
  process.exit(0);
}

// ── fetch ─────────────────────────────────────────────────────────────────────────
console.log(`\nfetching npm downloads for ${uniquePkgs.length} packages…`);
const dl = await fetchDownloads(uniquePkgs);

// last-publish only where it pays: recommended defaults + packages in "maintenance"-claim entries
const needAge = new Set();
for (const r of rows) if (r.isDefault) needAge.add(r.pkg);
const claimEntries = new Set(entries.filter((e) => MAINT_RE.test(e._text || '')).map((e) => e.id));
for (const r of rows) if (claimEntries.has(r.entryId)) needAge.add(r.pkg);
const age = {};
if (!NO_REG) {
  const list = [...needAge];
  console.log(`fetching last-publish for ${list.length} packages (defaults + maintenance-claim entries)…`);
  (await mapLimit(list, 6, async (p) => [p, monthsBetween(await lastPublish(p))])).forEach(([p, m]) => { age[p] = m; });
}

const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : null;
const delta = (pkg) => {
  if (!base || base[pkg] == null || dl[pkg] == null) return '';
  const d = dl[pkg] - base[pkg];
  if (Math.abs(d) < base[pkg] * 0.03) return ' →';        // <3% = flat
  return d > 0 ? ' ↑' : ' ↓';
};

// ── per-entry report + flags ────────────────────────────────────────────────────
console.log(`\n${'━'.repeat(78)}`);
console.log(`📡  react-brain signals — recommendations vs live npm reality  (as of ${today})`);
console.log(`${'━'.repeat(78)}`);
const dlGot = uniquePkgs.filter((p) => dl[p] != null).length;
const ageGot = [...needAge].filter((p) => age[p] != null).length;
console.log(`coverage: downloads ${dlGot}/${uniquePkgs.length}${NO_REG ? '' : ` · last-publish ${ageGot}/${needAge.size}`}${dlGot < uniquePkgs.length ? '   ⚠ partial — rate-limited? re-run for full coverage' : ''}`);

const FLAGS = [];
const claims = [];   // confirmed CLAIM contradictions → candidate `weakened` verdicts for the ledger
const byEntry = {};
for (const r of rows) (byEntry[r.entryId] ||= []).push(r);
const ordered = Object.keys(byEntry).sort((a, b) => GROUP_ORDER.indexOf(byEntry[a][0].group) - GROUP_ORDER.indexOf(byEntry[b][0].group) || a.localeCompare(b));

for (const id of ordered) {
  const opts = byEntry[id].filter((r) => dl[r.pkg] != null).sort((a, b) => (dl[b.pkg] || 0) - (dl[a.pkg] || 0));
  if (!opts.length) continue;
  const top = opts.find((r) => !r.retired) || opts[0];   // a retired pkg out-downloading the default is expected, not a flag
  const defs = opts.filter((r) => r.isDefault);
  const defTop = defs.sort((a, b) => (dl[b.pkg] || 0) - (dl[a.pkg] || 0))[0];

  console.log(`\n  ${id.replace('RB-E-', '')}`);
  for (const r of opts) {
    const a = age[r.pkg];
    const ageTxt = a == null ? '' : `  published ${ageStr(a)} ago`;
    const mark = r.isDefault ? '▸' : ' ';
    console.log(`    ${mark} ${r.pkg.padEnd(34)} ${fmt(dl[r.pkg]).padStart(6)}/wk${delta(r.pkg).padEnd(2)}${ageTxt}`);
  }

  // FLAG: trailing default (popularity ≠ fitness, but worth knowing)
  if (defTop && top.pkg !== defTop.pkg && (dl[top.pkg] || 0) >= 2 * (dl[defTop.pkg] || 1)) {
    FLAGS.push(['TRAILING', id, `default ${defTop.pkg} (${fmt(dl[defTop.pkg])}/wk) is out-downloaded ${(dl[top.pkg] / (dl[defTop.pkg] || 1)).toFixed(1)}× by ${top.pkg} (${fmt(dl[top.pkg])}/wk) — confirm fit still beats popularity`]);
  }
  // FLAG: stale default
  for (const r of defs) if (age[r.pkg] != null && age[r.pkg] > STALE_MONTHS) {
    FLAGS.push(['STALE', id, `recommended default ${r.pkg} last published ${ageStr(age[r.pkg])} ago — verify it's not drifting to maintenance`]);
  }
  // FLAG: maintenance claim vs reality (proximity of a maint keyword to an option's label)
  if (claimEntries.has(id)) {
    const e = entries.find((x) => x.id === id);
    const txt = (e._text || '');
    for (const r of opts) {
      const li = txt.toLowerCase().indexOf(r.label.toLowerCase());
      if (li < 0) continue;
      const win = txt.slice(Math.max(0, li - 70), li + r.label.length + 70);
      if (MAINT_RE.test(win) && age[r.pkg] != null && age[r.pkg] <= FRESH_MONTHS) {
        FLAGS.push(['CLAIM', id, `entry calls ${r.label} maintenance/deprecated, but ${r.pkg} published ${ageStr(age[r.pkg])} ago — re-check the claim`]);
        claims.push({ id, pkg: r.pkg, age: age[r.pkg] });
      }
    }
  }
}

console.log(`\n${'─'.repeat(78)}`);
if (FLAGS.length) {
  console.log(`  FLAGS (${FLAGS.length}) — where editorial opinion and live data diverge:`);
  const sym = { TRAILING: '⚠', STALE: '⚠', CLAIM: '✗' };
  for (const [k, id, msg] of FLAGS) console.log(`  ${sym[k]} ${k.padEnd(9)} ${id.replace('RB-E-', '')}: ${msg}`);
  console.log(`\n  → feed challenge/calibrate: each flag is a candidate for \`calibrate --record\` or a re-challenge.`);
} else {
  console.log(`  No flags — every recommended default leads or holds on the live data. ✓`);
}

// CLAIM → calibration ledger. A confirmed maintenance-claim contradiction is hard enough to
// log as `weakened`. Propose-only unless --record; idempotent (skip ids already weakened by signals).
if (claims.length) {
  const already = new Set(readLedger().filter((r) => r.k === 'O' && r.outcome === 'weakened' && (r.note || '').startsWith('signals:')).map((r) => r.id));
  const fresh = claims.filter((c) => !already.has(c.id));
  console.log(`\n${'─'.repeat(78)}`);
  console.log(`  CLAIM → CALIBRATE  (a live-data contradiction = a 'weakened' verdict)`);
  if (!fresh.length) {
    console.log(`  ${claims.length} CLAIM(s), all already recorded from a prior signals run — nothing to add.`);
  } else if (RECORD) {
    for (const c of fresh) appendFileSync(LEDGER_PATH, JSON.stringify({ k: 'O', id: c.id, outcome: 'weakened', on: today, note: `signals: ${c.pkg} published ${ageStr(c.age)} ago vs a maintenance/deprecated claim` }) + '\n');
    console.log(`  recorded ${fresh.length} weakened verdict(s) → predictions.jsonl. See \`react-brain calibrate\`.`);
  } else {
    console.log(`  propose-only — re-run with --record to append (knowledge changes are reviewed):`);
    for (const c of fresh) console.log(`    • ${c.id.replace('RB-E-', '')} → weakened   (${c.pkg} fresh vs maintenance claim)`);
  }
}

if (!base) console.log(`\n  (baseline set — re-run later for ↑/↓ download trends)`);
const fetched = Object.fromEntries(uniquePkgs.filter((p) => dl[p] != null).map((p) => [p, dl[p]]));
writeFileSync(BASELINE, JSON.stringify(fetched, null, 0) + '\n');
console.log('');
