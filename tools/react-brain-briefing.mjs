#!/usr/bin/env node
// ── react-brain briefing — the personalized, verified ecosystem changelog ──────
// Six newsletters go in; one repo-specific page comes out. The corpus is a DATED,
// fetch-verified stream of ecosystem changes (every entry edit is a git commit);
// detect knows what a repo actually uses. briefing = the intersection: "what moved
// under YOUR stack since you last looked", each item carrying the entry's receipts.
// Deterministic (git + YAML diff, no LLM) — safe for the weekly cron.
//
// The triad: doctor = your POSITION · census = the FIELD · briefing = VELOCITY.
//
//   node tools/react-brain-briefing.mjs <repo...> [--since=YYYY-MM-DD] [--today=…] [--write]
//     --since   override the per-repo resume state (tools/.briefing-state.json)
//     --write   also write BRIEFING.md into the target repo
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { analyzeRepo, loadDoc, parseYamlStr, GROUP_ORDER } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');
const ARGS = process.argv.slice(2);
const SINCE_ARG = (ARGS.find((a) => a.startsWith('--since=')) || '').slice(8) || null;
const TODAY = (ARGS.find((a) => a.startsWith('--today=')) || '').slice(8) || new Date().toISOString().slice(0, 10);
const WRITE = ARGS.includes('--write');
const repos = ARGS.filter((a) => !a.startsWith('--'));
if (!repos.length) { console.error('usage: react-brain briefing <repo...> [--since=YYYY-MM-DD] [--write]'); process.exit(1); }

const STATE_PATH = resolve(__dir, '.briefing-state.json');
const state = existsSync(STATE_PATH) ? JSON.parse(readFileSync(STATE_PATH, 'utf8')) : {};

const git = (...args) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

// action markers: change text that demands attention when it hits a dep you ship
const ACTION_RE = /deprecat|retired|removed|frozen|superseded|no longer|shut ?down|dormant|dead|only runtime|new-arch(itecture)?[- ]only|mandatory|must be built|breaking/i;

const entriesNow = loadDoc().entries;
const groupRank = new Map(entriesNow.map((e, i) => [e.id, GROUP_ORDER.indexOf(e.group) * 1000 + i]));

// ── corpus diff since a date: structural YAML compare, not raw patch parsing ────
function corpusDiff(since) {
  // clamp the window to the corpus's git history (entries/ split into one-per-file on the
  // repo's first day) — a --since before that would mislabel every entry "new"
  const historyStart = git('log', '--reverse', '--format=%cs').split('\n')[0];
  const effSince = since < historyStart ? historyStart : since;
  corpusDiff.clampedTo = since < historyStart ? historyStart : null;
  const changes = [];   // { id, isNew, items: [..], receipts: [..], segments: [..] }
  for (const e of entriesNow) {
    const path = `skills/react-brain-mentor/entries/${e.id}.yaml`;
    // per-file baseline: the file's last state on/before the window start. No such commit
    // ⇒ the entry was born inside the window ⇒ genuinely NEW.
    let old = null;
    const baseRev = git('rev-list', '-1', `--before=${effSince}T23:59:59`, 'HEAD', '--', path);
    if (baseRev) { try { old = parseYamlStr(git('show', `${baseRev}:${path}`)); } catch { /* renamed/absent */ } }
    if (!old) { changes.push({ id: e.id, isNew: true, items: [`NEW ENTRY — ${e.topic}`], receipts: (e.sources || []).slice(0, 2), segments: [`${e.topic} ${e.note || ''}`] }); continue; }
    if (String(old.updated) === String(e.updated)) continue;   // untouched since `since`

    const items = []; const newText = [];
    if (old.status !== e.status) items.push(`status ${old.status} → ${e.status}`);
    if (old.confidence !== e.confidence) items.push(`confidence ${old.confidence} → ${e.confidence}`);
    if ((old.recommend?.default || '') !== (e.recommend?.default || '')) { items.push('recommendation updated'); newText.push(e.recommend?.default || ''); }
    const oldWhen = new Set(old.recommend?.when || []);
    for (const w of (e.recommend?.when || [])) if (!oldWhen.has(w)) { items.push(`new guidance: ${w}`); newText.push(w); }
    const oldOpts = new Map((old.options || []).map((o) => [o.name, o.tradeoff]));
    for (const o of (e.options || [])) {
      if (!oldOpts.has(o.name)) { items.push(`new option: ${o.name}`); newText.push(`${o.name} ${o.tradeoff}`); }
      else if (oldOpts.get(o.name) !== o.tradeoff) { items.push(`option updated: ${o.name}`); newText.push(o.tradeoff); }
    }
    if ((old.note || '') !== (e.note || '')) {
      // surface the sentences that are new, not the whole note
      const oldNote = String(old.note || '');
      const fresh = String(e.note || '').split(/(?<=\.)\s+/).filter((s) => s.length > 20 && !oldNote.includes(s.trim().slice(0, 60)));
      if (fresh.length) { items.push(`verified facts updated (${fresh.length} new)`); newText.push(...fresh); }
    }
    const oldReads = new Set([...(old.reading || []), ...(old.watching || [])].map((r) => r?.title));
    for (const r of [...(e.reading || []), ...(e.watching || [])]) if (!oldReads.has(r?.title)) items.push(`new ${(e.watching || []).includes(r) ? 'watching' : 'reading'}: "${r.title}"`);
    if (!items.length) continue;
    const receipts = (e.sources || []).filter((s) => !(old.sources || []).includes(s));
    changes.push({ id: e.id, isNew: false, items, receipts, segments: newText });
  }
  return changes.sort((a, b) => (groupRank.get(a.id) ?? 1e9) - (groupRank.get(b.id) ?? 1e9));
}

