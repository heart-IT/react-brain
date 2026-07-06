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
  const s = signals(d);
  for (const id of ['RB-E-LISTS', 'RB-E-ANIMATION', 'RB-E-SECURITY', 'RB-E-DATA', 'RB-E-KEYBOARD'])
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

// ── 7. MCP server: handshake + tool list ────────────────────────────────────────
{
  const input = [
    '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}',
    '{"jsonrpc":"2.0","id":2,"method":"tools/list"}', ''].join('\n');
  const r = spawnSync(process.execPath, [join(ROOT, 'tools/mcp-server.mjs')], { input, encoding: 'utf8', timeout: 30000 });
  const lines = r.stdout.trim().split('\n').map((l) => JSON.parse(l));
  check(lines[0]?.result?.serverInfo?.name === 'react-brain', 'mcp: initialize returns serverInfo');
  check(lines[1]?.result?.tools?.length === 5, 'mcp: five tools listed');
}

// ── report ──────────────────────────────────────────────────────────────────────
console.log(`react-brain eval — ${pass + fails.length} assertions`);
if (fails.length) { for (const f of fails) console.log(`  ✗ ${f}`); console.log(`\n✗ ${fails.length} failed / ${pass} passed`); process.exit(1); }
console.log(`✓ all ${pass} passed`);
