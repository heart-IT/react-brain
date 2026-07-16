#!/usr/bin/env node
// ── react-brain harvest bench — the judgment benchmark ─────────────────────────
// Every mechanical faculty of the harvest is gated (coverage, verify-diff,
// tripwires, lint/eval); JUDGMENT — keep vs skip, route, reason — was the last
// unmeasured one. The adjudicated disposition manifests are gold data generated
// as exhaust: replay a frozen issue inventory against a candidate model and
// score disposition agreement deterministically (no LLM judge). False skips
// (gold kept → candidate skipped) carry 3× weight: over-keeping surfaces in PR
// review, a silent skip is the failure this pipeline exists to prevent.
//
//   node tools/react-brain-triage-bench.mjs --model=claude-sonnet-5              (needs ANTHROPIC_API_KEY)
//   node tools/react-brain-triage-bench.mjs --model=sonnet --provider=claude-cli (Claude Code subscription)
//   node tools/react-brain-triage-bench.mjs --candidate=dispositions.json        (offline: score a file)
//   flags: --fixture=twir-290 · --out=path.json
//
// Gold n grows with every human-reviewed manifest — early scores are
// directional, not gospel; the dataset compounds by construction.
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEntries } from './detect.mjs';
import { normalize, parseGoldManifest, scoreTriage, applyAdvocate } from './harvest-lib.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (n, d = '') => ((argv.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1]) || d;
const MODEL = flag('model', 'claude-sonnet-5');
const FIXTURE = flag('fixture', 'twir-290');
const CANDIDATE = flag('candidate');
const OUT = flag('out');
const PROVIDER = flag('provider', 'anthropic');
const ADVOCATE = argv.includes('--advocate');

const fix = JSON.parse(readFileSync(join(ROOT, 'tests/fixtures/harvest', `${FIXTURE}-inventory.json`), 'utf8'));
const gold = parseGoldManifest(readFileSync(join(ROOT, fix.gold), 'utf8'));
const keys = fix.links.map((l) => normalize(l.url));

// CONTAMINATION GUARD: judge against the corpus AS IT STOOD when the issue
// arrived (frozen in the fixture) — the live corpus already contains what the
// gold pass kept, which turns every gold-keep into a fake "already-held".
// The bench's own first run caught exactly this.
function corpusContext() {
  if (fix.corpus) return { index: fix.corpus.index.join('\n'), held: fix.corpus.held.join('\n') };
  const entries = Object.values(loadEntries());
  return {
    index: entries.map((e) =>
      `${e.id} — ${e.topic} [${e.category}] (${(e.reading || []).length + (e.watching || []).length} readings held)`).join('\n'),
    held: [...new Set(entries.flatMap((e) => [
      ...(e.sources || []), ...(e.reading || []).map((r) => r.url), ...(e.watching || []).map((w) => w.url),
      ...(e.migrate || []).flatMap((m) => m.receipts || []),
    ]).filter(Boolean))].join('\n'),
  };
}

