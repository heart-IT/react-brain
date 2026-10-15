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
// Every page in the sitemap (plus the two routes it cannot list), each in its loaded
// state — and the pages that render on interaction get a second pass in that state.
const FALLBACK_PAGES = ['', 'entries/', 'entries/state/', 'doctor/', 'decide/', 'stack/', 'libraries/', 'reading/', 'scorecard/', 'methodology/', 'census/', 'benchmark/', 'newsletter/'];
async function listPages() {
  try {
    const xml = await (await fetch(BASE_URL + 'sitemap.xml')).text();
    const base = new URL(BASE_URL).pathname;
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => p.startsWith(base)).map((p) => p.slice(base.length));
    if (locs.length) return [...new Set([...locs, 'search/?q=zustand', '404.html'])];
  } catch {}
  return [...FALLBACK_PAGES, 'search/?q=zustand', '404.html'];
}
const STATES = {
  'doctor/': { label: 'after sample run', run: async (page) => { await page.click('#sample'); await page.waitForSelector('#out table', { timeout: 10_000 }); } },
  'decide/': { label: 'after generate', run: async (page) => { await page.click('#gen'); await page.waitForSelector('#out pre', { timeout: 10_000 }); } },
  '': { label: 'console open', run: async (page) => { await page.keyboard.press('Control+J'); await page.waitForSelector('#console:not([hidden])', { timeout: 5_000 }); await page.keyboard.type('help'); await page.keyboard.press('Enter'); await page.waitForTimeout(300); } },
};
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
    // an <a> that flows inline inside running text is exempt (WCAG 2.5.8 "inline"
    // exception); a block/inline-block link inside a list item is a target of its own
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p, li, td, dd, h1, h2, h3, figcaption, pre, nav[aria-label="Breadcrumb"]')) continue;
    if (el.type === 'checkbox' || el.type === 'radio') continue;   // the <label> is the target
    // a text field inside a padded <label>/<form> wrapper: the wrapper is what you tap
    const box = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ? (el.closest('label, form') || el) : el;
    const r = box.getBoundingClientRect();
    if (r.width < MIN_TARGET_PX - 0.5 || r.height < MIN_TARGET_PX - 0.5) out.targets.push(`${label(el)} ${Math.round(r.width)}×${Math.round(r.height)} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}"`);
  }

  // lines as actually laid out: every word's first client rect is grouped by its top
  // edge, characters (plus a space) summed per line
  const longestLine = (el) => {
    const lines = new Map();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent;
      for (const m of text.matchAll(/\S+/g)) {
        const r = document.createRange();
        r.setStart(node, m.index); r.setEnd(node, m.index + m[0].length);
        const rect = r.getClientRects()[0];
        if (!rect) continue;
        const top = Math.round(rect.top);
        lines.set(top, (lines.get(top) || 0) + m[0].length + 1);
      }
    }
    // the measure is a typographic average: a single line of narrow glyphs (i, l, spaces)
    // can hold 90+ characters inside a correct 56ch column, so judge the mean of the
    // full lines (the last, ragged line is excluded)
    const full = [...lines.values()].slice(0, -1);
    return full.length ? Math.round(full.reduce((a, b) => a + b, 0) / full.length) - 1 : 0;
  };
  for (const el of document.querySelectorAll('main p, main li, main dd')) {
    if (!visible(el) || el.textContent.trim().length < 160) continue;
    if (el.closest('pre, table, nav')) continue;
    if (el.querySelector('p, div, ul, ol, table, pre')) continue;   // a wrapper: its children are measured instead
    const cpl = longestLine(el);
    if (cpl > MAX_CHARS_PER_LINE) out.measure.push(`${label(el)} averages ${cpl} chars/line`);
  }
  return out;
}

const PAGES = await listPages();
const browser = await chromium.launch();
const runAudit = async (page, where, width) => {
  const r = await page.evaluate(audit, { MIN_TEXT_PX, MIN_TARGET_PX, MAX_CHARS_PER_LINE });
  if (r.hscroll) fail('horizontal scroll', where, r.hscroll);
  for (const t of r.tiny) fail(`text < ${MIN_TEXT_PX}px`, where, t);
  for (const t of r.targets) fail(`target < ${MIN_TARGET_PX}px`, where, t);
  if (width >= 820) for (const t of r.measure) fail(`measure > ${MAX_CHARS_PER_LINE}`, where, t);
};
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const p of PAGES) {
    const where = `${width}px ${p || '/'}`;
    try { await page.goto(BASE_URL + p, { waitUntil: 'networkidle', timeout: 20_000 }); }
    catch (e) { fail('load', where, e.message.split('\n')[0]); continue; }
    await runAudit(page, where, width);
    const state = STATES[p];
    if (state) {
      try { await state.run(page); await runAudit(page, `${where} (${state.label})`, width); }
      catch (e) { fail('state', `${where} (${state.label})`, e.message.split('\n')[0]); }
    }
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
    if (list.length > SHOW) console.error(`    … and ${list.length - SHOW} more`);
  }
  process.exit(1);
}
console.log(`ui-check: ✓ ${PAGES.length} pages (+${Object.keys(STATES).length} interaction states) × ${WIDTHS.length} widths — no horizontal scroll, no text < ${MIN_TEXT_PX}px, targets ≥ ${MIN_TARGET_PX}px, running text ≤ ${MAX_CHARS_PER_LINE} chars/line`);
