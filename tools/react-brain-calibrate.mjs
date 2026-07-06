#!/usr/bin/env node
// ── react-brain calibrate ──────────────────────────────────────────────────────
// The CAPSTONE trust primitive. completeness(evidence) + freshness(pulse) +
// correctness(challenge) all ask "is the corpus right?". calibrate asks the deeper
// question none of them can: "is it right RELIABLY — and does its `confidence` field
// mean anything?" It makes the encyclopedia accountable to its own predictions.
//
// Superforecasting applied to a knowledge base: every recommend.default is a dated,
// falsifiable PREDICTION with a check-by horizon. The challenge routine resolves them
// (held / weakened / overturned). This tool joins the two and scores CALIBRATION per
// confidence tier — turning `confidence` from an assertion into a measurement.
//
// Ledger: tools/predictions.jsonl (append-only history; ships as the credibility artifact).
//   {"k":"P", id, claim, confidence, category, asserted, check_by}        ← a prediction
//   {"k":"O", id, outcome:"held|weakened|overturned", on, note}           ← a resolution
//
// Usage:
//   node tools/react-brain-calibrate.mjs --seed [--today=YYYY-MM-DD]      seed missing predictions
//   node tools/react-brain-calibrate.mjs --record <id> <outcome> [note…]  append a challenge verdict
//   node tools/react-brain-calibrate.mjs [--today=YYYY-MM-DD]             the calibration scorecard
// ───────────────────────────────────────────────────────────────────────────────

import { appendFileSync } from 'node:fs';
import { loadDoc, readLedger, LEDGER_PATH } from './detect.mjs';

// Horizon to re-examine a prediction, by stated confidence; fast-moving domains get a
// shorter leash (their leads rot faster, so we hold them accountable sooner).
const HORIZON_MONTHS = { high: 9, medium: 5, low: 3 };
const FAST = new Set(['native', 'rn-versions', 'build', 'react-core', 'ondevice-ai', 'ai-ui', 'alt-frameworks', 'games', 'native-ui', 'media', 'meta-frameworks']);
const OUTCOMES = { held: 1, weakened: 0.5, overturned: 0 };   // calibration weight

const flags = process.argv.slice(2);
const today = (flags.find((f) => f.startsWith('--today=')) || '').split('=')[1] || new Date().toISOString().slice(0, 10);

function addMonths(dateStr, n) {
  const [y, m, d] = (dateStr || today).split('-').map(Number);
  const dt = new Date(Date.UTC(y, (m - 1) + n, Math.min(d || 1, 28)));
  return dt.toISOString().slice(0, 10);
}
const append = (rec) => appendFileSync(LEDGER_PATH, JSON.stringify(rec) + '\n');

function seed() {
  const have = new Set(readLedger().filter((r) => r.k === 'P').map((r) => r.id));
  const entries = loadDoc().entries;
  let n = 0;
  for (const e of entries) {
    if (have.has(e.id)) continue;
    const conf = e.confidence || 'medium';
    const asserted = String(e.updated || today);
    const horizon = FAST.has(e.category) ? Math.max(2, HORIZON_MONTHS[conf] - 3) : HORIZON_MONTHS[conf];
    append({ k: 'P', id: e.id, claim: (e.recommend?.default || '').slice(0, 200), confidence: conf, category: e.category, asserted, check_by: addMonths(asserted, horizon) });
    n++;
  }
  console.log(`seeded ${n} prediction(s); ledger now has ${readLedger().filter((r) => r.k === 'P').length}.`);
}

function record(id, outcome, note) {
  if (!id || !OUTCOMES.hasOwnProperty(outcome)) {
    console.error('usage: calibrate --record <RB-E-ID> <held|weakened|overturned> [note…]');
    process.exit(1);
  }
  append({ k: 'O', id, outcome, on: today, note: note || '' });
  console.log(`recorded ${id} → ${outcome} (${today}).`);
}

function bar(frac, width = 10) {
  const f = Math.max(0, Math.min(1, frac || 0));
  return '█'.repeat(Math.round(f * width)) + '░'.repeat(width - Math.round(f * width));
}

