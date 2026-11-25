// Web app manifest — base-aware, so the installed app opens at this deployment's root.
import { href } from '../lib/corpus.js';

export function GET() {
  const icon = (f, size, purpose = 'any') => ({ src: href(f), sizes: `${size}x${size}`, type: 'image/png', purpose });
  return new Response(JSON.stringify({
    name: 'react-brain — React decisions, with receipts',
    short_name: 'react-brain',
    description: 'Check your React or React Native app, pick libraries, and see the evidence behind every recommendation.',
    id: href(''), start_url: href(''), scope: href(''),
    display: 'standalone', background_color: '#0A0A0A', theme_color: '#0A0A0A',
    icons: [icon('icon-192.png', 192), icon('icon-512.png', 512), icon('icon-512-maskable.png', 512, 'maskable')],
    shortcuts: [
      { name: 'Check my app', url: href('doctor/') },
      { name: 'Compare options', url: href('compare/') },
      { name: 'Topics', url: href('entries/') },
    ],
  }, null, 2), { headers: { 'content-type': 'application/manifest+json' } });
}
