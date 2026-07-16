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
import { normalize, parseGoldManifest, scoreTriage } from './harvest-lib.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (n, d = '') => ((argv.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1]) || d;
const MODEL = flag('model', 'claude-sonnet-5');
const FIXTURE = flag('fixture', 'twir-290');
const CANDIDATE = flag('candidate');
const OUT = flag('out');
const PROVIDER = flag('provider', 'anthropic');

const fix = JSON.parse(readFileSync(join(ROOT, 'tests/fixtures/harvest', `${FIXTURE}-inventory.json`), 'utf8'));
const gold = parseGoldManifest(readFileSync(join(ROOT, fix.gold), 'utf8'));
const keys = fix.links.map((l) => normalize(l.url));

function buildPrompt() {
  // CONTAMINATION GUARD: judge against the corpus AS IT STOOD when the issue
  // arrived (frozen in the fixture) — the live corpus already contains what the
  // gold pass kept, which turns every gold-keep into a fake "already-held".
  // The bench's own first run caught exactly this.
  let index, held;
  if (fix.corpus) { index = fix.corpus.index.join('\n'); held = fix.corpus.held.join('\n'); }
  else {
    const entries = Object.values(loadEntries());
    index = entries.map((e) =>
      `${e.id} — ${e.topic} [${e.category}] (${(e.reading || []).length + (e.watching || []).length} readings held)`).join('\n');
    held = [...new Set(entries.flatMap((e) => [
      ...(e.sources || []), ...(e.reading || []).map((r) => r.url), ...(e.watching || []).map((w) => w.url),
      ...(e.migrate || []).flatMap((m) => m.receipts || []),
    ]).filter(Boolean))].join('\n');
  }
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

let candRows;
if (CANDIDATE) {
  candRows = JSON.parse(readFileSync(CANDIDATE, 'utf8'));
} else {
  console.log(`harvest bench — ${FIXTURE} (${fix.links.length} links) vs gold ${fix.gold}\n   model: ${MODEL} (${PROVIDER})…`);
  const raw = PROVIDER === 'claude-cli' ? askClaudeCli(buildPrompt()) : await askAnthropic(buildPrompt());
  const m = raw.match(/\[[\s\S]*\]/);
  if (!m) { console.error(`no JSON array in response; first 400 chars:\n${raw.slice(0, 400)}`); process.exit(1); }
  candRows = JSON.parse(m[0]);
}

const knownIds = fix.corpus ? new Set(fix.corpus.index.map((l) => l.split(' ')[0])) : null;
const s = scoreTriage(gold, candRows, keys, knownIds);
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
if (OUT) { writeFileSync(OUT, JSON.stringify({ model: CANDIDATE ? `candidate:${CANDIDATE}` : MODEL, fixture: FIXTURE, ran: new Date().toISOString().slice(0, 10), ...s }, null, 1) + '\n'); console.log(`\nwrote ${OUT}`); }
