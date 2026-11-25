// Build-emitted data for the ⌘K palette (lib/palette.js): every topic with the
// first clause of our pick, and every tracked package with how it sits against
// that pick — the same fit() rule Check my app uses, decided here at build time.
import { corpus, doctorData, siteMeta } from '../lib/corpus.js';
import { fit } from '../lib/doctor-core.js';
import { groupOf, groupLabel } from '../lib/entry.js';

const firstClause = (s) => String(s || '').split(/\.\s|;|\s—\s/)[0].trim();

export async function GET() {
  const { entries } = corpus();
  const { caps } = doctorData();
  const topics = entries.map((e) => ({ slug: e.slug, topic: e.topic, group: groupLabel(groupOf(e)), pick: firstClause(e.recommend?.default) }));
  const seen = new Set();
  const packages = entries.flatMap((e) => (e.detect || [])
    .filter((d) => !d.pkg.includes('*') && !seen.has(d.pkg) && seen.add(d.pkg))
    .map((d) => ({ pkg: d.pkg, label: d.label, slug: e.slug, fit: d.token ? fit(caps[e.id], [d.token])[0] : '↗' })));
  return new Response(JSON.stringify({ v: siteMeta().version, topics, packages }), { headers: { 'content-type': 'application/json' } });
}
