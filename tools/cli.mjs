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
//   decide   — a living decision record: ADR with receipts, premise-checked by doctor
//   query    — look up an entry's recommendation
// doctor/evidence/pulse delegate to their scripts (one source of truth); query is native.
// ───────────────────────────────────────────────────────────────────────────────

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { searchEntries, searchReadings } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const [cmd, ...rest] = process.argv.slice(2);
const delegate = (script) => {
  try { execFileSync(process.execPath, [resolve(__dir, script), ...rest], { stdio: 'inherit' }); }
  catch (e) { process.exit(e.status ?? 1); }   // child already printed its error; no stack trace on top
};

function help() {
  console.log(`
react-brain — executable React / React Native ecosystem encyclopedia

usage: react-brain <command> [args]

  stack    [intent]    compose a greenfield stack from intent flags (no repo needed)
                       (flags: --rn|--web|--both, --expo, --p2p, --stage=…, --help)
  doctor   <repo...>   advise a repo: detected stack vs the encyclopedia's context recommendations
                       + source scan for legacy core RN APIs → modern swaps + living-ADR premise
                       checks (--no-scan, --files, --json, --ci = exit 1 on expired records)
  map      <repo>      the repo pinboard: one compact line per source file (domains, imports,
                       exports, smells) + a DOMAINS→files index — code location for agents
                       without grepping (--json, --dir=src/)
  migrate  <repo>      SEQUENCED upgrade plan: installed versions × per-entry migrate: rules
                       + the legacy-API source scan — phased (dead/gates → deprecated →
                       upgrades → blocked), every step with receipts (--json)
  review   <repo>      diff-scoped corpus review vs --base=<ref> (default HEAD): dep adds
                       the corpus marks dead/deprecated BLOCK; smells/legacy APIs flagged
                       only when INTRODUCED by the diff (--ci = exit 1 on blocking, --json)
  evidence <repo...>   corpus self-audit across repos: blind spots, contradictions, field evidence
  pulse    [repo...]   corpus health: dead links, stale entries, stack drift
                       (flags: --today=YYYY-MM-DD, --no-links)
  harvest  <mode>      deterministic acquisition scaffolding:
                       firsthand (corpus-derived watch graph — npm dist-tags, GitHub
                       releases, author feeds — diffed vs .firsthand-state.json;
                       --graph | --json | --manifest) · inventory <url> (every link,
                       mechanically) · coverage <url> <manifest.md> (exit 1 on
                       unaccounted links) · verify-diff [--base=main] (the receipts
                       gate: re-verify every URL the branch adds — CI-enforced on
                       harvest PRs) · watchlist (recurring skips + reopen
                       signals across tools/harvest-log/)
  calibrate [...]      scored prediction track record: is confidence earned?
                       (--seed | --record <id> <held|weakened|overturned> | --today=…)
  signals  [...]       recommendations vs live npm reality (downloads, staleness, claims)
                       (flags: --record [log CLAIMs to ledger], --list, --no-registry, --today=…)
  census   [...]       observed adoption across a cohort of production OSS apps
                       (flags: --json, --cohort=path, --today=…)
  briefing <repo...>   what changed in the ecosystem that touches YOUR stack —
                       the corpus diff × your detected deps, with receipts
                       (flags: --since=YYYY-MM-DD, --write [BRIEFING.md], --today=…)
  mcp                  run the stdio MCP server (for agents):
                       claude mcp add react-brain -- npx -y @heart-it/react-brain mcp
  learn    <repo...>   a repo-personalized learning path through the encyclopedia
                       (flags: --stage=prototype|mvp|production|scale, --full)
  decide   <topic> [repo]  generate a LIVING DECISION RECORD (ADR with receipts): resolved
                       context, candidate table, evidence chain, calibration track record,
                       and a machine-readable premise block that \`doctor\` re-checks
                       (flags: --out=docs/adr, --stdout)
  query    <term>      look up an entry's recommendation (id / category / keyword)
  bench                the LLM STALENESS BENCHMARK: score models' React advice against
                       the corpus's verified, dated facts (--list | --run --model=<id>
                       [--with-corpus] — deterministic regex rubric, no judge model)
  lint                 mechanized corpus invariants: schema, TOC, reachability, dup URLs
                       (offline; exit 1 on errors — run after any corpus edit)
  help                 this

examples:
  npx react-brain stack --rn --expo --p2p --stage=mvp
  npx react-brain doctor .
  npx react-brain learn .
  npx react-brain query "data fetching"
  npx react-brain pulse --today=2026-06-25 .
`);
}

function query(args) {
  const terms = args.flatMap((t) => String(t).split(/\s+/)).filter(Boolean);   // quoted sentences arrive as one arg
  if (!terms.length) { console.error('usage: react-brain query <entry-id | category | keyword | free-form question>'); process.exit(1); }
  const ranked = searchEntries(terms);
  const reads = searchReadings(terms);
  if (!ranked.length && !reads.length) {
    console.log(`no entry or reading matches "${terms.join(' ')}". Try: state, data, nav, styling, native, build, testing, security, p2p, svg, animation, …`);
    return;
  }
  for (const e of ranked) {
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
  if (reads.length) {
    console.log(`\n${'─'.repeat(72)}`);
    console.log(`READINGS MATCHED (your words vs the corpus's annotations):`);
    for (const r of reads) {
      console.log(`  • [${r.entry.replace('RB-E-', '')}] ${r.title} — ${r.url}`);
      const gist = r.claim || r.what || '';
      if (gist) console.log(`    ${gist.length > 200 ? gist.slice(0, 199) + '…' : gist}`);
    }
  }
  console.log('');
}

switch (cmd) {
  case 'doctor': delegate('react-brain-doctor.mjs'); break;
  case 'map': delegate('react-brain-map.mjs'); break;
  case 'migrate': delegate('react-brain-migrate.mjs'); break;
  case 'review': delegate('react-brain-review.mjs'); break;
  case 'evidence': delegate('react-brain-evidence.mjs'); break;
  case 'stack': delegate('react-brain-stack.mjs'); break;
  case 'pulse': delegate('react-brain-pulse.mjs'); break;
  case 'calibrate': delegate('react-brain-calibrate.mjs'); break;
  case 'signals': delegate('react-brain-signals.mjs'); break;
  case 'census': delegate('react-brain-census.mjs'); break;
  case 'briefing': delegate('react-brain-briefing.mjs'); break;
  case 'learn': delegate('react-brain-learn.mjs'); break;
  case 'decide': delegate('react-brain-decide.mjs'); break;
  case 'bench': delegate('react-brain-bench.mjs'); break;
  case 'harvest': delegate('react-brain-harvest.mjs'); break;
  case 'lint': delegate('react-brain-lint.mjs'); break;
  case 'mcp': delegate('mcp-server.mjs'); break;   // stdio MCP server: claude mcp add react-brain -- npx -y @heart-it/react-brain mcp
  case 'query': query(rest); break;
  case undefined: case 'help': case '--help': case '-h': help(); break;
  default: console.error(`unknown command: ${cmd}\n`); help(); process.exit(1);
}
