// The ⌘K palette: one box that answers "should I use zustand?", jumps to a topic,
// starts a comparison or runs an action, without a page load. Matching is
// deterministic over palette-data.json (topics + tracked packages, fit decided at
// build); anything it can't place falls through to full-text search/.
// Markup lives in Base.astro (#palette); this module wires it.
import { load } from './project.js';

const root = document.getElementById('palette');
const BASE = document.body.dataset.base || '/';
const input = document.getElementById('pal-in');
const list = document.getElementById('pal-list');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const FIT = { '✓': ['our pick', 'mark-ok'], '~': ['our pick in some situations', 'mark-warn'], '↗': ['not our default', 'mark-dim'] };

let data = null, loading = null, items = [], active = 0, back = null;
const loadData = () => (loading ||= fetch(`${BASE}palette-data.json`).then((r) => r.json()).then((d) => (data = d))
  .catch(() => { loading = null; return null; }));

function actions() {
  const p = load();
  return [
    p?.name && { kind: 'go', title: `Your project: ${p.name}`, sub: 'dashboard', url: BASE },
    { kind: 'go', title: 'Check my app', sub: 'paste package.json', url: `${BASE}doctor/` },
    { kind: 'go', title: 'Start a new app', sub: 'pick a stack', url: `${BASE}stack/` },
    { kind: 'go', title: 'Compare options', sub: 'side by side', url: `${BASE}compare/` },
    { kind: 'go', title: 'All topics', sub: '', url: `${BASE}entries/` },
    { kind: 'go', title: 'Library browser', sub: '', url: `${BASE}libraries/` },
    { kind: 'go', title: 'How we know', sub: '', url: `${BASE}methodology/` },
  ].filter(Boolean);
}

// "should I use zustand or jotai?" → ["zustand", "jotai"]
const STOP = new Set(['should', 'i', 'use', 'we', 'is', 'the', 'a', 'an', 'for', 'or', 'vs', 'versus', 'and', 'what', 'which', 'to', 'in', 'my', 'app', 'best', 'with', 'how', 'do', 'react', 'native']);
const terms = (q) => q.toLowerCase().replace(/[?!.,]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w));

function search(q) {
  const t = terms(q), ql = q.trim().toLowerCase();
  if (!ql) return actions();
  const out = [];
  if (data) {
    // packages: an exact name (or its last path segment) wins; else every term in pkg/label
    const pk = data.packages.map((p) => {
      const n = p.pkg.toLowerCase(), short = n.split('/').pop(), label = p.label.toLowerCase();
      const score = t.some((w) => w === n || w === short) ? 3
        : t.length && t.every((w) => n.includes(w) || label.includes(w)) ? 2
        : t.some((w) => w.length > 2 && (n.includes(w) || label.includes(w))) ? 1 : 0;
      return { p, score };
    }).filter((x) => x.score).sort((a, b) => b.score - a.score).slice(0, 4);
    const topicOf = (slug) => data.topics.find((x) => x.slug === slug);
    for (const { p } of pk) {
      const tp = topicOf(p.slug), [verdict, cls] = FIT[p.fit] || FIT['↗'];
      out.push({ kind: 'answer', title: p.label, sub: `${tp.topic} — <span class="${cls}">${verdict}</span>`, subHtml: true,
        detail: tp.pick, url: `${BASE}entries/${p.slug}/` });
    }
    // two packages from the same topic → offer the comparison
    const byTopic = {};
    for (const { p } of pk) (byTopic[p.slug] ||= []).push(p.label);
    for (const [slug, labels] of Object.entries(byTopic)) if (labels.length >= 2)
      out.unshift({ kind: 'compare', title: `Compare ${labels.slice(0, 3).join(' vs ')}`, sub: topicOf(slug).topic,
        url: `${BASE}compare/?topic=${slug}&o=${encodeURIComponent(labels.slice(0, 3).join(','))}` });
    const tp = data.topics.map((x) => {
      const hay = `${x.topic} ${x.slug} ${x.group}`.toLowerCase();
      const score = hay.startsWith(ql) || x.slug === ql ? 3 : t.length && t.every((w) => hay.includes(w)) ? 2 : t.some((w) => w.length > 2 && hay.includes(w)) ? 1 : 0;
      return { x, score };
    }).filter((y) => y.score).sort((a, b) => b.score - a.score).slice(0, 5);
    for (const { x } of tp) out.push({ kind: 'topic', title: x.topic, sub: x.group, detail: x.pick, url: `${BASE}entries/${x.slug}/` });
  }
  for (const a of actions()) if (a.title.toLowerCase().includes(ql)) out.push(a);
  out.push({ kind: 'search', title: `Search everything for “${q.trim()}”`, sub: 'readings, newsletters, methodology', url: `${BASE}search/?q=${encodeURIComponent(q.trim())}` });
  return out;
}

