#!/usr/bin/env node
// ── react-brain doctor ─────────────────────────────────────────────────────────
// Deterministic ecosystem-fit analyzer (knowledge → code). Reads the encyclopedia +
// a target repo's package.json, maps ACTUAL dependencies to entries, and reports
// current-choice vs the entry's context recommendation. Complements the LLM mentor:
// this is the deterministic, exhaustive dep-scan; judgment dims (arch, a11y, testing
// depth, security) still belong to the mentor.
//
// Usage:  node tools/react-brain-doctor.mjs <repoPath> [<repoPath> ...]
// Shared detection lives in ./detect.mjs (one source of truth, also used by evidence).
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, analyzeRepo, fit, trunc, GROUP_ORDER, trackRecord, TRACK_GLYPH, scanModernDefaults, scanSourceSignals, checkAdrs } from './detect.mjs';

const EXPECTED = {
  always: ['RB-E-STATE', 'RB-E-STYLING', 'RB-E-TESTING', 'RB-E-TYPESCRIPT', 'RB-E-DX', 'RB-E-NAV'],
  'react-native': ['RB-E-NATIVE'],
  react: [],
  both: ['RB-E-NATIVE'],
};

function printReport(a, entries) {
  if (a.missing) { console.log(`\n(skip ${a.name}: no package.json)`); return; }
  if (a.notReact) { console.log(`\n(skip ${a.name}: not a React/RN repo)`); return; }
  const shell = a.desktopShell ? `  ·  shell: ${a.desktopShell}` : '';
  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🩺  react-brain doctor — ${a.name}  (v${a.version || '?'})`);
  console.log(`${'━'.repeat(78)}`);
  console.log(`platform: ${a.platform}${shell}   ·   stage (guess): ${a.stage}   ·   deps: ${a.depCount}`);
  console.log(`TS: ${a.ts ? 'yes' : 'NO'}   ·   CI: ${a.ci ? 'yes' : 'NO'}   ·   tests: ${a.tests ? 'yes' : 'NO'}   ·   lint/format: ${a.lintfmt ? 'yes' : 'NO'}   ·   git hooks: ${a.hooks ? 'yes' : 'NO'}`);

  const detected = Object.keys(a.byEntry).map((id) => ({ id, e: entries[id], info: a.byEntry[id] }))
    .filter((x) => x.e).sort((x, y) => GROUP_ORDER.indexOf(x.e.group) - GROUP_ORDER.indexOf(y.e.group));

  console.log(`\n  DETECTED ECOSYSTEM CHOICES  (deterministic dep-scan)`);
  console.log(`  ${'-'.repeat(74)}`);
  console.log(`  ${'entry'.padEnd(20)}${'your choice'.padEnd(26)}${'fit'.padEnd(14)}status·conf · track`);
  console.log(`  ${'-'.repeat(74)}`);
  const tr = trackRecord();
  for (const { id, e, info } of detected) {
    const track = tr[id] ? `  ${TRACK_GLYPH[tr[id]]}` : '';
    console.log(`  ${id.replace('RB-E-', '').padEnd(20)}${trunc([...info.labels].join(', '), 25).padEnd(26)}${fit(e, info.tokens).padEnd(14)}${e.status}·${e.confidence}${track}`);
  }

  const diverge = detected.filter((x) => fit(x.e, x.info.tokens) !== '✓ aligned');
  if (diverge.length) {
    console.log(`\n  WORTH A LOOK  (current choice ≠ entry default — not necessarily wrong)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const { id, e, info } of diverge) {
      console.log(`  • ${id.replace('RB-E-', '')}: you use ${[...info.labels].join(', ')}`);
      console.log(`      encyclopedia (${e.status}·${e.confidence}): ${trunc(e.recommend?.default, 150)}`);
    }
  }

  const expected = [...EXPECTED.always, ...(EXPECTED[a.platform] || [])];
  const gaps = expected.filter((id) => !a.byEntry[id]);
  if (gaps.length) {
    console.log(`\n  GAPS  (expected domain, nothing detected — may be built-in / N/A; verify)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const id of gaps) console.log(`  • ${id.replace('RB-E-', '')}: none detected — ${trunc(entries[id]?.recommend?.default, 120)}`);
  }

  // MODERNIZATION — source-level scan for legacy core RN APIs (RN / cross-platform repos).
  if (!NO_SCAN && a.platform !== 'react') {
    const { findings, scanned, capped } = scanModernDefaults(a.path, a.deps);
    console.log(`\n  MODERNIZATION  (source scan — legacy core RN APIs → modern replacement)`);
    console.log(`  ${'-'.repeat(74)}`);
    if (!findings.length) {
      console.log(`  ✓ none of the tracked legacy core APIs found  (${scanned} source file${scanned === 1 ? '' : 's'} scanned)`);
    } else {
      for (const f of findings) {
        const where = f.via === 'dep' ? 'dep' : `${f.count} file${f.count === 1 ? '' : 's'}`;
        const tgt = f.entry ? f.entry.replace('RB-E-', '') : (f.defer_to_skill ? `→${f.defer_to_skill}` : '');
        const legacy = f.legacy.replace(' (core)', '');
        console.log(`  ✗ ${legacy.padEnd(17)}${where.padEnd(9)}→ ${trunc(f.modern, 33).padEnd(34)}[${f.strength} · ${tgt} · ${f.effort}]`);
        if (SHOW_FILES && f.files.length) {
          console.log(`      ${f.files.slice(0, 8).join(', ')}${f.files.length > 8 ? ` +${f.files.length - 8} more` : ''}`);
        }
      }
      console.log(`  ${'-'.repeat(74)}`);
      console.log(`  ${scanned} files scanned${capped ? ` — CAPPED at ${scanned} (repo larger; results partial)` : ''}. legend:`);
      console.log(`  deprecated = fix regardless · superseded = modern is the default · context = only if the axis applies`);
      if (!SHOW_FILES) console.log(`  (re-run with --files to list the offending files)`);
    }
  }

  // SOURCE SIGNALS — entry-owned regex signals over the source (all platforms).
  if (!NO_SCAN) {
    const { findings, scanned } = scanSourceSignals(a.path, entries, { stage: a.stage, platform: a.platform, deps: a.deps });
    if (findings.length) {
      console.log(`\n  SOURCE SIGNALS  (patterns a dep-scan can't see — heuristic, verify in context)`);
      console.log(`  ${'-'.repeat(74)}`);
      for (const f of findings) {
        const where = f.absent ? 'absent' : `${f.count} file${f.count === 1 ? '' : 's'}`;
        console.log(`  ! ${f.signal}  [${f.entry.replace('RB-E-', '')} · ${where}]`);
        if (f.hint) console.log(`      ${f.hint}`);
        if (SHOW_FILES && f.files.length) console.log(`      ${f.files.slice(0, 8).join(', ')}${f.files.length > 8 ? ` +${f.files.length - 8} more` : ''}`);
      }
      console.log(`  (${scanned} files scanned${SHOW_FILES ? '' : '; --files lists offenders'})`);
    }
  }

  // DECISION RECORDS — living ADRs (react-brain decide) re-checked against the corpus.
  const adrs = checkAdrs(a.path, entries);
  if (adrs.length) {
    console.log(`\n  DECISION RECORDS  (docs/adr — premises re-checked against the current corpus)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const rec of adrs) {
      if (!rec.flags.length) console.log(`  ✓ ${rec.file}  [${rec.entry} · ${rec.status}] premises hold`);
      else {
        console.log(`  ⚠ ${rec.file}  [${rec.entry} · ${rec.status}]`);
        for (const fl of rec.flags) console.log(`      ${fl}`);
      }
    }
    console.log(`  (regenerate a record: react-brain decide <topic> .)`);
  }

  console.log(`\n  note: deterministic dep + source scan. Judgment dimensions (architecture, a11y,`);
  console.log(`        testing depth, security) → run the react-brain mentor. Fit is heuristic.`);
}

// Machine-readable report for agents / the mentor's Phase 0: everything the pretty
// printer shows, as one JSON object per repo (array when several).
function jsonReport(a, entries) {
  if (a.missing || a.notReact) return { name: a.name, path: a.path, skipped: a.missing ? 'no package.json' : 'not a React/RN repo' };
  const tr = trackRecord();
  const detected = Object.keys(a.byEntry).filter((id) => entries[id]).map((id) => ({
    entry: id, labels: [...a.byEntry[id].labels], fit: fit(entries[id], a.byEntry[id].tokens),
    status: entries[id].status, confidence: entries[id].confidence, track: tr[id] || null,
    recommend: entries[id].recommend?.default || null,
  }));
  const expected = [...EXPECTED.always, ...(EXPECTED[a.platform] || [])];
  const gaps = expected.filter((id) => !a.byEntry[id]).map((id) => ({ entry: id, recommend: entries[id]?.recommend?.default || null }));
  const modernization = (!NO_SCAN && a.platform !== 'react') ? scanModernDefaults(a.path, a.deps) : null;
  const sourceSignals = !NO_SCAN ? scanSourceSignals(a.path, entries, { stage: a.stage, platform: a.platform, deps: a.deps }) : null;
  return {
    adrs: checkAdrs(a.path, entries),
    name: a.name, path: a.path, version: a.version || null, platform: a.platform,
    desktopShell: a.desktopShell || null, stage: a.stage, depCount: a.depCount,
    ts: a.ts, ci: a.ci, tests: a.tests, lintfmt: a.lintfmt, hooks: a.hooks,
    detected, gaps, modernization, sourceSignals, unmapped: a.unmapped,
  };
}

function printMatrix(analyses, entries) {
  const live = analyses.filter((a) => !a.missing && !a.notReact);
  const ids = [...new Set(live.flatMap((a) => Object.keys(a.byEntry)))]
    .map((id) => ({ id, e: entries[id] })).filter((x) => x.e)
    .sort((x, y) => GROUP_ORDER.indexOf(x.e.group) - GROUP_ORDER.indexOf(y.e.group));
  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🧬  CROSS-APP ECOSYSTEM-FIT MATRIX  (${live.map((a) => a.name).join('  vs  ')})`);
  console.log(`${'━'.repeat(78)}`);
  const w = 16;
  console.log(`  ${'entry'.padEnd(16)}${live.map((a) => trunc(a.name, w - 1).padEnd(w)).join('')}encyclopedia default`);
  console.log(`  ${'-'.repeat(76)}`);
  let lastGroup = null;
  for (const { id, e } of ids) {
    if (e.group !== lastGroup) { console.log(`  ── ${e.group} ──`); lastGroup = e.group; }
    const cells = live.map((a) => trunc(a.byEntry[id] ? [...a.byEntry[id].labels].join(',') : '—', w - 1).padEnd(w));
    console.log(`  ${id.replace('RB-E-', '').padEnd(16)}${cells.join('')}${trunc(e.recommend?.default, 38)}`);
  }
  console.log(`\n  Shared backend: Holepunch / Pear. RB-E-CROSSPLATFORM: logic/state/data share`);
  console.log(`  cleanly across siblings — duplicated domain logic is the extract-a-core target.`);
}

const argv = process.argv.slice(2);
const NO_SCAN = argv.includes('--no-scan');       // skip the source-level scans (modernization + signals)
const SHOW_FILES = argv.includes('--files');      // list the offending files per finding
const AS_JSON = argv.includes('--json');          // machine-readable (agents / mentor Phase 0)
const CI = argv.includes('--ci');                 // gate: exit 1 on expired/moved decision records or deprecated APIs
const targets = argv.filter((x) => !x.startsWith('--'));
if (!targets.length) { console.error('usage: node tools/react-brain-doctor.mjs <repoPath> [<repoPath> ...] [--no-scan] [--files] [--json] [--ci]'); process.exit(1); }
const entries = loadEntries();
const analyses = targets.map(analyzeRepo);
if (AS_JSON) {
  const out = analyses.map((a) => jsonReport(a, entries));
  console.log(JSON.stringify(out.length === 1 ? out[0] : out, null, 2));
} else {
  for (const a of analyses) printReport(a, entries);
  if (analyses.filter((a) => !a.missing && !a.notReact).length > 1) printMatrix(analyses, entries);
  console.log('');
}

// ── CI gate: expired/moved decisions and deprecated APIs block the merge ───────
if (CI) {
  let staleAdrs = 0, deprecated = 0;
  for (const a of analyses) {
    if (a.missing || a.notReact) continue;
    staleAdrs += checkAdrs(a.path, entries).filter((r) => r.flags.length).length;
    if (!NO_SCAN && a.platform !== 'react')
      deprecated += scanModernDefaults(a.path, a.deps).findings.filter((x) => x.strength === 'deprecated').length;
  }
  const fail = staleAdrs + deprecated > 0;
  const msg = `CI: ${fail ? 'FAIL' : 'PASS'} — ${staleAdrs} decision record(s) with moved/expired premises · ${deprecated} deprecated API(s)`;
  console[AS_JSON ? 'error' : 'log'](msg);
  process.exit(fail ? 1 : 0);
}
