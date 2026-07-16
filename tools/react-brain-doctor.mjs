#!/usr/bin/env node
// ── react-brain doctor ─────────────────────────────────────────────────────────
// Deterministic ecosystem-fit analyzer (knowledge → code). Reads the encyclopedia +
// a target repo's package.json, maps ACTUAL dependencies to entries, and reports
// current-choice vs the entry's context recommendation. Complements the LLM mentor:
// this is the deterministic, exhaustive dep-scan; judgment dims (arch, a11y, testing
// depth, security) still belong to the mentor.
//
// Usage:  node tools/react-brain-doctor.mjs <repoPath> [<repoPath> ...]
// Shared detection lives in ./detect.mjs (one source of truth, also used by evidence).
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadEntries, analyzeRepo, fit, trunc, GROUP_ORDER, trackRecord, TRACK_GLYPH, scanModernDefaults, scanSourceSignals, checkAdrs, adviseReadings, loadCensus, resolveRecommendation, trajectoryScan, matchDetector, minVer } from './detect.mjs';
import { fetchDepDocs, classifyDepHealth, preflightVerdict } from './harvest-lib.mjs';
import { pkgsForPick } from './detect.mjs';

// Situational context tokens for resolveRecommendation — matched against the
// corpus's "context → choice" when-clauses, mirroring learn's contextFor logic.
// No bare 'web' token: it substring-matches unrelated clauses ("huge web tables").
function ctxTokens(a) {
  const t = [a.stage];
  if (a.platform !== 'react') t.push(a.deps?.expo ? 'expo' : 'bare rn');
  if (a.byEntry?.['RB-E-P2P'] || String(a.desktopShell || '').startsWith('pear'))
    t.push('p2p', 'holepunch', 'serverless', 'pear');
  if (a.desktopShell && !String(a.desktopShell).startsWith('pear')) t.push(String(a.desktopShell));
  return t;
}

const EXPECTED = {
  always: ['RB-E-STATE', 'RB-E-STYLING', 'RB-E-TESTING', 'RB-E-TYPESCRIPT', 'RB-E-DX', 'RB-E-NAV'],
  'react-native': ['RB-E-NATIVE'],
  react: [],
  both: ['RB-E-NATIVE'],
};

// ── TOP PRIORITIES — one deterministic impact×effort ranking across every section ──
// impact by finding class (census-weighted for gaps) × entry confidence ÷ effort.
// A pre-ranking heuristic, not judgment: the mentor re-ranks; sections carry the detail.
// Decisions can QUIET findings: an ADR whose react_brain.quiets lists a finding key
// (kind:RB-E-X) and whose premise still HOLDS folds that finding out of the priorities
// (→ acknowledged). A BROKEN premise re-opens it, boosted — the advisor remembers being
// overruled and knows exactly when the reason stopped being true.
function acksOf(adrRecords) {
  const acks = {};
  for (const r of adrRecords || []) {
    if (!/accepted|proposed/i.test(r.status || '')) continue;   // superseded/rejected records quiet nothing
    for (const q of r.quiets || []) {
      const cur = acks[q];
      const cand = { adr: r.adr, title: r.title, file: r.file, broken: r.flags.length > 0, flag: r.flags[0] || null };
      if (!cur || (cur.broken && !cand.broken)) acks[q] = cand;   // any valid decision outranks a broken one
    }
  }
  return acks;
}

