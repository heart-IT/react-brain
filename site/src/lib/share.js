// Static-hosting stand-ins for a backend (the site runs on GitHub Pages):
//  - share links carry the manifest IN the URL fragment, deflated + base64url —
//    the fragment never reaches a server, so a shared report uploads nothing
//  - GitHub import reads a public repo's package.json from raw.githubusercontent.com
//    (CORS *, and the HEAD ref resolves to the default branch)

const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function pipe(bytes, stream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

// "z." = deflate-raw (every current browser); "j." = plain, for anything without CompressionStream
export async function encodeReport(pkg) {
  const json = new TextEncoder().encode(JSON.stringify(pkg));
  if (typeof CompressionStream === 'function') return 'z.' + b64url(await pipe(json, new CompressionStream('deflate-raw')));
  return 'j.' + b64url(json);
}

export async function decodeReport(token) {
  const [kind, data] = [token.slice(0, 2), token.slice(2)];
  const bytes = unb64url(data);
  const json = kind === 'z.' ? await pipe(bytes, new DecompressionStream('deflate-raw')) : bytes;
  return JSON.parse(new TextDecoder().decode(json));
}

// the fragment parameter a share link uses: …/doctor/#r=<token>
export const reportFromHash = () => new URLSearchParams(location.hash.slice(1)).get('r');

// "owner/repo", "github.com/owner/repo", ".../tree/<ref>/<dir>", ".../blob/<ref>/<dir>/package.json"
export function parseRepo(input) {
  const s = String(input).trim().replace(/^https?:\/\//, '').replace(/^(www\.)?github\.com\//, '').replace(/\.git$/, '').replace(/\/+$/, '');
  const m = s.match(/^([\w.-]+)\/([\w.-]+)(?:\/(?:tree|blob)\/([^/]+)(?:\/(.*))?)?$/);
  if (!m) return null;
  const dir = (m[4] || '').replace(/(^|\/)package\.json$/, '').replace(/\/+$/, '');
  return { owner: m[1], repo: m[2], ref: m[3] || 'HEAD', dir };
}

export const repoLabel = (r) => `${r.owner}/${r.repo}${r.dir ? `/${r.dir}` : ''}`;

export async function fetchManifest(r) {
  const url = `https://raw.githubusercontent.com/${r.owner}/${r.repo}/${r.ref}/${r.dir ? r.dir + '/' : ''}package.json`;
  const res = await fetch(url, { cache: 'no-cache' });
  if (res.status === 404) throw new Error('no package.json there — is the repo public, and is the path right?');
  if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
  try { return JSON.parse(await res.text()); } catch { throw new Error('that package.json is not valid JSON'); }
}