function buildPrompt() {
  const { index, held } = corpusContext();
  const links = fix.links.map((l, i) => `${i + 1}. ${l.url}\n   text: ${l.text || '(none)'}`).join('\n');
  return `You are the triage layer of react-brain, a verified React/React-Native ecosystem knowledge corpus. Below is the complete external-link inventory of a newsletter issue. Give EVERY link exactly one disposition:

- "kept" — a durable SELECTION fact or canonical deep-dive the corpus should absorb (status flips, deprecations, genuine domain gaps, readings that cover an uncovered facet). Set "entry" to the single best RB-E-* id, or "NEW" if it reveals a domain no entry covers.
- "already-held" — the URL (or the fact it carries) is already in the corpus. The corpus's held-URL list is provided; version facts already reflected in an entry also count.
- "skipped" — everything else. Set "reason" to one of: corroboration (fact already held / merely confirms), how-to (implementation tutorial — depth belongs to skills, not the selection index), pre-ship (RFC / beta / proposal not yet released), too-early (0.x lab, no adoption signal), cap (entry's reading list is full and this doesn't beat what's held — reading counts are in the index), minor-release (routine point release, entries don't track those), off-scope (not a React/RN selection concern; also testimonials, showcases, author-affiliation links), sponsor.

Discipline: newsletters heavily corroborate — the typical honest yield is ONE gap-filling keep or a few status-flips plus 2-3 readings. A small keep-set is health; never pad. You cannot fetch URLs — judge from the URL + anchor text + your knowledge.

THE CORPUS INDEX:
${index}

URLS THE CORPUS ALREADY HOLDS:
${held}

THE INVENTORY (${fix.links.length} links from ${fix.url}):
${links}

Reply with ONLY a JSON array, one object per link, in order, url copied EXACTLY:
[{"url": "...", "disposition": "kept|already-held|skipped", "entry": "RB-E-... (kept only)", "reason": "class (skipped only)"}]`;
}

// the adversarial second pass — fresh context, opposite mandate, skips only
function buildAdvocatePrompt(rows) {
  const skips = rows.filter((r) => !/kept|already/i.test(String(r.disposition)));
  const { index, held } = corpusContext();
  const list = skips.map((r, i) => {
    const l = fix.links.find((x) => normalize(x.url) === (r.key ?? normalize(r.url)));
    return `${i + 1}. ${r.url}\n   text: ${l?.text || '(none)'}\n   first-pass skip reason: ${r.reason || '(none given)'}`;
  }).join('\n');
  return `You are the ADVOCATE FOR THE DROPPED in react-brain, a verified React/React-Native selection corpus. A first-pass triage skipped every item below. This pipeline's MEASURED failure mode is FALSE SKIPS — durable facts silently dropped — while over-keeping is cheap (a human reviews all keeps). Your only job: attack each skip reason and argue back in anything the corpus would regret losing.

Flip an item to kept ONLY if it is: a durable status change (release line, deprecation, stewardship/acquisition, governance), a genuine domain GAP no entry covers, or a canonical deep-dive covering a facet the entry's readings lack. Leave skipped: corroboration of held facts, implementation how-tos, routine point releases, pre-ship RFCs/betas, sponsors/testimonials.

THE CORPUS INDEX:
${index}

URLS THE CORPUS ALREADY HOLDS (do not flip these — they are held):
${held}

THE SKIPS (${skips.length}):
${list}

Reply with ONLY a JSON array containing ONLY the items you flip to kept, url copied EXACTLY — [] if every skip survives your attack:
[{"url": "...", "entry": "RB-E-... or NEW", "why": "one line"}]`;
}

