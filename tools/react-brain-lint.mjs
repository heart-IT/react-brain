#!/usr/bin/env node
// ── react-brain lint — the corpus's mechanized invariants (offline, fast) ───────
// Every structural rule that used to live in session discipline, encoded. Network
// checks (dead links) stay in `pulse`; judgment stays in `challenge`. Run after ANY
// corpus edit; `npm test` runs it. Exit 1 on errors; warnings don't fail.
//
//   ERRORS  — schema violations, unreachable entries, id/file mismatches, dup URLs
//             within an entry, dup detect packages across entries, broken doc refs
//   WARNS   — cross-entry duplicate reading URLs (sometimes deliberate), stale
//             count claims in prose/comments
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { loadYaml, loadYamlMany, ENC_PATH, ENTRIES_DIR, GROUP_ORDER } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const MENTOR_PATH = resolve(__dir, '../skills/react-brain-mentor/react-brain-mentor.yaml');

const STATUSES = new Set(['stub', 'drafted', 'reviewed', 'stale']);
const CONFIDENCES = new Set(['high', 'medium', 'low']);
const PLATFORMS = new Set(['react', 'react-native']);
const AW_KEYS = new Set(['deps', 'absent_deps', 'platforms', 'stages']);
const STAGES = new Set(['prototype', 'mvp', 'production', 'scale']);

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ── load ────────────────────────────────────────────────────────────────────────
const index = loadYaml(ENC_PATH);
const files = existsSync(ENTRIES_DIR) ? readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.yaml')).sort() : [];
const parsed = loadYamlMany(files.map((f) => join(ENTRIES_DIR, f)));
const entries = files.map((f, i) => ({ file: f, e: parsed[i] }));
const mentor = loadYaml(MENTOR_PATH);
const contentDir = resolve(dirname(ENC_PATH), index.encyclopedia?.content_dir || '../../encyclopedia');

// ── index / TOC ─────────────────────────────────────────────────────────────────
const groups = index.groups || [];
const tocIds = groups.flatMap((g) => g.entries || []);
const groupIds = new Set(groups.map((g) => g.id));
for (const g of GROUP_ORDER) if (!groupIds.has(g)) err(`index: GROUP_ORDER group '${g}' missing from groups TOC`);
const tocDups = tocIds.filter((id, i) => tocIds.indexOf(id) !== i);
if (tocDups.length) err(`index: duplicate TOC ids: ${[...new Set(tocDups)].join(', ')}`);

const ids = new Set(entries.map(({ e }) => e?.id).filter(Boolean));
for (const id of tocIds) if (!ids.has(id)) err(`index: TOC lists ${id} but entries/${id}.yaml is missing`);

