#!/usr/bin/env node
// ── react-brain bench — the LLM staleness benchmark ─────────────────────────────
// LLMs are the world's largest distributor of rotted React advice. The corpus is a
// dated, verified answer key — so it can MEASURE the rot. Every question derives
// from a verified corpus fact (bench/questions.yaml); grading is DETERMINISTIC
// (regex rubric, fresh-wins ordering, published transcripts) — no judge model.
//
// Metrics per run:
//   fresh%             — knows the current truth
//   confidently-stale% — asserts the outdated world WITHOUT hedging (the headline:
//                        being wrong is forgivable, being confidently wrong is the
//                        failure mode that burns users)
//   hedged%            — flagged its own uncertainty (scored kindly on purpose)
// The --with-corpus arm injects the relevant entry as context (simulating an agent
// that consulted the react-brain MCP server) — the delta is the product, quantified.
//
// Usage:
//   node tools/react-brain-bench.mjs --list
//   node tools/react-brain-bench.mjs --run --model=claude-sonnet-5 [--with-corpus] [--limit=N] [--today=…]
//   (keys from env: ANTHROPIC_API_KEY or OPENAI_API_KEY; provider inferred from model name)
// Results → bench/results/<model>[-with-corpus]-<date>.json (committed; the site renders them).
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { loadYaml, loadEntries, trunc } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
export const BANK_PATH = resolve(__dir, '../bench/questions.yaml');
const RESULTS_DIR = resolve(__dir, '../bench/results');

export function loadBank() { return loadYaml(BANK_PATH).questions; }

// ── deterministic grading ───────────────────────────────────────────────────────
// fresh WINS over stale: a good answer often names the superseded thing while
// recommending the current one ("use Maestro — Expo archived Detox").
const HEDGE = new RegExp([
  'knowledge cutoff', 'training (data|cutoff)', 'as of my', 'as of (early|late|mid)?\\s*20\\d\\d',
  'may have changed', 'might have changed', 'may be outdated', 'check the (latest|current|official)',
  'verify (with|against|the)', "i('m| am) not (certain|sure)", 'i cannot confirm', 'may no longer',
].join('|'), 'i');

export function grade(q, answer) {
  const a = String(answer || '');
  const hit = (pats) => (pats || []).some((p) => new RegExp(p, 'i').test(a));
  const verdict = hit(q.fresh_markers) ? 'fresh' : hit(q.stale_markers) ? 'stale' : 'unclear';
  const hedged = HEDGE.test(a);
  return { verdict, hedged, confidently_stale: verdict === 'stale' && !hedged };
}

export function summarize(results) {
  const n = results.length;
  const count = (f) => results.filter(f).length;
  const pct = (x) => Math.round((x / n) * 100);
  const fresh = count((r) => r.verdict === 'fresh'), stale = count((r) => r.verdict === 'stale');
  const cs = count((r) => r.confidently_stale);
  return { n, fresh, stale, unclear: n - fresh - stale, hedged: count((r) => r.hedged),
    confidently_stale: cs, fresh_pct: pct(fresh), stale_pct: pct(stale), confidently_stale_pct: pct(cs) };
}

// context for the --with-corpus arm: the entry, compact (what an agent gets from MCP `query`)
export function entryContext(e) {
  return [
    `[react-brain · verified ${String(e.updated)} · ${e.status}/${e.confidence}] ${e.id} — ${e.topic}`,
    `RECOMMEND: ${e.recommend?.default || ''}`,
    ...(e.recommend?.when || []).map((w) => `WHEN: ${w}`),
    e.note ? `NOTES: ${trunc(String(e.note).trim().replace(/\s+/g, ' '), 900)}` : '',
  ].filter(Boolean).join('\n');
}

// ── providers (plain fetch, temperature 0, no SDKs) ─────────────────────────────
async function askAnthropic(model, system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 500, temperature: 0, system, messages: [{ role: 'user', content: user }] }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  return (j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
}

async function askOpenAI(model, system, user) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model, temperature: 0, max_tokens: 500,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  return j.choices?.[0]?.message?.content || '';
}

const SYSTEM = 'You are a senior React / React Native advisor. Answer the question directly and concisely (a few sentences). It is currently 2026.';

async function run({ model, withCorpus, limit, today }) {
  const provider = /^claude|^anthropic/i.test(model) ? 'anthropic' : 'openai';
  const key = provider === 'anthropic' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY;
  if (!key) { console.error(`no ${provider === 'anthropic' ? 'ANTHROPIC' : 'OPENAI'}_API_KEY in env — cannot run. (--list shows the bank; results can be contributed from any machine.)`); process.exit(1); }
  const ask = provider === 'anthropic' ? askAnthropic : askOpenAI;
  const entries = loadEntries();
  const bank = loadBank().slice(0, limit || undefined);
  const results = [];
  for (const q of bank) {
    const ctx = withCorpus && entries[q.entry] ? `Consult this verified reference before answering:\n\n${entryContext(entries[q.entry])}\n\nQuestion: ` : '';
    let answer;
    try { answer = await ask(model, SYSTEM, ctx + q.question); }
    catch (e) { console.error(`  ✗ ${q.id}: ${e.message}`); answer = ''; }
    const g = grade(q, answer);
    results.push({ id: q.id, entry: q.entry, ...g, answer: trunc(answer.replace(/\s+/g, ' '), 600) });
    const glyph = g.confidently_stale ? '✗ CONFIDENTLY STALE' : g.verdict === 'fresh' ? '✓ fresh' : g.verdict === 'stale' ? '~ stale (hedged)' : g.hedged ? '· unclear (hedged)' : '· unclear';
    console.log(`  ${glyph.padEnd(20)} ${q.id}`);
  }
  const summary = summarize(results);
  const out = { model, provider, with_corpus: !!withCorpus, date: today, bank_size: bank.length, summary, results };
  mkdirSync(RESULTS_DIR, { recursive: true });
  const file = join(RESULTS_DIR, `${model.replace(/[^\w.-]/g, '_')}${withCorpus ? '-with-corpus' : ''}-${today}.json`);
  writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
  console.log(`\n  ${model}${withCorpus ? ' + react-brain context' : ''}: ${summary.fresh_pct}% fresh · ${summary.confidently_stale_pct}% confidently stale · ${summary.hedged}/${summary.n} hedged`);
  console.log(`  → ${file}\n`);
}

// ── CLI (main-guarded: the eval imports grade/summarize/loadBank) ───────────────
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const argv = process.argv.slice(2);
  const get = (k, d) => (argv.find((a) => a.startsWith(`--${k}=`)) || `--${k}=${d}`).split('=').slice(1).join('=');
  if (argv.includes('--list')) {
    for (const q of loadBank()) console.log(`  ${q.id.padEnd(18)} [${q.entry} · verified ${q.verified}] ${q.question}`);
    console.log(`\n  ${loadBank().length} questions — every one a verified, dated corpus fact.`);
  } else if (argv.includes('--run')) {
    const model = get('model', '');
    if (!model) { console.error('usage: react-brain bench --run --model=<id> [--with-corpus] [--limit=N]'); process.exit(1); }
    await run({ model, withCorpus: argv.includes('--with-corpus'),
      limit: parseInt(get('limit', '0'), 10) || 0, today: get('today', new Date().toISOString().slice(0, 10)) });
  } else {
    console.log('usage: react-brain bench --list | --run --model=<id> [--with-corpus] [--limit=N] [--today=YYYY-MM-DD]');
  }
}
