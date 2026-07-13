#!/usr/bin/env node
// ── react-brain evidence loop ──────────────────────────────────────────────────
// The INVERSE of the doctor: code → knowledge. Runs detection across a CORPUS of
// real repos and feeds the aggregate back at the encyclopedia, producing:
//   §1 MISSING       — real deps mapping to NO entry = candidate blind spots
//   §2 CONTRADICTION — detected choice ≠ entry default across the corpus = re-examine
//   §3 EVIDENCE      — field-adoption per entry (paste-ready `evidence:` blocks)
//
// This makes the corpus self-correct from contact with production code, instead of
// living only on editorial synthesis + newsletters. SEED: a small corpus is weak
// signal — adoption ≠ correctness; this FEEDS the editorial recommendation, never
// overrides it. Scale the corpus (curated exemplar OSS) for real statistical weight.
//
// Usage:  node tools/react-brain-evidence.mjs <repo> [<repo> ...]
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, analyzeRepo, fit, GROUP_ORDER } from './detect.mjs';

// out-of-scope / expected-uncovered classification for the MISSING report
// NOTE: the Holepunch data stack (hyper*, autobase, corestore, hrpc, blind-pairing) is now
// MAPPED to RB-E-P2P in detect.mjs — it's a recognized architecture choice, not "infra to ignore".
// What stays here is genuinely low-level: Bare runtime, crypto/encoding primitives, generic utils.
const IGNORE_PREFIX = ['bare-', 'pear', '@holepunch/', '@noble/', '@scure/', 'sodium', '@types/'];
const IGNORE_EXACT = new Set([
  'b4a', 'protomux', 'compact-encoding', 'streamx', 'framed-stream',
  'graceful-goodbye', 'safety-catch', 'which-runtime', 'ready-resource', 'quickbit',
  'fast-fifo', 'sodium-universal', 'sodium-native', 'react-native-bare-kit',
  'patch-package', 'babel-preset-expo', 'bare-pack', 'pear-build', 'prettier-config-holepunch',
  'd3-array', 'd3-scale', 'd3-shape', // d3 submodules (d3/d3-force already mapped to CHARTS)
]);
const PLATFORM_FEATURE_PREFIX = ['expo-', '@expo/', '@expo-google-fonts/', '@react-native-community/', '@react-native/'];
const PLATFORM_FEATURE_EXACT = new Set(['react-native-safe-area-context', 'react-native-screens', 'react-native-edge-to-edge']);
const STYLE_UTIL = new Set(['clsx', 'tailwind-merge', 'class-variance-authority', 'cva', 'tw-merge']);

const cls = (name) => {
  if (IGNORE_EXACT.has(name) || IGNORE_PREFIX.some((p) => name.startsWith(p))) return 'infra';
  if (PLATFORM_FEATURE_EXACT.has(name) || PLATFORM_FEATURE_PREFIX.some((p) => name.startsWith(p))) return 'platform-feature';
  if (STYLE_UTIL.has(name)) return 'style-util';
  return 'candidate'; // a real ecosystem dep with no entry = blind-spot candidate
};

const analyzed = process.argv.slice(2).map((r) => [r, analyzeRepo(r)]);
for (const [arg, a] of analyzed) if (!a || a.missing || a.notReact)
  console.error(`(skip ${arg}: ${!a || a.missing ? (a?.malformed ? 'malformed package.json' : 'no package.json') : 'not a React/RN repo'})`);
const corpus = analyzed.map(([, a]) => a).filter((a) => a && !a.missing && !a.notReact);
if (!corpus.length) { console.error('no React/RN repos in corpus'); process.exit(1); }
const entries = loadEntries();
const tag = (a) => `${a.name}(${a.platform === 'react-native' ? 'rn' : a.platform},${a.stage})`;

console.log(`\n${'═'.repeat(78)}`);
console.log(`🔬  react-brain EVIDENCE LOOP — corpus self-audit (code → knowledge)`);
console.log(`${'═'.repeat(78)}`);
console.log(`corpus (${corpus.length}): ${corpus.map(tag).join('  ·  ')}`);
console.log(`note: small corpus = weak signal. Adoption ≠ correctness — this informs, never overrides.`);

