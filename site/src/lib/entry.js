// Decision-page helpers — pure functions over corpus() data, shared by
// entries/[slug].astro (and anything else that renders one entry). No I/O here:
// every input comes from the corpus loader, so the page stays a rendering.
import { corpus } from './corpus.js';

const DAY = 864e5;

// Sources render as host › path labels — raw URLs overflow small screens and are
// miserable for screen readers; the full URL stays in href.
export function srcLabel(u) {
  try {
    const x = new URL(u);
    const p = x.pathname.replace(/\/$/, '');
    return x.hostname.replace(/^www\./, '') + (p.length > 36 ? p.slice(0, 35) + '…' : p);
  } catch { return u; }
}

// What KIND of receipt a URL is, from its host/path alone (a heuristic, labelled as
// such on the page): a release note and a registry page carry different weight
// than a blog post.
export function sourceType(u) {
  let x;
  try { x = new URL(u); } catch { return 'link'; }
  const h = x.hostname.replace(/^www\./, '');
  const p = x.pathname.toLowerCase();
  if (h === 'github.com') {
    if (/\/releases(\/|$)|\/tag\//.test(p)) return 'release';
    if (/\/security\/advisories\//.test(p)) return 'advisory';
    if (/\/(pull|issues|discussions)\//.test(p)) return 'issue / PR';
    if (/changelog/.test(p)) return 'changelog';
    return 'repo';
  }
  if (/(^|\.)npmjs\.(com|org)$/.test(h)) return 'registry';
  if (/^newsletter\.|substack\.com$|beehiiv\.com$/.test(h)) return 'newsletter';
  if (/youtube\.com|youtu\.be|vimeo\.com/.test(h)) return 'video';
  if (/changelog|release-notes|releases/.test(p)) return 'changelog';
  if (h.startsWith('docs.') || /(^|\/)docs?(\/|$)|\/reference\/|\/api\//.test(p)) return 'docs';
  if (/blog|news|posts?\/|articles?\//.test(h + p)) return 'blog post';
  return 'article';
}

// Knowledge-graph edges: entry ids this entry's OWN text cites (when-clauses,
// notes, tradeoffs) — and the reverse.
const blobOf = (x) => [x.note, x.recommend?.default, ...(x.recommend?.when || []), ...(x.options || []).map((o) => o.tradeoff)].join(' ');
export const refsOf = (x) => [...new Set([...String(blobOf(x)).matchAll(/RB-E-[A-Z0-9-]+/g)].map((m) => m[0]))].filter((r) => r !== x.id);

// One list of related decisions, each entry once, each carrying WHY it is related:
//   'cited here'  — this entry's text names it
//   'cites this'  — its text names this entry
//   'same group'  — sibling in the encyclopedia.yaml group
// Ordered by strength (explicit citations first), then corpus order.
export function relations(e) {
  const { entries, byId } = corpus();
  const rel = new Map();
  const add = (x, label) => {
    if (!x || x.id === e.id) return;
    (rel.get(x.id) || rel.set(x.id, { entry: x, labels: [] }).get(x.id)).labels.push(label);
  };
  for (const r of refsOf(e)) add(byId[r], 'cited here');
  for (const x of entries) if (refsOf(x).includes(e.id)) add(x, 'cites this');
  for (const x of entries) if (x.group === e.group) add(x, 'same group');
  const rank = (r) => (r.labels.includes('cited here') ? 0 : r.labels.includes('cites this') ? 1 : 2);
  const pos = new Map(entries.map((x, i) => [x.id, i]));
  return [...rel.values()].sort((a, b) => rank(a) - rank(b) || pos.get(a.entry.id) - pos.get(b.entry.id));
}

// Previous / next decision in the encyclopedia.yaml group order (flattened across
// groups, so the last entry of a group leads into the next group).
export function prevNext(e) {
  const { groups, byId } = corpus();
  const order = groups.flatMap((g) => g.entries).filter((id) => byId[id]);
  const i = order.indexOf(e.id);
  const at = (j) => (j >= 0 && j < order.length ? byId[order[j]] : null);
  return { prev: i < 0 ? null : at(i - 1), next: i < 0 ? null : at(i + 1) };
}

export function groupOf(e) {
  return corpus().groups.find((g) => g.id === e.group) || null;
}
export const groupLabel = (g) => (g ? g.label.split(' — ')[0].split(' (')[0] : '');

// The option the default recommendation leads with: the option whose name appears
// earliest in recommend.default (name compared without its "(3.x)" qualifier and
// " / alt" tail). Falls back to the first option.
export function leadOption(e) {
  const opts = e.options || [];
  const def = String(e.recommend?.default || '').toLowerCase();
  let best = null, bestAt = Infinity;
  for (const o of opts) {
    const names = String(o.name).toLowerCase().replace(/\s*\(.*?\)/g, '').split(/\s*[/+]\s*/).map((s) => s.trim()).filter((s) => s.length > 2);
    for (const n of names) {
      const at = def.indexOf(n);
      if (at >= 0 && at < bestAt) { best = o; bestAt = at; }
    }
  }
  return best || opts[0] || null;
}

export const clip = (s, n) => {
  const t = String(s || '').trim();
  if (t.length <= n) return t;
  const cut = t.slice(0, n - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), n * 0.6)).replace(/[\s,;:—-]+$/, '') + '…';
};

// A when-clause is "context → choice (why)": split once so the page can set the
// context apart from the pick.
export function splitWhen(w) {
  const s = String(w);
  const i = s.indexOf('→');
  return i < 0 ? { ctx: null, pick: s } : { ctx: s.slice(0, i).trim(), pick: s.slice(i + 1).trim() };
}

// Verified notes are folded YAML: blank lines separate paragraphs.
export const paragraphs = (s) => String(s || '').trim().split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// Whole days between an entry's verified date and the build date.
export function ageDays(updated, built) {
  const a = new Date(String(updated)).getTime(), b = new Date(String(built)).getTime();
  return Number.isFinite(a) && Number.isFinite(b) ? Math.max(0, Math.round((b - a) / DAY)) : null;
}
