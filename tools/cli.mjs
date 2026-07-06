#!/usr/bin/env node
// ── react-brain CLI ────────────────────────────────────────────────────────────
// Unified entry point for the executable encyclopedia. `npx react-brain <command>`.
//   stack    — compose a greenfield stack from intent (knowledge → new project)
//   doctor   — advise a repo (knowledge → code)
//   evidence — corpus self-audit across repos (code → knowledge)
//   pulse    — corpus health: dead links, staleness, drift (time / autonomy)
//   calibrate— scored prediction track record: does `confidence` mean anything? (trust)
//   signals  — recommendations vs live npm reality (empirical / external trust)
//   learn    — a repo-personalized learning path (knowledge → human)
//   query    — look up an entry's recommendation
// doctor/evidence/pulse delegate to their scripts (one source of truth); query is native.
// ───────────────────────────────────────────────────────────────────────────────

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadDoc } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const [cmd, ...rest] = process.argv.slice(2);
const delegate = (script) => execFileSync(process.execPath, [resolve(__dir, script), ...rest], { stdio: 'inherit' });

function help() {
  console.log(`
react-brain — executable React / React Native ecosystem encyclopedia

usage: react-brain <command> [args]

  stack    [intent]    compose a greenfield stack from intent flags (no repo needed)
                       (flags: --rn|--web|--both, --expo, --p2p, --stage=…, --help)
  doctor   <repo...>   advise a repo: detected stack vs the encyclopedia's context recommendations
                       + source scan for legacy core RN APIs → modern swaps (--no-scan, --files)
  evidence <repo...>   corpus self-audit across repos: blind spots, contradictions, field evidence
  pulse    [repo...]   corpus health: dead links, stale entries, stack drift
                       (flags: --today=YYYY-MM-DD, --no-links)
  calibrate [...]      scored prediction track record: is confidence earned?
                       (--seed | --record <id> <held|weakened|overturned> | --today=…)
  signals  [...]       recommendations vs live npm reality (downloads, staleness, claims)
                       (flags: --record [log CLAIMs to ledger], --list, --no-registry, --today=…)
  learn    <repo...>   a repo-personalized learning path through the encyclopedia
                       (flags: --stage=prototype|mvp|production|scale, --full)
  query    <term>      look up an entry's recommendation (id / category / keyword)
  help                 this

examples:
  npx react-brain stack --rn --expo --p2p --stage=mvp
  npx react-brain doctor .
  npx react-brain learn .
  npx react-brain query "data fetching"
  npx react-brain pulse --today=2026-06-25 .
`);
}

function query(terms) {
  if (!terms.length) { console.error('usage: react-brain query <entry-id | category | keyword>'); process.exit(1); }
  const ql = terms.join(' ').toLowerCase();
  const q = ql.replace(/^rb-e-/, '');
  const entries = loadDoc().entries;
  const score = (e) => {
    const id = e.id.replace('RB-E-', '').toLowerCase();
    const hay = [e.id, e.category, e.topic, JSON.stringify(e.options || []), e.recommend?.default || ''].join(' ').toLowerCase();
    let s = 0;
    if (id === q || e.category === q) s += 100;
    if (id.includes(q) || e.category.includes(q) || e.topic.toLowerCase().includes(q)) s += 20;
    for (const t of terms) if (hay.includes(t.toLowerCase())) s += 3;
    return s;
  };
  const ranked = entries.map((e) => ({ e, s: score(e) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
  if (!ranked.length) {
    console.log(`no entry matches "${terms.join(' ')}". Try: state, data, nav, styling, native, build, testing, security, p2p, svg, animation, …`);
    return;
  }
  for (const { e } of ranked) {
    console.log(`\n${'━'.repeat(72)}`);
    console.log(`${e.id}  —  ${e.topic}`);
    console.log(`group: ${e.group}  ·  status: ${e.status}·${e.confidence}  ·  platforms: ${(e.platforms || []).join('/')}`);
    console.log(`${'─'.repeat(72)}`);
    console.log(`RECOMMEND: ${e.recommend?.default || '(none)'}`);
    if (e.recommend?.when?.length) { console.log(`WHEN:`); for (const w of e.recommend.when) console.log(`  • ${w}`); }
    if (e.defer_to_skill) console.log(`depth → ${e.defer_to_skill} skill`);
    if (e.doc) console.log(`long-form → encyclopedia/${e.doc}`);
    if (e.reading?.length) { console.log(`READING:`); for (const r of e.reading) console.log(`  • ${r.title} — ${r.url}`); }
  }
  console.log('');
}

switch (cmd) {
  case 'doctor': delegate('react-brain-doctor.mjs'); break;
  case 'evidence': delegate('react-brain-evidence.mjs'); break;
  case 'stack': delegate('react-brain-stack.mjs'); break;
  case 'pulse': delegate('react-brain-pulse.mjs'); break;
  case 'calibrate': delegate('react-brain-calibrate.mjs'); break;
  case 'signals': delegate('react-brain-signals.mjs'); break;
  case 'learn': delegate('react-brain-learn.mjs'); break;
  case 'query': query(rest); break;
  case undefined: case 'help': case '--help': case '-h': help(); break;
  default: console.error(`unknown command: ${cmd}\n`); help(); process.exit(1);
}
