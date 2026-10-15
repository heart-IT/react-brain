// Doctor core — the pure functions behind the in-browser doctor, shared so the
// homepage demo (rendered at BUILD time) and the doctor page (run in the BROWSER)
// cannot drift. Ports of tools/detect.mjs matchDetector()/fit()/minVer()/verLt()
// and react-brain-migrate.mjs rule matching. No Node APIs, no imports: this file
// must stay loadable as a plain ES module in a browser.
//
// Data shapes come from corpus.js doctorData():
//   detectors  [pkgPattern, entryId, label, token]   (pattern may end in '*')
//   caps       { [entryId]: { slug, topic, status, confidence, def, when[] } }
//   migrations [{ entry, slug, pkg, below, to, urgency, effort, why, receipts[], requires }]

// Domains every app is expected to have an answer for (same list as
// tools/react-brain-doctor.mjs) — missing ones are reported as gaps.
export const EXPECTED = {
  always: ['RB-E-STATE', 'RB-E-STYLING', 'RB-E-TESTING', 'RB-E-TYPESCRIPT', 'RB-E-DX', 'RB-E-NAV'],
  'react-native': ['RB-E-NATIVE'], react: [], both: ['RB-E-NATIVE'],
};

// The 30-second demo: a deliberately legacy RN app — dead CodePush, FlashList v1
// blocked behind the RN gate, deprecated expo-av, an HTTP client with no cache.
// A fictional manifest; every finding it produces comes from the real corpus.
export const SAMPLE = {
  name: 'legacy-rn-demo', version: '1.0.0',
  dependencies: {
    react: '18.3.1', 'react-native': '0.79.2', zustand: '5.0.0', axios: '^1.18.1',
    '@shopify/flash-list': '^1.7.1', 'react-native-code-push': '^8.2.1',
    'expo-av': '~13.10.0', 'react-native-vector-icons': '^10.0.3', typescript: '~5.5.4',
  },
};

export const URGENCY_RANK = { dead: 0, deprecated: 1, superseded: 2, upgrade: 3, conditional: 4 };

export function matchDetector(name, detectors) {
  for (const d of detectors) {
    const pat = d[0];
    if (pat.endsWith('*')) { if (name.startsWith(pat.slice(0, -1))) return d; }
    else if (name === pat) return d;
  }
  return null;
}

export function fit(cap, tokens) {
  const def = (cap.def || '').toLowerCase();
  const when = (cap.when || []).join(' || ').toLowerCase();
  if (tokens.some((x) => def.includes(x))) return '✓ aligned';
  if (tokens.some((x) => when.includes(x))) return '~ contextual';
  return '↗ review';
}

export const minVer = (range) => {
  const m = String(range || '').match(/\d+(?:\.\d+){0,2}/);
  return m ? m[0].split('.').map(Number) : null;
};

export const verLt = (a, b) => {
  for (let i = 0; i < 3; i++) { const x = a?.[i] || 0, y = b?.[i] || 0; if (x !== y) return x < y; }
  return false;
};

export const depsOf = (pkg) => ({ ...(pkg?.dependencies || {}), ...(pkg?.devDependencies || {}) });

export function platformOf(deps) {
  const rn = 'react-native' in deps || 'expo' in deps;
  return rn && 'react-dom' in deps ? 'both' : rn ? 'react-native' : 'react';
}

// deps → { [entryId]: { labels: string[], tokens: string[] } } in dependency order
export function detect(deps, detectors) {
  const byEntry = {};
  for (const n of Object.keys(deps)) {
    const d = matchDetector(n, detectors);
    if (!d) continue;
    const b = (byEntry[d[1]] ||= { labels: [], tokens: [] });
    if (!b.labels.includes(d[2])) b.labels.push(d[2]);
    if (d[3] && !b.tokens.includes(d[3])) b.tokens.push(d[3]);
  }
  return byEntry;
}

export function gaps(byEntry, platform, caps) {
  return [...EXPECTED.always, ...(EXPECTED[platform] || [])].filter((id) => !byEntry[id] && caps[id]);
}

// Installed versions × the corpus's migration rules → steps, unblocked first, then
// by urgency. A step is blocked when its `requires` gate is not yet met.
export function planMigrations(deps, migrations) {
  const names = Object.keys(deps);
  const find = (pat) => pat.endsWith('*')
    ? names.find((n) => n.startsWith(pat.slice(0, -1))) || null
    : (pat in deps ? pat : null);
  const steps = [];
  for (const r of migrations) {
    const name = find(r.pkg);
    if (!name) continue;
    if (r.below) { const iv = minVer(deps[name]); if (!iv || !verLt(iv, minVer(r.below))) continue; }
    let blocked = null;
    if (r.requires) {
      const reqName = find(r.requires.pkg);
      const rv = reqName ? minVer(deps[reqName]) : null;
      if (!rv || verLt(rv, minVer(r.requires.atleast)))
        blocked = `${r.requires.pkg} ≥ ${r.requires.atleast} (installed: ${reqName ? deps[reqName] : 'absent'})`;
    }
    steps.push({ ...r, name, installed: String(deps[name]), blocked });
  }
  steps.sort((a, b) => (a.blocked ? 1 : 0) - (b.blocked ? 1 : 0)
    || (URGENCY_RANK[a.urgency] ?? 9) - (URGENCY_RANK[b.urgency] ?? 9));
  return steps;
}

// One call for a whole report — what both the homepage demo and the doctor page render.
export function analyze(pkg, { detectors, caps, migrations }) {
  const deps = depsOf(pkg);
  const platform = platformOf(deps);
  const byEntry = detect(deps, detectors);
  const fits = Object.keys(byEntry).filter((id) => caps[id]).map((id) => ({
    id, slug: caps[id].slug, confidence: caps[id].confidence,
    choice: byEntry[id].labels.join(', '), fit: fit(caps[id], byEntry[id].tokens),
  }));
  return {
    name: pkg?.name || 'your app', platform, depCount: Object.keys(deps).length,
    fits, gaps: gaps(byEntry, platform, caps), steps: planMigrations(deps, migrations),
  };
}

export const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return String(u); } };

// Maturity guess from the manifest alone — the manifest-visible subset of
// tools/detect.mjs's stage heuristic (the CLI also sees tsconfig.json and
// .github/workflows; a browser only sees package.json, so this can under-read).
export function stageOf(pkg) {
  const deps = depsOf(pkg);
  const has = (n) => n in deps;
  const score = [
    !!pkg?.scripts?.test,
    has('typescript'),
    ['eslint', '@biomejs/biome', 'prettier', 'lunte'].some(has),
    ['husky', 'lefthook'].some(has),
    pkg?.private === true,
    (parseInt(pkg?.version, 10) || 0) >= 1,
  ].filter(Boolean).length;
  if (pkg?.workspaces) return 'scale';
  return score <= 1 ? 'prototype' : score <= 3 ? 'mvp' : 'production';
}