// ── per-entry schema ────────────────────────────────────────────────────────────
const seenPkgs = new Map();               // detect pkg pattern -> entry id (cross-entry uniqueness)
const urlOwners = new Map();              // reading url -> [entry ids] (cross-entry dup = warn)
for (const { file, e } of entries) {
  const where = `entries/${file}`;
  if (!e || typeof e !== 'object') { err(`${where}: does not parse to a mapping`); continue; }
  const id = e.id || '(no id)';
  if (`${e.id}.yaml` !== file) err(`${where}: id '${e.id}' ≠ filename`);
  if (!tocIds.includes(e.id)) err(`${where}: not listed in any group in the index TOC (unreachable by order)`);

  for (const k of ['id', 'topic', 'category', 'group', 'status', 'confidence', 'updated'])
    if (!e[k]) err(`${id}: missing required field '${k}'`);
  if (e.group && !groupIds.has(e.group)) err(`${id}: group '${e.group}' not in TOC groups`);
  if (e.status && !STATUSES.has(e.status)) err(`${id}: bad status '${e.status}'`);
  if (e.confidence && !CONFIDENCES.has(e.confidence)) err(`${id}: bad confidence '${e.confidence}'`);
  if (!Array.isArray(e.platforms) || !e.platforms.length) err(`${id}: platforms must be a non-empty list`);
  else for (const p of e.platforms) if (!PLATFORMS.has(p)) err(`${id}: bad platform '${p}'`);
  if (e.updated && !/^\d{4}-\d{2}-\d{2}/.test(String(e.updated))) err(`${id}: updated '${e.updated}' is not YYYY-MM-DD`);

  if (!Array.isArray(e.options) || !e.options.length) err(`${id}: options must be a non-empty list`);
  else for (const o of e.options) if (!o?.name || !o?.tradeoff) err(`${id}: option missing name/tradeoff: ${JSON.stringify(o).slice(0, 60)}`);

  if (!e.recommend?.default) err(`${id}: missing recommend.default`);
  for (const w of e.recommend?.when || [])
    if (!String(w).includes('→')) err(`${id}: recommend.when clause has no '→': "${String(w).slice(0, 60)}"`);

  // the corpus invariant since 2026-06-25: every entry carries curated reading
  if (!Array.isArray(e.reading) || !e.reading.length) err(`${id}: no reading (corpus invariant: every entry has ≥1 vetted deep-dive)`);
  for (const r of e.reading || []) {
    for (const k of ['title', 'url', 'what']) if (!r?.[k]) err(`${id}: reading item missing '${k}' (${(r?.title || r?.url || '?').slice(0, 50)})`);
    if (r?.url && !/^https?:\/\//.test(r.url)) err(`${id}: reading url not http(s): ${r.url}`);
  }
  // watching (optional, added 2026-07-09): curated A/V — same shape as reading, no ≥1 requirement
  for (const w of e.watching || []) {
    for (const k of ['title', 'url', 'what']) if (!w?.[k]) err(`${id}: watching item missing '${k}' (${(w?.title || w?.url || '?').slice(0, 50)})`);
    if (w?.url && !/^https?:\/\//.test(w.url)) err(`${id}: watching url not http(s): ${w.url}`);
  }

  // conditional advice (added 2026-07-13): claim + applies_when turn a reading into
  // repo-conditional advice. Both or neither; gates restricted + enum-checked.
  for (const r of [...(e.reading || []), ...(e.watching || [])]) {
    const label = (r?.title || r?.url || '?').slice(0, 50);
    if (!r?.applies_when && !r?.claim) continue;
    if (!r.claim) err(`${id}: reading '${label}' has applies_when but no claim`);
    if (!r.applies_when) err(`${id}: reading '${label}' has claim but no applies_when (untargeted advice)`);
    if (r.claim && String(r.claim).length > 260) err(`${id}: reading '${label}' claim > 260 chars — distill it`);
    const w = r.applies_when;
    if (!w || typeof w !== 'object') continue;
    const keys = Object.keys(w);
    if (!keys.length) err(`${id}: reading '${label}' applies_when is empty`);
    for (const k of keys) if (!AW_KEYS.has(k)) err(`${id}: reading '${label}' applies_when unknown key '${k}'`);
    for (const k of ['deps', 'absent_deps'])
      if (w[k] && (!Array.isArray(w[k]) || !w[k].length || w[k].some((d) => typeof d !== 'string' || !d)))
        err(`${id}: reading '${label}' applies_when.${k} must be a non-empty string list`);
    for (const p of w.platforms || []) if (!PLATFORMS.has(p)) err(`${id}: reading '${label}' applies_when bad platform '${p}'`);
    for (const s of w.stages || []) if (!STAGES.has(s)) err(`${id}: reading '${label}' applies_when bad stage '${s}'`);
  }
  for (const s of e.sources || []) if (!/^https?:\/\//.test(s)) err(`${id}: source not http(s): ${s}`);

  // reviewed entries carry their proof
  if (e.status === 'reviewed') {
    if (!e.doc) err(`${id}: reviewed but no doc (long-form Explanation required)`);
    if (!(e.sources || []).length) err(`${id}: reviewed but no sources`);
  }
  if (e.doc && !existsSync(join(contentDir, e.doc))) err(`${id}: doc '${e.doc}' not found in ${contentDir}`);

  // duplicate URLs within each list (a URL may legally appear in BOTH reading and
  // sources — the canonical deep-dive often is the fact source for a reviewed entry)
  for (const [label, urls] of [['reading', (e.reading || []).map((r) => r?.url)], ['sources', e.sources || []]]) {
    const dups = urls.filter((u, i) => u && urls.indexOf(u) !== i);
    if (dups.length) err(`${id}: duplicate URL(s) in ${label}: ${[...new Set(dups)].join(' ')}`);
  }
  for (const r of e.reading || []) if (r?.url) (urlOwners.get(r.url) || urlOwners.set(r.url, []).get(r.url)).push(id);

  // detect rows
  for (const d of e.detect || []) {
    if (!d?.pkg || !d?.label || !d?.token) err(`${id}: detect row missing pkg/label/token: ${JSON.stringify(d).slice(0, 60)}`);
    if (d?.pkg) {
      if (seenPkgs.has(d.pkg) && seenPkgs.get(d.pkg) !== id) err(`${id}: detect pkg '${d.pkg}' already owned by ${seenPkgs.get(d.pkg)}`);
      seenPkgs.set(d.pkg, id);
    }
  }

  // migrate rules (added 2026-07-13): installed dep → sequenced upgrade knowledge
  const URGENCIES = new Set(['dead', 'deprecated', 'superseded', 'upgrade', 'conditional']);
  const EFFORTS = new Set(['S', 'M', 'L']);
  const VER_RE = /^\d+\.\d+\.\d+$/;
  for (const r of e.migrate || []) {
    const label = r?.from?.pkg || '?';
    if (!r?.from?.pkg) err(`${id}: migrate rule missing from.pkg`);
    if (!r?.to) err(`${id}: migrate '${label}' missing to`);
    if (!r?.why) err(`${id}: migrate '${label}' missing why`);
    if (!URGENCIES.has(r?.urgency)) err(`${id}: migrate '${label}' bad urgency '${r?.urgency}' (dead|deprecated|superseded|upgrade|conditional)`);
    if (!EFFORTS.has(r?.effort)) err(`${id}: migrate '${label}' bad effort '${r?.effort}' (S|M|L)`);
    if (r?.from?.below && !VER_RE.test(String(r.from.below))) err(`${id}: migrate '${label}' from.below must be x.y.z`);
    if (r?.requires && (!r.requires.pkg || !VER_RE.test(String(r.requires.atleast || '')))) err(`${id}: migrate '${label}' requires needs pkg + atleast x.y.z`);
    if (!Array.isArray(r?.receipts) || !r.receipts.length || r.receipts.some((u) => !/^https?:\/\//.test(u))) err(`${id}: migrate '${label}' needs ≥1 http(s) receipt`);
  }

  // detect_source rules: regex must compile, signal required
  for (const r of e.detect_source || []) {
    if (!r?.pattern || !r?.signal) err(`${id}: detect_source rule missing pattern/signal`);
    if (r?.pattern) { try { new RegExp(r.pattern, r.flags || ''); } catch (ex) { err(`${id}: detect_source pattern does not compile: ${ex.message}`); } }
    if (r?.min_stage && !['prototype', 'mvp', 'production', 'scale'].includes(r.min_stage)) err(`${id}: detect_source bad min_stage '${r.min_stage}'`);
  }
}

// cross-entry shared reading URLs — legal (a talk can serve 3 entries) but audible
for (const [u, owners] of urlOwners) if (owners.length > 1) warn(`reading URL shared by ${owners.join(' + ')}: ${u}`);

// ── reachability: every category via mentor dims ∪ capability_map ───────────────
const dims = (mentor.assessment_dimensions || []).map((d) => d.encyclopedia_cat).filter(Boolean);
const capIds = (mentor.encyclopedia_awareness?.capability_map || []).map((r) => r.entry);
for (const id of capIds) if (!ids.has(id)) err(`mentor capability_map: unknown entry ${id}`);
const cats = new Map();                    // category -> entry ids
for (const { e } of entries) if (e?.category) (cats.get(e.category) || cats.set(e.category, []).get(e.category)).push(e.id);
for (const [cat, owners] of cats) {
  const reachable = dims.includes(cat) || owners.some((id) => capIds.includes(id));
  if (!reachable) err(`ORPHAN category '${cat}' (${owners.join(', ')}): no assessment_dimension and no capability_map row — invisible to the mentor`);
}

// ── harvest resume state ↔ sources_digested (the two must never drift) ──────────
const HARVEST_PATH = resolve(__dir, 'harvest-state.json');
if (existsSync(HARVEST_PATH)) {
  try {
    const hs = JSON.parse(readFileSync(HARVEST_PATH, 'utf8'));
    const digested = new Map((index.encyclopedia?.sources_digested || []).map((s) => {
      const m = String(s).match(/^(.*)\s+×(\d+)$/);
      return m ? [m[1].trim(), Number(m[2])] : [String(s), NaN];
    }));
    for (const src of Object.values(hs.sources || {})) {
      const want = digested.get(src.name);
      if (want == null) err(`harvest-state: source '${src.name}' missing from encyclopedia sources_digested`);
      else if (want !== src.count) err(`harvest-state: '${src.name}' count ${src.count} ≠ sources_digested ×${want}`);
    }
    for (const name of digested.keys())
      if (![...Object.values(hs.sources || {})].some((s) => s.name === name))
        err(`harvest-state: sources_digested lists '${name}' but harvest-state.json has no such source`);
  } catch (ex) { err(`harvest-state.json does not parse: ${ex.message}`); }
} else {
  warn('tools/harvest-state.json missing — harvest resume state should live in the repo');
}

// ── stale count claims in prose (the "34 entries" class of drift) ───────────────
const n = entries.length;
const idxText = readFileSync(ENC_PATH, 'utf8');
for (const m of idxText.matchAll(/(\d+) entries across/g))
  if (Number(m[1]) !== n) warn(`index header claims '${m[1]} entries across', actual ${n}`);
const mentorText = readFileSync(MENTOR_PATH, 'utf8');
for (const m of mentorText.matchAll(/all (\d+)\b/g))
  if (Number(m[1]) !== n) warn(`mentor yaml says 'all ${m[1]}', actual ${n}`);

// markdown docs drift too (the README sat 3 harvests stale claiming '29 entries'):
// check every human-facing doc's entry-count and reviewed-count claims.
const nReviewed = entries.filter(({ e }) => e?.status === 'reviewed').length;
const DOC_PATHS = [
  resolve(__dir, '../README.md'),
  resolve(__dir, '../skills/react-brain-mentor/SKILL.md'),
  MENTOR_PATH,
  ENC_PATH,
];
for (const p of DOC_PATHS) {
  if (!existsSync(p)) continue;
  const rel = p.split('/').slice(-1)[0];
  const txt = p === MENTOR_PATH ? mentorText : (p === ENC_PATH ? idxText : readFileSync(p, 'utf8'));
  for (const m of txt.matchAll(/(\d+)[- ]entr(?:y|ies)(?:\s+grouped|\s+across)?/gi))
    if (Number(m[1]) !== n && Number(m[1]) > 10) warn(`${rel}: claims '${m[0]}', actual ${n} entries`);
  for (const m of txt.matchAll(/(\d+)\s+(?:are\s+)?`?reviewed`?/gi))
    if (Number(m[1]) !== nReviewed) warn(`${rel}: claims '${m[0]}', actual ${nReviewed} reviewed`);
}

// ── report ──────────────────────────────────────────────────────────────────────
const quiet = process.argv.includes('--quiet');
console.log(`react-brain lint — ${n} entries · ${seenPkgs.size} detect patterns · ${urlOwners.size} reading URLs`);
if (errors.length) { console.log(`\n✗ ${errors.length} error(s):`); for (const e of errors) console.log(`  ✗ ${e}`); }
if (warns.length && !quiet) { console.log(`\n⚠ ${warns.length} warning(s):`); for (const w of warns) console.log(`  ⚠ ${w}`); }
if (!errors.length) console.log(`\n✓ clean${warns.length ? ` (${warns.length} warnings)` : ''}`);
process.exit(errors.length ? 1 : 0);