function computePriorities({ entries, detected, gaps, advice, modern, sigs, traj, acks, reg, sw, stage = 'mvp' }) {
  const CONF = { high: 1, medium: 0.85, low: 0.6 };
  const EFF = { S: 1, M: 1.5, L: 2.5 };
  // MP-STAGE-CALIBRATED: missing-domain pressure scales with maturity — a prototype's
  // concrete code smells outrank "adopt CI/testing"; at production the gaps dominate.
  const GAP_STAGE = { prototype: 0.55, mvp: 0.8, production: 1, scale: 1 };
  // TRAJECTORY: a habit being written NOW outranks debt frozen for a year — the
  // review-gate's introduced-vs-preexisting insight, applied to the whole timeline.
  const churnFactor = (files) => {
    if (!traj?.git || !files?.length) return { mult: 1, tag: '' };
    const lv = files.map(traj.liveness);
    if (lv.includes('live')) return { mult: 1.25, tag: ' — LIVE (touched <90d)' };
    if (lv.every((x) => x === 'dormant')) return { mult: 0.7, tag: ' — dormant (>1y untouched)' };
    return { mult: 1, tag: '' };
  };
  const items = [];
  for (const f of modern?.findings || []) {
    const imp = f.strength === 'deprecated' ? 90 : f.strength === 'superseded' ? 60 : 30;
    const cf = churnFactor(f.files);
    items.push({ kind: 'modernize', entry: f.entry, score: imp * cf.mult / (EFF[f.effort] || 1.5),
      text: `replace ${f.legacy.replace(' (core)', '')} → ${trunc(f.modern, 46)}${f.count ? ` (${f.count} file${f.count === 1 ? '' : 's'})` : ''}`,
      why: `${f.strength} legacy API${cf.tag}` });
  }
  for (const s of sigs?.findings || []) {
    const e = entries[s.entry];
    const cf = churnFactor(s.files);
    items.push({ kind: 'smell', entry: s.entry, score: (50 + Math.min(s.count || 0, 20)) * cf.mult * (CONF[e?.confidence] || 0.85) / 1.5,
      text: s.signal, why: (s.hint ? trunc(s.hint, 100) : 'source signal') + cf.tag });
  }
  // aggressive swaps: you use X, the pick beats it on a stated axis (quantified > argued);
  // swaps are M/L by MP-RANKED discipline, so effort divides honestly
  for (const s of sw?.swaps || []) {
    items.push({ kind: 'swap', entry: s.entry,
      score: (s.quantified ? 58 : 46) * (CONF[entries[s.entry]?.confidence] || 0.85) / (EFF[s.effort] || 1.8),
      text: `swap ${trunc(s.yours, 26)} → ${trunc(s.pkgs.slice(0, 2).join(' ') || s.axis, 42)} (${s.entry.replace('RB-E-', '')})`,
      why: trunc(s.axis || s.pick, 100) });
  }
  for (const u of sw?.upside || []) {
    items.push({ kind: 'upside', entry: u.entry,
      score: 38 * (CONF[entries[u.entry]?.confidence] || 0.85) / 1.8,
      text: `unclaimed upside: ${trunc(u.option, 42)} (${u.entry.replace('RB-E-', '')})`, why: trunc(u.axis, 100) });
  }
  // registry health: the world beyond the curation boundary (deprecated ≫ abandoned > lag)
  for (const h of reg?.health || []) {
    const IMP = { deprecated: 85, abandoned: 42, 'major-lag': 38 };
    items.push({ kind: 'health', entry: h.entry || 'RB-E-DX',
      score: (IMP[h.kind] || 35) / 1.2,
      text: h.kind === 'deprecated' ? `${h.pkg} is DEPRECATED on npm — replace it${h.entry ? ` (see ${h.entry.replace('RB-E-', '')})` : ''}` : `${h.pkg}: ${h.detail}`,
      why: h.kind === 'deprecated' ? trunc(h.detail, 100) : `${h.kind} signal from the registry — verify intent` });
  }
  if (reg?.preflight?.blockers?.length) {
    items.push({ kind: 'preflight', entry: 'RB-E-RN-VERSIONS',
      score: 60,
      text: `${reg.preflight.target} upgrade BLOCKED by ${reg.preflight.blockers.length} dep(s): ${trunc(reg.preflight.blockers.map((b) => b.pkg).join(', '), 60)}`,
      why: 'no released version of these deps supports the target (peer ranges) — see UPGRADE PREFLIGHT' });
  }
  for (const m of (traj?.migrations || []).filter((x) => x.kind === 'migration')) {
    const IMP = { regressing: 95, stalled: 78, done: 62, 'in-progress': 55, 'unknown-age': 50 };
    const since = m.status === 'stalled' && m.lastMovedAt ? ` since ${new Date(m.lastMovedAt * 1000).toISOString().slice(0, 10)}` : '';
    const text = m.status === 'done'
      ? `migration finished — remove the now-unused ${m.legacyPkg} dependency`
      : `${m.status === 'in-progress' ? 'finish' : m.status === 'regressing' ? 'STOP writing' : 'unstick'} the ${m.legacyPkg} → ${m.modernPkgs.join('/')} migration (${m.nowCount} file${m.nowCount === 1 ? '' : 's'} left${m.thenCount != null ? `, was ${m.thenCount}` : ''})`;
    items.push({ kind: 'finish', entry: m.entry, score: (IMP[m.status] || 50) / 1.5,
      text, why: `trajectory: ${m.status}${since}` });
  }
  for (const g of gaps) {
    const e = entries[g.entry];
    const pct = g.field ? g.field.appCount / (g.field.denom || 1) : 0.3;
    items.push({ kind: 'gap', entry: g.entry, score: (40 + pct * 45) * (GAP_STAGE[stage] ?? 0.8) * (CONF[e?.confidence] || 0.85) / 1.5,
      text: `close the ${g.entry.replace('RB-E-', '')} gap — ${trunc(g.resolved?.pick || g.recommend || '', 70)}`,
      why: g.field ? `${g.field.appCount}/${g.field.denom} census apps ship this domain` : 'expected domain, nothing detected' });
  }
  for (const d of detected) {
    if (d.fitStr !== '↗ review') continue;
    const e = entries[d.entry];
    items.push({ kind: 'revisit', entry: d.entry, score: 45 * (CONF[e?.confidence] || 0.85) / 1.5,
      text: `revisit ${d.labels.join(', ')} (${d.entry.replace('RB-E-', '')})`,
      why: trunc(d.resolved?.pick || e?.recommend?.default || '', 100) });
  }
  for (const v of (advice || []).filter((x) => x.trigger)) {
    items.push({ kind: 'read', entry: v.entry, score: 35 / 1.2,
      text: trunc(v.claim, 90), why: `reading: ${trunc(v.title, 60)}` });
  }
  // fold in the recorded decisions: valid premise → acknowledged (out of the ranking);
  // broken premise → re-opened with a boost (something CHANGED — re-litigate now)
  const acknowledged = [];
  const live = items.filter((x) => {
    const ack = acks?.[`${x.kind}:${x.entry}`];
    if (!ack) return true;
    if (!ack.broken) { acknowledged.push({ key: `${x.kind}:${x.entry}`, text: x.text, adr: ack.adr, title: ack.title, file: ack.file }); return false; }
    x.score = Math.max(x.score * 1.5, 85);
    x.reopened = true;
    x.why = `RE-OPENED — ${trunc(ack.flag || 'decision premise broke', 90)} (was acknowledged: ADR-${ack.adr} ${trunc(ack.title, 40)})`;
    return true;
  });
  live.sort((x, y) => y.score - x.score);
  return { top: live.slice(0, 5).map((x) => ({ ...x, score: Math.round(x.score) })), acknowledged };
}

