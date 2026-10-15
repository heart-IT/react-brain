// The react-brain console (⌘J / Ctrl-J, or the footer "console" link) — the
// terminal identity, made functional. Plain script (no modules), loaded with
// `defer` from Base.astro so it is cached once instead of inlined on every page.
// BASE comes from <body data-base="…"> (the site's base path, ends with '/').
// Corpus data is fetched lazily from console-data.json on first use.
(() => {
  const BASE = document.body.dataset.base || '/';
  const $ = (id) => document.getElementById(id);
  const box = $('console'), out = $('c-out'), input = $('c-in'), promptEl = $('c-prompt');
  let DATA = null, lastFocus = null, histIdx = -1;
  const history = [];
  const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CTX_KEY = 'rb-console-ctx';
  const ctx = () => { try { return JSON.parse(localStorage.getItem(CTX_KEY)); } catch { return null; } };
  // the ⌘ glyph is Mac-only; elsewhere the same shortcuts are Ctrl-based
  const MAC = /Mac|iPhone|iPad/.test(navigator.platform);
  const KEY_J = MAC ? '⌘J' : 'Ctrl J', KEY_K = MAC ? '⌘K' : 'Ctrl K';
  const SEARCH_LINE = `${KEY_K} focuses site search (full text + question routing); this console is for commands`;
  const setPrompt = () => { const c = ctx(); promptEl.textContent = c ? `~/${c.name} ❯` : '❯'; };

  async function ensureData() {
    if (DATA) return DATA;
    print('<span class="t-dim">loading corpus…</span>');
    DATA = await (await fetch(`${BASE}console-data.json`)).json();
    out.lastChild?.remove();
    return DATA;
  }

  function print(html, cmd) {
    if (cmd != null) {
      const c = document.createElement('div');
      c.className = 'c-cmd'; c.textContent = `${promptEl.textContent} ${cmd}`;
      out.appendChild(c);
    }
    if (html) { const d = document.createElement('div'); d.className = 'c-res'; d.innerHTML = html; out.appendChild(d); }
    out.scrollTop = out.scrollHeight;
  }

  function open() {
    lastFocus = document.activeElement;
    box.hidden = false; setPrompt(); input.focus();
    if (!out.childElementCount) print('<span class="t-dim">react-brain console — try <b>ask should I use zustand</b> · <b>doctor</b> (after <b>load</b>) · <b>query maps</b> · <b>help</b> for everything. ' + KEY_J + ' toggles, esc closes.<br>' + SEARCH_LINE + '.</span>');
  }
  function close() { box.hidden = true; lastFocus?.focus?.(); }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'j') { e.preventDefault(); box.hidden ? open() : close(); }
    else if (e.key === 'Escape' && !box.hidden) close();
  });
  for (const a of document.querySelectorAll('[data-open-console]'))
    a.addEventListener('click', (e) => { e.preventDefault(); open(); });
  box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('console-scrim')) close(); });
  // aria-modal promises focus stays inside: wrap Tab / Shift-Tab around the dialog's focusables
  box.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = [...box.querySelectorAll('a[href], button, input, textarea, [tabindex="0"]')].filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { if (history.length) { histIdx = Math.max(0, (histIdx < 0 ? history.length : histIdx) - 1); input.value = history[histIdx]; e.preventDefault(); } }
    if (e.key === 'ArrowDown') { if (histIdx >= 0) { histIdx = Math.min(history.length, histIdx + 1); input.value = history[histIdx] || ''; e.preventDefault(); } }
  });

  // ── ports of the corpus primitives (same semantics as tools/detect.mjs) ──
  const matchDetector = (name, dets) => {
    for (const d of dets) {
      const p = d[0];
      if (p.endsWith('*')) { if (name.startsWith(p.replace(/\*$/, ''))) return d; }
      else if (name === p) return d;
    }
    return null;
  };
  const resolve = (e, tokens) => {
    const t = tokens.map((x) => x.toLowerCase());
    for (const clause of e.when || []) {
      const i = clause.indexOf('→'); if (i < 0) continue;
      if (t.some((tok) => clause.slice(0, i).toLowerCase().includes(tok)))
        return { why: clause.slice(i + 1).trim(), ctx: clause.slice(0, i).trim(), via: 'when' };
    }
    return { why: e.def, ctx: 'default', via: 'default' };
  };
  const fit = (e, tokens) => {
    const def = (e.def || '').toLowerCase(), when = (e.when || []).join('||').toLowerCase();
    if (tokens.some((x) => def.includes(x))) return '✓ aligned';
    if (tokens.some((x) => when.includes(x))) return '~ contextual';
    return '↗ review';
  };
  const searchTop = (terms, entries, max = 3) => {
    const q = terms.join(' ').toLowerCase().replace(/^rb-e-/, '');
    return Object.values(entries).map((e) => {
      const id = e.id.replace('RB-E-', '').toLowerCase();
      const hay = [e.id, e.slug, e.topic, JSON.stringify(e.options), e.def].join(' ').toLowerCase();
      let s = 0;
      if (id === q || e.slug === q) s += 100;
      if (id.includes(q) || e.topic.toLowerCase().includes(q)) s += 20;
      for (const t of terms) if (hay.includes(t.toLowerCase())) s += 3;
      return [s, e];
    }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, max).map((x) => x[1]);
  };
  const ctxTokens = (c) => {
    const t = [];
    if (!c) return ['new project'];
    if (c.platform === 'react-native') t.push(c.expo ? 'expo app' : 'bare rn');
    if (c.expo) t.push('expo');
    if (c.p2p) t.push('p2p', 'holepunch', 'serverless');
    t.push(c.stage);
    return t;
  };
  const entryHtml = (e, c) => {
    const mine = c?.byEntry?.[e.id];
    return `<div class="c-entry"><b><a href="${BASE}entries/${e.slug}/">${e.slug}</a></b> <span class="badge ${e.status}">${e.status}</span> <span class="badge ${e.confidence}">${e.confidence}</span> <span class="t-dim">verified ${e.updated}</span>` +
      (mine ? `<br><span class="t-dim">in ~/${esc(c.name)}: ${esc(mine.labels.join(', '))} — ${fit(e, mine.tokens)}</span>` : '') +
      `<br>${esc(e.def)}` +
      (e.when?.length ? '<br>' + e.when.map((w) => `<span class="t-dim">· ${esc(w)}</span>`).join('<br>') : '') + '</div>';
  };

  const PAGES = ['entries', 'libraries', 'reading', 'stack', 'doctor', 'decide', 'scorecard', 'benchmark', 'census', 'architecture', 'changelog', 'methodology', 'roadmap', 'search'];

  async function exec(line) {
    const [cmd, ...args] = line.trim().split(/\s+/);
    const arg = args.join(' ');
    const c = ctx();
    switch ((cmd || '').toLowerCase()) {
      case 'help':
        print(`<span class="t-dim">ask &lt;question&gt; route a question to the entry + readings that answer it
query &lt;topic&gt;   the verified entry, inline
go &lt;page|entry&gt; navigate (${PAGES.slice(0, 5).join(' · ')} …)
search &lt;q&gt;      full-text search
stack [--rn|--web] [--expo] [--p2p] [--stage=x]
doctor          fit report for the loaded repo
decide &lt;topic&gt;  decision record for the loaded repo
load / unload   set the session repo (paste package.json) / clear
context · clear · help

${SEARCH_LINE}</span>`); break;
      case 'clear': out.replaceChildren(); break;
      case 'go': {
        const t = (args[0] || '').toLowerCase().replace(/\/$/, '');
        if (!t) { print('<span class="t-warn">go where? try: go scorecard</span>'); break; }
        if (t === 'home') { location.href = BASE; break; }
        if (PAGES.includes(t)) { location.href = `${BASE}${t}/`; break; }
        const D = await ensureData();
        const hit = D.entries[`RB-E-${t.toUpperCase()}`] || Object.values(D.entries).find((e) => e.slug === t);
        if (hit) location.href = `${BASE}entries/${hit.slug}/`;
        else print(`<span class="t-warn">unknown page: ${esc(t)}</span>`);
        break;
      }
      case 'search': location.href = `${BASE}search/?q=${encodeURIComponent(arg)}`; break;
      case 'query': case 'q': {
        if (!arg) { print('<span class="t-warn">query what? try: query maps</span>'); break; }
        const D = await ensureData();
        const hits = searchTop(args, D.entries);
        print(hits.length ? hits.map((e) => entryHtml(e, c)).join('') : `<span class="t-warn">no entry matches — try</span> <a href="${BASE}search/?q=${encodeURIComponent(arg)}">search ${esc(arg)}</a>`);
        break;
      }
      case 'ask': {
        // deterministic question routing (the site-side of the CLI's searchReadings):
        // lexical scoring over every reading's title + annotation + tagged claim —
        // grounded and zero-cost, not a chat model.
        if (!arg) { print('<span class="t-warn">ask what? try: ask should I use zustand</span>'); break; }
        const D = await ensureData();
        const STOP = new Set('the a an is are was be my our your this that these of in on at to for and or but with without after before does do did how why what when where which it its as from by not no so if then than can could should would use using i we you'.split(' '));
        const toks = [...new Set(arg.toLowerCase().split(/\s+/).map((t) => t.replace(/[^\w-]/g, '')).filter((t) => t.length > 2 && !STOP.has(t)))];
        const stem = (t) => (t.length > 3 && t.endsWith('s') ? t.slice(0, -1) : t);
        const reads = (D.readings || []).map((r) => {
          const text = `${r.title} ${r.what} ${r.claim || ''}`.toLowerCase();
          let s = 0, h = 0;
          for (const t of toks) { const tf = text.split(stem(t)).length - 1; if (tf) { h++; s += Math.min(tf, 3); } }
          return { r, s, h };
        }).filter((x) => x.h >= Math.min(2, toks.length)).sort((a, b) => b.s - a.s).slice(0, 3);
        const ents = searchTop(args, D.entries).slice(0, 1);
        if (!ents.length && !reads.length) { print(`<span class="t-warn">nothing matched — try</span> <a href="${BASE}search/?q=${encodeURIComponent(arg)}">search ${esc(arg)}</a>`); break; }
        let html = ents.map((e) => entryHtml(e, c)).join('');
        if (reads.length) html += '<div class="c-entry"><span class="t-dim">readings that answer this:</span><br>' +
          reads.map(({ r }) => `· <a href="${r.url}" rel="noopener">${esc(r.title)}</a> <span class="t-dim">[<a href="${BASE}entries/${r.slug}/">${r.slug}</a>]</span><br><span class="t-dim">&nbsp;&nbsp;${esc((r.claim || r.what).slice(0, 220))}${(r.claim || r.what).length > 220 ? '…' : ''}</span>`).join('<br>') + '</div>';
        print(html);
        break;
      }
      case 'stack': {
        const D = await ensureData();
        const has = (f) => args.includes(f);
        const platform = has('--rn') ? 'react-native' : has('--web') ? 'react' : 'both';
        const stage = (args.find((a) => a.startsWith('--stage=')) || '--stage=mvp').split('=')[1];
        const tokens = ['new project'];
        if (platform === 'react-native') tokens.push(has('--expo') ? 'expo app' : 'bare rn');
        if (has('--expo')) tokens.push('expo');
        if (has('--p2p')) tokens.push('p2p', 'holepunch', 'serverless');
        const rank = D.stageRank;
        const rows = D.recipe.filter((row) =>
          (row.plat === 'any' || (row.plat === 'both' ? platform === 'both' : row.plat === 'rn' ? platform !== 'react' : platform !== 'react-native')) &&
          rank[row.tier] <= rank[stage] && (row.onlyIf !== 'p2p' || has('--p2p')));
        print(rows.map((row) => {
          const e = D.entries[row.id]; if (!e) return '';
          const r = resolve(e, tokens);
          return `<div class="c-entry"><b><a href="${BASE}entries/${e.slug}/">${e.slug}</a></b> <span class="t-dim">${r.via === 'when' ? 'matched: ' + esc(r.ctx) : 'default'}</span><br>${esc(r.why)}</div>`;
        }).join(''));
        break;
      }
      case 'load': {
        print('<span class="t-dim">paste a package.json below and press ⌘/ctrl+enter (or esc to cancel):</span>');
        const ta = document.createElement('textarea');
        ta.rows = 6; ta.className = 'c-paste'; ta.setAttribute('aria-label', 'package.json');
        out.appendChild(ta); ta.focus(); out.scrollTop = out.scrollHeight;
        ta.addEventListener('keydown', async (e) => {
          if (e.key === 'Escape') { e.stopPropagation(); ta.remove(); input.focus(); }
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            try {
              const pkg = JSON.parse(ta.value);
              const D = await ensureData();
              const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
              const byEntry = {};
              for (const n of Object.keys(deps)) {
                const d = matchDetector(n, D.detectors);
                if (d) { (byEntry[d[1]] ||= { labels: [], tokens: [] }); if (!byEntry[d[1]].labels.includes(d[2])) byEntry[d[1]].labels.push(d[2]); if (d[3]) byEntry[d[1]].tokens.push(d[3]); }
              }
              const rn = 'react-native' in deps || 'expo' in deps;
              const score = [!!pkg.scripts?.test, 'typescript' in deps, ['eslint', '@biomejs/biome', 'prettier'].some((x) => x in deps), ['husky', 'lefthook'].some((x) => x in deps), pkg.private === true, (parseInt(pkg.version, 10) || 0) >= 1].filter(Boolean).length;
              const c2 = { name: pkg.name || 'app', deps: Object.keys(deps).length,
                platform: rn && 'react-dom' in deps ? 'both' : rn ? 'react-native' : 'react',
                expo: 'expo' in deps, p2p: Object.keys(deps).some((d) => /^hyper|^autobase$|^corestore$|^hrpc$/.test(d)),
                stage: score <= 1 ? 'prototype' : score <= 3 ? 'mvp' : 'production', byEntry };
              localStorage.setItem(CTX_KEY, JSON.stringify(c2));
              ta.remove(); setPrompt();
              print(`<span class="t-ok">loaded ~/${esc(c2.name)}</span> <span class="t-dim">${c2.platform} · ${c2.stage} · ${c2.deps} deps · ${Object.keys(byEntry).length} decisions detected — try <b>doctor</b></span>`);
              input.focus();
            } catch { print('<span class="t-warn">not valid JSON</span>'); }
          }
        });
        break;
      }
      case 'unload': localStorage.removeItem(CTX_KEY); setPrompt(); print('<span class="t-dim">session cleared</span>'); break;
      case 'context':
        print(c ? `<span class="t-dim">~/${esc(c.name)} — ${c.platform} · ${c.stage} · ${c.deps} deps · ${Object.keys(c.byEntry).length} decisions</span>` : '<span class="t-dim">no repo loaded — try <b>load</b></span>');
        break;
      case 'doctor': {
        if (!c) { print('<span class="t-warn">no repo loaded — run <b>load</b> first (or use</span> <a href="' + BASE + 'doctor/">the doctor page</a><span class="t-warn">)</span>'); break; }
        const D = await ensureData();
        const rows = Object.keys(c.byEntry).map((id) => {
          const e = D.entries[id]; if (!e) return '';
          const f = fit(e, c.byEntry[id].tokens);
          const cls = f.startsWith('✓') ? 't-ok' : f.startsWith('~') ? 't-warn' : 't-dim';
          return `  <a href="${BASE}entries/${e.slug}/">${e.slug.padEnd(14)}</a> ${esc(c.byEntry[id].labels.join(', ')).padEnd(28)} <span class="${cls}">${f}</span>`;
        }).filter(Boolean);
        print(`<pre class="c-pre">~/${esc(c.name)} · ${c.platform} · ${c.stage}\n\n${rows.join('\n')}\n\n<span class="t-dim">full report incl. gaps + source signals: npx -y @heart-it/react-brain doctor .</span></pre>`);
        break;
      }
      case 'decide': {
        if (!arg) { print('<span class="t-warn">decide what? try: decide state</span>'); break; }
        const D = await ensureData();
        const hits = searchTop(args, D.entries, 1);
        if (!hits.length) { print(`<span class="t-warn">no entry matches ${esc(arg)}</span>`); break; }
        const e = hits[0];
        const tokens = ctxTokens(c);
        const r = resolve(e, tokens);
        const mine = c?.byEntry?.[e.id];
        const today = new Date().toISOString().slice(0, 10);
        const L = ['---',
          'adr: 0                      # renumber to the next NNN in your docs/adr/',
          'title: ' + JSON.stringify(e.topic),
          'status: proposed            # -> accepted | superseded (edit after team review)',
          'date: ' + today,
          'react_brain:                # machine-readable premises - react-brain doctor re-checks these',
          '  entry: ' + e.id,
          '  entry_status: ' + e.status,
          '  confidence: ' + e.confidence,
          '  entry_updated: ' + e.updated,
          '  resolved_via: ' + r.via];
        if (r.via === 'when') L.push('  matched_context: ' + JSON.stringify(r.ctx));
        L.push('  prediction_check_by: ' + (e.check_by || 'null'),
          '  corpus_version: ' + D.v,
          '---', '', '# ' + e.topic, '', '## Context', '',
          c ? 'Decided for **' + c.name + '** (' + c.platform + ' · ' + c.stage + ' stage).' + (mine ? ' Current choice detected: **' + mine.labels.join(', ') + '**.' : ' Nothing detected for this domain yet.') : 'Decided without a repo context (run load in the console to add one).',
          'Context tokens resolved against the corpus: ' + tokens.join(', ') + '.',
          '', '## Decision', '', r.why, '',
          r.via === 'when' ? '*(Resolved via the context clause: "' + r.ctx + ' -> ...")*' : "*(Resolved via the entry's default - no context clause overrode it.)*",
          '', '## Options considered', '', '| option | tradeoff |', '|---|---|');
        for (const o of e.options) L.push('| **' + o.name + '** | ' + String(o.tradeoff).split('|').join('\\|') + ' |');
        L.push('', '## Evidence', '',
          '- **Corpus entry:** ' + e.id + ' (' + e.status + ' · ' + e.confidence + ', verified ' + e.updated + ')');
        if (e.verdict) L.push('- **Track record:** prediction resolved **' + e.verdict + '**.');
        if (e.note) L.push('- **Verified notes:** ' + e.note);
        if (e.sources.length) { L.push('- **Primary sources:**'); for (const u of e.sources) L.push('  - ' + u); }
        if (e.reading.length) { L.push('- **Canonical reading:**'); for (const x of e.reading) L.push('  - [' + x.title + '](' + x.url + ')' + (x.by ? ' - ' + x.by : '')); }
        L.push('', '## Review by', '',
          '**' + (e.check_by || "the entry's next corpus verification") + '** - or earlier if react-brain doctor flags moved premises.',
          '', '---',
          '*Generated by react-brain v' + D.v + ' on ' + today + '. Re-check premises: npx -y @heart-it/react-brain doctor . --ci*');
        const md = L.join('\n');
        const wrap = document.createElement('div'); wrap.className = 'c-res';
        const bar = document.createElement('div');
        const cp = document.createElement('button'); cp.type = 'button'; cp.className = 'ghost c-btn'; cp.textContent = 'copy';
        cp.addEventListener('click', async () => { await navigator.clipboard.writeText(md); cp.textContent = '✓'; setTimeout(() => (cp.textContent = 'copy'), 1200); });
        const dl = document.createElement('a'); dl.className = 'btn ghost c-btn'; dl.textContent = 'download .md';
        dl.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
        dl.download = 'NNN-' + e.slug + '.md';
        bar.append(cp, dl);
        const pre = document.createElement('pre'); pre.className = 'c-pre wrap'; pre.textContent = md;
        wrap.append(bar, pre);
        out.appendChild(wrap); out.scrollTop = out.scrollHeight;
        break;
      }
      case 'bench': location.href = `${BASE}benchmark/`; break;
      case '': break;
      default:
        print(`<span class="t-warn">unknown: ${esc(cmd)}</span> <span class="t-dim">— try <b>help</b>, or</span> <a href="${BASE}search/?q=${encodeURIComponent(line)}">search “${esc(line)}”</a>`);
    }
  }

  $('c-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const line = input.value; input.value = ''; histIdx = -1;
    if (line.trim()) { history.push(line); print(null, line); await exec(line); }
  });
  setPrompt();
})();
