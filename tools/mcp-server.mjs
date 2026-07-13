#!/usr/bin/env node
// ── react-brain MCP server ──────────────────────────────────────────────────────
// Exposes the encyclopedia to ANY agent as MCP tools over stdio, so a coding agent
// working in a real React repo can consult the corpus mid-task without loading the
// whole index into context (capsules ≈ 40 lines; a full entry only on demand).
//
//   capsules   — compact orientation index (id · status · one-line default), by group
//   query      — full entry lookup by id / category / keyword (same scorer as the CLI)
//   recommend  — context-resolved recommendation (the stack/doctor resolver)
//   doctor     — run the deterministic repo analyzer, return its --json report
//   decide     — generate a living decision record (ADR with receipts) for a topic
//   stack      — compose a greenfield stack from intent flags, return the plan text
//
// Zero-dep by design: MCP's stdio transport is newline-delimited JSON-RPC 2.0, which
// ~100 lines implement — no SDK, so `npx react-brain-mcp`-style use needs no install
// beyond the package itself. Register with e.g.:
//   claude mcp add react-brain -- node <repo>/tools/mcp-server.mjs
// ───────────────────────────────────────────────────────────────────────────────

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { loadDoc, searchEntries, resolveRecommendation, trunc } from './detect.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const VERSION = createRequire(import.meta.url)('../package.json').version;
const PROTOCOL = '2025-06-18';

// ── tool implementations (return plain text) ────────────────────────────────────
function capsules({ group } = {}) {
  const doc = loadDoc();
  const out = [];
  for (const g of doc.groups || []) {
    if (group && g.id !== group) continue;
    out.push(`── ${g.id} — ${g.label}`);
    for (const id of g.entries) {
      const e = doc.entries.find((x) => x.id === id);
      if (!e) continue;
      out.push(`  ${e.id} (${e.status}·${e.confidence}) [${(e.platforms || []).join('/')}] — ${trunc(e.recommend?.default, 140)}`);
    }
  }
  out.push('', 'Use `query` for a full entry (options, context-keyed when-clauses, note, reading); `recommend` to resolve one against your context.');
  return out.join('\n');
}

function entryText(e) {
  const L = [];
  L.push(`${e.id} — ${e.topic}`);
  L.push(`group: ${e.group} · status: ${e.status}·${e.confidence} · platforms: ${(e.platforms || []).join('/')} · updated: ${e.updated}`);
  L.push('', 'OPTIONS:');
  for (const o of e.options || []) L.push(`  • ${o.name} — ${o.tradeoff}`);
  L.push('', `RECOMMEND (default): ${e.recommend?.default || '(none)'}`);
  if (e.recommend?.when?.length) { L.push('WHEN (context → choice):'); for (const w of e.recommend.when) L.push(`  • ${w}`); }
  if (e.note) L.push('', `NOTE: ${String(e.note).trim()}`);
  if (e.defer_to_skill) L.push(`DEPTH: defer to the '${e.defer_to_skill}' skill for in-domain rules`);
  if (e.doc) L.push(`LONG-FORM: encyclopedia/${e.doc}`);
  if (e.reading?.length) {
    L.push('', 'READING (vetted deep-dives):');
    for (const r of e.reading) {
      L.push(`  • ${r.title} — ${r.url}\n    ${trunc(r.what, 220)}`);
      if (r.claim) L.push(`    CLAIM: ${r.claim}`);
    }
  }
  if (e.watching?.length) { L.push('', 'WATCHING (vetted A/V):'); for (const w of e.watching) L.push(`  • ${w.title} — ${w.url}\n    ${trunc(w.what, 220)}`); }
  if (e.sources?.length) { L.push('', 'SOURCES:'); for (const s of e.sources) L.push(`  • ${s}`); }
  return L.join('\n');
}

function query({ topic }) {
  const ranked = searchEntries(String(topic || '').split(/\s+/).filter(Boolean));
  if (!ranked.length) return `no entry matches "${topic}". Try a category like: state, data, nav, styling, native, build, testing, security, maps, p2p …`;
  return ranked.map(entryText).join('\n\n' + '═'.repeat(70) + '\n\n');
}

function recommend({ topic, context = [] }) {
  const ranked = searchEntries(String(topic || '').split(/\s+/).filter(Boolean), 1);
  if (!ranked.length) return `no entry matches "${topic}"`;
  const e = ranked[0];
  const r = resolveRecommendation(e, Array.isArray(context) ? context : String(context).split(/[,\s]+/));
  return [
    `${e.id} (${e.status}·${e.confidence}) resolved via ${r.via}${r.via === 'when' ? ` [matched: ${r.ctx}]` : ''}:`,
    r.why,
    e.confidence === 'low' ? '(confidence: low — treat as a lead; prototype before committing)' : '',
    `Full entry: query "${e.id}"`,
  ].filter(Boolean).join('\n');
}

