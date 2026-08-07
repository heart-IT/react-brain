#!/usr/bin/env node
// ── react-brain triage rules — the pipeline's reflexes, compiled from its gold ──
// ~60% of firsthand manifest rows are version mechanics whose disposition is
// fully derivable from data the pipeline already holds (semver delta, dist-tag,
// prerelease shape) — yet each burned an LLM judgment every week. This module
// encodes those judgments as data (tools/triage-rules.yaml) and applies them at
// manifest-WRITING time, so mechanical rows arrive pre-dispositioned with a
// [rule:<id>] receipt and only genuine judgment calls arrive as TODO.
//
// SAFETY MODEL (the part that makes auto-skip sane in a pipeline whose measured
// failure mode is false skips, weighed 3× by the bench):
//   · rules are SKIP-ONLY — the structural mirror of applyAdvocate's keep-only
//     one-directionality: rules can only skip, the advocate can only keep, so
//     each side's worst case is reviewable noise for the other side to catch
//   · hard guards no YAML can override: never a ⚡TRIP event, never a DEPRECATED
//     flag, never a major bump, never a prerelease→stable graduation
//   · ADMISSION BY GOLD: `harvest rules` replays every rule against every
//     adjudicated manifest in tools/harvest-log/ — a rule that would have
//     skipped even ONE gold-kept row is inadmissible. `--check` exits 1 if an
//     active rule has a kept-collision, and npm test runs it, so the gate
//     re-verifies continuously as gold grows.
//
//   node tools/react-brain-harvest.mjs rules            replay report (per-rule fires/agreement/collisions)
//   node tools/react-brain-harvest.mjs rules --check    CI gate: exit 1 on active-rule kept-collision
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadYaml } from './detect.mjs';

const TOOLS = dirname(fileURLToPath(import.meta.url));
const RULES_PATH = join(TOOLS, 'triage-rules.yaml');
const LOG_DIR = join(TOOLS, 'harvest-log');

// ── version mechanics ───────────────────────────────────────────────────────────
export function parseVer(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:[-+](.*))?$/.exec(String(v || '').trim());
  return m ? { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] || null } : null;
}

// prerelease→stable is a GRADUATION (often a tripwire moment) — never a rule's call
export function bumpClass(from, to) {
  const a = parseVer(from), b = parseVer(to);
  if (!a || !b) return null;
  if (b.pre) return 'prerelease';
  if (a.pre) return 'graduation';
  if (b.major !== a.major) return 'major';
  if (b.minor !== a.minor) return 'minor';
  if (b.patch !== a.patch) return 'patch';
  return null;
}

// prerelease token INSIDE a version string (release titles) — the YAML names the
// safe tags per rule (rc/alpha/beta/next stay judgment: an rc on a tracked core
// line was gold-KEPT once — RN 0.87.0-rc.3). Anchored to a version so plain
// words like "DevTools release" can't false-positive.
const preTitleRe = (tags) => new RegExp(`\\bv?\\d+\\.\\d+\\.\\d+[-.](${tags.join('|')})\\b`, 'i');

export function loadRules(path = RULES_PATH) {
  if (!existsSync(path)) return { version_rules: [], url_rules: [] };
  const doc = loadYaml(path) || {};
  return { version_rules: doc.version_rules || [], url_rules: doc.url_rules || [] };
}

const tag = (r) => `${r.disposition} [rule:${r.id}]`;

// PIN-GUARD (live only): if a routed entry's own text pins a version the event
// SUPERSEDES ("(v5.9, 2026-07)" while auth0 moves 5.9.0→5.10.0), the event is a
// pin-refresh candidate — never a rule's call. Gold receipt: the two npm-minor
// kept-collisions were exactly this shape. Grain follows the bump: a PATCH only
// supersedes an exact x.y.z pin (a "4.2"-line pin survives 4.2.10→4.2.11);
// anything coarser supersedes an x.y line pin. Replay runs WITHOUT the guard
// (entry text is post-keep there, which would mask collisions), so the harness
// always reports the pessimistic bound.
function pinGuarded(ev, entryText) {
  if (!entryText || !ev.from) return false;
  const v = parseVer(ev.from);
  if (!v) return false;
  const re = bumpClass(ev.from, ev.to) === 'patch'
    ? `\\bv?${v.major}\\.${v.minor}\\.${v.patch}\\b`
    : `\\bv?${v.major}\\.${v.minor}(\\.\\d+)?\\b`;
  return new RegExp(re).test(entryText);
}

// ── apply to a structured firsthand event (npm / release) ──────────────────────
// Returns the disposition string or null (null = stays TODO for real triage).
// entryTextById: optional Map(id → serialized entry) enabling the live pin-guard.
export function ruleForEvent(ev, rules, { activeOnly = true, entryTextById = null } = {}) {
  if (!ev || ev.kind === '⚡TRIP') return null;                       // tripwires are work items
  if (ev.deprecated || /DEPRECAT/i.test(ev.what || '')) return null;  // deprecation = contradiction class
  if (entryTextById && (ev.entries || []).some((id) => pinGuarded(ev, entryTextById.get(id)))) return null;
  for (const r of rules.version_rules) {
    if (activeOnly && !r.active) continue;
    if (r.when?.kind !== ev.kind) continue;
    if (r.when.bump) {
      if (ev.kind !== 'npm' || !ev.from || !ev.to) continue;
      const b = bumpClass(ev.from, ev.to);
      if (b === 'major' || b === 'graduation') continue;              // hard guard, not configurable
      if (b === r.when.bump) return tag(r);
    } else if (r.when.title_pre) {
      if (ev.kind !== 'release' || !preTitleRe(r.when.title_pre).test(ev.title || ev.what || '')) continue;
      return tag(r);
    }
  }
  return null;
}

