#!/usr/bin/env node
// ── react-brain eval harness ────────────────────────────────────────────────────
// Golden-fixture regression for the corpus's THINKING quality: detection, fit,
// source signals, search routing, intent resolution, stack composition, MCP.
// Anecdotes ("the ledgerhr dry-run looked right") become assertions that run on
// every change. Offline + fast; `npm test` = lint + this. Exit 1 on any failure.
// ───────────────────────────────────────────────────────────────────────────────

import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');
const FIX = (n) => join(__dir, 'fixtures', n);

let pass = 0; const fails = [];
const check = (cond, msg) => { if (cond) pass++; else fails.push(msg); };
const doctor = (fixture) => JSON.parse(execFileSync(process.execPath,
  [join(ROOT, 'tools/react-brain-doctor.mjs'), FIX(fixture), '--json'], { encoding: 'utf8' }));
const byEntry = (d, id) => d.detected.find((x) => x.entry === id);
const signals = (d) => (d.sourceSignals?.findings || []).map((f) => f.entry);

// ── 1. rn-smells: detection + fit + all presence source-signals ─────────────────
{
  const d = doctor('rn-smells');
  check(d.platform === 'react-native', 'rn-smells: platform should be react-native');
  check(byEntry(d, 'RB-E-MAPS')?.fit === '✓ aligned', 'rn-smells: maps deps should detect as MAPS ✓ aligned');
  check(byEntry(d, 'RB-E-STATE')?.fit === '✓ aligned', 'rn-smells: zustand should detect as STATE ✓ aligned');
  check(byEntry(d, 'RB-E-RN-VERSIONS')?.labels.join() === 'RN 0.86.0', 'rn-smells: RN version row');
  // 2026-07-10 entries: pin the new detect rows so harvest-era additions stay wired
  check(byEntry(d, 'RB-E-OTA')?.fit === '✓ aligned', 'rn-smells: expo-updates should detect as OTA ✓ aligned');
  check(byEntry(d, 'RB-E-POLISH')?.fit === '✓ aligned', 'rn-smells: sonner-native+bootsplash should detect as POLISH ✓ aligned');
  check(byEntry(d, 'RB-E-NETWORKING')?.fit === '~ contextual', 'rn-smells: axios should be NETWORKING ~ contextual (keep-it clause), not review');
  check(byEntry(d, 'RB-E-AI-DEVTOOLS')?.fit === '✓ aligned', 'rn-smells: agent-device should detect as AI-DEVTOOLS ✓ aligned');
  const s = signals(d);
  for (const id of ['RB-E-LISTS', 'RB-E-ANIMATION', 'RB-E-SECURITY', 'RB-E-DATA', 'RB-E-KEYBOARD', 'RB-E-NETWORKING'])
    check(s.includes(id), `rn-smells: source signal ${id} should fire`);
  check(!s.includes('RB-E-OBSERVABILITY'), 'rn-smells: absent-boundary rule must NOT fire below production stage');
}

// ── 2. web-clean: no false positives ────────────────────────────────────────────
{
  const d = doctor('web-clean');
  check(d.platform === 'react', 'web-clean: platform should be react');
  check(byEntry(d, 'RB-E-DATA')?.fit === '✓ aligned', 'web-clean: TanStack Query should be DATA ✓ aligned');
  check(byEntry(d, 'RB-E-BUILD')?.fit === '✓ aligned', 'web-clean: Vite should be BUILD ✓ aligned');
  check(signals(d).length === 0, `web-clean: NO source signals expected, got ${signals(d).join(',')}`);
  check((d.modernization ?? null) === null, 'web-clean: modernization scan is RN-only');
}

// ── 3. p2p-pear: the Holepunch stack is recognized, not a deviation ─────────────
{
  const d = doctor('p2p-pear');
  check(byEntry(d, 'RB-E-P2P')?.fit === '✓ aligned', 'p2p-pear: Holepunch deps should be P2P ✓ aligned');
  check(d.desktopShell === 'pear', 'p2p-pear: pear key should be recognized as the desktop shell');
  check(byEntry(d, 'RB-E-TESTING')?.labels.join().includes('brittle'), 'p2p-pear: brittle detected under TESTING');
  check(byEntry(d, 'RB-E-TESTING')?.fit !== '↗ review', 'p2p-pear: brittle must not be flagged ↗ review (idiomatic for Holepunch)');
  check(byEntry(d, 'RB-E-TESTING')?.resolved?.via === 'when', 'p2p-pear: TESTING resolves to the Holepunch when-clause (context-keyed, not the generic default)');
}

