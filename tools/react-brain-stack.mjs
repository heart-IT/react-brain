#!/usr/bin/env node
// ── react-brain stack ──────────────────────────────────────────────────────────
// The FORWARD direction the suite was missing. Every other tool is retrospective —
// it reads an existing repo. `stack` answers the encyclopedia's headline verb,
// "what to use", at the one moment doctor can't: GREENFIELD, before any deps exist.
//
//   choose → stack   (intent → the recommended stack)   ← this tool, the missing verb
//   assess → doctor  (your deps → fit)
//   master → learn   (your stack → a learning path)
//
// Given a one-line INTENT (--rn/--web/--both, --expo, --p2p, --stage=…, …), it:
//   1. FILTERS which domains apply to the platform + stage,
//   2. RESOLVES each entry's context-keyed recommend.when against the intent
//      (shared resolveRecommendation primitive — the corpus's own P2P/web/expo
//      branches do the work; a P2P stack is told its data layer is N/A, not "missing"),
//   3. COHERENCE-checks the picks against each other (do they compose?),
//   4. emits an install-ready, explained stack.
//
// Usage:  node tools/react-brain-stack.mjs --rn --p2p --stage=mvp
// ───────────────────────────────────────────────────────────────────────────────

import { loadEntries, resolveRecommendation, pkgsForPick, trunc, GROUP_ORDER, trackRecord, TRACK_GLYPH } from './detect.mjs';

// The curated greenfield RECIPE — not a dump of all 36 entries. Each row: the entry,
// the platforms it applies to, and the maturity TIER at which it enters the stack
// (core = from day one; mvp/production/scale = as the project grows). Feature domains
// (media, payments, charts, editors, games, on-device-ai, i18n, native-ui, keyboard,
// desktop) are demand-driven, not default-stack — surfaced as a footer, not picked.
export const STAGE_RANK = { prototype: 0, mvp: 1, production: 2, scale: 3 };
export const RECIPE = [
  // react-foundations
  { id: 'RB-E-REACT-CORE',      plat: 'any', tier: 'core' },
  { id: 'RB-E-TYPESCRIPT',      plat: 'any', tier: 'core' },
  { id: 'RB-E-RN-VERSIONS',     plat: 'rn',  tier: 'core' },
  // app-architecture
  { id: 'RB-E-STATE',           plat: 'any', tier: 'core' },
  { id: 'RB-E-DATA',            plat: 'any', tier: 'core' },
  { id: 'RB-E-P2P',             plat: 'any', tier: 'core', onlyIf: 'p2p' },
  { id: 'RB-E-NAV',             plat: 'any', tier: 'core' },
  { id: 'RB-E-META-FRAMEWORKS', plat: 'web', tier: 'core' },
  { id: 'RB-E-FORMS',           plat: 'any', tier: 'mvp' },
  { id: 'RB-E-CROSSPLATFORM',   plat: 'both', tier: 'scale' },
  // ui
  { id: 'RB-E-STYLING',         plat: 'any', tier: 'core' },
  { id: 'RB-E-COMPONENT-LIBS',  plat: 'web', tier: 'mvp' },
  { id: 'RB-E-LISTS',           plat: 'any', tier: 'mvp' },
  { id: 'RB-E-ANIMATION',       plat: 'any', tier: 'mvp' },
  { id: 'RB-E-SVG',             plat: 'rn',  tier: 'mvp' },
  { id: 'RB-E-A11Y',            plat: 'any', tier: 'production' },
  // platform-native
  { id: 'RB-E-NATIVE',          plat: 'rn',  tier: 'core' },
  { id: 'RB-E-STORAGE',         plat: 'rn',  tier: 'mvp' },
  // tooling-ops
  { id: 'RB-E-BUILD',           plat: 'any', tier: 'core' },
  { id: 'RB-E-TESTING',         plat: 'any', tier: 'mvp' },
  { id: 'RB-E-DX',              plat: 'any', tier: 'production' },
  { id: 'RB-E-SECURITY',        plat: 'any', tier: 'production' },
  { id: 'RB-E-OBSERVABILITY',   plat: 'any', tier: 'production' },
];
export const FEATURE_DOMAINS = ['media', 'maps', 'calendars', 'payments', 'charts', 'editors', 'games', 'on-device AI', 'AI UI', 'i18n', 'native-ui (widgets/Live Activities)', 'keyboard', 'desktop shell'];