async function askAnthropic(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) { console.error('no ANTHROPIC_API_KEY in env — use --provider=claude-cli (Claude Code subscription) or --candidate=<file> (offline scoring)'); process.exit(1); }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: MODEL, max_tokens: 8000, temperature: 0, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) { console.error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`); process.exit(1); }
  return (await res.json()).content?.map((c) => c.text || '').join('') || '';
}

function askClaudeCli(prompt) {
  const scratch = mkdtempSync(join(tmpdir(), 'rb-triage-'));
  return execFileSync('claude', [
    '-p', prompt, '--model', MODEL, '--max-turns', '4', '--strict-mcp-config',   // room to recover from a DENIED tool attempt into a text answer
    '--disallowedTools', 'Bash', 'Read', 'Write', 'Edit', 'Glob', 'Grep', 'WebFetch', 'WebSearch', 'Agent', 'Task',
  ], { encoding: 'utf8', cwd: scratch, timeout: 600000, maxBuffer: 16 * 1024 * 1024 }).trim();
}

const ask = (prompt) => PROVIDER === 'claude-cli' ? askClaudeCli(prompt) : askAnthropic(prompt);
const parseArray = (raw, label) => {
  const m = String(raw).match(/\[[\s\S]*\]/);
  if (!m) { console.error(`no JSON array in ${label} response; first 400 chars:\n${String(raw).slice(0, 400)}`); process.exit(1); }
  return JSON.parse(m[0]);
};

let candRows;
if (CANDIDATE) {
  candRows = JSON.parse(readFileSync(CANDIDATE, 'utf8'));
} else {
  console.log(`harvest bench — ${FIXTURE} (${fix.links.length} links) vs gold ${fix.gold}\n   model: ${MODEL} (${PROVIDER})…`);
  candRows = parseArray(await ask(buildPrompt()), 'triage');
}

const knownIds = fix.corpus ? new Set(fix.corpus.index.map((l) => l.split(' ')[0])) : null;
const s = scoreTriage(gold, candRows, keys, knownIds);

let adv = null;
if (ADVOCATE) {
  console.log('   advocate pass (fresh context, skips only)…');
  const flips = parseArray(await ask(buildAdvocatePrompt(candRows)), 'advocate');
  const merged = applyAdvocate(candRows, flips);
  const s2 = scoreTriage(gold, merged, keys, knownIds);
  const goldKeys = new Map(gold.map((r) => [r.key, r]));
  const recovered = flips.filter((f) => goldKeys.get(normalize(f.url))?.disposition === 'kept');
  adv = { flips: flips.length, recovered: recovered.length, wrongFlips: flips.length - recovered.length, score: s2.score, s2, flipsDetail: flips };
}
console.log(`\nJUDGMENT SCORE: ${s.score}/100   (weighted agreement over ${s.n} links; gold-kept ×3)`);
console.log(`   false skips (gold KEPT → skipped): ${s.falseSkips.length}   ← the feared failure`);
s.falseSkips.forEach((k) => console.log(`      ✗ ${k}`));
console.log(`   over-keeps (gold skipped → kept): ${s.overKeeps.length}${s.overKeeps.length ? '   (reviewable noise, cheap)' : ''}`);
s.overKeeps.forEach((k) => console.log(`      · ${k}`));
if (s.mismatches.length) { console.log(`   other mismatches: ${s.mismatches.length}`); s.mismatches.forEach((x) => console.log(`      · ${x}`)); }
if (s.unanswered.length) console.log(`   unanswered: ${s.unanswered.length} (${s.unanswered.join(', ')})`);
console.log(`   routing (both kept): ${s.routing.ok}/${s.routing.n} correct entry`);
s.routing.misses.forEach((x) => console.log(`      · ${x}`));
console.log(`   skip-reason agreement (coarse): ${s.reason.ok}/${s.reason.n}`);
if (adv) {
  console.log(`\nADVOCATE ARM: ${s.score} → ${adv.score}   (Δ ${adv.score - s.score >= 0 ? '+' : ''}${adv.score - s.score})`);
  console.log(`   flips proposed: ${adv.flips} — recovered gold keeps: ${adv.recovered} · wrong flips (over-keeps introduced): ${adv.wrongFlips}`);
  adv.flipsDetail.forEach((f) => console.log(`      ${gold.find((g) => g.key === normalize(f.url))?.disposition === 'kept' ? '✓' : '·'} ${f.url} → ${f.entry}   (${f.why})`));
  console.log(`   remaining false skips after advocate: ${adv.s2.falseSkips.length}`);
  adv.s2.falseSkips.forEach((k) => console.log(`      ✗ ${k}`));
}
if (OUT) { writeFileSync(OUT, JSON.stringify({ model: CANDIDATE ? `candidate:${CANDIDATE}` : MODEL, fixture: FIXTURE, ran: new Date().toISOString().slice(0, 10), ...s, advocate: adv ? { flips: adv.flips, recovered: adv.recovered, wrongFlips: adv.wrongFlips, score: adv.score } : undefined, rows: candRows }, null, 1) + '\n'); console.log(`\nwrote ${OUT}`); }
