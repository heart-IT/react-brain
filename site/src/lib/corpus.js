// Build-time corpus loader — the site is a RENDERING of the repo's YAML, never a
// separate content source. Reads: the encyclopedia index + entries, the predictions
// ledger (scorecard), and the signals baseline (npm weekly downloads).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { parse } from 'yaml';

// Anchor on the repo root by walking up from cwd (import.meta.url is useless here:
// Astro bundles this file into dist/.prerender/ at build time, moving its location).
function findRoot(from) {
  let d = resolve(from);
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(d, 'skills/react-brain-mentor/encyclopedia.yaml'))) return d;
    d = dirname(d);
  }
  throw new Error('react-brain repo root not found above ' + from);
}
const ROOT = findRoot(process.cwd());
const MENTOR = join(ROOT, 'skills/react-brain-mentor');

const load = (p) => parse(readFileSync(p, 'utf8'));

let _corpus;
export function corpus() {
  if (_corpus) return _corpus;
  const index = load(join(MENTOR, 'encyclopedia.yaml'));
  const files = readdirSync(join(MENTOR, 'entries')).filter((f) => f.endsWith('.yaml'));
  const entries = files.map((f) => load(join(MENTOR, 'entries', f)));
  const order = new Map((index.groups || []).flatMap((g) => g.entries).map((id, i) => [id, i]));
  entries.sort((a, b) => (order.get(a.id) ?? 1e9) - (order.get(b.id) ?? 1e9));
  for (const e of entries) e.slug = e.id.replace('RB-E-', '').toLowerCase();
  _corpus = { meta: index.encyclopedia, groups: index.groups, entries, byId: Object.fromEntries(entries.map((e) => [e.id, e])) };
  return _corpus;
}

export function downloads() {
  const p = join(ROOT, 'tools/.signals-baseline.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {};
}

export const fmtDownloads = (n) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : String(n);

// Scorecard from the append-only predictions ledger (same math as `calibrate`:
// held = 1.0, weakened = 0.5, overturned = 0.0 — scored per confidence tier).
export function scorecard() {
  const p = join(ROOT, 'tools/predictions.jsonl');
  if (!existsSync(p)) return null;
  const rows = readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const preds = rows.filter((r) => r.k === 'P');
  const outcomes = new Map();                       // latest outcome per entry id
  for (const r of rows) if (r.k === 'O') outcomes.set(r.id, r);
  const tiers = {};
  for (const t of ['high', 'medium', 'low']) tiers[t] = { total: 0, resolved: 0, held: 0, weakened: 0, overturned: 0 };
  for (const pr of preds) {
    const t = tiers[pr.confidence]; if (!t) continue;
    t.total++;
    const o = outcomes.get(pr.id);
    if (o) { t.resolved++; t[o.outcome] = (t[o.outcome] || 0) + 1; }
  }
  for (const t of Object.values(tiers))
    t.score = t.resolved ? Math.round(((t.held + 0.5 * t.weakened) / t.resolved) * 100) : null;
  const resolved = preds.filter((pr) => outcomes.has(pr.id))
    .map((pr) => ({ ...pr, outcome: outcomes.get(pr.id) }));
  return { tiers, resolved, totalPredictions: preds.length };
}

export const track = () => {
  const sc = scorecard();
  return sc ? Object.fromEntries(sc.resolved.map((r) => [r.id, r.outcome.outcome])) : {};
};

// Data for the client-side doctor-lite: the detection table + per-entry capsule.
export function doctorData() {
  const { entries } = corpus();
  const detectors = entries.flatMap((e) => (e.detect || []).map((d) => [d.pkg, e.id, d.label, d.token]));
  const caps = Object.fromEntries(entries.map((e) => [e.id, {
    slug: e.slug, topic: e.topic, status: e.status, confidence: e.confidence,
    def: e.recommend?.default || '', when: e.recommend?.when || [],
  }]));
  return { detectors, caps };
}

export const GITHUB = 'https://github.com/heart-IT/react-brain';

// Base-path-aware URL builder. The site will be served under a subpath of an
// existing (WordPress) host — set base in astro.config or ASTRO_BASE and every
// internal link follows. BASE_URL always ends with '/'.
export const BASE = import.meta.env?.BASE_URL || '/';
export const href = (p) => BASE + String(p).replace(/^\//, '');

// ── long-form Explanation docs (encyclopedia/<ID>.md) rendered to HTML ──────────
import { marked } from 'marked';
export function docHtml(entry) {
  if (!entry.doc) return null;
  const p = join(ROOT, 'encyclopedia', entry.doc);
  if (!existsSync(p)) return null;
  let md = readFileSync(p, 'utf8');
  md = md.replace(/^---[\s\S]*?\n---\n/, '');                  // frontmatter is index metadata
  let html = marked.parse(md);
  // cross-link sibling entries wherever the prose cites an id (RB-E-STATE → its page)
  const { byId } = corpus();
  html = html.replace(/RB-E-([A-Z0-9-]+)/g, (m, rest) => {
    const e = byId[`RB-E-${rest}`];
    return e ? `<a href="${href(`entries/${e.slug}/`)}">${m}</a>` : m;
  });
  return html;
}

// ── changelog: the corpus's git history (what changed, when) ────────────────────
import { execSync } from 'node:child_process';
export function changelog(limit = 60) {
  try {
    const out = execSync(
      `git log --date=short --pretty=format:%ad%x09%s -n ${limit} -- skills/react-brain-mentor encyclopedia`,
      { cwd: ROOT, encoding: 'utf8' });
    const days = new Map();
    for (const line of out.split('\n').filter(Boolean)) {
      const [date, subject] = line.split('\t');
      (days.get(date) || days.set(date, []).get(date)).push(subject);
    }
    return [...days.entries()].map(([date, subjects]) => ({ date, subjects }));
  } catch { return []; }   // shallow clone / no git → page degrades gracefully
}

// ── data for the client-side stack composer (one source of truth: the stack tool) ─
// Dynamic import from the real file path: a static relative import would make Vite
// BUNDLE tools/*.mjs, relocating detect.mjs's import.meta.url anchor into dist/ and
// breaking its encyclopedia path. A variable specifier stays a runtime import, so the
// tool executes from disk with correct anchors (and the CLI-guard keeps it silent).
import { pathToFileURL } from 'node:url';
export async function stackData() {
  const stack = await import(pathToFileURL(join(ROOT, 'tools/react-brain-stack.mjs')).href);
  const { entries } = corpus();
  const caps = Object.fromEntries(entries.map((e) => [e.id, {
    slug: e.slug, topic: e.topic, status: e.status, confidence: e.confidence, group: e.group,
    def: e.recommend?.default || '', when: e.recommend?.when || [],
  }]));
  return { recipe: stack.RECIPE, stageRank: stack.STAGE_RANK, caps };
}
