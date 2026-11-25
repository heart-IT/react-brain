// The saved project — the one piece of state that makes the site an app: the home
// page becomes its dashboard, entry pages say how its choices sit, and Check my app
// re-opens it. Browser-only (localStorage), nothing is uploaded.
//
// Stored under the key the console's `load` has always written, in the same shape
// (name, deps, platform, expo, p2p, stage, byEntry), so a repo loaded in the console
// and one saved from Check my app are the same project. Added fields: pkg (the slim
// manifest, to re-run the analysis), savedAt, last (summary counts at save), done
// (migration to-dos ticked off, keyed by stepKey).
import { depsOf, detect, platformOf, stageOf } from './doctor-core.js';

export const KEY = 'rb-console-ctx';

// Display labels for the analysis' raw values (doctor-core keeps the CLI's terms).
export const FIT = {
  '✓': { label: 'matches our pick', cls: 'mark-ok' },
  '~': { label: 'fits some contexts', cls: 'mark-warn' },
  '↗': { label: 'differs — worth a look', cls: 'mark-dim' },
};
export const fitOf = (f) => FIT[String(f)[0]] || FIT['↗'];
// fit() is a text match against our pick, so a dead package our pick *names* (as the
// thing to leave) reads as "matches". A dead/deprecated step for the same topic wins.
const REPLACE = { label: 'replace — see to do', cls: 'mark-warn' };
export const fitIn = (f, steps) =>
  steps.some((s) => s.slug === f.slug && SEVERE.has(s.urgency)) ? REPLACE : fitOf(f.fit);
export const URGENCY = {
  dead: 'replace now', deprecated: 'replace soon', superseded: 'better option exists',
  upgrade: 'upgrade available', conditional: 'upgrade if it applies',
};
export const urgencyLabel = (u) => URGENCY[u] || u;
export const SEVERE = new Set(['dead', 'deprecated']);
export const actNow = (s) => !s.blocked && SEVERE.has(s.urgency);

export const stepKey = (s) => `${s.pkg}→${s.to}`;

export function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

export function forget() {
  try { localStorage.removeItem(KEY); } catch {}
}

const write = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); return true; } catch { return false; } };

export function summarize(a) {
  const nAct = a.steps.filter(actNow).length;
  return { act: nAct, plan: a.steps.length - nAct, review: a.fits.filter((f) => f.fit.startsWith('↗')).length, gaps: a.gaps.length };
}

// pkg + its analysis → the stored project. Re-saving the same app keeps its ticked to-dos.
export function save(pkg, a, detectors) {
  const prev = load();
  const deps = depsOf(pkg);
  const slim = {
    name: pkg.name, version: pkg.version, private: pkg.private,
    scripts: pkg.scripts?.test ? { test: pkg.scripts.test } : undefined,
    dependencies: pkg.dependencies, devDependencies: pkg.devDependencies,
  };
  const p = {
    name: a.name, deps: Object.keys(deps).length, platform: platformOf(deps),
    expo: 'expo' in deps, p2p: Object.keys(deps).some((d) => /^hyper|^autobase$|^corestore$|^hrpc$/.test(d)),
    stage: stageOf(pkg), byEntry: detect(deps, detectors),
    pkg: slim, savedAt: new Date().toISOString().slice(0, 10), last: summarize(a),
    done: prev?.name === a.name ? prev.done || {} : {},
  };
  return write(p) ? { project: p, prev: prev?.name === a.name ? prev : null } : null;
}

export function setDone(key, on) {
  const p = load();
  if (!p) return;
  p.done ||= {};
  if (on) p.done[key] = true; else delete p.done[key];
  write(p);
}
