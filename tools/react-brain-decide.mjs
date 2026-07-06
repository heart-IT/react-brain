#!/usr/bin/env node
// ── react-brain decide — Living Decision Records ────────────────────────────────
// Turns a recommendation into the artifact teams actually need: an Architecture
// Decision Record with RECEIPTS — the resolved context, the candidate table, the
// evidence chain (sources · challenge/track record · live-npm snapshot) — plus a
// machine-readable premise block so `doctor` can tell you when the decision's
// basis MOVES (entry re-verified, prediction weakened, review horizon passed).
// ADRs rot silently everywhere; these ones know when they expire.
//
// Usage:  node tools/react-brain-decide.mjs <topic> [repoPath] [--out=docs/adr] [--stdout] [--today=YYYY-MM-DD]
//   e.g.  npx react-brain decide state .
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { loadDoc, loadEntries, searchEntries, resolveRecommendation, analyzeRepo,
         entryPackages, readLedger, trackRecord, trunc } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── args ────────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const pos = argv.filter((a) => !a.startsWith('--'));
const TOPIC = pos[0];
const REPO = pos[1] || '.';
const OUT = (flags.find((f) => f.startsWith('--out=')) || '--out=docs/adr').split('=')[1];
const STDOUT = flags.includes('--stdout');
const TODAY = (flags.find((f) => f.startsWith('--today=')) || '').split('=')[1] || new Date().toISOString().slice(0, 10);
if (!TOPIC) { console.error('usage: react-brain decide <topic> [repoPath] [--out=docs/adr] [--stdout]'); process.exit(1); }

// ── resolve topic → entry ───────────────────────────────────────────────────────
const [entry] = searchEntries(TOPIC.split(/\s+/));
if (!entry) { console.error(`no entry matches "${TOPIC}" — try: react-brain query ${TOPIC}`); process.exit(1); }

// ── repo context (same detection the doctor uses) ───────────────────────────────
const a = analyzeRepo(REPO);
const hasRepo = !a.missing && !a.notReact;
function contextTokens(an) {
  if (!hasRepo) return ['new project'];
  const t = [];
  const has = (id) => !!an.byEntry[id];
  if (an.platform === 'react-native') t.push(an.deps?.expo ? 'expo app' : 'bare rn');
  if (an.platform === 'react-native' && an.deps?.expo) t.push('expo');
  if (an.platform === 'both') t.push('new universal');
  if (has('RB-E-P2P')) t.push('p2p', 'holepunch', 'serverless');
  if (['@apollo/client', 'urql', 'graphql'].some((d) => an.deps && d in an.deps)) t.push('graphql');
  t.push(an.stage);
  return t;
}
const tokens = contextTokens(a);
const r = resolveRecommendation(entry, tokens);
const current = hasRepo && a.byEntry[entry.id] ? [...a.byEntry[entry.id].labels].join(', ') : null;

// ── evidence: ledger + live-npm snapshot ────────────────────────────────────────
const pred = readLedger().find((row) => row.k === 'P' && row.id === entry.id) || null;
const verdict = trackRecord()[entry.id] || null;
const baselinePath = join(__dir, '.signals-baseline.json');
const dl = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : {};
const pkgs = entryPackages(entry.id).filter((p) => dl[p.pkg] != null)
  .sort((x, y) => dl[y.pkg] - dl[x.pkg]).slice(0, 6);
const corpusVersion = JSON.parse(readFileSync(resolve(__dir, '../package.json'), 'utf8')).version;

// ── ADR number ──────────────────────────────────────────────────────────────────
const outDir = resolve(REPO, OUT);
let num = 1;
if (existsSync(outDir)) {
  const taken = readdirSync(outDir).map((f) => parseInt(f, 10)).filter((n) => !isNaN(n));
  if (taken.length) num = Math.max(...taken) + 1;
}