// ── 4. prod-no-boundary: stage heuristic + absent-rule ──────────────────────────
{
  const d = doctor('prod-no-boundary');
  check(d.stage === 'production', `prod-no-boundary: stage should be production, got ${d.stage}`);
  const f = (d.sourceSignals?.findings || []).find((x) => x.entry === 'RB-E-OBSERVABILITY');
  check(f?.absent === true, 'prod-no-boundary: no-error-boundary absent-rule should fire at production stage');
}

// ── 5. search routing: questions land on the right entry ────────────────────────
{
  const { searchEntries } = await import(join(ROOT, 'tools/detect.mjs'));
  const first = (q) => searchEntries(q.split(' '))[0]?.id;
  check(first('data fetching') === 'RB-E-DATA', 'search: "data fetching" → DATA');
  check(first('maps') === 'RB-E-MAPS', 'search: "maps" → MAPS');
  check(first('state') === 'RB-E-STATE', 'search: "state" → STATE');
  check(first('keyboard') === 'RB-E-KEYBOARD', 'search: "keyboard" → KEYBOARD');
  check(first('rich text editor') === 'RB-E-EDITORS', 'search: "rich text editor" → EDITORS');

  // free-form QUESTION routing over reading annotations (BM25-lite)
  const { searchReadings } = await import(join(ROOT, 'tools/detect.mjs'));
  const top = (q) => searchReadings(q.split(' '))[0];
  check(top('why is my LCP bad after SSR hydration')?.url.includes('3perf.com'), 'searchReadings: LCP/SSR question → the hydration-mismatch reading');
  check(top('keyboard snaps on android')?.entry === 'RB-E-KEYBOARD', 'searchReadings: keyboard question → the Margelo keyboard guide');
  check(top('supply chain npm attack')?.entry === 'RB-E-SECURITY', 'searchReadings: supply-chain question → SECURITY reading');
  check(searchReadings(['the', 'my', 'is']).length === 0, 'searchReadings: stopword-only query matches nothing');

  // intent resolution honours context keys (the P2P N/A case that seeded contextFor)
  const { resolveRecommendation, loadEntries } = await import(join(ROOT, 'tools/detect.mjs'));
  const data = loadEntries()['RB-E-DATA'];
  check(resolveRecommendation(data, ['p2p']).via === 'na', 'resolve: DATA under p2p context → n/a (no client cache by design)');
  check(resolveRecommendation(data, ['graphql']).label.toLowerCase().includes('apollo'), 'resolve: DATA under graphql → Apollo');
}

// ── 6. stack composes a coherent Expo plan ──────────────────────────────────────
{
  const out = execFileSync(process.execPath, [join(ROOT, 'tools/react-brain-stack.mjs'), '--rn', '--expo'], { encoding: 'utf8' });
  check(out.includes('Expo Router'), 'stack --rn --expo: picks Expo Router');
  check(out.includes('npx expo install'), 'stack --rn --expo: emits an expo install line');
  check(out.includes('maps'), 'stack: feature-domain footer mentions maps');
}

// ── 7. MCP server: handshake + tool list + query depth tiers ────────────────────
{
  const input = [
    '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}',
    '{"jsonrpc":"2.0","id":2,"method":"tools/list"}',
    '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"query","arguments":{"topic":"state"}}}',
    '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"query","arguments":{"topic":"state","depth":"full"}}}',
    '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"query","arguments":{"topic":"hydration mismatch hurting LCP"}}}',
    ''].join('\n');
  const r = spawnSync(process.execPath, [join(ROOT, 'tools/mcp-server.mjs')], { input, encoding: 'utf8', timeout: 30000 });
  const lines = r.stdout.trim().split('\n').map((l) => JSON.parse(l));
  check(lines[0]?.result?.serverInfo?.name === 'react-brain', 'mcp: initialize returns serverInfo');
  check(lines[1]?.result?.tools?.length === 9, 'mcp: nine tools listed (incl. decide + map + migrate + review)');
  const text = (i) => lines[i]?.result?.content?.[0]?.text || '';
  check(text(2).includes('RECOMMEND:') && !text(2).includes('OPTIONS:'), 'mcp query: capsule depth is the default (no options dump)');
  check(text(3).includes('OPTIONS:'), 'mcp query: depth "full" returns the whole entry');
  check(text(2).length < text(3).length / 3, `mcp query: capsule is <1/3 the tokens of full (${text(2).length} vs ${text(3).length})`);
  check(text(4).includes('READINGS MATCHED') && text(4).includes('3perf.com'), 'mcp query: free-form question routes to the answering reading');
}