export function buildIntent(flags) {
  const has = (f) => flags.includes(`--${f}`);
  const platform = has('rn') ? 'react-native' : has('web') ? 'react' : 'both';
  const expo = has('expo');
  const p2p = has('p2p');
  const stage = (flags.find((f) => f.startsWith('--stage=')) || '--stage=mvp').split('=')[1];
  // Context tokens fed to resolveRecommendation. Kept platform-pure: a token only goes
  // in when the intent actually implies it, so a clause like "new web CSS-in-JS → …" or
  // "offline / local-first → TanStack DB" can't capture an RN/P2P stack. For `both` we
  // add no single-platform token — the recommend.default lines are written platform-aware
  // ("Web: … RN: …"), so defaulting is correct there.
  // Web adds NO token on purpose: the recommend.default lines are authored platform-aware
  // ("Web: Tailwind … RN: NativeWind …"), so web falls through to the correct default. A
  // bare 'web' token only mis-hits incidental mentions ("web+native shared styling",
  // "new web CSS-in-JS → avoid…", "type-safe web SPA"). RN keeps 'bare rn' because NAV
  // genuinely keys on it ("bare RN → React Navigation"); --expo adds the Expo Router branch.
  const tokens = ['new project'];
  if (platform === 'react-native') tokens.push('bare rn');
  if (platform === 'both') tokens.push('new universal');
  if (expo) tokens.push('expo app', 'expo');
  // P2P keys on the MOST SPECIFIC Holepunch terms only — generic 'offline'/'local-first'
  // belong to the non-P2P local-first clause (TanStack DB/Zero), a different branch.
  if (p2p) tokens.push('p2p', 'holepunch', 'serverless', 'pear app', 'no-backend');
  if (has('graphql')) tokens.push('graphql');
  if (has('ssr') || has('server')) tokens.push('server-rendered', 'data-fetching/ssr', 'next.js');
  if (has('marketing')) tokens.push('content/marketing');
  if (has('library')) tokens.push('library/package author', 'package author');
  return { platform, expo, p2p, stage: STAGE_RANK[stage] != null ? stage : 'mvp', tokens };
}

// A multi-platform `default` lists both platforms' libs ("Web: react-window … RN: FlashList");
// keep only the ones that belong to the chosen platform. (tailwindcss stays — NativeWind needs it.)
const isRNpkg = (p) => /react-native|^expo|\/expo|nativewind|^moti$|flash-list|@legendapp\/list|^metro$|@react-native\/|detox|tamagui|op-sqlite|watermelondb|victory-native|brittle/.test(p);
const isWebpkg = (p) => /^motion$|framer-motion|react-window|react-virtual|react-router|react-start|^next$|^astro$|^waku$|styled-components|stylex|radix|base-ui|react-aria|@mui|chakra|mantine|^antd$|heroui|recharts|@visx|chart\.js|tiptap|lexical|blocknote|^slate$|electron|tauri|capacitor/.test(p);
// Libs the corpus explicitly steers off for NEW work — don't seed a greenfield install with them.
const AVOID = new Set(['react-native-vector-icons', 'react-native-iap', 'formik', 'styled-components']);
const keepForPlatform = (intentPlat) => (p) =>
  !AVOID.has(p) && (intentPlat === 'react-native' ? !isWebpkg(p) : intentPlat === 'react' ? !isRNpkg(p) : true);

