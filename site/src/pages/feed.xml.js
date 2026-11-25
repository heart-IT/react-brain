// Atom feed of corpus changes — one entry per day, from the same git history as
// changelog/. The static-site stand-in for "email me when something changes".
import { changelog, siteMeta, href } from '../lib/corpus.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function GET({ site }) {
  const abs = (p) => new URL(href(p), site).href;
  const days = changelog(80);
  const updated = `${days[0]?.date || siteMeta().built}T00:00:00Z`;
  const entries = days.map((d) => `  <entry>
    <id>${abs('changelog/')}#${d.date}</id>
    <title>Corpus changes on ${d.date}</title>
    <updated>${d.date}T00:00:00Z</updated>
    <link rel="alternate" href="${abs('changelog/')}"/>
    <content type="html">${esc(`<ul>${d.subjects.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`)}</content>
  </entry>`).join('\n');
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${abs('')}</id>
  <title>react-brain — what changed</title>
  <subtitle>Changes to react-brain's React and React Native picks and verified facts.</subtitle>
  <updated>${updated}</updated>
  <author><name>react-brain</name></author>
  <link rel="self" href="${abs('feed.xml')}"/>
  <link rel="alternate" href="${abs('changelog/')}"/>
${entries}
</feed>
`;
  return new Response(xml, { headers: { 'content-type': 'application/atom+xml' } });
}
