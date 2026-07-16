#!/usr/bin/env node
// ── react-brain harvest — deterministic newsletter-scan scaffolding ────────────
// The extraction layer of a harvest pass was the last INVISIBLE failure point:
// an LLM summarizer decided what I even saw, so a dropped item never reached the
// disposition manifest (tools/harvest-log/). These modes close that hole
// mechanically (regex over fetched HTML, zero LLM):
//
//   firsthand                    corpus-derived first-party watch (npm dist-tags,
//                                GitHub releases, author feeds) — see
//                                react-brain-firsthand.mjs
//   inventory <url>              every link in the issue page — content links
//                                numbered (build the manifest FROM this list),
//                                same-site + chrome bucketed separately
//   coverage  <url> <manifest>   set-difference: external content links the
//                                manifest does NOT account for → exit 1
//                                (a silent extraction miss becomes a red gate)
//   verify-diff [--base=main]    the receipts gate: re-verify every URL ADDED by
//                                the branch — see react-brain-verify-diff.mjs
//   watchlist                    scan tools/harvest-log/*.md for (a) URLs
//                                skipped in ≥2 issues, (b) reopen signals
//                                ("revisit…", "reopen if…") — cap/pre-ship
//                                skips are deferred, not terminal
//
//   node tools/react-brain-harvest.mjs inventory https://thisweekinreact.com/newsletter/290
//   node tools/react-brain-harvest.mjs coverage <url> tools/harvest-log/twir-290.md
//   node tools/react-brain-harvest.mjs watchlist
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { get, UA_BROWSER, extractLinks, manifestKeys, normalize, coverageCheck, prepClassify, parseGoldManifest } from './harvest-lib.mjs';

const TOOLS = dirname(fileURLToPath(import.meta.url));
const LOG_DIR = join(TOOLS, 'harvest-log');

async function fetchPage(url) {
  try { return await get(url, { ua: UA_BROWSER }); } catch (err) {
    console.error(`fetch failed: ${err} ${url} — try the curl-UA / Wayback fallbacks (upkeep-routine playbook)`);
    process.exit(2);
  }
}

const [mode, ...args] = process.argv.slice(2);