// ── apply to a bare URL (newsletter prep rows, firsthand posts) ────────────────
export function ruleForUrl(url, rules, { activeOnly = true } = {}) {
  let host = ''; try { host = new URL(url).hostname; } catch { return null; }
  for (const r of rules.url_rules) {
    if (activeOnly && !r.active) continue;
    if ((r.hosts || []).some((h) => host === h)) return tag(r);
    if ((r.prefixes || []).some((p) => url.startsWith(p))) return tag(r);
  }
  return null;
}

// ── gold replay — reconstruct events from adjudicated manifest rows ────────────
// Firsthand npm rows carry "pkg  from → to" in the link label; release rows carry
// "owner/repo: title". Every parsed row is replayed against EVERY rule (active or
// not) so inadmissible candidates show their collisions before anyone enables them.
const ROW = /^\|\s*\[([^\]]+)\]\((https?:[^)\s]+)\)[^|]*\|\s*([^|]+)\|/;

export function replayGold(rules, logDir = LOG_DIR) {
  const stats = new Map();   // rule id → { fires, agree, benign: [], collisions: [] }
  const all = [...rules.version_rules, ...rules.url_rules];
  for (const r of all) stats.set(r.id, { rule: r, fires: 0, agree: 0, benign: [], waived: [], collisions: [] });
  const files = readdirSync(logDir).filter((f) => f.endsWith('.md') && f !== 'LEDGER.md');
  let rows = 0, residue = 0;

  for (const f of files) {
    for (const line of readFileSync(join(logDir, f), 'utf8').split('\n')) {
      const m = ROW.exec(line.trim());
      if (!m) continue;
      const [, label, url, cell] = m;
      if (/^TODO\b/i.test(cell.trim())) continue;
      rows++;
      const gold = /\*\*kept/i.test(cell) ? 'kept' : /already-held/i.test(cell) ? 'already-held' : 'skipped';

      // reconstruct the structured event this row came from
      let ev = null;
      const npm = /^(.*?)\s{2,}(\S+)\s*→\s*(\S+?)(?:\s|$)/.exec(label);
      if (url.startsWith('https://registry.npmjs.org/') && npm && parseVer(npm[2]) && parseVer(npm[3]))
        ev = { kind: 'npm', pkg: npm[1], from: npm[2], to: npm[3], what: label, deprecated: /DEPRECAT/i.test(label) };
      else if (/github\.com\/.+\/releases\/tag\//.test(url))
        ev = { kind: 'release', title: label.replace(/^[^:]+:\s*/, ''), what: label };

      const hit = (ev && ruleForEventAny(ev, rules)) || ruleForUrlAny(url, rules);
      if (!hit) { residue++; continue; }
      const s = stats.get(hit.id);
      s.fires++;
      if (gold === 'kept') {
        // a waive entry is a maintainer-committed judgment that this specific gold
        // keep was a DUPLICATE ANCHOR (the fact landed the same pass via another
        // row's receipt) — visible in the report, exempt from the fatal gate
        const w = (hit.waive || []).find((sub) => label.includes(sub));
        if (w) s.waived.push(`${f}: ${label.slice(0, 60)}`);
        else s.collisions.push(`${f}: ${label.slice(0, 70)}`);
      } else if (gold === 'already-held') s.benign.push(`${f}: ${label.slice(0, 60)}`);
      else s.agree++;
    }
  }
  return { stats, rows, residue, files: files.length };
}

// replay variants that report WHICH rule matched, ignoring `active` (admission runs on candidates too)
function ruleForEventAny(ev, rules) {
  for (const r of rules.version_rules) {
    const hit = ruleForEvent(ev, { version_rules: [r], url_rules: [] }, { activeOnly: false });
    if (hit) return r;
  }
  return null;
}
function ruleForUrlAny(url, rules) {
  for (const r of rules.url_rules) {
    const hit = ruleForUrl(url, { version_rules: [], url_rules: [r] }, { activeOnly: false });
    if (hit) return r;
  }
  return null;
}

// ── CLI ─────────────────────────────────────────────────────────────────────────
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  const CHECK = process.argv.includes('--check');
  const rules = loadRules();
  const n = rules.version_rules.length + rules.url_rules.length;
  if (!n) { console.log('no tools/triage-rules.yaml (or empty) — nothing to validate'); process.exit(0); }
  const { stats, rows, residue, files } = replayGold(rules);
  let fatal = 0;
  if (!CHECK) console.log(`harvest rules — ${n} rule(s) replayed against ${rows} adjudicated row(s) in ${files} manifest(s)\n`);
  for (const { rule, fires, agree, benign, waived, collisions } of stats.values()) {
    const status = collisions.length ? '✗ INADMISSIBLE' : rule.active ? '✓ active' : '· candidate (inactive)';
    if (rule.active && collisions.length) fatal++;
    if (CHECK) continue;
    console.log(`  ${status}  ${rule.id} — fires ${fires} · agree-skip ${agree} · already-held ${benign.length} · waived ${waived.length} · KEPT-COLLISIONS ${collisions.length}`);
    for (const w of waived) console.log(`      ~ waived (duplicate-anchor): ${w}`);
    for (const c of collisions) console.log(`      ⚠ gold kept: ${c}`);
  }
  if (!CHECK) console.log(`\n  residue (no rule fired): ${residue} row(s) — the judgment layer's real workload`);
  if (fatal) {
    console.error(`\n✗ ${fatal} ACTIVE rule(s) with kept-collisions — deactivate or fix them (a rule may never skip what the gold kept)`);
    process.exit(1);
  }
  if (CHECK) console.log(`harvest rules --check ✓ — ${n} rule(s), no active-rule kept-collisions across ${rows} gold rows`);
}