// ── SWAPS & UPSIDE — the aggressive layer ───────────────────────────────────────
// Timid: "current choice ≠ default, not necessarily wrong". Aggressive: "you use X;
// the corpus pick beats it on THIS axis". Every claim is quoted from the entry's own
// option tradeoffs (grounded, never invented); migration cost comes from migrate rules
// when the corpus has priced it. UPSIDE goes further: even ALIGNED entries surface
// options with a QUANTIFIED win the repo hasn't claimed (5x lists, ~30x storage…).
const QUANT_RE = /\b\d+(?:\.\d+)?\s*[x×%]/;
const EXPERIMENTAL_RE = /experimental|early alpha|technical preview|not (?:a )?production|watch, not/i;
function axisOf(text) {
  const clauses = String(text || '').split(/[;·]|\.\s/);
  return (clauses.find((c) => QUANT_RE.test(c)) || clauses[0] || '').trim();
}
const normName = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
function optionsUsed(e, labels) {
  return (e.options || []).filter((o) => {
    const on = normName(o.name);
    return [...labels].some((l) => {
      const ln = normName(l);
      return on.includes(ln) || ln.includes(on.split(' ')[0]) || on.split(' ').some((w) => w.length > 3 && ln.includes(w));
    });
  });
}
function swapsAndUpside(a, detectedRows, census) {
  const swaps = [], upside = [];
  for (const { id, e, info } of detectedRows) {
    const fitStr = fit(e, info.tokens);
    const r = resolveRecommendation(e, [...ctxTokens(a), ...info.tokens]);
    if (r.via === 'na') continue;
    const used = optionsUsed(e, info.labels);
    const pickText = r.via === 'when' ? r.why : (e.recommend?.default || '');
    const pickL = pickText.toLowerCase();
    const defL = (e.recommend?.default || '').toLowerCase();
    // identity matching runs on detect-row LABEL HEADS with word boundaries — labels
    // are precise by design where option prose is not ("toast-message"'s head 'toast'
    // must not match the word "Toasts" in a clause; 'metro' must match "Metro (+…")
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const labelIn = (label, text) => {
      const h = normName(label).split(' ').find((w) => w.length > 2);
      return Boolean(h) && new RegExp(`\\b${esc(h)}\\b`).test(text);
    };
    const usedLabels = [...info.labels];
    // a when-clause endorsing the incumbent names it in its CONTEXT half ("already on
    // axios → keep it") — test ctx+choice, not the choice alone
    const usedInPick = usedLabels.some((l) => labelIn(l, `${(r.ctx || '').toLowerCase()} ${pickL}`));
    const usedInDefault = usedLabels.some((l) => labelIn(l, defL));
    // version-row guard: "target 0.86" is not a swap for a repo already on 0.86
    const usedVer = usedLabels.join(' ').match(/\d+\.\d+/)?.[0];
    const alreadyAtPick = Boolean(usedVer && pickText.includes(usedVer));
    const optForText = (text) => (e.options || []).find((o) => !used.includes(o) &&
      normName(o.name).split(' ').some((w) => w.length > 4 && new RegExp(`\\b${esc(w)}\\b`).test(text)));
    const mkSwap = (grade, text, note) => {
      const pickOpt = optForText(text.toLowerCase());
      const effort = (e.migrate || []).find((m) => a.deps?.[m.from?.pkg])?.effort || null;
      swaps.push({ entry: id, grade, yours: usedLabels.join(', '),
        yoursAxis: used.length ? axisOf(used[0].tradeoff) : null, note: note || null,
        pick: trunc(text, 120), axis: axisOf(pickOpt?.tradeoff || text),
        quantified: QUANT_RE.test(pickOpt?.tradeoff || text),
        pkgs: pkgsForPick(id, text), effort,
        confidence: e.confidence, status: e.status,
        field: census?.agg?.[id] ? { top: Object.entries(census.agg[id].labels).sort((x, y) => y[1] - x[1])[0], denom: census.agg[id].denom } : null });
    };
    if (!alreadyAtPick && (fitStr === '↗ review' || (used.length && !usedInPick && !usedInDefault))) {
      mkSwap('swap', pickText);
    } else if (!alreadyAtPick && r.via === 'when' && usedInPick && !usedInDefault && used.length) {
      // the clause ENDORSES the incumbent ("already on axios → fine, don't churn") —
      // honor the anti-churn call but still show the fresh-start head-to-head
      mkSwap('fresh-start', e.recommend?.default || '', `corpus for your context: ${trunc(r.why, 90)}`);
    } else if (fitStr === '✓ aligned') {
      // upside precision (the ourpot rule — leads must survive contact):
      // aligned entries ONLY (a ~contextual choice is deliberate — don't pitch its rivals);
      // no <Feature> rows (parts of what's already used, not alternatives);
      // no cross-platform lane offers (web bundlers to an RN repo)
      const wrongLane = a.platform === 'react-native' ? /\bweb\b/i : /react[ -]native|\bRN\b/;
      const challenger = (e.options || []).find((o) => !used.includes(o) &&
        QUANT_RE.test(o.tradeoff || '') && !EXPERIMENTAL_RE.test(o.tradeoff || '') &&
        !o.name.startsWith('<') && !wrongLane.test(`${o.name} ${(o.tradeoff || '').slice(0, 60)}`) &&
        !/legacy|deprecated|superseded/i.test(`${o.name} ${o.tradeoff}`));
      if (challenger) upside.push({ entry: id, yours: [...info.labels].join(', '),
        option: challenger.name, axis: axisOf(challenger.tradeoff), confidence: e.confidence });
    }
  }
  return { swaps, upside };
}