if (mode === 'firsthand') {
  process.argv = [process.argv[0], process.argv[1], ...args];   // pass flags through
  await import('./react-brain-firsthand.mjs');
} else if (mode === 'verify-diff') {
  process.argv = [process.argv[0], process.argv[1], ...args];
  await import('./react-brain-verify-diff.mjs');
} else if (mode === 'bench') {
  process.argv = [process.argv[0], process.argv[1], ...args];
  await import('./react-brain-triage-bench.mjs');
} else if (mode === 'prep') {
  // pre-triaged manifest skeleton: detect the next issue deterministically, then
  // cross-reference every link against the corpus + ALL prior manifests, so the
  // agent judges ONLY the novel (TODO) rows. Six newsletters corroborate heavily —
  // most rows arrive pre-dispositioned.
  const key = args[0];
  const state = JSON.parse(readFileSync(join(TOOLS, 'harvest-state.json'), 'utf8'));
  const src = state.sources[key];
  if (!src) { console.error(`usage: harvest prep <source> [--issue=N] [--stdout] — sources: ${Object.keys(state.sources).join(', ')}`); process.exit(1); }
  if (!src.url_pattern) { console.log(`${key}: slug/RSS source (no url_pattern) — check ${src.archive} manually, then use inventory + hand-write the manifest`); process.exit(0); }
  const last = parseInt(String(src.last_processed).replace(/\D/g, ''), 10);
  const forced = parseInt((args.find((a) => a.startsWith('--issue=')) || '').split('=')[1], 10);
  let issue = null, url = null;
  for (const c of forced ? [forced] : [last + 1, last + 2]) {
    const u = src.url_pattern.replace('{n}', c);
    try { await get(u, { ua: UA_BROWSER }); issue = c; url = u; break; } catch { /* not published yet */ }
  }
  if (!issue) { console.log(`${key}: no new issue after #${last} (probed ${last + 1}, ${last + 2})`); process.exit(0); }
  const links = extractLinks(await fetchPage(url), url).filter((l) => !l.sameSite);
  const { loadEntries } = await import('./detect.mjs');
  const held = new Map();
  for (const e of Object.values(loadEntries()))
    for (const u of [...(e.sources || []), ...(e.reading || []).map((r) => r.url), ...(e.watching || []).map((w) => w.url), ...(e.migrate || []).flatMap((m) => m.receipts || [])].filter(Boolean)) {
      const k = normalize(u); if (k) (held.get(k) || held.set(k, new Set()).get(k)).add(e.id);
    }
  const goldRows = readdirSync(LOG_DIR).filter((f) => f.endsWith('.md'))
    .flatMap((f) => parseGoldManifest(readFileSync(join(LOG_DIR, f), 'utf8')).map((r) => ({ ...r, file: f })));
  const rows = prepClassify(links, held, goldRows);
  const todo = rows.filter((r) => r.pre === 'todo');
  const PREFIX = { 'this-week-in-react': 'twir', 'react-native-rewind': 'rn-rewind' };
  const out = join(LOG_DIR, `${PREFIX[key] || key}-${issue}.md`);
  const esc = (s) => String(s || '').replace(/\|/g, '·');
  const line = (r) => `| [${esc(r.text) || r.url}](${r.url}) | ${r.pre === 'todo' ? 'TODO' : r.pre === 'already-held' ? `already-held: ${esc(r.note).replace('in corpus: ', '')}` : esc(r.note)} |`;
  const md = `# Harvest manifest — ${src.name} #${issue} (prepped ${new Date().toISOString().slice(0, 10)})\nissue: ${url}\n\nPre-triaged by \`harvest prep\`: ${rows.length} external links · ${rows.length - todo.length} pre-dispositioned (corpus + prior-manifest cross-ref) · **${todo.length} TODO**.\nJudge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.\n\n| item | disposition |\n|---|---|\n${[...todo, ...rows.filter((r) => r.pre !== 'todo')].map(line).join('\n')}\n`;
  if (args.includes('--stdout')) console.log(md);
  else if (existsSync(out)) { console.error(`refusing to overwrite ${out} — use --stdout to preview`); process.exit(1); }
  else { writeFileSync(out, md); console.log(`wrote ${out} — ${todo.length} TODO of ${rows.length} links (${rows.length - todo.length} pre-dispositioned)`); }
} else if (mode === 'inventory') {
  if (!args[0]) { console.error('usage: harvest inventory <issue-url>'); process.exit(1); }
  const links = extractLinks(await fetchPage(args[0]), args[0]);
  const content = links.filter((l) => !l.sameSite), same = links.filter((l) => l.sameSite);
  console.log(`\nharvest inventory — ${args[0]}\n${content.length} external content link(s) — EVERY one needs a manifest disposition:\n`);
  content.forEach((l, i) => console.log(`  ${String(i + 1).padStart(3)}. ${l.url}\n       ${l.text || '(no anchor text)'}`));
  console.log(`\n${same.length} same-site link(s) (nav/anchors — disposition only if content):`);
  same.forEach((l) => console.log(`     · ${l.url}`));
} else if (mode === 'coverage') {
  if (args.length < 2) { console.error('usage: harvest coverage <issue-url> <manifest.md>'); process.exit(1); }
  const { total, have, missing } = await coverageCheck(args[0], args[1]).catch((err) => { console.error(`fetch failed: ${err}`); process.exit(2); });
  console.log(`harvest coverage — ${total} external link(s) on page · ${have} URL(s) in ${args[1]}`);
  if (missing.length) {
    console.log(`\n✗ ${missing.length} UNACCOUNTED link(s) — extraction/triage missed these; add disposition rows:\n`);
    missing.forEach((l) => console.log(`   · ${l.url}\n     ${l.text || ''}`));
    process.exit(1);
  }
  console.log('✓ every external link on the page has a manifest disposition');
} else if (mode === 'watchlist') {
  let files = [];
  try { files = readdirSync(LOG_DIR).filter((f) => f.endsWith('.md')); } catch { /* no log dir yet */ }
  if (!files.length) { console.log('no manifests in tools/harvest-log/ yet'); process.exit(0); }
  const byUrl = new Map();   // key → [{file, skipped}]
  const signals = [];
  for (const f of files) {
    for (const line of readFileSync(join(LOG_DIR, f), 'utf8').split('\n')) {
      if (!line.trim().startsWith('|')) continue;
      const skipped = /\|\s*skipped/i.test(line);
      for (const m of line.matchAll(/https?:\/\/[^\s)|\]"'`]+/g)) {
        const k = normalize(m[0]);
        if (k) (byUrl.get(k) || byUrl.set(k, []).get(k)).push({ file: f, skipped });
      }
      // match reopen keywords in the DISPOSITION cell only — URLs contain /watch?v= etc.
      const cell = skipped ? line.split(/\|\s*skipped/i)[1] || '' : '';
      if (skipped && /revisit|reopen|recurs|watch\b|if it earns|candidate (if|when)/i.test(cell))
        signals.push({ file: f, line: line.replace(/\s+/g, ' ').trim().slice(0, 180) });
    }
  }
  const recurring = [...byUrl].filter(([, v]) => v.length >= 2 && v.some((x) => x.skipped));
  console.log(`harvest watchlist — ${files.length} manifest(s)\n`);
  console.log(recurring.length ? `RECURRING skipped URLs (≥2 issues) — re-triage these:` : 'no recurring skipped URLs yet.');
  recurring.forEach(([k, v]) => console.log(`   · ${k}   (${v.map((x) => x.file).join(', ')})`));
  console.log(`\n${signals.length} standing reopen signal(s):`);
  signals.forEach((s) => console.log(`   [${s.file}] ${s.line}`));
} else {
  console.error('usage: react-brain harvest <prep <source> | firsthand [--graph|--json|--manifest] | inventory <url> | coverage <url> <manifest.md> | verify-diff [--base=main] | bench [--model=id|--candidate=file] | watchlist>');
  process.exit(1);
}
