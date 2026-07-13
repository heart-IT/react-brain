#!/usr/bin/env node
// ── react-brain review — diff-scoped corpus review (the CI-able layer) ─────────
// doctor reviews the REPO; this reviews the CHANGE. Two diff-scoped checks, every
// finding citing the corpus:
//
//   DEPENDENCY DELTA   adds vs --base: a dep the corpus marks dead/deprecated is
//                      BLOCKING (adding CodePush in 2026); superseded/↗-fit adds
//                      warn with the context pick; adds that trigger a tagged
//                      reading claim surface it (add axios w/o a cache → the
//                      why-you-want-react-query claim).
//   INTRODUCED BY DIFF detect_source smells + legacy core-RN-API imports that
//                      match the NEW version of a changed file but NOT its --base
//                      version — pre-existing debt in a touched file never nags.
//
// --ci exits 1 on blocking findings only (warnings pass). Deterministic, no LLM.
//
//   node tools/react-brain-review.mjs <repo> [--base=<ref>] [--ci] [--json]
//   (default --base=HEAD: reviews the uncommitted working-tree change)
// ───────────────────────────────────────────────────────────────────────────────

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { loadEntries, analyzeRepo, fit, trunc, matchDetector, adviseReadings,
         loadModernDefaults, rnNamedImports, minVer, verLt } from './detect.mjs';

const argv = process.argv.slice(2);
const BASE = (argv.find((a) => a.startsWith('--base=')) || '--base=HEAD').split('=')[1];
const CI = argv.includes('--ci');
const JSON_OUT = argv.includes('--json');
const targets = argv.filter((a) => !a.startsWith('--'));
if (targets.length !== 1) { console.error('usage: node tools/react-brain-review.mjs <repoPath> [--base=<ref>] [--ci] [--json]'); process.exit(1); }
const REPO = targets[0];

const entries = loadEntries();
const short = (id) => (id ? id.replace('RB-E-', '') : '');
const RETIRED_RE = /retired|deprecated|legacy|dormant|superseded/i;
const SRC_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const MAX_BYTES = 512 * 1024;

const a = analyzeRepo(REPO);
if (a.missing || a.notReact) { console.error(`(${a.name}: ${a.missing ? (a.malformed ? 'malformed package.json' : 'no package.json') : 'not a React/RN repo'})`); process.exit(1); }

const git = (...args) => execFileSync('git', ['-C', a.path, ...args], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
let prefix;
try { prefix = git('rev-parse', '--show-prefix'); }
catch { console.error('review needs a git repo (the diff IS the review surface)'); process.exit(1); }
let baseOk = true;
try { git('rev-parse', '--verify', `${BASE}^{commit}`); } catch { baseOk = false; }
if (!baseOk) { console.error(`base ref '${BASE}' not found — pass --base=<ref> (e.g. origin/main, HEAD~1)`); process.exit(1); }
const show = (rel) => { try { return git('show', `${BASE}:${prefix}${rel}`); } catch { return null; } };

// ── dependency delta ────────────────────────────────────────────────────────────
const basePkgRaw = show('package.json');
let baseDeps = {};
try { const p = JSON.parse(basePkgRaw || '{}'); baseDeps = { ...(p.dependencies || {}), ...(p.devDependencies || {}) }; } catch { /* new/renamed package.json — treat all as added */ }
const added = Object.keys(a.deps).filter((d) => !(d in baseDeps));
const removed = Object.keys(baseDeps).filter((d) => !(d in a.deps));

const globHit = (pat, name) => pat.endsWith('*') ? name.startsWith(pat.slice(0, -1)) : name === pat;
const migrateRuleFor = (pkg, ver) => {
  for (const e of Object.values(entries)) {
    for (const r of e.migrate || []) {
      if (!globHit(r.from.pkg, pkg)) continue;
      if (r.from.below) { const iv = minVer(ver); if (!iv || !verLt(iv, minVer(r.from.below))) continue; }
      return { entry: e.id, ...r };
    }
  }
  return null;
};
const advice = adviseReadings(a, entries);

const depFindings = [];
for (const pkg of added) {
  const d = matchDetector(pkg);
  const entry = d ? entries[d[1]] : null;
  const label = d?.[2] || null;
  const rule = migrateRuleFor(pkg, a.deps[pkg]);
  const claims = advice.filter((v) => v.trigger === pkg);
  let severity = 'info', note = null, receipts = [];
  if (rule && (rule.urgency === 'dead' || rule.urgency === 'deprecated')) {
    severity = 'blocking';
    note = `${rule.urgency.toUpperCase()} — ${rule.why} → ${rule.to}`;
    receipts = rule.receipts || [];
  } else if (label && RETIRED_RE.test(label)) {
    severity = 'blocking';
    note = `the corpus's own detector labels this "${label}" — don't ADD it; see ${short(d[1])}`;
  } else if (rule) {   // superseded / upgrade / conditional line crossed at add time
    severity = 'warn';
    note = `${rule.urgency} — ${rule.why} → ${rule.to}`;
    receipts = rule.receipts || [];
  } else if (entry && fit(entry, new Set([d[3]])) === '↗ review') {
    severity = 'warn';
    note = `↗ review vs ${short(d[1])} — corpus default: ${trunc(entry.recommend?.default, 140)}`;
  } else if (claims.length) {
    severity = 'warn';
    note = `claim applies: ${claims[0].claim}`;
    receipts = [claims[0].url];
  }
  depFindings.push({ pkg, version: String(a.deps[pkg]), entry: d ? d[1] : null, severity, note, receipts });
}

// ── introduced-by-diff source findings ──────────────────────────────────────────
let changed = [];
try { changed = git('diff', '--name-only', BASE).split('\n').filter(Boolean); } catch { /* none */ }
try {   // untracked files are part of the working-tree change too (brand-new modules)
  changed.push(...git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean).map((f) => prefix + f));
} catch { /* none */ }
const relChanged = changed
  .filter((f) => !prefix || f.startsWith(prefix)).map((f) => (prefix ? f.slice(prefix.length) : f))
  .filter((f) => SRC_EXT.has(extname(f)));