// ── §1 MISSING ──────────────────────────────────────────────────────────────
const missing = {}; // name -> { repos:Set, klass }
for (const a of corpus) for (const dep of a.unmapped) {
  (missing[dep] ||= { repos: new Set(), klass: cls(dep) });
  missing[dep].repos.add(a.name);
}
const byKlass = { candidate: [], 'style-util': [], 'platform-feature': [], infra: [] };
for (const [name, info] of Object.entries(missing)) byKlass[info.klass].push({ name, n: info.repos.size, repos: [...info.repos] });
for (const k of Object.keys(byKlass)) byKlass[k].sort((x, y) => y.n - x.n || x.name.localeCompare(y.name));

console.log(`\n${'─'.repeat(78)}`);
console.log(`§1  MISSING — real deps mapping to NO encyclopedia entry`);
console.log(`${'─'.repeat(78)}`);
console.log(`\n  ▶ CANDIDATE BLIND SPOTS (ecosystem deps with no entry — should react-brain cover these?)`);
if (!byKlass.candidate.length) console.log(`    (none — the corpus's selectable stack is fully covered)`);
for (const g of byKlass.candidate) console.log(`    • ${g.name.padEnd(40)} ${g.n}× ${g.repos.join(', ')}`);
console.log(`\n  ▶ styling utilities (className helpers — adjacent to RB-E-STYLING, not a selection):`);
console.log(`    ${byKlass['style-util'].map((g) => g.name).join(', ') || '(none)'}`);
console.log(`  ▶ platform feature modules (managed; not a selection decision): ${byKlass['platform-feature'].length} libs`);
console.log(`  ▶ infra / out-of-scope (Holepunch·Bare·crypto·utils — correctly uncovered): ${byKlass.infra.length} libs`);

// ── §2 CONTRADICTION ─────────────────────────────────────────────────────────
const contra = {}; // entryId -> [{repo, choice, fit}]
for (const a of corpus) for (const [id, info] of Object.entries(a.byEntry)) {
  const e = entries[id]; if (!e) continue;
  const f = fit(e, info.tokens);
  if (f !== '✓ aligned') (contra[id] ||= []).push({ repo: a.name, choice: [...info.labels].join(', '), f });
}
console.log(`\n${'─'.repeat(78)}`);
console.log(`§2  CONTRADICTION — detected choice ≠ entry default (re-examine entry or accept as context)`);
console.log(`${'─'.repeat(78)}`);
const contraIds = Object.keys(contra).sort((x, y) => GROUP_ORDER.indexOf(entries[x].group) - GROUP_ORDER.indexOf(entries[y].group));
for (const id of contraIds) {
  const e = entries[id];
  console.log(`\n  • ${id.replace('RB-E-', '')} (${e.status}·${e.confidence})`);
  for (const r of contra[id]) console.log(`      ${r.f}  ${r.repo}: ${r.choice}`);
  console.log(`      default: ${(e.recommend?.default || '').slice(0, 140)}`);
}

// ── §3 EVIDENCE ────────────────────────────────────────────────────────────────
const ev = {}; // entryId -> [{repo, platform, stage, choice}]
for (const a of corpus) for (const [id, info] of Object.entries(a.byEntry)) {
  if (!entries[id]) continue;
  (ev[id] ||= []).push({ repo: a.name, platform: a.platform, stage: a.stage, choice: [...info.labels].join(', ') });
}
const evIds = Object.keys(ev).sort((x, y) => GROUP_ORDER.indexOf(entries[x].group) - GROUP_ORDER.indexOf(entries[y].group));
console.log(`\n${'─'.repeat(78)}`);
console.log(`§3  EVIDENCE — field adoption per entry (paste-ready \`evidence:\` for the YAML)`);
console.log(`${'─'.repeat(78)}`);
for (const id of evIds) {
  console.log(`\n  ${id}:`);
  console.log(`    evidence:   # corpus self-audit (${corpus.length} repos)`);
  for (const r of ev[id]) console.log(`      - { repo: ${r.repo}, platform: ${r.platform}, stage: ${r.stage}, choice: "${r.choice}" }`);
}
console.log('');