// ── 8. living decision records: decide generates, doctor re-checks premises ─────
{
  const adr = execFileSync(process.execPath,
    [join(ROOT, 'tools/react-brain-decide.mjs'), 'state', FIX('rn-smells'), '--stdout'], { encoding: 'utf8' });
  check(adr.includes('entry: RB-E-STATE'), 'decide: premise block names the entry');
  check(/entry_updated: 20\d\d-/.test(adr), 'decide: premise block carries entry_updated');
  check(adr.includes('## Options considered'), 'decide: candidate table present');
  check(adr.includes('## Review by'), 'decide: review horizon present');
  check(adr.includes('Current choice detected in this repo: **Zustand**'), 'decide: repo context resolved (detected Zustand)');

  const d = doctor('rn-smells');   // fixture ships docs/adr/001-state.md with 2020 premises
  check(d.adrs?.length === 1, 'doctor: finds the fixture decision record');
  const flags = d.adrs?.[0]?.flags || [];
  check(flags.some((x) => x.includes('premises moved')), 'doctor: flags moved premises (entry re-verified since ADR)');
  check(flags.some((x) => x.includes('review horizon passed')), 'doctor: flags passed review horizon');
  check(doctor('web-clean').adrs?.length === 0, 'doctor: no ADR false-positives on a repo without records');

  // --ci gate: the stale fixture record must fail the build; a clean repo must pass
  const ciFail = spawnSync(process.execPath, [join(ROOT, 'tools/react-brain-doctor.mjs'), FIX('rn-smells'), '--ci'], { encoding: 'utf8' });
  check(ciFail.status === 1 && ciFail.stdout.includes('CI: FAIL'), 'doctor --ci: exits 1 on moved/expired decision records');
  const ciPass = spawnSync(process.execPath, [join(ROOT, 'tools/react-brain-doctor.mjs'), FIX('web-clean'), '--ci'], { encoding: 'utf8' });
  check(ciPass.status === 0 && ciPass.stdout.includes('CI: PASS'), 'doctor --ci: exits 0 on a clean repo');
}

// ── 9. staleness benchmark: bank integrity + deterministic grader ───────────────
{
  const b = await import(join(ROOT, 'tools/react-brain-bench.mjs'));
  const { loadEntries } = await import(join(ROOT, 'tools/detect.mjs'));
  const entries = loadEntries();
  const bank = b.loadBank();
  check(bank.length >= 20, `bench: bank has ${bank.length} questions (≥20)`);
  const ids = new Set();
  let ok = true;
  for (const q of bank) {
    if (ids.has(q.id) || !entries[q.entry] || !q.question || !q.answer || !(q.fresh_markers || []).length) ok = false;
    ids.add(q.id);
    for (const p of [...(q.fresh_markers || []), ...(q.stale_markers || [])]) {
      try { new RegExp(p, 'i'); } catch { ok = false; }
    }
  }
  check(ok, 'bench: every question has a unique id, a real entry, an answer, ≥1 fresh marker, and compiling regexes');
  const q = bank.find((x) => x.id === 'expo-e2e');
  check(b.grade(q, 'Use Maestro; Expo archived Detox.').verdict === 'fresh', 'bench grade: fresh wins when both named');
  check(b.grade(q, 'Detox is the standard for Expo.').confidently_stale === true, 'bench grade: confident staleness detected');
  check(b.grade(q, 'As of my knowledge cutoff, Detox was common.').confidently_stale === false, 'bench grade: hedged staleness is not confident');
  const s9 = b.summarize([{ verdict: 'fresh', hedged: false, confidently_stale: false }, { verdict: 'stale', hedged: false, confidently_stale: true }]);
  check(s9.fresh_pct === 50 && s9.confidently_stale_pct === 50, 'bench summarize: percentages');
}