function doctor({ path }) {
  return execFileSync(process.execPath, [resolve(__dir, 'react-brain-doctor.mjs'), String(path), '--json'],
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

function decide({ topic, path }) {
  const args = [resolve(__dir, 'react-brain-decide.mjs'), String(topic)];
  if (path) args.push(String(path));
  args.push('--stdout');
  return execFileSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

function stack({ flags = '' }) {
  const args = String(flags).split(/\s+/).filter((f) => /^--[\w=-]+$/.test(f));   // flags only — no arbitrary args
  return execFileSync(process.execPath, [resolve(__dir, 'react-brain-stack.mjs'), ...args],
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

const TOOLS = [
  { name: 'capsules', fn: capsules,
    description: 'Compact orientation index of the react-brain encyclopedia: every entry as one line (id · status·confidence · platforms · default recommendation), grouped. Start here; then `query` the 1-3 relevant entries.',
    inputSchema: { type: 'object', properties: { group: { type: 'string', description: 'optional group filter: react-foundations | app-architecture | ui | platform-native | tooling-ops | ai' } } } },
  { name: 'query', fn: query,
    description: 'Full encyclopedia entry lookup by id, category, or keyword (e.g. "state", "data fetching", "RB-E-MAPS"): options with tradeoffs, context-keyed recommendation, verified notes, vetted reading, sources.',
    inputSchema: { type: 'object', properties: { topic: { type: 'string' } }, required: ['topic'] } },
  { name: 'recommend', fn: recommend,
    description: 'Resolve one entry\'s recommendation against a project context (tokens like "expo", "p2p", "production", "bare rn"). Returns the matched when-clause or the default, with confidence.',
    inputSchema: { type: 'object', properties: { topic: { type: 'string' }, context: { type: 'array', items: { type: 'string' } } }, required: ['topic'] } },
  { name: 'doctor', fn: doctor,
    description: 'Run the deterministic react-brain analyzer on a repo path: detected ecosystem choices vs encyclopedia fit (with census field-adoption), gaps, legacy-API modernization scan, source-level signals, and advice[] — corpus readings whose tagged claims apply to this repo (pre-grounded, citation-ready). Returns JSON. Use as ground truth for platform/stage/deps.',
    inputSchema: { type: 'object', properties: { path: { type: 'string', description: 'absolute path to the repo' } }, required: ['path'] } },
  { name: 'decide', fn: decide,
    description: 'Generate a LIVING DECISION RECORD (ADR markdown with receipts) for a topic, optionally resolved against a repo path: context-resolved pick, candidate table, evidence chain (sources, calibration track record, npm signals), and a machine-readable premise block that react-brain doctor re-checks over time.',
    inputSchema: { type: 'object', properties: { topic: { type: 'string' }, path: { type: 'string', description: 'optional absolute repo path for context' } }, required: ['topic'] } },
  { name: 'stack', fn: stack,
    description: 'Compose a greenfield stack from intent flags (e.g. "--rn --expo --p2p --stage=mvp" or "--web --ssr"). Returns an explained, install-ready stack plan.',
    inputSchema: { type: 'object', properties: { flags: { type: 'string' } }, required: ['flags'] } },
];

// ── newline-delimited JSON-RPC 2.0 over stdio ───────────────────────────────────
const reply = (id, result) => process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
const fail = (id, code, message) => process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');

function handle(msg) {
  const { id, method, params } = msg;
  if (method === 'initialize') {
    return reply(id, { protocolVersion: params?.protocolVersion || PROTOCOL, capabilities: { tools: {} },
      serverInfo: { name: 'react-brain', version: VERSION } });
  }
  if (method === 'notifications/initialized' || method?.startsWith('notifications/')) return;   // no response to notifications
  if (method === 'ping') return reply(id, {});
  if (method === 'tools/list') return reply(id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
  if (method === 'tools/call') {
    const tool = TOOLS.find((t) => t.name === params?.name);
    if (!tool) return fail(id, -32602, `unknown tool: ${params?.name}`);
    try { return reply(id, { content: [{ type: 'text', text: tool.fn(params?.arguments || {}) }] }); }
    catch (e) { return reply(id, { content: [{ type: 'text', text: `error: ${e.message}` }], isError: true }); }
  }
  if (id !== undefined) fail(id, -32601, `method not found: ${method}`);
}

let buf = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg; try { msg = JSON.parse(line); } catch { fail(null, -32700, 'parse error'); continue; }
    try { handle(msg); } catch (e) { if (msg.id !== undefined) fail(msg.id, -32603, e.message); }
  }
});
process.stdin.on('end', () => process.exit(0));
