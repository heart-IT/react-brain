// Build-emitted data for compare/: per topic, its options with tradeoffs, our
// pick, the when-clauses, and the same per-option evidence the entry page shows
// (npm weekly downloads, production-app census). Fetched once by the page.
import { corpus, siteMeta } from '../lib/corpus.js';
import { leadOption, optionEvidence, splitWhen } from '../lib/entry.js';

const namedIn = (o, def) => String(o.name).toLowerCase().replace(/\s*\(.*?\)/g, '').split(/\s*[/+]\s*/)
  .map((n) => n.trim()).filter((n) => n.length > 2).some((n) => new RegExp(`(^|[^a-z])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(def));

export async function GET() {
  const { entries } = corpus();
  const topics = entries.filter((e) => (e.options || []).length >= 2).map((e) => {
    const lead = leadOption(e);
    const def = String(e.recommend?.default || '').toLowerCase();
    const ev = optionEvidence(e);
    return {
      slug: e.slug, topic: e.topic, def: e.recommend?.default || '',
      when: (e.recommend?.when || []).map(splitWhen),
      // lead = the first option our pick names. Others it names may be co-picks
      // ("TanStack Query + Zustand") or exclusions ("…unless X") — flagged, not judged
      options: e.options.map((o, i) => ({ name: o.name, tradeoff: o.tradeoff || '', lead: o === lead, named: o !== lead && namedIn(o, def), ev: ev[i] })),
    };
  });
  return new Response(JSON.stringify({ v: siteMeta().version, topics }), { headers: { 'content-type': 'application/json' } });
}
