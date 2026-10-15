#!/usr/bin/env node
// Rendered-UI regression checks over a SERVED build (default http://127.0.0.1:4321/).
// Complements check-dist.mjs (markup) with what only a browser can tell: horizontal
// page scroll, text below the legibility floor, interactive targets under WCAG 2.5.8,
// and over-long lines of running text. Needs Playwright + a Chromium:
//
//   npm run build && npx astro preview --port 4321 &
//   npx -y playwright@1.58.1 install chromium        # once (needs OS deps; or use
//   node tests/ui-check.mjs                          #  the mcr.microsoft.com/playwright image)
//
// Not wired into CI (no browser there); run it after a visual change. Exits 1 with a
// readable list of every failure. Thresholds are deliberately loose so they only
// catch regressions, not taste.
import { createRequire } from 'node:module';

const BASE_URL = (process.argv.slice(2).find((a) => !a.startsWith('--')) || process.env.SITE_URL || 'http://127.0.0.1:4321/').replace(/\/?$/, '/');
const PAGES = ['', 'entries/', 'entries/state/', 'entries/nav/', 'doctor/', 'search/?q=zustand', 'decide/', 'stack/',
  'libraries/', 'reading/', 'scorecard/', 'methodology/', 'census/', 'benchmark/', 'newsletter/', '404.html'];
const WIDTHS = [320, 360, 820, 1440];
const MIN_TEXT_PX = 12;      // nothing legible below this on a dark screen
const MIN_TARGET_PX = 24;    // WCAG 2.2 AA 2.5.8 (inline links inside a sentence are exempt)
const MAX_CHARS_PER_LINE = 80;
const SHOW = process.argv.includes('--all') ? Infinity : 30;   // lines per check in the report

let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch {
  console.error('ui-check: playwright is not installed. `npm i -D playwright@1.58.1 && npx playwright install chromium`, or run this script inside the mcr.microsoft.com/playwright image.');
  process.exit(2);
}

const failures = [];
const fail = (check, where, detail) => failures.push({ check, where, detail });

function audit({ MIN_TEXT_PX, MIN_TARGET_PX, MAX_CHARS_PER_LINE }) {
  const label = (el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const out = { hscroll: null, tiny: [], targets: [], measure: [] };

  const de = document.documentElement;
  if (de.scrollWidth > de.clientWidth + 1) out.hscroll = `${de.scrollWidth} > ${de.clientWidth}`;

  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el)) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < MIN_TEXT_PX) out.tiny.push(`${label(el)} ${fs.toFixed(1)}px "${el.textContent.trim().slice(0, 24)}"`);
  }

  for (const el of document.querySelectorAll('a[href], button, input, select, textarea, summary')) {
    if (!visible(el)) continue;
    // an <a> that sits inside running text is exempt (WCAG 2.5.8 "inline" exception)
    if (el.tagName === 'A' && el.closest('p, li, td, dd, h1, h2, h3, figcaption, pre, nav[aria-label="Breadcrumb"]')) continue;
    if (el.type === 'checkbox' || el.type === 'radio') continue;   // the <label> is the target
    // a text field inside a padded <label>/<form> wrapper: the wrapper is what you tap
    const box = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ? (el.closest('label, form') || el) : el;
    const r = box.getBoundingClientRect();
    if (r.width < MIN_TARGET_PX - 0.5 || r.height < MIN_TARGET_PX - 0.5) out.targets.push(`${label(el)} ${Math.round(r.width)}×${Math.round(r.height)} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}"`);
  }

  // chars per line ≈ width / average glyph width of the element's own font
  const probe = document.createElement('span');
  probe.textContent = 'abcdefghijklmnopqrstuvwxyz the quick brown fox ';
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
  document.body.appendChild(probe);
  for (const el of document.querySelectorAll('main p, main li, main dd')) {
    if (!visible(el) || el.textContent.trim().length < 160) continue;
    if (el.closest('pre, table, nav')) continue;
    if (el.querySelector('p, div, ul, ol, table, pre')) continue;   // a wrapper: its children are measured instead
    probe.style.font = getComputedStyle(el).font;
    const cw = probe.getBoundingClientRect().width / probe.textContent.length;
    const cpl = Math.round(el.getBoundingClientRect().width / cw);
    if (cpl > MAX_CHARS_PER_LINE) out.measure.push(`${label(el)} ≈${cpl} chars/line`);
  }
  probe.remove();
  return out;
}

const browser = await chromium.launch();
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const p of PAGES) {
    const where = `${width}px ${p || '/'}`;
    try { await page.goto(BASE_URL + p, { waitUntil: 'networkidle', timeout: 20_000 }); }
    catch (e) { fail('load', where, e.message.split('\n')[0]); continue; }
    const r = await page.evaluate(audit, { MIN_TEXT_PX, MIN_TARGET_PX, MAX_CHARS_PER_LINE });
    if (r.hscroll) fail('horizontal scroll', where, r.hscroll);
    for (const t of r.tiny.slice(0, 8)) fail(`text < ${MIN_TEXT_PX}px`, where, t);
    for (const t of r.targets.slice(0, 8)) fail(`target < ${MIN_TARGET_PX}px`, where, t);
    if (width >= 820) for (const t of r.measure.slice(0, 5)) fail(`measure > ${MAX_CHARS_PER_LINE}`, where, t);
  }
  await ctx.close();
}
await browser.close();

if (failures.length) {
  const byCheck = Object.groupBy(failures, (f) => f.check);
  console.error(`ui-check: ${failures.length} failure(s) over ${PAGES.length} pages × ${WIDTHS.length} widths (${BASE_URL})\n`);
  for (const [check, list] of Object.entries(byCheck)) {
    console.error(`✗ ${check} (${list.length})`);
    for (const f of list.slice(0, SHOW)) console.error(`    ${f.where}: ${f.detail}`);
    if (list.length > SHOW) console.error(`    … and ${list.length - 30} more`);
  }
  process.exit(1);
}
console.log(`ui-check: ✓ ${PAGES.length} pages × ${WIDTHS.length} widths — no horizontal scroll, no text < ${MIN_TEXT_PX}px, targets ≥ ${MIN_TARGET_PX}px, running text ≤ ${MAX_CHARS_PER_LINE} chars/line`);