// ── 10. conditional advice (claim + applies_when) + census join ─────────────────
{
  const d = doctor('rn-smells');
  const adviceIds = (d.advice || []).map((a) => a.entry);
  const dataAdv = (d.advice || []).find((a) => a.entry === 'RB-E-DATA');
  check(dataAdv?.trigger === 'axios', 'advice: rn-smells axios-without-cache triggers the DATA claim via axios');
  check(adviceIds.includes('RB-E-KEYBOARD'), 'advice: RN repo without keyboard-controller gets the KEYBOARD claim');
  check(!adviceIds.includes('RB-E-SECURITY'), 'advice: production-gated SECURITY claim must NOT fire at prototype stage');
  const firstUntriggered = (d.advice || []).findIndex((a) => !a.trigger);
  const lastTriggered = (d.advice || []).map((a) => !!a.trigger).lastIndexOf(true);
  check(firstUntriggered === -1 || lastTriggered < firstUntriggered || lastTriggered === -1,
    'advice: dep-triggered claims rank before untriggered ones');
  check(byEntry(d, 'RB-E-STATE')?.field?.appCount > 0, 'census join: detected STATE row carries field adoption');

  // TOP PRIORITIES: present, sorted, complete rows, stage-calibrated
  const pr = d.priorities || [];
  check(pr.length >= 3 && pr.length <= 5, `priorities: rn-smells yields a top list (got ${pr.length})`);
  check(pr.every((p, i) => !i || pr[i - 1].score >= p.score), 'priorities: sorted by score desc');
  check(pr.every((p) => p.kind && p.entry && p.text && p.score > 0), 'priorities: every row carries kind/entry/text/score');
  check(['modernize', 'smell', 'revisit', 'read'].includes(pr[0].kind), 'priorities: prototype stage leads with concrete code findings, not adopt-a-domain gaps');

  const w = doctor('web-clean');
  const wIds = (w.advice || []).map((a) => a.entry);
  check(!wIds.includes('RB-E-KEYBOARD'), 'advice: RN-only KEYBOARD claim must NOT fire on a web repo');
  check(wIds.includes('RB-E-DATA'), 'advice: web-clean on TanStack Query gets the queryOptions claim (not the why-you-want one)');
  const wData = (w.advice || []).filter((a) => a.entry === 'RB-E-DATA');
  check(wData.every((a) => a.title === 'Creating Query Abstractions'),
    'advice: why-you-want-react-query is suppressed when the cache is installed');
}

// ── 11. map: the repo pinboard is deterministic and correctly tagged ────────────
{
  const m = JSON.parse(execFileSync(process.execPath,
    [join(ROOT, 'tools/react-brain-map.mjs'), FIX('rn-smells'), '--json'], { encoding: 'utf8' }));
  const feed = m.files.find((f) => f.path === 'src/Feed.jsx');
  check(!!feed, 'map: fixture source file indexed');
  check(feed?.exports.includes('Feed') && feed?.exports.includes('legacyPing'), 'map: exports extracted');
  check(feed?.ext.includes('@react-native-async-storage/async-storage'), 'map: scoped import normalized to package root');
  check(feed?.domains.includes('RB-E-STORAGE'), 'map: import-based domain tag (AsyncStorage → STORAGE)');
  check(feed?.smells.includes('RB-E-LISTS') && feed?.smells.includes('RB-E-KEYBOARD'), 'map: per-file smell tags fire');
  check((m.domains['RB-E-KEYBOARD'] || []).includes('src/Feed.jsx'), 'map: inverted DOMAINS index lists the file');
}