// ── OUTCOME MEMORY — the advisor remembers its last visit ───────────────────────
// Doctor re-derived everything from scratch each run and never knew what happened
// to last visit's advice. Baseline the priority keys per repo: RESOLVED (gone since
// last visit — confirmed, trust), PERSISTING (n visits — escalate toward a decision
// instead of repeating), NEW. Store commits with the repo like the other baselines.
const MEM_PATH = new URL('.doctor-memory.json', import.meta.url).pathname;
function outcomeMemory(a, priorities) {
  let mem = {}; try { mem = JSON.parse(readFileSync(MEM_PATH, 'utf8')); } catch { /* first ever run */ }
  const prev = mem[a.name] || { items: {} };
  const nowKeys = new Map(priorities.map((p) => [`${p.kind}:${p.entry}`, p]));
  const resolved = Object.keys(prev.items).filter((k) => !nowKeys.has(k));
  const outcomes = { resolved, persisting: [], fresh: [] };
  const items = {};
  for (const [k, p] of nowKeys) {
    const seen = (prev.items[k]?.seen || 0) + 1;
    items[k] = { seen, text: p.text, last: new Date().toISOString().slice(0, 10) };
    (seen > 1 ? outcomes.persisting : outcomes.fresh).push({ key: k, seen, text: p.text });
  }
  mem[a.name] = { items, visits: (prev.visits || 0) + 1, resolvedTotal: (prev.resolvedTotal || 0) + resolved.length };
  try { writeFileSync(MEM_PATH, JSON.stringify(mem, null, 1)); } catch { /* read-only */ }
  outcomes.visits = mem[a.name].visits; outcomes.hitRate = mem[a.name].resolvedTotal;
  return outcomes;
}

