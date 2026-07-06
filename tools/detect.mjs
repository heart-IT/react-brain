// ── react-brain shared detection core ──────────────────────────────────────────
// One source of truth for: loading the encyclopedia, the dependency→entry detection
// table, per-repo analysis, and the fit heuristic. Imported by both
// react-brain-doctor.mjs (knowledge→code) and react-brain-evidence.mjs (code→knowledge).
//
// YAML via the `yaml` npm package (python3+pyyaml shim as zero-install fallback).
// The DETECTORS table is ASSEMBLED from per-entry `detect:` fields (entries/<ID>.yaml).
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, basename, extname } from 'node:path';
import { createRequire } from 'node:module';

const __dir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
export const ENC_PATH = resolve(__dir, '../skills/react-brain-mentor/encyclopedia.yaml');
export const ENTRIES_DIR = resolve(__dir, '../skills/react-brain-mentor/entries');
export const GROUP_ORDER = ['react-foundations', 'app-architecture', 'ui', 'platform-native', 'tooling-ops', 'ai'];

function loadYamlPy(paths) {
  // dev fallback: python3 + pyyaml, ONE spawn for any number of files
  // (default=str so unquoted dates serialize as strings)
  const src = execFileSync('python3',
    ['-c', 'import sys,yaml,json;json.dump([yaml.safe_load(open(p)) for p in sys.argv[1:]],sys.stdout,default=str)', ...paths],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return JSON.parse(src);
}

// Prefer the `yaml` npm package (installed via npm/npx — the distributable path); fall back to a
// python3+pyyaml shim so the repo's own dev tools run with zero `npm install`.
export function loadYaml(p) { return loadYamlMany([p])[0]; }
export function loadYamlMany(paths) {
  try { const y = require('yaml'); return paths.map((p) => y.parse(readFileSync(p, 'utf8'))); }
  catch { return loadYamlPy(paths); }
}

// The encyclopedia is SPLIT: encyclopedia.yaml is the index (meta + groups TOC +
// mentor_hints); entries live one-per-file in entries/<ID>.yaml, ordered here by
// the TOC so consumers see the same sequence the monolith had. A monolith with an
// inline `entries:` key still loads (back-compat for old checkouts / forks).
let _doc = null;
export function loadDoc() {
  if (_doc) return _doc;
  const doc = loadYaml(ENC_PATH);
  if (!doc.entries && existsSync(ENTRIES_DIR)) {
    const files = readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.yaml')).sort();
    const entries = loadYamlMany(files.map((f) => join(ENTRIES_DIR, f)));
    const order = new Map((doc.groups || []).flatMap((g) => g.entries || []).map((id, i) => [id, i]));
    entries.sort((a, b) => (order.get(a.id) ?? 1e9) - (order.get(b.id) ?? 1e9));
    doc.entries = entries;
  }
  return (_doc = doc);
}
export function loadEntries() { return Object.fromEntries(loadDoc().entries.map((e) => [e.id, e])); }

// pattern -> [entry, human label, token to look for in the entry's recommend text]
// pattern forms: exact 'name' · scope prefix '@scope/*' · name prefix 'name*'
// Rows are DECLARED per entry (entries/<ID>.yaml `detect:` — pkg/label/token) and
// assembled here in TOC order. Matching is exact-name except explicit globs and no
// glob spans entries, so cross-entry order is not load-bearing; within-entry order
// is preserved. One source of truth: an entry OWNS its detection signals — adding
// an entry never touches this file.
export const DETECTORS = loadDoc().entries.flatMap((e) =>
  (e.detect || []).map((d) => [d.pkg, e.id, d.label, d.token]));

export function matchDetector(name) {
  for (const d of DETECTORS) {
    const pat = d[0];
    if (pat.endsWith('/*')) { if (name.startsWith(pat.slice(0, -1))) return d; }
    else if (pat.endsWith('*')) { if (name.startsWith(pat.slice(0, -1))) return d; }
    else if (pat.endsWith('/')) { if (name.startsWith(pat)) return d; }
    else if (name === pat) return d;
  }
  return null;
}

const PLATFORM_PKGS = new Set(['react', 'react-dom', 'react-native']);

export function analyzeRepo(repoPath) {
  const p = resolve(repoPath);
  const pj = join(p, 'package.json');
  if (!existsSync(pj)) return { name: basename(p), path: p, missing: true };
  const pkg = JSON.parse(readFileSync(pj, 'utf8'));
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const has = (n) => n in deps;
  if (!(has('react') || has('react-native') || has('expo'))) {
    return { name: pkg.name || basename(p), path: p, notReact: true };
  }

  const hasRN = has('react-native') || has('expo');
  const hasWeb = has('react-dom');
  const desktopShell = ['electron', 'pear-runtime', 'pear-runtime-react-native', '@tauri-apps/api', '@capacitor/core']
    .find(has) || (pkg.pear ? 'pear' : null);
  const platform = hasRN && hasWeb ? 'both' : hasRN ? 'react-native' : 'react';

  const ts = has('typescript') || existsSync(join(p, 'tsconfig.json'));
  const ci = existsSync(join(p, '.github', 'workflows'));
  const tests = !!(pkg.scripts && pkg.scripts.test);
  const lintfmt = ['eslint', '@biomejs/biome', 'prettier', 'lunte'].some(has);
  const hooks = ['husky', 'lefthook'].some(has);
  const workspaces = !!pkg.workspaces;
  const versionGE1 = (parseInt(pkg.version, 10) || 0) >= 1;

  const byEntry = {};
  const unmapped = [];
  const add = (id, label, token) => {
    (byEntry[id] ||= { labels: new Set(), tokens: new Set() });
    byEntry[id].labels.add(label);
    if (token) byEntry[id].tokens.add(token);
  };
  for (const name of Object.keys(deps)) {
    const d = matchDetector(name);
    if (d) add(d[1], d[2], d[3]);
    else if (!PLATFORM_PKGS.has(name)) unmapped.push(name);
  }
  const reactV = deps['react'] && String(deps['react']).replace(/[^\d.]/g, '');
  const rnV = deps['react-native'] && String(deps['react-native']).replace(/[^\d.]/g, '');
  const compiler = has('babel-plugin-react-compiler') || has('react-compiler-runtime');
  if (reactV) add('RB-E-REACT-CORE', `React ${reactV}${compiler ? ' + Compiler' : ''}`, compiler ? 'compiler' : 'react 19');
  if (rnV) add('RB-E-RN-VERSIONS', `RN ${rnV}`, rnV);

  const stageScore = [tests, ci, ts, lintfmt, hooks, pkg.private === true, versionGE1].filter(Boolean).length;
  let stage = stageScore <= 1 ? 'prototype' : stageScore <= 3 ? 'mvp' : 'production';
  if (workspaces) stage = 'scale';

  return { name: pkg.name || basename(p), path: p, version: pkg.version, platform, desktopShell,
    ts, ci, tests, lintfmt, hooks, stage, depCount: Object.keys(deps).length, byEntry, unmapped, deps };
}

export function fit(entry, tokens) {
  const def = (entry?.recommend?.default || '').toLowerCase();
  const when = (entry?.recommend?.when || []).join(' || ').toLowerCase();
  const t = [...tokens];
  if (t.some((x) => def.includes(x))) return '✓ aligned';
  if (t.some((x) => when.includes(x))) return '~ contextual';
  return '↗ review';
}

// ── the intent resolver ─────────────────────────────────────────────────────────
// Resolve a context-keyed entry against an INTENT (a list of lowercase context
// tokens), the way the corpus authors write recommend.when as "context → choice (why)".
// Returns { label, why, ctx, via } where via ∈ 'when' | 'default' | 'na'.
// This is the shared primitive behind `stack` (intent → picks). doctor/learn resolve a
// context too — against DETECTED deps — and can migrate onto this over time.
export function resolveRecommendation(entry, tokens) {
  const t = [...tokens].map((x) => x.toLowerCase()).filter(Boolean);
  for (const clause of entry?.recommend?.when || []) {
    const i = clause.indexOf('→');
    if (i < 0) continue;
    const ctx = clause.slice(0, i).trim();
    const choice = clause.slice(i + 1).trim();
    if (t.some((tok) => ctx.toLowerCase().includes(tok))) {
      const na = /\bn\/a\b|does not apply|not\b.*\bapply/i.test(choice);
      const m = choice.match(/^([^(;—]+)/);          // short label = up to first ( ; or —
      return { label: na ? '— (n/a)' : (m ? m[1].trim() : choice), why: choice, ctx, via: na ? 'na' : 'when' };
    }
  }
  const def = entry?.recommend?.default || '';
  const m = def.match(/^([^.(;]+)/);
  return { label: m ? m[1].trim() : def, why: def, ctx: 'default', via: 'default' };
}

// Every exact-name (installable) package an entry's options map to, via DETECTORS —
// the candidate set `signals` measures against live npm data. Globs are matchers, not
// packages, so they're skipped; deduped by package name.
export function entryPackages(entryId) {
  const seen = new Set();
  const out = [];
  for (const d of DETECTORS) {
    if (d[1] !== entryId || d[0].includes('*') || seen.has(d[0])) continue;
    seen.add(d[0]);
    out.push({ pkg: d[0], label: d[2] });
  }
  return out;
}

// First word of a label, e.g. "TanStack Query" → "tanstack". Head-matching only fires
// on UNIQUE heads (count 1) so a shared scope like "tanstack" (react-query/-db/-router/…)
// can't make one pick's text match every sibling; "brittle" stays unique and matchable.
const labelHead = (lab) => lab.toLowerCase().split(/[ (/]/)[0];
const HEAD_FREQ = {};
for (const d of DETECTORS) { const h = labelHead(d[2]); if (h.length >= 6) HEAD_FREQ[h] = (HEAD_FREQ[h] || 0) + 1; }

// Reverse the detection table: given a resolved pick's text, the install package(s)
// the encyclopedia means for THAT entry. Reuses DETECTORS so stack's install line and
// doctor's dep-scan never disagree on what a recommendation maps to.
export function pkgsForPick(entryId, pickText) {
  const low = (pickText || '').toLowerCase();
  const out = [];
  for (const d of DETECTORS) {
    if (d[1] !== entryId) continue;
    if (d[0].includes('*')) continue;                         // glob = a detection matcher, not an installable name
    const lab = d[2].toLowerCase();
    const head = labelHead(d[2]);
    if (low.includes(lab) || (head.length >= 6 && HEAD_FREQ[head] === 1 && low.includes(head))) out.push(d[0]);
  }
  return [...new Set(out)];
}

export const trunc = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + '…' : (s || ''));

// ── the calibration track record ────────────────────────────────────────────────
// The append-only ledger (written by `calibrate`/`challenge`) lives next to the tools.
// Reading it here, in the shared core, lets stack/doctor/learn show calibration-weighted
// confidence inline without depending on the calibrate tool — and keeps calibrate using
// the same reader (one source of truth).
export const LEDGER_PATH = resolve(__dir, 'predictions.jsonl');
export function readLedger() {
  if (!existsSync(LEDGER_PATH)) return [];
  return readFileSync(LEDGER_PATH, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
}
// latest resolution outcome per entry id, e.g. { 'RB-E-STATE': 'held' }. {} if no ledger /
// nothing resolved yet — so a badge appears only where a verdict has actually been earned.
export function trackRecord() {
  const out = {};
  for (const r of readLedger()) if (r.k === 'O') out[r.id] = r.outcome;
  return out;
}
export const TRACK_GLYPH = { held: '✓ held', weakened: '~ weakened', overturned: '✗ overturned' };

// ── source-level modernization scan (modern-defaults.yaml) ───────────────────────
// The DETECTORS above are package.json-based. But the biggest "legacy default → modern"
// swaps are CORE React Native APIs (Animated, StyleSheet, FlatList, SafeAreaView, Image,
// TouchableOpacity) — imported from 'react-native', invisible to a dep-scan. This scans
// source for them, driven by the `match:` fields in modern-defaults.yaml (one source of
// truth for the checklist). Detection is scoped to `from 'react-native'` NAMED imports, so
// the modern replacements — which re-export the same names from other modules (Animated
// from reanimated, Image from expo-image, SafeAreaView from safe-area-context) — never
// false-match. AsyncStorage (a package, not a core API) is matched via `match.dep`.
export const MODERN_DEFAULTS_PATH = resolve(__dir, '../skills/react-brain-mentor/modern-defaults.yaml');
export function loadModernDefaults() { return loadYaml(MODERN_DEFAULTS_PATH); }

const SRC_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const SKIP_DIRS = new Set(['node_modules', 'ios', 'android', 'build', 'dist', '.next',
  '.expo', 'coverage', '.turbo', 'vendor', 'Pods', '__generated__', '.yarn']);
const MAX_FILES = 6000;          // runaway-repo backstop; reported when hit (no silent cap)
const MAX_BYTES = 512 * 1024;    // skip files > 512KB (minified/bundled/generated)

function walkSource(dir, out) {
  if (out.length >= MAX_FILES) return out;
  let ents;
  try { ents = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    if (out.length >= MAX_FILES) break;
    if (e.name.startsWith('.')) continue;                 // .git, .expo, dotfiles
    const full = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walkSource(full, out); }
    else if (SRC_EXT.has(extname(e.name))) out.push(full);
  }
  return out;
}

// import { A, B as C } from 'react-native'  (also multi-line & `import type`)
const RN_NAMED_IMPORT = /import\s+(?:type\s+)?(?:[\w$]+\s*,\s*)?\{([^}]*)\}\s*from\s*['"]react-native['"]/g;

// Scan a repo's source for the modern-defaults swaps. Returns { findings, scanned, capped }.
// findings: [{ legacy, modern, entry, defer_to_skill, strength, effort, via, count, files }]
export function scanModernDefaults(repoPath, deps = {}) {
  const swaps = loadModernDefaults().swaps || [];
  const bySpecifier = new Map();
  for (const s of swaps) if (s.match?.rn_named_import) bySpecifier.set(s.match.rn_named_import, s);

  const root = resolve(repoPath);
  const files = walkSource(root, []);
  const capped = files.length >= MAX_FILES;
  const hits = new Map();                                 // legacy -> { swap, files:Set }

  for (const f of files) {
    let src;
    try { if (statSync(f).size > MAX_BYTES) continue; src = readFileSync(f, 'utf8'); } catch { continue; }
    if (!src.includes('react-native')) continue;          // cheap prefilter
    const specs = new Set();
    let m; RN_NAMED_IMPORT.lastIndex = 0;
    while ((m = RN_NAMED_IMPORT.exec(src))) {
      for (let n of m[1].split(',')) {
        n = n.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
        if (n) specs.add(n);
      }
    }
    if (!specs.size) continue;
    for (const [spec, s] of bySpecifier) {
      if (!specs.has(spec)) continue;
      const h = hits.get(s.legacy) || hits.set(s.legacy, { swap: s, files: new Set() }).get(s.legacy);
      h.files.add(f.startsWith(root) ? f.slice(root.length + 1) : f);
    }
  }

  const findings = [...hits.values()].map((h) => ({
    legacy: h.swap.legacy, modern: h.swap.modern, entry: h.swap.entry || null,
    defer_to_skill: h.swap.defer_to_skill || null, strength: h.swap.strength, effort: h.swap.effort,
    via: 'source', count: h.files.size, files: [...h.files].sort(),
  }));

  // dep-based rows (AsyncStorage): dep-scan already sees these; surface them in the checklist too.
  for (const s of swaps) {
    if (s.match?.dep && (s.match.dep in deps)) {
      findings.push({ legacy: s.legacy, modern: s.modern, entry: s.entry || null,
        defer_to_skill: s.defer_to_skill || null, strength: s.strength, effort: s.effort,
        via: 'dep', count: null, files: [] });
    }
  }

  const rank = { deprecated: 0, superseded: 1, context: 2 };
  findings.sort((a, b) => (rank[a.strength] - rank[b.strength]) || ((b.count || 0) - (a.count || 0)));
  return { findings, scanned: files.length, capped };
}

// ── entry-owned source signals ────────────────────────────────────────────────────
// Beyond deps (detect:) and legacy core-API imports (modern-defaults.yaml), entries may
// declare `detect_source:` — regex signals over the repo's SOURCE that a dep-scan can't
// see (ScrollView rendering a mapped array, secrets in AsyncStorage, fetch-in-useEffect,
// no error boundary anywhere). Rule fields:
//   pattern (JS regex source) · flags? · signal · hint? · min_files? (report only if ≥N)
//   absent? (fire when the pattern matches NOWHERE) · min_stage? (gate absent-rules by
//   repo stage) · unless_dep? (skip when the dep is present)
// Rules from entries whose `platforms` exclude the repo's platform are skipped.
const STAGE_ORDER = ['prototype', 'mvp', 'production', 'scale'];

export function scanSourceSignals(repoPath, entries, { stage = 'mvp', platform = 'react-native', deps = {} } = {}) {
  const list = Array.isArray(entries) ? entries : Object.values(entries);
  const rules = [];
  for (const e of list) {
    const plats = e.platforms || [];
    const platOK = platform === 'both' || plats.includes(platform) || (platform === 'react-native' && plats.includes('react-native')) || (platform === 'react' && plats.includes('react'));
    if (!platOK) continue;
    for (const r of e.detect_source || []) {
      if (r.unless_dep && r.unless_dep in deps) continue;
      if (r.min_stage && STAGE_ORDER.indexOf(stage) < STAGE_ORDER.indexOf(r.min_stage)) continue;
      let re; try { re = new RegExp(r.pattern, r.flags || ''); } catch { continue; }
      rules.push({ entry: e.id, re, ...r });
    }
  }
  if (!rules.length) return { findings: [], scanned: 0, capped: false };

  const root = resolve(repoPath);
  const files = walkSource(root, []);
  const capped = files.length >= MAX_FILES;
  const hits = new Map(rules.map((r) => [r, new Set()]));
  for (const f of files) {
    let src;
    try { if (statSync(f).size > MAX_BYTES) continue; src = readFileSync(f, 'utf8'); } catch { continue; }
    const rel = f.startsWith(root) ? f.slice(root.length + 1) : f;
    for (const r of rules) if (r.re.test(src)) hits.get(r).add(rel);
  }

  const findings = [];
  for (const r of rules) {
    const matched = [...hits.get(r)].sort();
    if (r.absent) {
      if (!matched.length && files.length) findings.push({ entry: r.entry, signal: r.signal, hint: r.hint || null, absent: true, count: 0, files: [] });
    } else if (matched.length >= (r.min_files || 1)) {
      findings.push({ entry: r.entry, signal: r.signal, hint: r.hint || null, absent: false, count: matched.length, files: matched });
    }
  }
  findings.sort((a, b) => (b.count - a.count));
  return { findings, scanned: files.length, capped };
}