export const platMatch = (rowPlat, intentPlat) =>
  rowPlat === 'any' ? true
  : rowPlat === 'both' ? intentPlat === 'both'
  : rowPlat === 'rn' ? (intentPlat === 'react-native' || intentPlat === 'both')
  : /* web */ (intentPlat === 'react' || intentPlat === 'both');

function compose(intent, entries) {
  const sRank = STAGE_RANK[intent.stage];
  const picks = {};
  const out = [];
  for (const row of RECIPE) {
    if (!platMatch(row.plat, intent.platform)) continue;
    if (STAGE_RANK[row.tier] > sRank) continue;
    if (row.onlyIf === 'p2p' && !intent.p2p) continue;
    const e = entries[row.id];
    if (!e) continue;
    const r = resolveRecommendation(e, intent.tokens);
    // Extract install pkgs from the pick, but cut at the first ';' — the corpus writes
    // "Vite; legacy web → webpack" with the ';' separating the recommendation from its
    // contrast, so the tail is alternatives we don't want to seed an install with.
    const pkgs = (r.via === 'na' ? [] : pkgsForPick(row.id, (r.why || '').split(';')[0])).filter(keepForPlatform(intent.platform));
    const pick = { id: row.id, e, ...r, pkgs, group: e.group };
    picks[row.id] = pick;
    out.push(pick);
  }
  out.sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));
  return { picks, ordered: out };
}

// ── coherence: the whole-stack synthesis (does the SET compose?) ─────────────────
function coherence(intent, picks) {
  const notes = [];
  const has = (id) => !!picks[id];
  const txt = (id) => (picks[id]?.why || '').toLowerCase();
  const lbl = (id) => (picks[id]?.label || '').toLowerCase();   // the RESOLVED pick, not the full why-text
  const ok = (m) => notes.push(['✓', m]);
  const warn = (m) => notes.push(['⚠', m]);
  const note = (m) => notes.push(['·', m]);

  if (has('RB-E-STYLING') && has('RB-E-COMPONENT-LIBS')) {
    if (/tamagui|unistyles/.test(lbl('RB-E-STYLING')))
      warn('Your styling pick is an all-in-one design system (Tamagui/Unistyles) — you likely do NOT also need a separate component library. Pick one.');
    else if (/tailwind/.test(lbl('RB-E-STYLING')) && /shadcn/.test(lbl('RB-E-COMPONENT-LIBS')))
      ok('Tailwind + shadcn/ui are designed to pair — coherent.');
  }
  if (intent.p2p) {
    if (picks['RB-E-DATA']?.via === 'na') ok('P2P backend: data syncs via Hypercore/Autobase (RB-E-P2P) — no client-cache lib, by design.');
    if (has('RB-E-STATE')) note('In a P2P app the server-state half is handled by your sync layer — STATE here means client/UI state only (e.g. Zustand).');
    if (has('RB-E-STORAGE')) note('STORAGE: the append-only Hypercore log is your primary persistence; KV (MMKV/AsyncStorage) is just for local prefs.');
  } else if (has('RB-E-DATA') && picks['RB-E-DATA']?.via === 'na') {
    warn('DATA resolved to N/A without a P2P backend — re-check your intent flags.');
  }
  if (picks['RB-E-NAV']?.via === 'when' && /expo router/i.test(picks['RB-E-NAV']?.label || '') && !intent.expo)
    warn('NAV picked Expo Router but you did not pass --expo — Expo Router needs Expo. Add --expo or use React Navigation.');
  if (has('RB-E-META-FRAMEWORKS') && has('RB-E-NAV') && /next/.test(txt('RB-E-META-FRAMEWORKS')))
    note('Next.js owns web routing — the NAV pick applies to nested/native routing, not top-level web routes.');
  if (intent.platform === 'react-native' && /^motion|framer/i.test(picks['RB-E-ANIMATION']?.label || ''))
    warn('ANIMATION resolved to a web lib (Motion/framer-motion) for an RN-only stack — expected Reanimated. Re-check.');
  if (intent.platform === 'both' && !has('RB-E-CROSSPLATFORM'))
    note('Targeting web + native: share a logic/hooks package first (RB-E-CROSSPLATFORM) — it surfaces at the scale tier, but plan the boundary early.');
  return notes;
}