// ── 12. migrate: sequenced plan — gates hoisted, blocked steps ordered after ────
{
  const p = JSON.parse(execFileSync(process.execPath,
    [join(ROOT, 'tools/react-brain-migrate.mjs'), FIX('legacy-rn'), '--json'], { encoding: 'utf8' }));
  const step = (pkg) => p.steps.find((s) => s.pkg === pkg);
  check(step('react-native-code-push')?.urgency === 'dead' && step('react-native-code-push')?.phase === 1,
    'migrate: dead CodePush lands in phase 1');
  check(step('react-native')?.phase === 1,
    'migrate: the RN ladder is hoisted to phase 1 (a blocked step waits on it)');
  check(step('@shopify/flash-list')?.phase === 4 && step('@shopify/flash-list')?.blocked?.pkg === 'react-native',
    'migrate: FlashList v2 is blocked by the RN gate with the requirement named');
  check(p.steps.findIndex((s) => s.pkg === 'react-native') < p.steps.findIndex((s) => s.pkg === '@shopify/flash-list'),
    'migrate: gate step ordered before the step it unblocks');
  check(step('react-native-vector-icons')?.urgency === 'superseded' && step('typescript')?.phase === 3,
    'migrate: supersession and upgrade steps classified');
  check(step('react-native-code-push')?.receipts?.length >= 1, 'migrate: steps carry receipts');

  const clean = JSON.parse(execFileSync(process.execPath,
    [join(ROOT, 'tools/react-brain-migrate.mjs'), FIX('rn-smells'), '--json'], { encoding: 'utf8' }));
  const depSteps = clean.steps.filter((s) => s.kind === 'dep');
  check(depSteps.length === 0, `migrate: current stack (rn-smells) yields no dep migration steps, got ${depSteps.map((s) => s.pkg).join(',')}`);
}

// ── 13. review: diff-scoped — blocking adds, introduced-only smells, CI exits ───
{
  const { mkdtempSync, mkdirSync, writeFileSync: wf, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const T = mkdtempSync(join(tmpdir(), 'rb-review-'));
  const g = (...args) => execFileSync('git', ['-C', T, '-c', 'user.email=t@t', '-c', 'user.name=t', ...args], { encoding: 'utf8' });
  try {
    mkdirSync(join(T, 'src'), { recursive: true });
    const basePkg = { name: 'demo', version: '1.0.0', dependencies: { react: '19.2.0', 'react-native': '0.86.0' } };
    wf(join(T, 'package.json'), JSON.stringify(basePkg, null, 1));
    // base already contains a smell — it must NOT be re-flagged after an unrelated edit
    wf(join(T, 'src/old.jsx'), "import { KeyboardAvoidingView } from 'react-native';\nexport const Old = () => <KeyboardAvoidingView />;\n");
    g('init', '-q'); g('add', '-A'); g('commit', '-qm', 'base');

    const review = (...extra) => spawnSync(process.execPath,
      [join(ROOT, 'tools/react-brain-review.mjs'), T, ...extra], { encoding: 'utf8' });
    const clean = JSON.parse(review('--json').stdout);
    check(clean.blocking === 0 && clean.added.length === 0, 'review: clean diff has nothing to report');
    check(review('--ci').status === 0, 'review --ci: clean diff passes');

    basePkg.dependencies['react-native-code-push'] = '^8.2.1';
    basePkg.dependencies.axios = '^1.18.1';
    wf(join(T, 'package.json'), JSON.stringify(basePkg, null, 1));
    wf(join(T, 'src/feature.jsx'), "import { useEffect } from 'react';\nexport function F(){ useEffect(() => { fetch('/api'); }, []); return null; }\n");
    wf(join(T, 'src/old.jsx'), "import { KeyboardAvoidingView } from 'react-native';\n// touched, smell pre-existing\nexport const Old = () => <KeyboardAvoidingView />;\n");

    const r = JSON.parse(review('--json').stdout);
    const codepush = r.added.find((f) => f.pkg === 'react-native-code-push');
    check(codepush?.severity === 'blocking' && /dead/i.test(codepush?.note || ''), 'review: adding a corpus-dead dep is blocking, with the why');
    check(r.added.find((f) => f.pkg === 'axios')?.severity === 'warn', 'review: axios add warns (claim/fit), not blocks');
    check(r.smellsIntroduced.some((s) => s.file === 'src/feature.jsx' && s.entry === 'RB-E-DATA'), 'review: smell in a NEW file is flagged as introduced');
    check(!r.smellsIntroduced.some((s) => s.file === 'src/old.jsx'), 'review: pre-existing smell in a touched file does NOT nag');
    check(review('--ci').status === 1, 'review --ci: blocking add fails the gate');
  } finally { rmSync(T, { recursive: true, force: true }); }
}

// ── report ──────────────────────────────────────────────────────────────────────
console.log(`react-brain eval — ${pass + fails.length} assertions`);
if (fails.length) { for (const f of fails) console.log(`  ✗ ${f}`); console.log(`\n✗ ${fails.length} failed / ${pass} passed`); process.exit(1); }
console.log(`✓ all ${pass} passed`);