function printReport(a, entries) {
  if (a.missing) { console.log(`\n(skip ${a.name}: no package.json)`); return; }
  if (a.notReact) { console.log(`\n(skip ${a.name}: not a React/RN repo)`); return; }
  const shell = a.desktopShell ? `  ·  shell: ${a.desktopShell}` : '';
  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🩺  react-brain doctor — ${a.name}  (v${a.version || '?'})`);
  console.log(`${'━'.repeat(78)}`);
  console.log(`platform: ${a.platform}${shell}   ·   stage (guess): ${a.stage}   ·   deps: ${a.depCount}`);
  console.log(`TS: ${a.ts ? 'yes' : 'NO'}   ·   CI: ${a.ci ? 'yes' : 'NO'}   ·   tests: ${a.tests ? 'yes' : 'NO'}   ·   lint/format: ${a.lintfmt ? 'yes' : 'NO'}   ·   git hooks: ${a.hooks ? 'yes' : 'NO'}`);

  const detected = Object.keys(a.byEntry).map((id) => ({ id, e: entries[id], info: a.byEntry[id] }))
    .filter((x) => x.e).sort((x, y) => GROUP_ORDER.indexOf(x.e.group) - GROUP_ORDER.indexOf(y.e.group));

  // compute every section's data first, so TOP PRIORITIES can lead the report
  const advice = adviseReadings(a, entries);
  const modern = (!NO_SCAN && a.platform !== 'react') ? scanModernDefaults(a.path, a.deps) : null;
  const sigs = !NO_SCAN ? scanSourceSignals(a.path, entries, { stage: a.stage, platform: a.platform, deps: a.deps }) : null;
  const traj = (!NO_SCAN && !NO_HISTORY) ? trajectoryScan(a.path, a.deps, entries) : null;
  const adrs = checkAdrs(a.path, entries);
  const acks = acksOf(adrs);
  const reg = registryReport(a);
  const sw = swapsAndUpside(a, detected, census);
  const expected = [...EXPECTED.always, ...(EXPECTED[a.platform] || [])];
  const gapIds = expected.filter((id) => !a.byEntry[id]);
  const resolvedPick = (e, toks) => { const r = resolveRecommendation(e, toks); return r.via !== 'default' ? { pick: r.why } : null; };
  const { top: priorities, acknowledged } = computePriorities({ entries,
    detected: detected.map(({ id, e, info }) => ({ entry: id, labels: [...info.labels], fitStr: fit(e, info.tokens), resolved: resolvedPick(e, [...ctxTokens(a), ...info.tokens]) })),
    gaps: gapIds.map((id) => { const c = census?.agg?.[id]; return { entry: id, recommend: entries[id]?.recommend?.default || '',
      resolved: entries[id] ? resolvedPick(entries[id], ctxTokens(a)) : null, field: c ? { appCount: c.appCount, denom: c.denom } : null }; }),
    advice, modern, sigs, traj, acks, reg, sw, stage: a.stage });
  if (priorities.length) {
    console.log(`\n  ⚡ TOP PRIORITIES  (impact × effort heuristic — detail in the sections below)`);
    console.log(`  ${'-'.repeat(74)}`);
    priorities.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.reopened ? '⚡ ' : ''}${p.text}   [${p.kind} · ${p.entry.replace('RB-E-', '')} · ${p.score}]`);
      console.log(`     ${p.why}`);
    });
  }
  const outcomes = outcomeMemory(a, priorities);
  if (outcomes.visits > 1) {
    console.log(`\n  SINCE LAST VISIT  (visit #${outcomes.visits} — the advisor remembers)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const k of outcomes.resolved) console.log(`  ✓ resolved: ${k} — last visit's finding is gone; nice.`);
    for (const p of outcomes.persisting.filter((x) => x.seen >= 3)) console.log(`  ⏳ ${p.key} — visit #${p.seen} with no movement: decide it (react-brain decide … --quiets=${p.key.split(':').slice(0,2).join(':')}) or schedule it`);
    if (!outcomes.resolved.length && !outcomes.persisting.some((x) => x.seen >= 3)) console.log(`  (no resolutions; nothing persisting ≥3 visits)`);
  }

  console.log(`\n  DETECTED ECOSYSTEM CHOICES  (deterministic dep-scan)`);
  console.log(`  ${'-'.repeat(74)}`);
  console.log(`  ${'entry'.padEnd(20)}${'your choice'.padEnd(26)}${'fit'.padEnd(14)}status·conf · track`);
  console.log(`  ${'-'.repeat(74)}`);
  const tr = trackRecord();
  for (const { id, e, info } of detected) {
    const track = tr[id] ? `  ${TRACK_GLYPH[tr[id]]}` : '';
    console.log(`  ${id.replace('RB-E-', '').padEnd(20)}${trunc([...info.labels].join(', '), 25).padEnd(26)}${fit(e, info.tokens).padEnd(14)}${e.status}·${e.confidence}${track}`);
  }

  const { swaps, upside } = sw;
  if (swaps.length || upside.length) {
    console.log(`\n  SWAPS & UPSIDE  (aggressive, corpus-grounded head-to-heads — weigh migration honestly)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const s of swaps) {
      if (s.grade === 'fresh-start') console.log(`  ≈ ${s.entry.replace('RB-E-', '')}: you use ${s.yours} — corpus says don't churn, but a fresh start would pick differently:`);
      else console.log(`  ⇄ ${s.entry.replace('RB-E-', '')}: you use ${s.yours} — the corpus pick beats it here:`);
      if (s.note) console.log(`      ${trunc(s.note, 112)}`);
      if (s.yoursAxis) console.log(`      yours: ${trunc(s.yoursAxis, 110)}`);
      console.log(`      pick : ${trunc(s.pick, 118)}`);
      if (s.axis && s.axis !== s.pick) console.log(`      axis : ${trunc(s.axis, 110)}`);
      const bits = [`${s.status}·${s.confidence}`, s.effort ? `migration ${s.effort}` : null,
        s.pkgs.length ? `npm i ${s.pkgs.slice(0, 3).join(' ')}` : null,
        s.field?.top ? `field ships ${s.field.top[0]} ${s.field.top[1]}/${s.field.denom}` : null].filter(Boolean);
      console.log(`      [${bits.join(' · ')}]`);
    }
    for (const u of upside)
      console.log(`  ↑ ${u.entry.replace('RB-E-', '')} upside (you're aligned on ${trunc(u.yours, 30)}, but unclaimed): ${trunc(u.option, 40)} — ${trunc(u.axis, 90)}`);
  }
  const naRows = detected.filter((x) => resolveRecommendation(x.e, [...ctxTokens(a), ...x.info.tokens]).via === 'na');
  for (const { id, e, info } of naRows)
    console.log(`  — ${id.replace('RB-E-', '')}: ${[...info.labels].join(', ')} — N/A by design for your context (${trunc(resolveRecommendation(e, [...ctxTokens(a), ...info.tokens]).why, 100)})`);

  // TRAJECTORY — the time axis: migrations in flight, live vs frozen habits.
  if (traj?.git && (traj.migrations.length || Object.keys(traj.adoption).length)) {
    console.log(`\n  TRAJECTORY  (git history — the story, not the snapshot)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const m of traj.migrations) {
      const glyph = { 'in-progress': '⏩', stalled: '⏸', regressing: '⚠', done: '✅', 'unknown-age': '·' }[m.status];
      const since = m.status === 'stalled' && m.lastMovedAt ? ` (no movement since ${new Date(m.lastMovedAt * 1000).toISOString().slice(0, 10)})` : '';
      const trend = m.thenCount != null ? ` — ${m.thenCount} → ${m.nowCount} files over ~6mo` : ` — ${m.nowCount} file${m.nowCount === 1 ? '' : 's'} on the legacy pkg`;
      console.log(`  ${glyph} ${m.entry.replace('RB-E-', '')}: ${m.legacyPkg} → ${m.modernPkgs.join('/')}  ${m.status.toUpperCase()}${trend}${since}`);
      if (m.status !== 'done' && m.remaining.length && SHOW_FILES) m.remaining.forEach((f) => console.log(`        ${f}`));
      else if (m.status !== 'done' && m.remaining.length) console.log(`        remaining: ${m.remaining.slice(0, 4).join(', ')}${m.nowCount > 4 ? ` (+${m.nowCount - 4} — --files lists all)` : ''}`);
      if (m.status === 'done') console.log(`        no source imports left — remove ${m.legacyPkg} from package.json`);
    }
    const recent = Object.entries(traj.adoption).filter(([, t]) => traj.now - t <= 90 * 86400)
      .map(([p, t]) => `${p} (${new Date(t * 1000).toISOString().slice(0, 10)})`);
    if (recent.length) console.log(`  • recently adopted (<90d): ${trunc(recent.join(' · '), 130)}`);
  }

  if (gapIds.length) {
    console.log(`\n  GAPS  (expected domain, nothing detected — may be built-in / N/A; verify)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const id of gapIds) {
      const c = census?.agg?.[id];
      const field = c ? `  [${c.appCount}/${c.denom} census apps ship this domain]` : '';
      const r = entries[id] ? resolveRecommendation(entries[id], ctxTokens(a)) : null;
      const rec = r && r.via !== 'default' ? `${r.via === 'na' ? 'N/A here — ' : ''}${r.why}` : entries[id]?.recommend?.default;
      console.log(`  • ${id.replace('RB-E-', '')}: none detected — ${trunc(rec, 120)}${field}`);
    }
  }

  // REGISTRY — dep health beyond the curation boundary + upgrade feasibility.
  if (reg) {
    if (reg.health.length) {
      console.log(`\n  DEP HEALTH  (registry facts for the WHOLE tree — including corpus-unmapped deps)`);
      console.log(`  ${'-'.repeat(74)}`);
      for (const h of reg.health)
        console.log(`  ${h.kind === 'deprecated' ? '✗' : '•'} ${h.pkg}  [${h.kind}${h.entry ? ` · ${h.entry.replace('RB-E-', '')}` : ''}]\n      ${trunc(h.detail, 118)}`);
    }
    if (reg.preflight) {
      const p = reg.preflight;
      console.log(`\n  UPGRADE PREFLIGHT — ${p.target}`);
      console.log(`  ${'-'.repeat(74)}`);
      console.log(`  ${p.blockers.length ? `✗ BLOCKED by ${p.blockers.length} dep(s)` : '✓ no peer-range blockers'} · ${p.bump.length} need a bump · ${p.ok} ok as installed · ${p.noPeer} unconstrained`);
      for (const b of p.blockers) console.log(`     ✗ ${b.pkg} — latest (${b.latest}) peers "${b.peer}"; nothing released supports the target`);
      for (const b of p.bump.slice(0, 12)) console.log(`     ↑ ${b.pkg} → ${b.to}  (peers "${b.peer}")`);
      if (p.bump.length > 12) console.log(`     … +${p.bump.length - 12} more bumps (--json lists all)`);
    }
    if (reg.failed.length) console.log(`  (registry unreachable for: ${reg.failed.join(', ')})`);
  }

  // ACKNOWLEDGED — findings a recorded decision overrules while its premise holds.
  if (acknowledged.length) {
    console.log(`\n  ACKNOWLEDGED  (overruled by recorded decisions — premise holds, not re-argued)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const k of acknowledged)
      console.log(`  ☑ ${trunc(k.text, 78)}  [ADR-${k.adr} "${trunc(k.title, 36)}" · ${k.file}]`);
  }

  // FOR YOUR STACK — corpus readings whose tagged claims apply to this repo.
  if (advice.length) {
    console.log(`\n  FOR YOUR STACK  (readings whose claims apply to what you ship)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const v of advice.slice(0, 5)) {
      const via = v.trigger ? ` · via ${v.trigger}` : '';
      console.log(`  📖 ${v.claim}  [${v.entry.replace('RB-E-', '')}${via}]`);
      console.log(`      ${trunc(v.title, 60)} — ${v.url}`);
    }
    if (advice.length > 5) console.log(`  (+${advice.length - 5} more — --json lists all)`);
  }

  // MODERNIZATION — source-level scan for legacy core RN APIs (RN / cross-platform repos).
  if (modern) {
    const { findings, scanned, capped } = modern;
    console.log(`\n  MODERNIZATION  (source scan — legacy core RN APIs → modern replacement)`);
    console.log(`  ${'-'.repeat(74)}`);
    if (!findings.length) {
      console.log(`  ✓ none of the tracked legacy core APIs found  (${scanned} source file${scanned === 1 ? '' : 's'} scanned)`);
    } else {
      for (const f of findings) {
        const where = f.via === 'dep' ? 'dep' : `${f.count} file${f.count === 1 ? '' : 's'}`;
        const tgt = f.entry ? f.entry.replace('RB-E-', '') : (f.defer_to_skill ? `→${f.defer_to_skill}` : '');
        const legacy = f.legacy.replace(' (core)', '');
        console.log(`  ✗ ${legacy.padEnd(17)}${where.padEnd(9)}→ ${trunc(f.modern, 33).padEnd(34)}[${f.strength} · ${tgt} · ${f.effort}]`);
        if (SHOW_FILES && f.files.length) {
          console.log(`      ${f.files.slice(0, 8).join(', ')}${f.files.length > 8 ? ` +${f.files.length - 8} more` : ''}`);
        }
      }
      console.log(`  ${'-'.repeat(74)}`);
      console.log(`  ${scanned} files scanned${capped ? ` — CAPPED at ${scanned} (repo larger; results partial)` : ''}. legend:`);
      console.log(`  deprecated = fix regardless · superseded = modern is the default · context = only if the axis applies`);
      if (!SHOW_FILES) console.log(`  (re-run with --files to list the offending files)`);
    }
  }

  // SOURCE SIGNALS — entry-owned regex signals over the source (all platforms).
  if (sigs) {
    const { findings, scanned } = sigs;
    if (findings.length) {
      console.log(`\n  SOURCE SIGNALS  (patterns a dep-scan can't see — heuristic, verify in context)`);
      console.log(`  ${'-'.repeat(74)}`);
      for (const f of findings) {
        const where = f.absent ? 'absent' : `${f.count} file${f.count === 1 ? '' : 's'}`;
        console.log(`  ! ${f.signal}  [${f.entry.replace('RB-E-', '')} · ${where}]`);
        if (f.hint) console.log(`      ${f.hint}`);
        if (SHOW_FILES && f.files.length) console.log(`      ${f.files.slice(0, 8).join(', ')}${f.files.length > 8 ? ` +${f.files.length - 8} more` : ''}`);
      }
      console.log(`  (${scanned} files scanned${SHOW_FILES ? '' : '; --files lists offenders'})`);
    }
  }

  // DECISION RECORDS — living ADRs (react-brain decide) re-checked against the corpus.
  if (adrs.length) {
    console.log(`\n  DECISION RECORDS  (docs/adr — premises re-checked against the current corpus)`);
    console.log(`  ${'-'.repeat(74)}`);
    for (const rec of adrs) {
      if (!rec.flags.length) console.log(`  ✓ ${rec.file}  [${rec.entry} · ${rec.status}] premises hold`);
      else {
        console.log(`  ⚠ ${rec.file}  [${rec.entry} · ${rec.status}]`);
        for (const fl of rec.flags) console.log(`      ${fl}`);
      }
    }
    console.log(`  (regenerate a record: react-brain decide <topic> .)`);
  }

  console.log(`\n  note: deterministic dep + source scan. Judgment dimensions (architecture, a11y,`);
  console.log(`        testing depth, security) → run the react-brain mentor. Fit is heuristic.`);
}