function scorecard() {
  const led = readLedger();
  const preds = led.filter((r) => r.k === 'P');
  if (!preds.length) { console.log('\nNo predictions yet. Run:  node tools/react-brain-calibrate.mjs --seed\n'); return; }
  // latest outcome per id
  const outcome = {};
  for (const r of led) if (r.k === 'O') outcome[r.id] = r;
  const resolved = preds.filter((p) => outcome[p.id]);

  console.log(`\n${'━'.repeat(78)}`);
  console.log(`📊  react-brain calibrate — does the encyclopedia's confidence mean anything?`);
  console.log(`${'━'.repeat(78)}`);
  console.log(`ledger: tools/predictions.jsonl   ·   ${preds.length} predictions · ${resolved.length} resolved   ·   as of ${today}`);

  console.log(`\n  CALIBRATION  (resolved predictions vs the confidence they were asserted with)`);
  console.log(`  ${'-'.repeat(74)}`);
  for (const tier of ['high', 'medium', 'low']) {
    const inTier = preds.filter((p) => p.confidence === tier);
    const res = inTier.filter((p) => outcome[p.id]);
    const held = res.filter((p) => outcome[p.id].outcome === 'held').length;
    const weak = res.filter((p) => outcome[p.id].outcome === 'weakened').length;
    const over = res.filter((p) => outcome[p.id].outcome === 'overturned').length;
    const score = res.length ? res.reduce((s, p) => s + OUTCOMES[outcome[p.id].outcome], 0) / res.length : null;
    let read;
    if (!res.length) read = 'unproven — no resolved predictions yet';
    else if (tier === 'high') read = over ? 'OVERCONFIDENT — high-confidence calls overturned' : score >= 0.8 ? 'well-calibrated so far' : 'watch';
    else if (tier === 'low') read = score >= 0.9 ? 'possibly under-confident (low calls keep holding)' : 'expected churn — calibrated';
    else read = over > held ? 'shaky' : 'reasonable so far';
    const pct = score == null ? ' n/a ' : `${Math.round(score * 100)}%`.padStart(4);
    console.log(`  ${tier.padEnd(7)} ${bar(res.length / (inTier.length || 1))}  resolved ${String(res.length).padStart(2)}/${String(inTier.length).padEnd(2)} · held ${held} weak ${weak} over ${over} · score ${pct}  → ${read}`);
  }

  if (resolved.length) {
    console.log(`\n  RESOLVED  (the verdicts behind the score — newest first)`);
    console.log(`  ${'-'.repeat(74)}`);
    const sym = { held: '✓', weakened: '~', overturned: '✗' };
    for (const p of resolved.sort((a, b) => (outcome[b.id].on || '').localeCompare(outcome[a.id].on || ''))) {
      const o = outcome[p.id];
      console.log(`  ${sym[o.outcome]} ${p.id.replace('RB-E-', '').padEnd(16)} ${o.outcome.padEnd(11)} ${o.on}  ${o.note || ''}`.trimEnd());
    }
  }

  const due = preds.filter((p) => !outcome[p.id] && p.check_by <= today)
    .sort((a, b) => a.check_by.localeCompare(b.check_by));
  console.log(`\n  CHECK-DUE  (open predictions past their horizon — point challenge here next)`);
  console.log(`  ${'-'.repeat(74)}`);
  if (!due.length) console.log(`  none past ${today}. Soonest upcoming:`);
  const list = due.length ? due.slice(0, 12)
    : preds.filter((p) => !outcome[p.id]).sort((a, b) => a.check_by.localeCompare(b.check_by)).slice(0, 5);
  for (const p of list) console.log(`  • ${p.id.replace('RB-E-', '').padEnd(16)} ${p.confidence.padEnd(7)} due ${p.check_by}${p.check_by <= today ? '  ⚠ overdue' : ''}`);

  console.log(`\n  How it grows: challenge resolves predictions (\`calibrate --record <id> <outcome>\`),`);
  console.log(`  re-run \`--seed\` after adding entries, and the score earns its meaning over time.`);
  console.log('');
}

if (flags.includes('--seed')) seed();
else if (flags.includes('--record')) {
  const i = flags.indexOf('--record');
  const [id, outcome, ...note] = flags.slice(i + 1).filter((f) => !f.startsWith('--'));
  record(id, outcome, note.join(' '));
} else scorecard();
