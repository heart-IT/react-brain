#!/usr/bin/env node
// ── react-brain map — the repo pinboard (code location without grepping) ───────
// One compact line per source file: LOC, corpus-domain tags (⚠ = smell hit),
// external imports, exports — plus an inverted DOMAINS index so an agent answers
// "where does data fetching / forms / state live?" from ~15 tokens per file
// instead of reading files into context. Deterministic (regex extraction, zero
// LLM, zero network); complements doctor: doctor says WHAT the stack is and how
// it fits, map says WHERE each domain lives in the source.
//
//   node tools/react-brain-map.mjs <repo> [--json] [--dir=src/]
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, mapRepo, trunc } from './detect.mjs';

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const DIR = (argv.find((a) => a.startsWith('--dir=')) || '').slice(6) || null;
const targets = argv.filter((a) => !a.startsWith('--'));
if (!targets.length) { console.error('usage: node tools/react-brain-map.mjs <repoPath> [--json] [--dir=src/]'); process.exit(1); }

const entries = loadEntries();
const short = (id) => id.replace('RB-E-', '');

for (const t of targets) {
  const m = mapRepo(t, entries);
  if (m.missing || m.notReact) { console.log(`(skip ${m.name}: ${m.missing ? (m.malformed ? 'malformed package.json' : 'no package.json') : 'not a React/RN repo'})`); continue; }
  const files = DIR ? m.files.filter((f) => f.path.startsWith(DIR)) : m.files;
  if (JSON_OUT) { console.log(JSON.stringify({ ...m, files }, null, 1)); continue; }

  console.log(`\n🗺  react-brain map — ${m.name}  (${m.platform} · ${m.stage} · ${files.length}${DIR ? ` of ${m.files.length}` : ''} source files${m.capped ? ' · CAPPED — partial' : ''})`);
  console.log('─'.repeat(78));
  const ids = Object.keys(m.domains).sort((a, b) => m.domains[b].length - m.domains[a].length);
  if (ids.length) {
    console.log('DOMAINS (entry → where it lives; ⚠ in a file line = smell hit there)');
    for (const id of ids) {
      const fs = DIR ? m.domains[id].filter((p) => p.startsWith(DIR)) : m.domains[id];
      if (!fs.length) continue;
      console.log(`  ${short(id).padEnd(15)} ${String(fs.length).padStart(3)}: ${fs.slice(0, 8).join(', ')}${fs.length > 8 ? ` +${fs.length - 8}` : ''}`);
    }
    console.log('─'.repeat(78));
  }
  for (const f of files) {
    const tags = f.domains.map((d) => (f.smells.includes(d) ? `⚠${short(d)}` : short(d))).join('·');
    const imp = f.ext.slice(0, 4).join(', ') + (f.ext.length > 4 ? ` +${f.ext.length - 4}` : '');
    const exp = f.exports.slice(0, 4).join(', ') + (f.exports.length > 4 ? ` +${f.exports.length - 4}` : '');
    console.log(`  ${trunc(f.path, 44).padEnd(45)}${String(f.loc + 'L').padStart(6)}${tags ? `  [${tags}]` : ''}${imp ? `  ← ${imp}` : ''}${exp ? `  → ${exp}` : ''}`);
  }
  console.log(`\n  next: read only the files that matter — \`react-brain query <domain>\` explains any tag;`);
  console.log(`  doctor stays the fit/gaps ground truth. Deterministic scan of ${m.scanned} files, no LLM.\n`);
}
