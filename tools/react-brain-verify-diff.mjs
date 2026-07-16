#!/usr/bin/env node
// ── react-brain harvest verify-diff — the receipts gate ────────────────────────
// "Fetch-verify every fact you keep" was the last prompt-enforced discipline in
// the acquisition pipeline — a sentence an autonomous harvester could silently
// skip while still writing "verified ✓" in its PR body. This makes it a gate:
// every URL ADDED by the branch (corpus entries, long-form docs, manifest `kept`
// rows) is re-verified by machine — direct fetch → Wayback snapshot — and any
// receipt that fails both tiers is a red exit. Changed manifests that carry an
// `issue: <url>` header also get the coverage gate re-run, so CI proves the
// extraction diff was clean instead of trusting that someone ran it.
//
//   node tools/react-brain-verify-diff.mjs [--base=main]
//
// Verdicts: ok (reachable) · archived (Wayback only — fine if the text says so,
// warned otherwise) · FAIL (no receipt anywhere → exit 1). registry.npmjs.org
// receipts are checked for package existence; added lines claiming a DEPRECATION
// are cross-checked against the npm deprecated flags in .firsthand-state.json
// (warning only — ecosystem-level deprecations are legitimately not npm flags).
// ───────────────────────────────────────────────────────────────────────────────

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { get, UA_BROWSER, pool, coverageCheck, waybackSnapshot } from './harvest-lib.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = ((process.argv.find((a) => a.startsWith('--base=')) || '').split('=')[1]) || 'main';
const SCOPE = ['skills/react-brain-mentor', 'encyclopedia', 'tools/harvest-log'];
const sh = (cmd) => execSync(cmd, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

// ── changed files + their ADDED lines ──────────────────────────────────────────
const tracked = sh(`git diff --name-only ${BASE} -- ${SCOPE.join(' ')}`).split('\n').filter(Boolean);
const untracked = sh(`git ls-files --others --exclude-standard -- ${SCOPE.join(' ')}`).split('\n').filter(Boolean);
const files = [...new Set([...tracked, ...untracked])].filter((f) => existsSync(join(ROOT, f)));

function addedLines(file) {
  if (untracked.includes(file)) return readFileSync(join(ROOT, file), 'utf8').split('\n');
  return sh(`git diff ${BASE} -- "${file}"`).split('\n')
    .filter((l) => l.startsWith('+') && !l.startsWith('+++')).map((l) => l.slice(1));
}

// ── collect URL claims from the added lines ─────────────────────────────────────
const URL_RE = /https?:\/\/[^\s)|\]"'`<>]+/g;
const trim = (u) => u.replace(/[.,;:]+$/, '');
const claims = new Map();   // url → Set(files)
const depLines = [];        // added lines claiming a deprecation (for the npm-flag cross-check)

for (const f of files) {
  const isManifest = f.startsWith('tools/harvest-log/');
  for (const line of addedLines(f)) {
    if (isManifest && (!/\*\*kept/i.test(line) || /^issue:/i.test(line.trim()))) continue;   // only kept rows claim receipts
    for (const m of line.matchAll(URL_RE)) {
      const url = trim(m[0]);
      if (/archive\.org/.test(url)) continue;   // the verification path itself
      (claims.get(url) || claims.set(url, new Set()).get(url)).add(f);
    }
    if (!isManifest && /deprecat/i.test(line)) depLines.push({ file: f, line: line.trim().slice(0, 160) });
  }
}

if (!claims.size && !files.some((f) => f.startsWith('tools/harvest-log/'))) {
  console.log(`harvest verify-diff — no URL claims added vs ${BASE}; nothing to verify`);
  process.exit(0);
}