// Machine-readable report for agents / the mentor's Phase 0: everything the pretty
// printer shows, as one JSON object per repo (array when several).
function jsonReport(a, entries) {
  if (a.missing || a.notReact) return { name: a.name, path: a.path, skipped: a.missing ? 'no package.json' : 'not a React/RN repo' };
  const tr = trackRecord();
  const fieldOf = (id) => {
    const c = census?.agg?.[id];
    return c ? { labels: c.labels, appCount: c.appCount, denom: c.denom } : null;
  };
  const ctx = ctxTokens(a);
  const resolved = (id) => {
    const toks = a.byEntry[id] ? [...ctx, ...a.byEntry[id].tokens] : ctx;
    const r = entries[id] && resolveRecommendation(entries[id], toks);
    return r && r.via !== 'default' ? { via: r.via, ctx: r.ctx, pick: r.why } : null;
  };
  const detected = Object.keys(a.byEntry).filter((id) => entries[id]).map((id) => ({
    entry: id, labels: [...a.byEntry[id].labels], fit: fit(entries[id], a.byEntry[id].tokens),
    status: entries[id].status, confidence: entries[id].confidence, track: tr[id] || null,
    recommend: entries[id].recommend?.default || null, resolved: resolved(id), field: fieldOf(id),
  }));
  const expected = [...EXPECTED.always, ...(EXPECTED[a.platform] || [])];
  const gaps = expected.filter((id) => !a.byEntry[id]).map((id) => ({ entry: id, recommend: entries[id]?.recommend?.default || null, resolved: resolved(id), field: fieldOf(id) }));
  const modernization = (!NO_SCAN && a.platform !== 'react') ? scanModernDefaults(a.path, a.deps) : null;
  const sourceSignals = !NO_SCAN ? scanSourceSignals(a.path, entries, { stage: a.stage, platform: a.platform, deps: a.deps }) : null;
  const advice = adviseReadings(a, entries);
  const traj = (!NO_SCAN && !NO_HISTORY) ? trajectoryScan(a.path, a.deps, entries) : null;
  const adrs = checkAdrs(a.path, entries);
  const reg = registryReport(a);
  const sw = swapsAndUpside(a, Object.keys(a.byEntry).filter((id) => entries[id]).map((id) => ({ id, e: entries[id], info: a.byEntry[id] })), census);
  const { top: priorities, acknowledged } = computePriorities({ entries,
    detected: detected.map((d) => ({ ...d, fitStr: d.fit })), gaps, advice, modern: modernization, sigs: sourceSignals, traj, acks: acksOf(adrs), reg, sw, stage: a.stage });
  const trajectory = traj?.git ? { oldRefDate: traj.oldRefDate, migrations: traj.migrations,
    recentlyAdopted: Object.fromEntries(Object.entries(traj.adoption).filter(([, t]) => traj.now - t <= 90 * 86400)) } : null;
  return {
    adrs, acknowledged, outcomes: outcomeMemory(a, priorities),
    name: a.name, path: a.path, version: a.version || null, platform: a.platform,
    desktopShell: a.desktopShell || null, stage: a.stage, depCount: a.depCount,
    ts: a.ts, ci: a.ci, tests: a.tests, lintfmt: a.lintfmt, hooks: a.hooks,
    priorities, detected, gaps, advice, modernization, sourceSignals, trajectory,
    swaps: sw.swaps, upside: sw.upside,
    depHealth: reg?.health || null, preflight: reg?.preflight || null, unmapped: a.unmapped,
  };
}

