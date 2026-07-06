// ── react-brain shared detection core ──────────────────────────────────────────
// One source of truth for: loading the encyclopedia, the dependency→entry detection
// table, per-repo analysis, and the fit heuristic. Imported by both
// react-brain-doctor.mjs (knowledge→code) and react-brain-evidence.mjs (code→knowledge).
//
// SEED notes: YAML via a python3+pyyaml shim (swap for `npm i yaml`); the DETECTORS
// table is here (production TODO = migrate into per-entry `detect:` fields in the YAML).
// ───────────────────────────────────────────────────────────────────────────────

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, basename, extname } from 'node:path';
import { createRequire } from 'node:module';

const __dir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
export const ENC_PATH = resolve(__dir, '../skills/react-brain-mentor/encyclopedia.yaml');
export const GROUP_ORDER = ['react-foundations', 'app-architecture', 'ui', 'platform-native', 'tooling-ops', 'ai'];

function loadYamlPy(p) {
  // dev fallback: python3 + pyyaml (default=str so unquoted dates serialize as strings)
  const src = execFileSync('python3',
    ['-c', 'import sys,yaml,json;json.dump(yaml.safe_load(open(sys.argv[1])),sys.stdout,default=str)', p],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return JSON.parse(src);
}

// Prefer the `yaml` npm package (installed via npm/npx — the distributable path); fall back to a
// python3+pyyaml shim so the repo's own dev tools run with zero `npm install`.
export function loadYaml(p) {
  try { return require('yaml').parse(readFileSync(p, 'utf8')); }
  catch { return loadYamlPy(p); }
}

export function loadDoc() { return loadYaml(ENC_PATH); }
export function loadEntries() { return Object.fromEntries(loadDoc().entries.map((e) => [e.id, e])); }

// pattern -> [entry, human label, token to look for in the entry's recommend text]
// pattern forms: exact 'name' · scope prefix '@scope/*' · name prefix 'name*'
export const DETECTORS = [
  ['zustand','RB-E-STATE','Zustand','zustand'],
  ['jotai','RB-E-STATE','Jotai','jotai'],
  ['@reduxjs/toolkit','RB-E-STATE','Redux Toolkit','rtk'],
  ['react-redux','RB-E-STATE','Redux (react-redux)','redux'],
  ['redux','RB-E-STATE','Redux (classic)','redux'],
  ['@xstate/*','RB-E-STATE','XState','xstate'],
  ['xstate','RB-E-STATE','XState','xstate'],
  ['valtio','RB-E-STATE','Valtio','valtio'],
  ['mobx','RB-E-STATE','MobX','mobx'],
  ['@tanstack/react-query','RB-E-DATA','TanStack Query','tanstack query'],
  ['swr','RB-E-DATA','SWR','swr'],
  ['@apollo/client','RB-E-DATA','Apollo Client','apollo'],
  ['urql','RB-E-DATA','urql','urql'],
  ['@trpc/*','RB-E-DATA','tRPC','trpc'],
  ['@rocicorp/zero','RB-E-DATA','Zero','zero'],
  ['@tanstack/react-db','RB-E-DATA','TanStack DB','tanstack db'],
  ['@react-navigation/*','RB-E-NAV','React Navigation','react navigation'],
  ['expo-router','RB-E-NAV','Expo Router','expo router'],
  ['react-router-dom','RB-E-NAV','React Router','react router'],
  ['react-router','RB-E-NAV','React Router','react router'],
  ['@tanstack/react-router','RB-E-NAV','TanStack Router','tanstack router'],
  ['next','RB-E-META-FRAMEWORKS','Next.js','next.js'],
  ['@tanstack/react-start','RB-E-META-FRAMEWORKS','TanStack Start','tanstack start'],
  ['astro','RB-E-META-FRAMEWORKS','Astro','astro'],
  ['waku','RB-E-META-FRAMEWORKS','Waku','waku'],
  ['react-hook-form','RB-E-FORMS','React Hook Form','react hook form'],
  ['formik','RB-E-FORMS','Formik','formik'],
  ['@tanstack/react-form','RB-E-FORMS','TanStack Form','tanstack form'],
  ['zod','RB-E-FORMS','Zod','zod'],
  ['valibot','RB-E-FORMS','Valibot','valibot'],
  ['@tailwindcss/*','RB-E-STYLING','Tailwind','tailwind'],
  ['tailwindcss','RB-E-STYLING','Tailwind','tailwind'],
  ['nativewind','RB-E-STYLING','NativeWind','nativewind'],
  ['react-native-unistyles','RB-E-STYLING','Unistyles','unistyles'],
  ['@tamagui/*','RB-E-STYLING','Tamagui','tamagui'],
  ['tamagui','RB-E-STYLING','Tamagui','tamagui'],
  ['@stylexjs/stylex','RB-E-STYLING','StyleX','stylex'],
  ['styled-components','RB-E-STYLING','styled-components','styled-components'],
  ['@emotion/*','RB-E-STYLING','Emotion','css-in-js'],
  ['@radix-ui/*','RB-E-COMPONENT-LIBS','Radix UI','radix'],
  ['@base-ui-components/*','RB-E-COMPONENT-LIBS','Base UI','base ui'],
  ['react-aria-components','RB-E-COMPONENT-LIBS','React Aria','react aria'],
  ['@mui/*','RB-E-COMPONENT-LIBS','MUI','mui'],
  ['@chakra-ui/*','RB-E-COMPONENT-LIBS','Chakra','chakra'],
  ['@mantine/*','RB-E-COMPONENT-LIBS','Mantine','mantine'],
  ['antd','RB-E-COMPONENT-LIBS','Ant Design','ant'],
  ['@heroui/*','RB-E-COMPONENT-LIBS','HeroUI','heroui'],
  // ── svg / vector / icons ──
  ['react-native-svg-transformer','RB-E-SVG','svg-transformer','svg-transformer'],
  ['react-native-svg','RB-E-SVG','react-native-svg','react-native-svg'],
  ['@react-native-vector-icons/*','RB-E-SVG','vector-icons (scoped)','vector-icons'],
  ['react-native-vector-icons','RB-E-SVG','react-native-vector-icons (legacy)','legacy'],
  ['lucide-react-native','RB-E-SVG','Lucide icons','lucide'],
  ['@expo/vector-icons','RB-E-SVG','@expo/vector-icons','expo/vector-icons'],
  ['react-native-reanimated','RB-E-ANIMATION','Reanimated','reanimated'],
  ['react-native-gesture-handler','RB-E-ANIMATION','Gesture Handler','gesture handler'],
  ['react-native-worklets','RB-E-ANIMATION','Worklets','worklets'],
  ['framer-motion','RB-E-ANIMATION','framer-motion / Motion','motion'],
  ['motion','RB-E-ANIMATION','Motion','motion'],
  ['lottie-react-native','RB-E-ANIMATION','Lottie','lottie'],
  ['@shopify/react-native-skia','RB-E-ANIMATION','Skia','skia'],
  ['moti','RB-E-ANIMATION','Moti','moti'],
  ['@shopify/flash-list','RB-E-LISTS','FlashList','flashlist'],
  ['@legendapp/list','RB-E-LISTS','Legend List','legend list'],
  ['react-window','RB-E-LISTS','react-window','react-window'],
  ['@tanstack/react-virtual','RB-E-LISTS','TanStack Virtual','react-virtual'],
  ['@tanstack/react-table','RB-E-LISTS','TanStack Table','hightable'],
  ['react-native-nitro-modules','RB-E-NATIVE','Nitro Modules','nitro'],
  ['expo-modules-core','RB-E-NATIVE','Expo Modules','expo modules'],
  ['expo','RB-E-NATIVE','Expo (managed native)','expo modules'],
  ['react-native-vision-camera','RB-E-MEDIA','VisionCamera','visioncamera'],
  ['expo-camera','RB-E-MEDIA','expo-camera','expo-camera'],
  ['@livekit/*','RB-E-MEDIA','LiveKit','livekit'],
  ['react-native-webrtc','RB-E-MEDIA','react-native-webrtc','webrtc'],
  ['expo-av','RB-E-MEDIA','expo-av (playback)','expo-av'],
  ['expo-video','RB-E-MEDIA','expo-video (playback)','expo-video'],
  ['react-native-qrcode-svg','RB-E-MEDIA','QR generation (qrcode-svg)','scanning'],
  ['expo-image-picker','RB-E-MEDIA','expo-image-picker','camera'],
  ['react-native-mmkv','RB-E-STORAGE','MMKV','mmkv'],
  ['@react-native-async-storage/async-storage','RB-E-STORAGE','AsyncStorage','asyncstorage'],
  ['@op-engineering/op-sqlite','RB-E-STORAGE','op-sqlite','op-sqlite'],
  ['op-sqlite','RB-E-STORAGE','op-sqlite','op-sqlite'],
  ['expo-sqlite','RB-E-STORAGE','expo-sqlite','sqlite'],
  ['react-native-keychain','RB-E-STORAGE','Keychain','keychain'],
  ['expo-secure-store','RB-E-STORAGE','expo-secure-store (secrets)','secure-store'],
  ['@nozbe/watermelondb','RB-E-STORAGE','WatermelonDB','watermelondb'],
  ['react-native-keyboard-controller','RB-E-KEYBOARD','keyboard-controller','keyboard-controller'],
  ['react-native-avoid-softinput','RB-E-KEYBOARD','avoid-softinput','avoid-softinput'],
  ['react-native-purchases','RB-E-PAYMENTS','RevenueCat','revenuecat'],
  ['react-native-iap','RB-E-PAYMENTS','react-native-iap','react-native-iap'],
  ['expo-iap','RB-E-PAYMENTS','expo-iap','expo-iap'],
  ['electron','RB-E-DESKTOP','Electron','electron'],
  ['@tauri-apps/*','RB-E-DESKTOP','Tauri','tauri'],
  ['pear-runtime-react-native','RB-E-DESKTOP','Pear (mobile, Holepunch)','pear'],
  ['pear-runtime','RB-E-DESKTOP','Pear (Holepunch)','pear'],
  ['@capacitor/*','RB-E-DESKTOP','Capacitor','capacitor'],
  ['hyper*','RB-E-P2P','Holepunch (Hypercore stack)','holepunch'],
  ['autobase','RB-E-P2P','Autobase (multiwriter)','autobase'],
  ['corestore','RB-E-P2P','Corestore','corestore'],
  ['hrpc','RB-E-P2P','hrpc','hrpc'],
  ['blind-pairing*','RB-E-P2P','blind-pairing','pairing'],
  ['vite','RB-E-BUILD','Vite','vite'],
  ['@rspack/*','RB-E-BUILD','Rspack','rspack'],
  ['esbuild','RB-E-BUILD','esbuild','esbuild'],
  ['@react-native/metro-config','RB-E-BUILD','Metro','metro'],
  ['metro','RB-E-BUILD','Metro','metro'],
  ['webpack','RB-E-BUILD','webpack','webpack'],
  ['jest','RB-E-TESTING','Jest','jest'],
  ['vitest','RB-E-TESTING','Vitest','vitest'],
  ['@testing-library/react-native','RB-E-TESTING','RN Testing Library','testing library'],
  ['@testing-library/react','RB-E-TESTING','React Testing Library','testing library'],
  ['@playwright/test','RB-E-TESTING','Playwright','playwright'],
  ['detox','RB-E-TESTING','Detox','detox'],
  ['msw','RB-E-TESTING','MSW','msw'],
  ['@storybook/*','RB-E-TESTING','Storybook','storybook'],
  ['brittle','RB-E-TESTING','brittle (Holepunch TAP)','brittle'],
  ['husky','RB-E-DX','husky (git hooks)','husky'],
  ['lefthook','RB-E-DX','lefthook','lefthook'],
  ['@biomejs/biome','RB-E-DX','Biome','biome'],
  ['eslint','RB-E-DX','ESLint','eslint'],
  ['prettier','RB-E-DX','Prettier','prettier'],
  ['lint-staged','RB-E-DX','lint-staged','lint-staged'],
  ['turbo','RB-E-DX','Turborepo','turborepo'],
  ['nx','RB-E-DX','Nx','nx'],
  ['lunte','RB-E-DX','lunte (lint)','lint'],
  ['@sentry/*','RB-E-OBSERVABILITY','Sentry','sentry'],
  ['@bugsnag/*','RB-E-OBSERVABILITY','Bugsnag','bugsnag'],
  ['typescript','RB-E-TYPESCRIPT','TypeScript','typescript'],
  ['next-intl','RB-E-I18N','next-intl','next-intl'],
  ['react-i18next','RB-E-I18N','react-i18next','i18next'],
  ['i18next','RB-E-I18N','i18next','i18next'],
  ['react-intl','RB-E-I18N','react-intl','formatjs'],
  ['@lingui/*','RB-E-I18N','Lingui','lingui'],
  ['victory-native','RB-E-CHARTS','Victory Native','victory'],
  ['victory','RB-E-CHARTS','Victory','victory'],
  ['recharts','RB-E-CHARTS','Recharts','recharts'],
  ['@visx/*','RB-E-CHARTS','visx','visx'],
  ['chart.js','RB-E-CHARTS','Chart.js','chart.js'],
  ['react-native-gifted-charts','RB-E-CHARTS','gifted-charts','gifted-charts'],
  ['d3-force','RB-E-CHARTS','d3-force','visx'],
  ['d3','RB-E-CHARTS','D3','visx'],
  ['react-native-maps','RB-E-MAPS','react-native-maps','react-native-maps'],
  ['expo-maps','RB-E-MAPS','expo-maps (alpha)','expo-maps'],
  ['@rnmapbox/maps','RB-E-MAPS','Mapbox RN','mapbox'],
  ['@maplibre/maplibre-react-native','RB-E-MAPS','MapLibre RN','maplibre'],
  ['react-native-better-maps','RB-E-MAPS','Better Maps (Nitro)','better-maps'],
  ['react-map-gl','RB-E-MAPS','react-map-gl','react-map-gl'],
  ['react-leaflet','RB-E-MAPS','react-leaflet','leaflet'],
  ['@tiptap/*','RB-E-EDITORS','TipTap','tiptap'],
  ['prosemirror-*','RB-E-EDITORS','ProseMirror','prosemirror'],
  ['lexical','RB-E-EDITORS','Lexical','lexical'],
  ['@blocknote/*','RB-E-EDITORS','BlockNote','blocknote'],
  ['slate','RB-E-EDITORS','Slate','slate'],
  ['react-native-executorch','RB-E-ONDEVICE-AI','ExecuTorch','executorch'],
  ['@react-native-ai/apple','RB-E-ONDEVICE-AI','Apple on-device LLM','apple'],
  ['react-native-rag','RB-E-ONDEVICE-AI','react-native-rag','rag'],
  ['@ai-sdk/*','RB-E-AI-UI','Vercel AI SDK','ai sdk'],
  ['ai','RB-E-AI-UI','Vercel AI SDK','ai sdk'],
  ['@assistant-ui/*','RB-E-AI-UI','assistant-ui','assistant-ui'],
];

export function matchDetector(name) {
  for (const d of DETECTORS) {
    const pat = d[0];
    if (pat.endsWith('/*')) { if (name.startsWith(pat.slice(0, -1))) return d; }
    else if (pat.endsWith('*')) { if (name.startsWith(pat.slice(0, -1))) return d; }
    else if (pat.endsWith('/')) { if (name.startsWith(pat)) return d; }
    else if (name === pat) return d;
  }
  return null;
}

const PLATFORM_PKGS = new Set(['react', 'react-dom', 'react-native']);

export function analyzeRepo(repoPath) {
  const p = resolve(repoPath);
  const pj = join(p, 'package.json');
  if (!existsSync(pj)) return { name: basename(p), path: p, missing: true };
  const pkg = JSON.parse(readFileSync(pj, 'utf8'));
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const has = (n) => n in deps;
  if (!(has('react') || has('react-native') || has('expo'))) {
    return { name: pkg.name || basename(p), path: p, notReact: true };
  }

  const hasRN = has('react-native') || has('expo');
  const hasWeb = has('react-dom');
  const desktopShell = ['electron', 'pear-runtime', 'pear-runtime-react-native', '@tauri-apps/api', '@capacitor/core']
    .find(has) || (pkg.pear ? 'pear' : null);
  const platform = hasRN && hasWeb ? 'both' : hasRN ? 'react-native' : 'react';

  const ts = has('typescript') || existsSync(join(p, 'tsconfig.json'));
  const ci = existsSync(join(p, '.github', 'workflows'));
  const tests = !!(pkg.scripts && pkg.scripts.test);
  const lintfmt = ['eslint', '@biomejs/biome', 'prettier', 'lunte'].some(has);
  const hooks = ['husky', 'lefthook'].some(has);
  const workspaces = !!pkg.workspaces;
  const versionGE1 = (parseInt(pkg.version, 10) || 0) >= 1;

  const byEntry = {};
  const unmapped = [];
  const add = (id, label, token) => {
    (byEntry[id] ||= { labels: new Set(), tokens: new Set() });
    byEntry[id].labels.add(label);
    if (token) byEntry[id].tokens.add(token);
  };
  for (const name of Object.keys(deps)) {
    const d = matchDetector(name);
    if (d) add(d[1], d[2], d[3]);
    else if (!PLATFORM_PKGS.has(name)) unmapped.push(name);
  }
  const reactV = deps['react'] && String(deps['react']).replace(/[^\d.]/g, '');
  const rnV = deps['react-native'] && String(deps['react-native']).replace(/[^\d.]/g, '');
  const compiler = has('babel-plugin-react-compiler') || has('react-compiler-runtime');
  if (reactV) add('RB-E-REACT-CORE', `React ${reactV}${compiler ? ' + Compiler' : ''}`, compiler ? 'compiler' : 'react 19');
  if (rnV) add('RB-E-RN-VERSIONS', `RN ${rnV}`, rnV);

  const stageScore = [tests, ci, ts, lintfmt, hooks, pkg.private === true, versionGE1].filter(Boolean).length;
  let stage = stageScore <= 1 ? 'prototype' : stageScore <= 3 ? 'mvp' : 'production';
  if (workspaces) stage = 'scale';

  return { name: pkg.name || basename(p), path: p, version: pkg.version, platform, desktopShell,
    ts, ci, tests, lintfmt, hooks, stage, depCount: Object.keys(deps).length, byEntry, unmapped, deps };
}

export function fit(entry, tokens) {
  const def = (entry?.recommend?.default || '').toLowerCase();
  const when = (entry?.recommend?.when || []).join(' || ').toLowerCase();
  const t = [...tokens];
  if (t.some((x) => def.includes(x))) return '✓ aligned';
  if (t.some((x) => when.includes(x))) return '~ contextual';
  return '↗ review';
}

// ── the intent resolver ─────────────────────────────────────────────────────────
// Resolve a context-keyed entry against an INTENT (a list of lowercase context
// tokens), the way the corpus authors write recommend.when as "context → choice (why)".
// Returns { label, why, ctx, via } where via ∈ 'when' | 'default' | 'na'.
// This is the shared primitive behind `stack` (intent → picks). doctor/learn resolve a
// context too — against DETECTED deps — and can migrate onto this over time.
export function resolveRecommendation(entry, tokens) {
  const t = [...tokens].map((x) => x.toLowerCase()).filter(Boolean);
  for (const clause of entry?.recommend?.when || []) {
    const i = clause.indexOf('→');
    if (i < 0) continue;
    const ctx = clause.slice(0, i).trim();
    const choice = clause.slice(i + 1).trim();
    if (t.some((tok) => ctx.toLowerCase().includes(tok))) {
      const na = /\bn\/a\b|does not apply|not\b.*\bapply/i.test(choice);
      const m = choice.match(/^([^(;—]+)/);          // short label = up to first ( ; or —
      return { label: na ? '— (n/a)' : (m ? m[1].trim() : choice), why: choice, ctx, via: na ? 'na' : 'when' };
    }
  }
  const def = entry?.recommend?.default || '';
  const m = def.match(/^([^.(;]+)/);
  return { label: m ? m[1].trim() : def, why: def, ctx: 'default', via: 'default' };
}

// Every exact-name (installable) package an entry's options map to, via DETECTORS —
// the candidate set `signals` measures against live npm data. Globs are matchers, not
// packages, so they're skipped; deduped by package name.
export function entryPackages(entryId) {
  const seen = new Set();
  const out = [];
  for (const d of DETECTORS) {
    if (d[1] !== entryId || d[0].includes('*') || seen.has(d[0])) continue;
    seen.add(d[0]);
    out.push({ pkg: d[0], label: d[2] });
  }
  return out;
}

// First word of a label, e.g. "TanStack Query" → "tanstack". Head-matching only fires
// on UNIQUE heads (count 1) so a shared scope like "tanstack" (react-query/-db/-router/…)
// can't make one pick's text match every sibling; "brittle" stays unique and matchable.
const labelHead = (lab) => lab.toLowerCase().split(/[ (/]/)[0];
const HEAD_FREQ = {};
for (const d of DETECTORS) { const h = labelHead(d[2]); if (h.length >= 6) HEAD_FREQ[h] = (HEAD_FREQ[h] || 0) + 1; }

// Reverse the detection table: given a resolved pick's text, the install package(s)
// the encyclopedia means for THAT entry. Reuses DETECTORS so stack's install line and
// doctor's dep-scan never disagree on what a recommendation maps to.
export function pkgsForPick(entryId, pickText) {
  const low = (pickText || '').toLowerCase();
  const out = [];
  for (const d of DETECTORS) {
    if (d[1] !== entryId) continue;
    if (d[0].includes('*')) continue;                         // glob = a detection matcher, not an installable name
    const lab = d[2].toLowerCase();
    const head = labelHead(d[2]);
    if (low.includes(lab) || (head.length >= 6 && HEAD_FREQ[head] === 1 && low.includes(head))) out.push(d[0]);
  }
  return [...new Set(out)];
}

export const trunc = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + '…' : (s || ''));

// ── the calibration track record ────────────────────────────────────────────────
// The append-only ledger (written by `calibrate`/`challenge`) lives next to the tools.
// Reading it here, in the shared core, lets stack/doctor/learn show calibration-weighted
// confidence inline without depending on the calibrate tool — and keeps calibrate using
// the same reader (one source of truth).
export const LEDGER_PATH = resolve(__dir, 'predictions.jsonl');
export function readLedger() {
  if (!existsSync(LEDGER_PATH)) return [];
  return readFileSync(LEDGER_PATH, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
}
// latest resolution outcome per entry id, e.g. { 'RB-E-STATE': 'held' }. {} if no ledger /
// nothing resolved yet — so a badge appears only where a verdict has actually been earned.
export function trackRecord() {
  const out = {};
  for (const r of readLedger()) if (r.k === 'O') out[r.id] = r.outcome;
  return out;
}
export const TRACK_GLYPH = { held: '✓ held', weakened: '~ weakened', overturned: '✗ overturned' };

// ── source-level modernization scan (modern-defaults.yaml) ───────────────────────
// The DETECTORS above are package.json-based. But the biggest "legacy default → modern"
// swaps are CORE React Native APIs (Animated, StyleSheet, FlatList, SafeAreaView, Image,
// TouchableOpacity) — imported from 'react-native', invisible to a dep-scan. This scans
// source for them, driven by the `match:` fields in modern-defaults.yaml (one source of
// truth for the checklist). Detection is scoped to `from 'react-native'` NAMED imports, so
// the modern replacements — which re-export the same names from other modules (Animated
// from reanimated, Image from expo-image, SafeAreaView from safe-area-context) — never
// false-match. AsyncStorage (a package, not a core API) is matched via `match.dep`.
export const MODERN_DEFAULTS_PATH = resolve(__dir, '../skills/react-brain-mentor/modern-defaults.yaml');
export function loadModernDefaults() { return loadYaml(MODERN_DEFAULTS_PATH); }

const SRC_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const SKIP_DIRS = new Set(['node_modules', 'ios', 'android', 'build', 'dist', '.next',
  '.expo', 'coverage', '.turbo', 'vendor', 'Pods', '__generated__', '.yarn']);
const MAX_FILES = 6000;          // runaway-repo backstop; reported when hit (no silent cap)
const MAX_BYTES = 512 * 1024;    // skip files > 512KB (minified/bundled/generated)

function walkSource(dir, out) {
  if (out.length >= MAX_FILES) return out;
  let ents;
  try { ents = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    if (out.length >= MAX_FILES) break;
    if (e.name.startsWith('.')) continue;                 // .git, .expo, dotfiles
    const full = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walkSource(full, out); }
    else if (SRC_EXT.has(extname(e.name))) out.push(full);
  }
  return out;
}

// import { A, B as C } from 'react-native'  (also multi-line & `import type`)
const RN_NAMED_IMPORT = /import\s+(?:type\s+)?(?:[\w$]+\s*,\s*)?\{([^}]*)\}\s*from\s*['"]react-native['"]/g;

// Scan a repo's source for the modern-defaults swaps. Returns { findings, scanned, capped }.
// findings: [{ legacy, modern, entry, defer_to_skill, strength, effort, via, count, files }]
export function scanModernDefaults(repoPath, deps = {}) {
  const swaps = loadModernDefaults().swaps || [];
  const bySpecifier = new Map();
  for (const s of swaps) if (s.match?.rn_named_import) bySpecifier.set(s.match.rn_named_import, s);

  const root = resolve(repoPath);
  const files = walkSource(root, []);
  const capped = files.length >= MAX_FILES;
  const hits = new Map();                                 // legacy -> { swap, files:Set }

  for (const f of files) {
    let src;
    try { if (statSync(f).size > MAX_BYTES) continue; src = readFileSync(f, 'utf8'); } catch { continue; }
    if (!src.includes('react-native')) continue;          // cheap prefilter
    const specs = new Set();
    let m; RN_NAMED_IMPORT.lastIndex = 0;
    while ((m = RN_NAMED_IMPORT.exec(src))) {
      for (let n of m[1].split(',')) {
        n = n.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
        if (n) specs.add(n);
      }
    }
    if (!specs.size) continue;
    for (const [spec, s] of bySpecifier) {
      if (!specs.has(spec)) continue;
      const h = hits.get(s.legacy) || hits.set(s.legacy, { swap: s, files: new Set() }).get(s.legacy);
      h.files.add(f.startsWith(root) ? f.slice(root.length + 1) : f);
    }
  }

  const findings = [...hits.values()].map((h) => ({
    legacy: h.swap.legacy, modern: h.swap.modern, entry: h.swap.entry || null,
    defer_to_skill: h.swap.defer_to_skill || null, strength: h.swap.strength, effort: h.swap.effort,
    via: 'source', count: h.files.size, files: [...h.files].sort(),
  }));

  // dep-based rows (AsyncStorage): dep-scan already sees these; surface them in the checklist too.
  for (const s of swaps) {
    if (s.match?.dep && (s.match.dep in deps)) {
      findings.push({ legacy: s.legacy, modern: s.modern, entry: s.entry || null,
        defer_to_skill: s.defer_to_skill || null, strength: s.strength, effort: s.effort,
        via: 'dep', count: null, files: [] });
    }
  }

  const rank = { deprecated: 0, superseded: 1, context: 2 };
  findings.sort((a, b) => (rank[a.strength] - rank[b.strength]) || ((b.count || 0) - (a.count || 0)));
  return { findings, scanned: files.length, capped };
}
