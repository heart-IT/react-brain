// Build-emitted data for the in-browser doctor. Fetched on the first Analyze, so
// the doctor page itself ships no corpus bytes (it used to inline ~100 KB of
// detectors/caps/migrations). Same doctorData() the homepage demo is built from.
import { doctorData, siteMeta } from '../lib/corpus.js';

export async function GET() {
  const { detectors, caps, migrations } = doctorData();
  const { version, verifiedLatest } = siteMeta();
  return new Response(JSON.stringify({ v: version, verified: verifiedLatest, detectors, caps, migrations }),
    { headers: { 'content-type': 'application/json' } });
}