// ── verify each claim: npm existence | direct fetch → wayback ───────────────────
const urls = [...claims.keys()];
const results = await pool(urls.map((url) => async () => {
  const npm = url.match(/^https?:\/\/registry\.npmjs\.org\/(.+?)(?:\/latest)?$/);
  if (npm) {
    try { await get(`https://registry.npmjs.org/${npm[1]}`, { accept: 'application/vnd.npm.install-v1+json' }); return { verdict: 'ok', how: 'npm registry' }; }
    catch (err) { return { verdict: 'FAIL', how: `registry: ${err}` }; }
  }
  try { await get(url, { ua: UA_BROWSER }); return { verdict: 'ok', how: 'direct fetch' }; }
  catch (err) {
    const snap = await waybackSnapshot(url);
    return snap ? { verdict: 'archived', how: snap } : { verdict: 'FAIL', how: `direct: ${err}; no Wayback snapshot` };
  }
}), 6);

const fails = [], warns = [], archived = [];
urls.forEach((url, i) => {
  const r = results[i], inFiles = [...claims.get(url)];
  if (r.err) { fails.push(`${url} — verifier error: ${r.err}`); return; }
  if (r.verdict === 'FAIL') fails.push(`${url}\n      (${inFiles.join(', ')}) — ${r.how}`);
  else if (r.verdict === 'archived') {
    const noted = inFiles.some((f) => addedLines(f).join(' ').match(/wayback/i));
    (noted ? archived : warns).push(`${url}\n      snapshot: ${r.how}${noted ? '' : `\n      (${inFiles.join(', ')}) — reachable ONLY via Wayback but the added text doesn't say so; note it`}`);
  }
});

// ── deprecation-claim coherence vs the firsthand npm flags (warning-only) ───────
const stateFile = join(ROOT, 'tools/.firsthand-state.json');
if (depLines.length && existsSync(stateFile)) {
  const npmState = JSON.parse(readFileSync(stateFile, 'utf8')).npm || {};
  const pkgs = Object.keys(npmState).sort((a, b) => b.length - a.length);
  for (const { file, line } of depLines) {
    const hit = pkgs.find((p) => line.includes(p));
    if (hit && npmState[hit].deprecated === false)
      warns.push(`"${line}" (${file})\n      mentions ${hit} + "deprecat…" but its npm deprecated flag is FALSE — fine if it's an ecosystem-level deprecation (SDK/docs), just confirm`);
  }
}

// ── re-run coverage for changed manifests that declare their issue URL ──────────
const coverage = [];
for (const f of files.filter((f) => f.startsWith('tools/harvest-log/') && f.endsWith('.md'))) {
  const head = readFileSync(join(ROOT, f), 'utf8').split('\n').slice(0, 10).join('\n');
  const issue = head.match(/^issue:\s*(https?:\/\/\S+)/m)?.[1];
  if (!issue) { coverage.push({ f, note: 'no `issue: <url>` header — coverage not re-runnable (fine for firsthand manifests)' }); continue; }
  try {
    const { total, missing } = await coverageCheck(issue, join(ROOT, f));
    if (missing.length) fails.push(`coverage ${f}: ${missing.length} of ${total} page link(s) unaccounted:\n      ${missing.map((l) => l.url).join('\n      ')}`);
    else coverage.push({ f, note: `coverage ✓ (${total} page links all dispositioned)` });
  } catch (err) { warns.push(`coverage ${f}: issue page unfetchable from here (${String(err).slice(0, 80)}) — run locally`); }
}

// ── report ──────────────────────────────────────────────────────────────────────
const ok = urls.length - fails.filter((x) => !x.startsWith('coverage')).length - warns.filter((x) => x.startsWith('http')).length - archived.length;
console.log(`harvest verify-diff vs ${BASE} — ${files.length} changed file(s), ${urls.length} added URL claim(s)`);
console.log(`   ok ${ok} · archived-and-noted ${archived.length} · warnings ${warns.length} · failures ${fails.length}`);
for (const c of coverage) console.log(`   ${c.f}: ${c.note}`);
if (archived.length) console.log(`\narchived (noted in text — fine):\n   ${archived.join('\n   ')}`);
if (warns.length) console.log(`\n⚠ warnings:\n   ${warns.join('\n   ')}`);
if (fails.length) {
  console.log(`\n✗ RECEIPTS FAILED — a kept fact's URL must be reachable (direct or Wayback) before it merges:\n   ${fails.join('\n   ')}`);
  process.exit(1);
}
console.log('\n✓ every added receipt checks out');
