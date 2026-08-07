#!/usr/bin/env node
// ── triage-rules engine unit tests — the guards that make auto-skip sane ───────
// Corpus-independent by design (fabricated rules + entry text): the gold-replay
// harness (`harvest rules --check`, also in npm test) covers admission against
// real manifests; THIS file pins the hard guards that no YAML may override.

import { ruleForEvent, ruleForUrl, bumpClass, parseVer } from '../tools/react-brain-triage-rules.mjs';

const RULES = {
  version_rules: [
    { id: 'p', active: true, when: { kind: 'npm', bump: 'patch' }, disposition: 'skipped: patch release' },
    { id: 'pre', active: true, when: { kind: 'npm', bump: 'prerelease' }, disposition: 'skipped: prerelease' },
    { id: 'night', active: true, when: { kind: 'release', title_pre: ['nightly', 'canary', 'experimental', 'insiders'] }, disposition: 'skipped: prerelease/nightly' },
    { id: 'minor-off', active: false, when: { kind: 'npm', bump: 'minor' }, disposition: 'skipped: minor release' },
  ],
  url_rules: [
    { id: 'spon', active: true, hosts: ['go.posthog.com'], disposition: 'sponsor (not evaluated)' },
    { id: 'chrome', active: true, prefixes: ['https://vercel.com/changelog/'], disposition: 'skipped: off-scope platform chrome' },
  ],
};
const text = (s) => new Map([['RB-E-X', s]]);
const npm = (from, to, extra = {}) => ({ kind: 'npm', entries: ['RB-E-X'], pkg: 'x', from, to, what: 'x', ...extra });

let fails = 0;
const t = (name, got, want) => {
  if (String(got) !== String(want)) { fails++; console.error(`✗ ${name}: got ${got}, want ${want}`); }
};

// bump classification
t('patch', bumpClass('1.2.3', '1.2.4'), 'patch');
t('minor', bumpClass('1.2.3', '1.3.0'), 'minor');
t('major', bumpClass('1.2.3', '2.0.0'), 'major');
t('prerelease', bumpClass('1.2.3', '1.3.0-beta.1'), 'prerelease');
t('graduation', bumpClass('1.0.0-rc.4', '1.0.0'), 'graduation');
t('unparseable', bumpClass('1.2', '1.3'), 'null');
t('parseVer v-prefix', parseVer('v2.10.1').patch, '1');

// rule application + hard guards
t('patch fires', ruleForEvent(npm('1.2.3', '1.2.4'), RULES), 'skipped: patch release [rule:p]');
t('inactive rule silent', ruleForEvent(npm('1.2.3', '1.3.0'), RULES), 'null');
t('major never ruled', ruleForEvent(npm('1.2.3', '2.0.0'), RULES), 'null');
t('graduation never ruled', ruleForEvent(npm('1.0.0-rc.1', '1.0.0'), RULES), 'null');
t('deprecated never ruled', ruleForEvent(npm('1.2.3', '1.2.4', { deprecated: true }), RULES), 'null');
t('trip never ruled', ruleForEvent({ kind: '⚡TRIP', entries: ['RB-E-X'], what: 'x' }, RULES), 'null');
t('nightly title fires', ruleForEvent({ kind: 'release', entries: ['RB-E-X'], title: 'v4.27.0-nightly-20260808-abc', what: 'x' }, RULES), 'skipped: prerelease/nightly [rule:night]');
t('rc title NOT in safe set', ruleForEvent({ kind: 'release', entries: ['RB-E-X'], title: 'v0.88.0-rc.1', what: 'x' }, RULES), 'null');
t('bare word no version no fire', ruleForEvent({ kind: 'release', entries: ['RB-E-X'], title: 'DevTools nightly builds post', what: 'x' }, RULES), 'null');

// pin-guard grain: patch defers only to exact x.y.z pins; coarser bumps defer to x.y line pins
t('patch survives line pin', ruleForEvent(npm('4.2.10', '4.2.11'), RULES, { entryTextById: text('pinned at (4.2 defaults)') }), 'skipped: patch release [rule:p]');
t('patch defers to exact pin', ruleForEvent(npm('4.2.10', '4.2.11'), RULES, { entryTextById: text('verified at 4.2.10') }), 'null');
t('prerelease defers to line pin', ruleForEvent(npm('5.9.0', '5.10.0-beta.1'), RULES, { entryTextById: text('(v5.9, 2026-07)') }), 'null');

// url rules
t('sponsor host', ruleForUrl('https://go.posthog.com/abc', RULES), 'sponsor (not evaluated) [rule:spon]');
t('prefix match', ruleForUrl('https://vercel.com/changelog/x', RULES), 'skipped: off-scope platform chrome [rule:chrome]');
t('non-prefix silent', ruleForUrl('https://vercel.com/blog/x', RULES), 'null');
t('garbage url silent', ruleForUrl('not-a-url', RULES), 'null');

if (fails) { console.error(`\ntriage-rules tests: ${fails} FAILED`); process.exit(1); }
console.log('triage-rules engine — 24 assertions ✓');
