// ── argv — the flag shapes every verb shares ───────────────────────────────────
// `--name=value` was parsed inline 17 times across 12 tools, six of them `--today=`
// with a hand-counted `.slice(8)` offset that goes silently wrong the day a flag is
// renamed. One reader, no offsets. An absent flag AND an empty value both fall back,
// which is what every call site's trailing `|| default` already meant.
// ───────────────────────────────────────────────────────────────────────────────

export function flag(argv, name, fallback) {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  const value = hit ? hit.slice(name.length + 3) : '';   // everything after the FIRST '=' — values may contain one
  return value || fallback;
}

// the date every time-travelling tool accepts, so `--today=` means one thing corpus-wide
export const today = (argv) => flag(argv, 'today', new Date().toISOString().slice(0, 10));

// repo paths and other bare words, in the order the user typed them
export const positionals = (argv) => argv.filter((a) => !a.startsWith('--'));
