// sitemap.xml — every public route, absolute and base-aware. A plain endpoint
// rather than @astrojs/sitemap: no peer-dependency declaration ties that package
// to astro ^7, and the route list is fully derivable here. Static routes come from
// the page files themselves (so a new page can't be forgotten); dynamic routes
// from the same loaders their getStaticPaths use.
import { corpus, newsletterIssues, href } from '../lib/corpus.js';

const pages = import.meta.glob('./**/*.astro');

export function GET({ site }) {
  const { entries } = corpus();
  const statics = Object.keys(pages)
    .filter((f) => !f.includes('[') && !/\/404\.astro$/.test(f))
    .map((f) => f.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '$1'))
    .map((r) => (r && !r.endsWith('/') ? r + '/' : r));
  const routes = [
    ...statics.map((r) => ({ path: r })),
    ...entries.map((e) => ({ path: `entries/${e.slug}/`, lastmod: String(e.updated || '') })),
    ...newsletterIssues().map((i) => ({ path: `newsletter/${i.slug}/`, lastmod: String(i.date || '') })),
  ];
  const urls = routes.sort((a, b) => a.path.localeCompare(b.path)).map(({ path, lastmod }) =>
    `  <url><loc>${new URL(href(path), site).href}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(lastmod || '') ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'content-type': 'application/xml' } });
}
