#!/usr/bin/env node
// ── react-brain learn ──────────────────────────────────────────────────────────
// The Tutorial pillar, made ADAPTIVE. A learning path is not authored here — it is
// COMPUTED as a function of (the encyclopedia graph) × (your repo). No other React
// learning resource can do this because no other one is machine-readable.
//
// Reuses detect.mjs (your stack + maturity stage) and the doctor's
// gap/divergence/aligned classification, then turns each relevant domain into a
// learning STEP:
//   why it matters to YOU · the reviewed Explanation (the *why*) · canonical reading
//   · the depth skill to go deeper · a concrete exercise against your OWN code.
//
// Ordering = the pedagogical spine (foundations → architecture → ui → native → ops
// → ai); priority within it = gap > revisit > consolidate; the whole path is
// calibrated to the repo's stage (won't push security/observability onto a prototype).
//
// This is the human-facing sibling of the corpus/repo tools:
//   doctor → where is this repo now      pulse  → is the corpus fresh
//   evidence → where is the corpus thin  challenge → is the corpus right
//   learn → how does THIS PERSON get from here to mastery   ← serves the human
//
// Usage:  node tools/react-brain-learn.mjs <repoPath> [--stage=prototype|mvp|production|scale] [--full]
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, analyzeRepo, fit, trunc, GROUP_ORDER, trackRecord, TRACK_GLYPH } from './detect.mjs';

// Domains to GUIDE a learner toward as gaps, per stage (foundations surface early;
// hardening surfaces as the project matures). Detected domains are ALWAYS included
// regardless of stage — if you already use it, you should understand it.
const STAGE_GAPS = {
  prototype:  ['RB-E-STATE', 'RB-E-NAV', 'RB-E-REACT-CORE'],
  mvp:        ['RB-E-STATE', 'RB-E-NAV', 'RB-E-REACT-CORE', 'RB-E-DATA', 'RB-E-TYPESCRIPT', 'RB-E-STYLING', 'RB-E-TESTING'],
  production: ['RB-E-STATE', 'RB-E-NAV', 'RB-E-REACT-CORE', 'RB-E-DATA', 'RB-E-TYPESCRIPT', 'RB-E-STYLING', 'RB-E-TESTING', 'RB-E-DX', 'RB-E-SECURITY', 'RB-E-OBSERVABILITY'],
  scale:      ['RB-E-STATE', 'RB-E-NAV', 'RB-E-REACT-CORE', 'RB-E-DATA', 'RB-E-TYPESCRIPT', 'RB-E-STYLING', 'RB-E-TESTING', 'RB-E-DX', 'RB-E-SECURITY', 'RB-E-OBSERVABILITY', 'RB-E-CROSSPLATFORM'],
};
const PLATFORM_GAPS = { 'react-native': ['RB-E-NATIVE'], both: ['RB-E-NATIVE', 'RB-E-CROSSPLATFORM'], react: [] };
const ALL_GAPS = [...new Set(Object.values(STAGE_GAPS).flat())];

