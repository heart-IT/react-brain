#!/usr/bin/env node
// ── react-brain migrate — the sequenced upgrade planner ────────────────────────
// briefing tells you WHAT moved; doctor tells you WHERE you stand; migrate turns
// both into a PLAN: installed versions × per-entry `migrate:` rules (verified
// corpus facts with receipts) + the modern-defaults source scan, sequenced so
// gates come first and blocked steps say what unblocks them. Deterministic —
// every step carries its receipts; nothing here is generated.
//
//   phases: 1 DO FIRST (dead/broken + gate upgrades others wait on)
//           2 THEN     (deprecated / superseded — the clock is running)
//           3 UPGRADES (better current version of what you already chose)
//           4 AFTER THE GATES (blocked until a phase-1 requirement is met)
//
//   node tools/react-brain-migrate.mjs <repo> [--json]
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, analyzeRepo, scanModernDefaults, minVer, verLt, trunc } from './detect.mjs';

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const targets = argv.filter((a) => !a.startsWith('--'));
if (!targets.length) { console.error('usage: node tools/react-brain-migrate.mjs <repoPath> [--json]'); process.exit(1); }

const entries = loadEntries();
const short = (id) => (id ? id.replace('RB-E-', '') : '');
const globFind = (pat, deps) => {
  if (pat.endsWith('*')) return Object.keys(deps).find((n) => n.startsWith(pat.slice(0, -1))) || null;
  return pat in deps ? pat : null;
};

function planFor(repoPath) {
  const a = analyzeRepo(repoPath);
  if (a.missing || a.notReact) return a;
  const steps = [];

  // per-entry migrate: rules vs installed deps
  for (const e of Object.values(entries)) {
    const plats = e.platforms || [];
    if (!(a.platform === 'both' || plats.includes(a.platform))) continue;
    for (const r of e.migrate || []) {
      const name = globFind(r.from.pkg, a.deps);
      if (!name) continue;
      if (r.from.below) {
        const iv = minVer(a.deps[name]);
        if (!iv || !verLt(iv, minVer(r.from.below))) continue;   // already at/past the line
      }
      let blocked = null;
      if (r.requires) {
        const reqName = globFind(r.requires.pkg, a.deps);
        const rv = reqName ? minVer(a.deps[reqName]) : null;
        if (!rv || verLt(rv, minVer(r.requires.atleast)))
          blocked = { pkg: r.requires.pkg, atleast: r.requires.atleast, installed: reqName ? String(a.deps[reqName]) : '(absent)' };
      }
      steps.push({ kind: 'dep', entry: e.id, pkg: name, installed: String(a.deps[name]),
        to: r.to, urgency: r.urgency, effort: r.effort, why: r.why, receipts: r.receipts, blocked });
    }
  }

  // modern-defaults source scan (legacy core RN APIs) folded into the same plan
  if (a.platform !== 'react') {
    const STRENGTH_URGENCY = { deprecated: 'deprecated', superseded: 'superseded', context: 'conditional' };
    for (const f of scanModernDefaults(a.path, a.deps).findings) {
      steps.push({ kind: 'source', entry: f.entry, pkg: f.legacy.replace(' (core)', ''),
        installed: f.via === 'dep' ? 'dep' : `${f.count} file${f.count === 1 ? '' : 's'}`,
        to: f.modern, urgency: STRENGTH_URGENCY[f.strength] || 'conditional', effort: f.effort,
        why: `legacy core API in use (${f.via === 'dep' ? 'dependency' : `${f.count} file(s)`}) — strength: ${f.strength}`,
        receipts: [], blocked: null, defer_to_skill: f.defer_to_skill || null });
    }
  }

  // sequence: gates that other steps wait on jump to phase 1
  const gatePkgs = new Set(steps.filter((s) => s.blocked).map((s) => s.blocked.pkg));
  const isGate = (s) => [...gatePkgs].some((g) => globFind(g, { [s.pkg]: 1 }));
  const URANK = { dead: 0, deprecated: 1, superseded: 2, upgrade: 3, conditional: 4 };
  const ERANK = { S: 0, M: 1, L: 2 };
  const phaseOf = (s) => s.blocked ? 4 : (s.urgency === 'dead' || isGate(s)) ? 1 : (URANK[s.urgency] <= 2 ? 2 : 3);
  for (const s of steps) s.phase = phaseOf(s);
  steps.sort((x, y) => x.phase - y.phase || URANK[x.urgency] - URANK[y.urgency] || ERANK[x.effort] - ERANK[y.effort] || x.pkg.localeCompare(y.pkg));
  return { name: a.name, path: a.path, platform: a.platform, stage: a.stage, steps };
}

const PHASE_TITLES = {
  1: 'PHASE 1 — DO FIRST (dead/broken, and gates other steps wait on)',
  2: 'PHASE 2 — THEN (deprecated / superseded: the clock is running)',
  3: 'PHASE 3 — UPGRADES (newer line of what you already chose)',
  4: 'PHASE 4 — AFTER THE GATES (blocked until a requirement above is met)',
};

for (const t of targets) {
  const p = planFor(t);
  if (p.missing || p.notReact) { console.log(`(skip ${p.name}: ${p.missing ? (p.malformed ? 'malformed package.json' : 'no package.json') : 'not a React/RN repo'})`); continue; }
  if (JSON_OUT) { console.log(JSON.stringify(p, null, 1)); continue; }

  console.log(`\n${'═'.repeat(78)}`);
  console.log(`🧭  react-brain migrate — ${p.name}   (${p.platform} · ${p.stage} · ${p.steps.length} step${p.steps.length === 1 ? '' : 's'})`);
  console.log('═'.repeat(78));
  if (!p.steps.length) {
    console.log('  nothing to migrate — every tracked dependency is current per the corpus.');
    console.log('  (rules live in entries/<ID>.yaml `migrate:`; the corpus grows them each harvest)\n');
    continue;
  }
  let lastPhase = null;
  let n = 0;
  for (const s of p.steps) {
    if (s.phase !== lastPhase) { console.log(`\n  ${PHASE_TITLES[s.phase]}`); console.log(`  ${'-'.repeat(74)}`); lastPhase = s.phase; }
    n++;
    console.log(`  ${String(n).padStart(2)}. ${s.pkg}  (${s.installed})  →  ${s.to}`);
    console.log(`      [${s.urgency} · effort ${s.effort} · ${short(s.entry)}${s.kind === 'source' ? ' · source-scan' : ''}]`);
    console.log(`      ${trunc(s.why, 170)}`);
    if (s.blocked) console.log(`      ⛔ blocked by: ${s.blocked.pkg} ≥ ${s.blocked.atleast} (installed: ${s.blocked.installed}) — do that step first`);
    for (const r of (s.receipts || []).slice(0, 2)) console.log(`      ↳ ${r}`);
  }
  console.log(`\n  re-run \`react-brain doctor ${t}\` after each phase; \`react-brain decide <topic> ${t}\``);
  console.log(`  turns any step into a decision record with the full evidence chain.\n`);
}