function printMatrix(analyses, entries) {
  const live = analyses.filter((a) => !a.missing && !a.notReact);
  const ids = [...new Set(live.flatMap((a) => Object.keys(a.byEntry)))]
    .map((id) => ({ id, e: entries[id] })).filter((x) => x.e)
    .sort((x, y) => GROUP_ORDER.indexOf(x.e.group) - GROUP_ORDER.indexOf(y.e.group));
  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🧬  CROSS-APP ECOSYSTEM-FIT MATRIX  (${live.map((a) => a.name).join('  vs  ')})`);
  console.log(`${'━'.repeat(78)}`);
  const w = 16;
  console.log(`  ${'entry'.padEnd(16)}${live.map((a) => trunc(a.name, w - 1).padEnd(w)).join('')}encyclopedia default`);
  console.log(`  ${'-'.repeat(76)}`);
  let lastGroup = null;
  for (const { id, e } of ids) {
    if (e.group !== lastGroup) { console.log(`  ── ${e.group} ──`); lastGroup = e.group; }
    const cells = live.map((a) => trunc(a.byEntry[id] ? [...a.byEntry[id].labels].join(',') : '—', w - 1).padEnd(w));
    console.log(`  ${id.replace('RB-E-', '').padEnd(16)}${cells.join('')}${trunc(e.recommend?.default, 38)}`);
  }
  console.log(`\n  Shared backend: Holepunch / Pear. RB-E-CROSSPLATFORM: logic/state/data share`);
  console.log(`  cleanly across siblings — duplicated domain logic is the extract-a-core target.`);
}

const census = loadCensus();   // one snapshot read, shared by both report paths across repos

const argv = process.argv.slice(2);
const NO_SCAN = argv.includes('--no-scan');       // skip the source-level scans (modernization + signals)
const NO_HISTORY = argv.includes('--no-history'); // skip the git trajectory scan (churn, adoption, migrations)
const SHOW_FILES = argv.includes('--files');      // list the offending files per finding
const AS_JSON = argv.includes('--json');          // machine-readable (agents / mentor Phase 0)
const CI = argv.includes('--ci');
const BRIEF = argv.includes('--brief');  // --json consumers (mentor Phase-0/MCP): decisions-only payload                 // gate: exit 1 on expired/moved decision records or deprecated APIs
// registry preflight (network, opt-in; 7d cache): --preflight = whole-tree dep health;
// --target=pkg@x.y adds upgrade feasibility (peer-range blockers). Keeps default runs offline.
const TARGET_STR = (argv.find((x) => x.startsWith('--target=')) || '').split('=')[1] || null;
const TARGET = TARGET_STR ? (() => { const i = TARGET_STR.lastIndexOf('@'); const v = TARGET_STR.slice(i + 1).split('.');
  return { pkg: TARGET_STR.slice(0, i), version: [v[0] || '0', v[1] || '0', v[2] || '0'].join('.') }; })() : null;
const PREFLIGHT = argv.includes('--preflight') || Boolean(TARGET);
const REG_CACHE = new URL('.registry-cache.json', import.meta.url).pathname;
const targets = argv.filter((x) => !x.startsWith('--'));
if (!targets.length) { console.error('usage: node tools/react-brain-doctor.mjs <repoPath> [<repoPath> ...] [--no-scan] [--files] [--json] [--ci]'); process.exit(1); }
const entries = loadEntries();
const analyses = targets.map(analyzeRepo);

// registry docs per repo (runtime deps only) — fetched once, cached 7d
const registryByPath = {};
if (PREFLIGHT) {
  for (const a of analyses) {
    if (a.missing || a.notReact) continue;
    let rt = {}; try { rt = JSON.parse(readFileSync(join(a.path, 'package.json'), 'utf8')).dependencies || {}; } catch { /* no runtime deps */ }
    const { docs, failed } = await fetchDepDocs(Object.keys(rt), { cachePath: REG_CACHE });
    registryByPath[a.path] = { docs, failed, runtime: rt };
  }
}
function registryReport(a) {
  const reg = registryByPath[a.path];
  if (!reg) return null;
  const health = [];
  const pf = TARGET ? { target: `${TARGET.pkg}@${TARGET.version}`, ok: 0, noPeer: 0, bump: [], blockers: [] } : null;
  for (const [pkg, doc] of Object.entries(reg.docs)) {
    const inst = minVer(reg.runtime[pkg]);
    for (const h of classifyDepHealth(pkg, doc, inst)) {
      if (h.kind === 'deprecated') { const m = matchDetector(pkg); if (m) h.entry = m[1]; }   // route back into the corpus when it has an opinion
      health.push(h);
    }
    if (TARGET && pkg !== TARGET.pkg) {
      const v = preflightVerdict(pkg, doc, TARGET.pkg, TARGET.version, inst);
      if (v.verdict === 'ok') pf.ok++;
      else if (v.verdict === 'no-peer') pf.noPeer++;
      else if (v.verdict === 'bump') pf.bump.push(v);
      else pf.blockers.push(v);
    }
  }
  // fold version-locked families (expo-*, @scope/*) — 15 rows of "expo-x: 2 majors
  // behind" is ONE fact (the SDK is behind) shouted 15 times
  const fam = (p) => (p.startsWith('@') ? p.split('/')[0] : p.split('-')[0]);
  const lagRows = health.filter((h) => h.kind === 'major-lag');
  const byFam = {};
  for (const h of lagRows) (byFam[fam(h.pkg)] ||= []).push(h);
  for (const [f, rows] of Object.entries(byFam)) {
    if (rows.length < 3) continue;
    for (const r of rows) health.splice(health.indexOf(r), 1);
    health.push({ pkg: `${f}* (${rows.length} pkgs)`, kind: 'major-lag',
      detail: `version-locked family behind together — e.g. ${rows[0].pkg}: ${rows[0].detail}` });
  }
  return { health, preflight: pf, failed: reg.failed };
}
if (AS_JSON) {
  const out = analyses.map((a) => { const r = jsonReport(a, entries);
    return BRIEF && !r.skipped ? { name: r.name, platform: r.platform, stage: r.stage, priorities: r.priorities,
      swaps: r.swaps, upside: r.upside, trajectory: r.trajectory, acknowledged: r.acknowledged, outcomes: r.outcomes } : r; });
  console.log(JSON.stringify(out.length === 1 ? out[0] : out, null, 2));
} else {
  for (const a of analyses) printReport(a, entries);
  if (analyses.filter((a) => !a.missing && !a.notReact).length > 1) printMatrix(analyses, entries);
  console.log('');
}

// ── CI gate: expired/moved decisions and deprecated APIs block the merge ───────
if (CI) {
  let staleAdrs = 0, deprecated = 0;
  for (const a of analyses) {
    if (a.missing || a.notReact) continue;
    staleAdrs += checkAdrs(a.path, entries).filter((r) => r.flags.length).length;
    if (!NO_SCAN && a.platform !== 'react')
      deprecated += scanModernDefaults(a.path, a.deps).findings.filter((x) => x.strength === 'deprecated').length;
  }
  const fail = staleAdrs + deprecated > 0;
  const msg = `CI: ${fail ? 'FAIL' : 'PASS'} — ${staleAdrs} decision record(s) with moved/expired premises · ${deprecated} deprecated API(s)`;
  console[AS_JSON ? 'error' : 'log'](msg);
  process.exit(fail ? 1 : 0);
}