// Concrete exercises against the reader's OWN code. `c` = their detected choice for
// this domain (a label string) or null when it's a gap. Keep each one findable in a
// real repo and tied to the entry's organizing idea.
const EXERCISES = {
  'RB-E-REACT-CORE': () =>
    `Grep your code for \`useMemo\`/\`useCallback\`. With React Compiler those are mostly the compiler's job now. Pick one and ask: is this load-bearing, or hand-memoization the compiler would do for free?`,
  'RB-E-STATE': (c) =>
    `Open your largest screen. Find one \`useState\` that actually holds *server* data (something fetched from elsewhere). That mislabel is the exact line RB-E-STATE draws: client state vs server cache. ${c ? `Move it out of component state into ${c} or a query layer.` : 'It belongs in a data/query layer, not component state.'}`,
  'RB-E-DATA': (c) => c
    ? `Find one ${c} query. Can you say its cache key, its staleTime, and what invalidates it? If not, that gap IS the lesson — read the entry, then annotate that one query end to end.`
    : `Grep for \`useEffect\` blocks that fetch then setState. Each one is a server cache reinvented by hand (no dedup, no retry, no invalidation). Pick the gnarliest and sketch how a query lib would own its loading/error/refetch.`,
  'RB-E-NAV': (c) =>
    `Draw your app's screens as a tree on paper. Now find where that tree is encoded in code (${c || 'your router config'}). Is every screen reachable by a URL/deep link? The places that aren't are where navigation state has leaked into component state.`,
  'RB-E-META-FRAMEWORKS': (c) =>
    `For one route, trace: what runs on the server vs the client? "Who owns the tree" is the whole question RB-E-META-FRAMEWORKS turns on${c ? ` — locate that boundary in your ${c} setup.` : '.'}`,
  'RB-E-FORMS': (c) =>
    `Take your most complex form. Count: how many re-renders happen as the user types one field? ${c ? `Confirm ${c} is isolating field state (uncontrolled inputs), not re-rendering the whole form.` : 'Uncontrolled, per-field state is what keeps a big form fast — see the entry.'}`,
  'RB-E-CROSSPLATFORM': () =>
    `List what your sibling apps share today. RB-E-CROSSPLATFORM's thesis: logic/state/data share cleanly, UI fights you. Find one piece of *domain logic* duplicated across two apps — that's the first extract-a-core candidate, not the UI.`,
  'RB-E-STYLING': (c) =>
    `Find where a runtime style value is computed on every render. ${c ? `Is ${c} resolving styles at compile time or runtime?` : 'Compile-time/zero-runtime styling moves that cost off the render path.'} The entry's organizing idea is *when* styles are computed.`,
  'RB-E-COMPONENT-LIBS': (c) =>
    `Open one ${c || 'UI'} component you rely on. Can you restyle it without forking it, and is it accessible by default (keyboard + screen reader)? Those two questions decide a component-lib bet.`,
  'RB-E-LISTS': (c) =>
    `Find your longest list. Is it a \`.map()\` inside a ScrollView? Cost scales with mounted NODES, not data length — that pattern mounts everything. ${c ? `Confirm ${c} is windowing/recycling it.` : 'It needs windowing (FlatList/FlashList) before it grows.'}`,
  'RB-E-ANIMATION': (c) =>
    `Find one animation. Does it run on the JS thread or the UI thread? ${c ? `${c} can keep it off the JS thread — verify this one does.` : 'Animations that touch the JS thread jank under load.'}`,
  'RB-E-SVG': (c) =>
    `Count your icon sources. Many apps ship 2–3 icon systems by accident. ${c ? `You're on ${c} — consolidate on one.` : 'Pick one vector/icon pipeline and standardize.'}`,
  'RB-E-NATIVE': (c) =>
    `Open one native module you depend on (${c || 'any'}). Is it on the New Architecture (JSI/Fabric/Turbo), or still bridging? The async bridge is gone in New Arch — anything still on it is a latency tax. Pin versions if any are pre-1.0 (e.g. Nitro).`,
  'RB-E-STORAGE': (c) =>
    `List everything you persist on-device and where (${c || 'AsyncStorage / SQLite / MMKV / Keychain'}). Anything secret (tokens) in plain key-value storage is a finding — secrets belong in Keychain/SecureStore.`,
  'RB-E-MEDIA': (c) =>
    `Trace one camera/media flow frame-by-frame${c ? ` through ${c}` : ''}. Where does a frame cross the JS bridge? Real-time media lives or dies on keeping frames off the JS thread — depth routes to react-native-jsi / rt-audio-pipeline-audit.`,
  'RB-E-P2P': (c) =>
    `Sketch your data's life with no server: who writes it, who replicates it, who resolves conflicts? ${c ? `${c} answers this with append-only logs (Hypercore) + Autobase.` : ''} Then notice why a client cache (TanStack Query) is N/A here — there's no remote to cache.`,
  'RB-E-BUILD': (c) =>
    `Time a cold build and a hot reload. If RN feels slow, the bundler usually isn't the culprit — native build + Babel are. ${c ? `(You're on ${c}.)` : ''} Find which phase actually dominates before optimizing.`,
  'RB-E-TESTING': (c) => c
    ? `Open your highest-value test. Does it assert on *behavior a user can see*, or on implementation details (internal state, call counts)? ${c} works best testing the former. Find one brittle test and rewrite it behavior-first.`
    : `Pick the one flow that, if it broke, would hurt most. Write a single test for it — behavior-first, mock the network (MSW). One real test beats a coverage number.`,
  'RB-E-DX': (c) =>
    `List your invariants (format, lint, types, tests). Which run automatically on every commit/PR${c ? ` via ${c}` : ''}? Any invariant a human has to remember is one that will be forgotten — mechanize it.`,
  'RB-E-TYPESCRIPT': (c) =>
    `Grep for \`any\` and \`@ts-ignore\`. Each is a hole in the type net. ${c ? '' : 'No TypeScript yet? Add it to one new file and feel the difference. '}Pick the riskiest \`any\` (an API boundary) and type it properly.`,
  'RB-E-SECURITY': () =>
    `Pick one trust decision your app makes (is this user allowed to X?). Is it enforced on the device or on a server the device can't lie to? Device-trust must be server-verified — that's the boundary RB-E-SECURITY draws. Also: when did you last audit your lockfile for the supply-chain risk?`,
  'RB-E-OBSERVABILITY': (c) =>
    `When a user hits an error in production right now, how do you find out? ${c ? `Confirm ${c} captures it with a stack trace + release.` : 'Without crash/error reporting you learn about bugs from reviews, not telemetry.'}`,
};
const fallbackExercise = (c, e) =>
  `You ${c ? `use ${c}` : 'have no detected choice'} here. Read the recommendation, compare it to your setup, and write one sentence: why was this chosen, and would you choose it again today?`;

// Context rules: the encyclopedia's recommendations are context-keyed, so the path
// must be too — otherwise it false-flags (telling a P2P app it "lacks a server-cache
// lib" when client caching has no remote to cache). Mirrors the RB-E-DATA / RB-E-STATE
// P2P when-clauses. A suppressed gap is shown as N/A (not dropped — silent omission
// would read as "covered" when it isn't), with the reason as its lesson.
function contextFor(a) {
  const suppressGaps = new Set();
  const gapReason = {};   // why a suppressed gap is N/A (shown on the na step)
  const caveats = {};     // a note appended to a detected/learn step
  if (a.byEntry['RB-E-P2P']) {
    suppressGaps.add('RB-E-DATA');
    gapReason['RB-E-DATA'] = 'N/A here: your backend is P2P (Hypercore/Autobase), so a client-cache lib (TanStack Query) has no remote to cache — data sync is RB-E-P2P.';
    if (a.byEntry['RB-E-DATA'])
      caveats['RB-E-DATA'] = 'P2P backend detected — confirm this client-cache lib serves genuine *remote* data, not vestigial (P2P data syncs via RB-E-P2P).';
    caveats['RB-E-STATE'] = 'In a P2P app the *server-state* half is handled by your sync layer — this is really about client/UI state (e.g. Zustand).';
  }
  return { suppressGaps, gapReason, caveats };
}

function buildPath(a, entries, { stageOverride, full }) {
  const stage = stageOverride || a.stage;
  const { suppressGaps, gapReason, caveats } = contextFor(a);
  const detected = new Set(Object.keys(a.byEntry).filter((id) => entries[id]));
  const wantGaps = new Set(full
    ? [...ALL_GAPS, ...(PLATFORM_GAPS[a.platform] || [])]
    : [...(STAGE_GAPS[stage] || STAGE_GAPS.mvp), ...(PLATFORM_GAPS[a.platform] || [])]);

  const confRank = { high: 0, medium: 1, low: 2 };
  const steps = [];
  for (const id of new Set([...detected, ...wantGaps])) {
    const e = entries[id];
    if (!e) continue;
    const info = a.byEntry[id];
    let kind, badge, prio;
    if (!info && suppressGaps.has(id)) { kind = 'na'; badge = '· n/a'; prio = 3; }  // context-suppressed gap
    else if (!info) { kind = 'learn'; badge = '● new'; prio = 0; }  // a gap — domain not yet in the repo
    else if (fit(e, info.tokens) === '✓ aligned') { kind = 'deepen'; badge = '✓ deepen'; prio = 2; }
    else { kind = 'revisit'; badge = '~ revisit'; prio = 1; }       // a divergence from the default
    steps.push({ id, e, info, kind, badge, prio, caveat: caveats[id], reason: gapReason[id], groupRank: GROUP_ORDER.indexOf(e.group) });
  }
  // Spine: group order. Within a group: gaps → divergences → aligned, settled (high conf) first.
  steps.sort((x, y) => x.groupRank - y.groupRank || x.prio - y.prio
    || (confRank[x.e.confidence] ?? 1) - (confRank[y.e.confidence] ?? 1) || x.id.localeCompare(y.id));
  return { stage, steps };
}

function whyLine(s) {
  const { e, info, kind, caveat, reason } = s;
  const labels = info ? [...info.labels].join(', ') : null;
  let base;
  if (kind === 'na') return reason || 'Not applicable to this project — here for context.';
  else if (kind === 'learn') base = `New to your stack. ${trunc(e.recommend?.default, 170)}`;
  else if (kind === 'revisit')
    base = `You use ${labels}. The encyclopedia leans elsewhere here — learn the tradeoff before you'd switch (you may be fine): ${trunc(e.recommend?.default, 130)}`;
  else base = `Already on the recommended path (${labels}). Lock in *why* it's right so you can defend it — or know when it stops being right.`;
  return kind !== 'na' && caveat ? `${base}  [${caveat}]` : base;
}

function printPath(a, entries, opts) {
  if (a.missing) { console.log(`\n(skip ${a.name}: no package.json)`); return; }
  if (a.notReact) { console.log(`\n(skip ${a.name}: not a React/RN repo)`); return; }
  const { stage, steps } = buildPath(a, entries, opts);
  const shell = a.desktopShell ? `  ·  shell: ${a.desktopShell}` : '';

  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🎓  react-brain learn — a path for ${a.name}  (v${a.version || '?'})`);
  console.log(`${'━'.repeat(78)}`);
  console.log(`platform: ${a.platform}${shell}   ·   stage: ${stage}${opts.stageOverride ? ' (forced)' : ' (guess)'}   ·   ${steps.length} steps`);
  console.log(`TS: ${a.ts ? 'yes' : 'NO'}  ·  CI: ${a.ci ? 'yes' : 'NO'}  ·  tests: ${a.tests ? 'yes' : 'NO'}  ·  lint/fmt: ${a.lintfmt ? 'yes' : 'NO'}`);

  // Triage: the 3 highest-leverage steps (gaps in foundational groups first; N/A excluded).
  const triage = steps.filter((s) => s.kind !== 'na')
    .sort((x, y) => x.prio - y.prio || x.groupRank - y.groupRank).slice(0, 3);
  if (triage.length) {
    console.log(`\n  ▶ START HERE  (highest leverage first)`);
    triage.forEach((s, i) => console.log(`     ${i + 1}. ${s.badge.padEnd(9)} ${s.id.replace('RB-E-', '')} — ${trunc(s.e.topic, 52)}`));
  }

  const tr = trackRecord();
  let lastGroup = null;
  steps.forEach((s, i) => {
    const { e, kind } = s;
    if (e.group !== lastGroup) {
      console.log(`\n${'─'.repeat(78)}\n  ╓ ${e.group.toUpperCase()}`);
      lastGroup = e.group;
    }
    const track = tr[e.id] ? `  ·  track: ${TRACK_GLYPH[tr[e.id]]}` : '';
    console.log(`\n  STEP ${i + 1}  ·  ${s.badge}  ·  ${e.status}·${e.confidence}${track}`);
    console.log(`  ${e.id.replace('RB-E-', '')} — ${e.topic}`);
    console.log(`  why : ${whyLine(s)}`);
    if (kind === 'na') { console.log(`  do  : nothing — confirm the above holds for your app, then skip.`); return; }
    if (e.doc) console.log(`  read: encyclopedia/${e.doc}   (the long-form *why*)`);
    else console.log(`  read: query "${e.category}" — index recommendation (no long-form yet)`);
    const r = (e.reading || [])[0];
    if (r) console.log(`  go  : ${trunc(r.title, 58)} — ${r.url}`);
    if (e.defer_to_skill) console.log(`  deep: ${e.defer_to_skill} skill (in-domain depth)`);
    const choice = s.info ? [...s.info.labels].join(', ') : null;
    const ex = (EXERCISES[e.id] || ((c) => fallbackExercise(c, e)))(choice, e);
    console.log(`  do  : ${ex}`);
  });

  console.log(`\n${'─'.repeat(78)}`);
  console.log(`  This path = (encyclopedia graph) × (your repo). It regenerates — re-run as`);
  console.log(`  your stack and stage change. For judgment dimensions (architecture, a11y,`);
  console.log(`  testing depth) beyond ecosystem selection, run the react-brain mentor skill.`);
  console.log('');
}

const argv = process.argv.slice(2);
const flags = argv.filter((x) => x.startsWith('--'));
const targets = argv.filter((x) => !x.startsWith('--'));
const stageOverride = (flags.find((f) => f.startsWith('--stage=')) || '').split('=')[1] || null;
const full = flags.includes('--full');
if (!targets.length) {
  console.error('usage: node tools/react-brain-learn.mjs <repoPath> [--stage=prototype|mvp|production|scale] [--full]');
  process.exit(1);
}
const entries = loadEntries();
for (const t of targets) printPath(analyzeRepo(t), entries, { stageOverride, full });