// ── per-repo briefing: intersect the diff with the detected stack ───────────────
const byId = Object.fromEntries(entriesNow.map((e) => [e.id, e]));
const platMatch = (e, plat) => (e.platforms || []).includes(plat) || plat === 'both' || (e.platforms || []).length === 2;

for (const repoArg of repos) {
  const repo = analyzeRepo(repoArg);
  if (repo.missing || repo.notReact) { console.log(`\n${repoArg}: ${repo.missing ? 'no package.json' : 'not a React repo'} — skipped`); continue; }
  const key = repo.path;
  const since = SINCE_ARG || state[key] || daysAgo(14);
  const diff = corpusDiff(since);

  const action = [], stack = [], radar = [];
  let offPlatform = 0;
  // ACTION is precise on purpose: the action-marked sentence must NAME something the repo
  // ships (full label, or its leading word) — "deprecated" about someone else's option is
  // stack news, not your fire alarm.
  const mentions = (seg, labels) => {
    const s = seg.toLowerCase();
    return labels.some((l) => {
      const full = l.toLowerCase();
      const head = full.split(/[\s(/]+/)[0];
      return s.includes(full) || (head.length >= 4 && s.includes(head));
    });
  };
  for (const c of diff) {
    const entry = byId[c.id];
    const detected = repo.byEntry[c.id];
    if (detected) {
      const labels = [...detected.labels];
      const hot = (c.segments || []).some((seg) => ACTION_RE.test(seg) && mentions(seg, labels));
      (hot ? action : stack).push({ ...c, labels });
    } else if (platMatch(entry, repo.platform)) radar.push(c);
    else offPlatform++;
  }

  const L = [];
  const emit = (s) => L.push(s);
  emit(`\n${'═'.repeat(78)}`);
  emit(`📬  react-brain BRIEFING — ${repo.name}   (${since} → ${TODAY} · ${repo.platform} · ${repo.stage})`);
  emit('═'.repeat(78));
  emit(`the corpus changed in ${diff.length} entr${diff.length === 1 ? 'y' : 'ies'} over this window; here's what touches YOUR stack.`);
  if (corpusDiff.clampedTo) emit(`(corpus git history starts ${corpusDiff.clampedTo} — entries are baselined at their state that day)`);

  const section = (title, rows, showLabels) => {
    emit(`\n${title}`);
    if (!rows.length) { emit('  (nothing)'); return; }
    for (const c of rows) {
      emit(`  ${c.id.replace('RB-E-', '')}${showLabels && c.labels?.length ? `  (you ship: ${c.labels.join(', ')})` : ''}`);
      for (const it of c.items.slice(0, 5)) emit(`    · ${it.length > 150 ? it.slice(0, 149) + '…' : it}`);
      for (const r of (c.receipts || []).slice(0, 2)) emit(`      ↳ ${r}`);
    }
  };
  section('⚡ ACTION — a dep you ship was deprecated/retired/constrained:', action, true);
  section('📦 CHANGES IN YOUR STACK — entries you match moved:', stack, true);
  section(`🔭 RADAR — new for ${repo.platform} (you don't use these domains yet):`, radar.slice(0, 6), false);
  if (radar.length > 6) emit(`  … +${radar.length - 6} more (run \`react-brain query <topic>\` for any)`);
  if (offPlatform) emit(`\n(${offPlatform} off-platform change${offPlatform === 1 ? '' : 's'} not shown)`);
  emit(`\nnext: \`react-brain decide <topic> ${repoArg}\` turns any item into a decision record with receipts.\n`);

  console.log(L.join('\n'));
  if (WRITE) { writeFileSync(join(repo.path, 'BRIEFING.md'), '```\n' + L.join('\n') + '\n```\n'); console.log(`→ wrote ${join(repoArg, 'BRIEFING.md')}`); }
  state[key] = TODAY;
}
writeFileSync(STATE_PATH, JSON.stringify(state, null, 1));