const KIND = { answer: 'answer', compare: 'compare', topic: 'topic', go: 'go to', search: 'search' };

function paint() {
  items = search(input.value);
  active = Math.min(active, items.length - 1);
  list.innerHTML = items.map((it, i) =>
    `<li role="option" id="pal-o${i}" class="pal-item" aria-selected="${i === active}" data-i="${i}">` +
    `<span class="pal-kind">${KIND[it.kind]}</span>` +
    `<span class="pal-main"><span class="pal-title">${esc(it.title)}</span>` +
    (it.sub ? ` <span class="pal-sub">${it.subHtml ? it.sub : esc(it.sub)}</span>` : '') +
    (it.detail ? `<span class="pal-detail">${esc(it.detail)}</span>` : '') + '</span></li>').join('');
  input.setAttribute('aria-activedescendant', items.length ? `pal-o${active}` : '');
}

function move(d) {
  if (!items.length) return;
  active = (active + d + items.length) % items.length;
  for (const li of list.children) li.setAttribute('aria-selected', String(Number(li.dataset.i) === active));
  input.setAttribute('aria-activedescendant', `pal-o${active}`);
  list.children[active]?.scrollIntoView({ block: 'nearest' });
}

const go = (i) => { const it = items[i]; if (it) location.href = it.url; };

export function open(q = '') {
  const con = document.getElementById('console');
  if (con && !con.hidden) con.hidden = true;   // never two modals
  if (root.hidden) back = document.activeElement;
  root.hidden = false;
  input.value = q;
  active = 0;
  paint();
  input.focus();
  loadData().then(() => { if (!root.hidden) paint(); });
}

export function close() {
  if (root.hidden) return;
  root.hidden = true;
  if (back && document.contains(back) && back.id !== 'nav-q') back.focus?.();
  back = null;
}

input.addEventListener('input', () => { active = 0; paint(); });
input.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
  else if (e.key === 'Enter') { e.preventDefault(); go(active); }
  else if (e.key === 'Escape') { e.preventDefault(); close(); }
});
list.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) go(Number(li.dataset.i)); });
root.querySelector('.pal-scrim').addEventListener('click', close);
// keep Tab inside the dialog: the input is its only control
root.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); input.focus(); } });

// ⌘K / Ctrl-K anywhere (the search page keeps its own field), the header field,
// and every [data-open-palette] opener (mobile tab bar, header search link).
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'k') {
    if (document.getElementById('q')) return;
    e.preventDefault();
    root.hidden ? open() : close();
  } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') close();
});
const navQ = document.getElementById('nav-q');
// the header field hands over on click or on the first keystroke — not on focus, so
// tabbing past it never throws a keyboard user into a dialog
navQ?.addEventListener('pointerdown', (e) => { e.preventDefault(); open(navQ.value); });
navQ?.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key.length === 1) { e.preventDefault(); open(navQ.value + e.key); }
  else if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); open(navQ.value); }
});
for (const el of document.querySelectorAll('[data-open-palette]')) el.addEventListener('click', (e) => { e.preventDefault(); open(); });