// ── the record ──────────────────────────────────────────────────────────────────
const fmt = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : String(n));
const title = entry.topic;
const md = `---
adr: ${num}
title: ${JSON.stringify(title)}
status: proposed            # → accepted | superseded (edit after team review)
date: ${TODAY}
react_brain:                # machine-readable premises — \`react-brain doctor\` re-checks these
  entry: ${entry.id}
  entry_status: ${entry.status}
  confidence: ${entry.confidence}
  entry_updated: ${String(entry.updated)}
  resolved_via: ${r.via}${r.via === 'when' ? `\n  matched_context: ${JSON.stringify(r.ctx)}` : ''}
  prediction_check_by: ${pred?.check_by || 'null'}
  corpus_version: ${corpusVersion}
---

# ${num}. ${title}

## Context

${hasRepo
  ? `Decided for **${a.name}** (${a.platform} · ${a.stage} stage · ${a.depCount} deps).${current ? `\nCurrent choice detected in this repo: **${current}**.` : '\nNothing detected for this domain in the repo yet — this is a fresh pick.'}`
  : 'Decided without a repo context (greenfield).'}
Context tokens resolved against the corpus: \`${tokens.join('`, `')}\`.

## Decision

${r.why}

${r.via === 'when' ? `*(Resolved via the context clause: "${r.ctx} → …" — not the generic default.)*` : '*(Resolved via the entry\'s default — no context clause overrode it.)*'}
${entry.confidence === 'low' ? '\n> ⚠ **Low confidence** — fast-moving domain. Treat as a vetted lead; prototype before committing.\n' : ''}
## Options considered

| option | tradeoff |
|---|---|
${(entry.options || []).map((o) => `| **${o.name}** | ${String(o.tradeoff).replace(/\|/g, '\\|')} |`).join('\n')}

## Evidence

- **Corpus entry:** ${entry.id} (\`${entry.status}\` · confidence \`${entry.confidence}\`, verified ${String(entry.updated)})
${verdict ? `- **Track record:** this recommendation's prediction has been resolved **${verdict}**.` : pred ? `- **Track record:** open prediction (asserted ${pred.asserted}), scored on resolution — see the corpus scorecard.` : ''}
${entry.note ? `- **Verified notes:** ${trunc(String(entry.note).trim().replace(/\s+/g, ' '), 400)}` : ''}
${pkgs.length ? `- **npm weekly downloads** (signals snapshot): ${pkgs.map((p) => `\`${p.pkg}\` ${fmt(dl[p.pkg])}`).join(' · ')}` : ''}
${(entry.sources || []).length ? `- **Primary sources:**\n${entry.sources.map((u) => `  - ${u}`).join('\n')}` : ''}
${(entry.reading || []).length ? `- **Canonical reading:**\n${entry.reading.slice(0, 3).map((x) => `  - [${x.title}](${x.url})${x.by ? ` — ${x.by}` : ''}`).join('\n')}` : ''}

## Review by

**${pred?.check_by || 'the entry\'s next corpus verification'}** — or earlier if \`react-brain doctor\` flags that the premises moved
(the ${entry.id} entry re-verified past ${String(entry.updated)}, or its prediction resolved weakened/overturned).

---
*Generated by react-brain v${corpusVersion} on ${TODAY}. Re-check premises: \`npx react-brain doctor .\`*
`;

if (STDOUT) { console.log(md); }
else {
  mkdirSync(outDir, { recursive: true });
  const slug = entry.slug || entry.id.replace('RB-E-', '').toLowerCase();
  const file = join(outDir, `${String(num).padStart(3, '0')}-${slug}.md`);
  writeFileSync(file, md);
  console.log(`\n📋  decision record → ${file}`);
  console.log(`    ${entry.id} (${entry.status}·${entry.confidence}) · resolved via ${r.via}${verdict ? ` · track: ${verdict}` : ''}`);
  console.log(`    review by ${pred?.check_by || '(next corpus verification)'} — doctor re-checks the premises\n`);
}