const rules = [];
for (const e of Object.values(entries)) {
  const plats = e.platforms || [];
  if (!(a.platform === 'both' || plats.includes(a.platform))) continue;
  for (const r of e.detect_source || []) {
    if (r.absent) continue;
    const unless = Array.isArray(r.unless_dep) ? r.unless_dep : r.unless_dep ? [r.unless_dep] : [];
    if (unless.some((d) => d in a.deps)) continue;
    let re; try { re = new RegExp(r.pattern, r.flags || ''); } catch { continue; }
    rules.push({ entry: e.id, re, signal: r.signal, hint: r.hint || null });
  }
}
const swaps = a.platform !== 'react' ? (loadModernDefaults().swaps || []).filter((s) => s.match?.rn_named_import) : [];

const smells = [], legacy = [];
for (const rel of relChanged) {
  const abs = join(a.path, rel);
  if (!existsSync(abs)) continue;                                   // deleted in this diff
  let cur; try { if (statSync(abs).size > MAX_BYTES) continue; cur = readFileSync(abs, 'utf8'); } catch { continue; }
  const old = show(rel) || '';                                      // absent at base = new file
  for (const r of rules) if (r.re.test(cur) && !r.re.test(old))
    smells.push({ file: rel, entry: r.entry, signal: r.signal, hint: r.hint });
  if (swaps.length) {
    const curSpecs = rnNamedImports(cur), oldSpecs = rnNamedImports(old);
    for (const s of swaps) if (curSpecs.has(s.match.rn_named_import) && !oldSpecs.has(s.match.rn_named_import))
      legacy.push({ file: rel, legacy: s.legacy.replace(' (core)', ''), modern: s.modern, strength: s.strength, entry: s.entry || null });
  }
}

// ── verdict + output ─────────────────────────────────────────────────────────────
const blocking = depFindings.filter((f) => f.severity === 'blocking').length
  + legacy.filter((l) => l.strength === 'deprecated').length;
const warnings = depFindings.filter((f) => f.severity === 'warn').length + smells.length
  + legacy.filter((l) => l.strength !== 'deprecated').length;

if (JSON_OUT) {
  console.log(JSON.stringify({ name: a.name, base: BASE, filesChanged: relChanged.length,
    added: depFindings, removed, smellsIntroduced: smells, legacyIntroduced: legacy, blocking, warnings }, null, 1));
} else {
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`🔍  react-brain review — ${a.name}   (${BASE} → working tree · ${relChanged.length} source file${relChanged.length === 1 ? '' : 's'} · deps +${added.length} −${removed.length})`);
  console.log('═'.repeat(78));
  if (!added.length && !removed.length && !relChanged.length) console.log('  no changes vs base — nothing to review.');
  if (depFindings.length || removed.length) {
    console.log(`\n  DEPENDENCY DELTA`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const f of depFindings) {
      const glyph = f.severity === 'blocking' ? '✗' : f.severity === 'warn' ? '⚠' : '+';
      console.log(`  ${glyph} ADD ${f.pkg}@${f.version}${f.entry ? `  [${short(f.entry)}]` : '  (no corpus opinion)'}`);
      if (f.note) console.log(`      ${trunc(f.note, 170)}`);
      for (const r of f.receipts.slice(0, 2)) console.log(`      ↳ ${r}`);
    }
    for (const r of removed) console.log(`  − removed ${r}`);
  }
  if (smells.length) {
    console.log(`\n  SOURCE SMELLS INTRODUCED BY THIS DIFF  (absent at ${BASE}; heuristic — verify)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const s of smells) {
      console.log(`  ! ${s.file} — ${s.signal}  [${short(s.entry)}]`);
      if (s.hint) console.log(`      ${trunc(s.hint, 170)}`);
    }
  }
  if (legacy.length) {
    console.log(`\n  LEGACY CORE APIs INTRODUCED  (modern-defaults)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const l of legacy) console.log(`  ${l.strength === 'deprecated' ? '✗' : '⚠'} ${l.legacy} in ${l.file} → ${trunc(l.modern, 60)}  [${l.strength}${l.entry ? ` · ${short(l.entry)}` : ''}]`);
  }
  console.log(`\n  verdict: ${blocking ? `✗ ${blocking} BLOCKING` : '✓ no blocking findings'} · ${warnings} warning${warnings === 1 ? '' : 's'}${CI ? ` — CI ${blocking ? 'FAIL' : 'PASS'}` : ''}`);
  console.log(`  (blocking = adding something the corpus marks dead/deprecated; full-repo view: react-brain doctor/migrate)\n`);
}
if (CI) process.exit(blocking ? 1 : 0);