function printStack(intent, entries) {
  const { picks, ordered } = compose(intent, entries);
  const tr = trackRecord();
  const platLabel = intent.platform === 'both' ? 'web + native' : intent.platform;
  console.log(`\n${'━'.repeat(78)}`);
  console.log(`🧱  react-brain stack — a greenfield stack`);
  console.log(`${'━'.repeat(78)}`);
  console.log(`intent: ${platLabel}${intent.expo ? ' · Expo' : ''}${intent.p2p ? ' · P2P/local-first' : ''} · stage:${intent.stage}   ·   ${ordered.length} picks`);

  let lastGroup = null;
  for (const p of ordered) {
    if (p.group !== lastGroup) { console.log(`\n  ╓ ${p.group.toUpperCase()}`); lastGroup = p.group; }
    const dom = p.id.replace('RB-E-', '');
    const flag = p.via === 'na' ? '·' : p.via === 'when' ? '▸' : ' ';
    console.log(`  ${flag} ${dom.padEnd(16)} ${trunc(p.label, 52)}`);
    const why = p.via === 'na' ? p.why : p.via === 'when' ? `for ${p.ctx}: ${p.why}` : p.why;
    console.log(`      ${trunc(why, 96)}`);
    const track = tr[p.id] ? `  ·  track: ${TRACK_GLYPH[tr[p.id]]}` : '';
    if (p.pkgs.length) console.log(`      → ${p.pkgs.join(' ')}   (${p.e.status}·${p.e.confidence})${track}`);
    else if (p.e.doc) console.log(`      → encyclopedia/${p.e.doc}   (${p.e.status}·${p.e.confidence})${track}`);
    else if (track) console.log(`      (${p.e.status}·${p.e.confidence})${track}`);
  }

  const notes = coherence(intent, picks);
  if (notes.length) {
    console.log(`\n${'─'.repeat(78)}\n  COHERENCE  (does the set compose?)`);
    for (const [sym, m] of notes) console.log(`  ${sym} ${m}`);
  }

  const allPkgs = [...new Set(ordered.flatMap((p) => p.pkgs))];
  if (allPkgs.length) {
    console.log(`\n${'─'.repeat(78)}\n  INSTALL  (starting point — where a domain lists alternatives, pick one; pin versions)`);
    console.log(`  ${intent.expo ? 'npx expo install' : intent.platform === 'react-native' ? 'npm i' : 'npm i'} ${allPkgs.join(' ')}`);
  }

  console.log(`\n  Feature domains aren't in a default stack — add per need:`);
  console.log(`    ${FEATURE_DOMAINS.join(' · ')}`);
  console.log(`    → npx react-brain query <topic>`);
  console.log(`\n  Then: scaffold → \`react-brain doctor .\` (fit) → \`react-brain learn .\` (master it).`);
  console.log('');
}

// Run the CLI only when executed directly — the site (and anything else) imports
// RECIPE/buildIntent/platMatch from here so there is exactly one source of truth.
import { pathToFileURL } from 'node:url';
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const flags = process.argv.slice(2).filter((x) => x.startsWith('--'));
if (isMain && (flags.includes('--help') || flags.includes('-h'))) {
  console.log(`usage: react-brain stack [intent flags]
  platform : --rn | --web | --both (default)      --expo
  backend  : --p2p (Holepunch/local-first)        --graphql   --ssr
  stage    : --stage=prototype|mvp|production|scale (default mvp)
  web      : --marketing (content site)           --library (package author)
example: react-brain stack --rn --expo --p2p --stage=production`);
  process.exit(0);
}
if (isMain) printStack(buildIntent(flags), loadEntries());
