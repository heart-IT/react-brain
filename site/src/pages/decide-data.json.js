// Build-emitted data for the decision-record generator. Fetched on the first
// "Generate record", so decide/ itself ships only the <select> (it used to inline
// the whole corpus slice, ~240 KB, via define:vars). Same pattern as doctor-data.json.
import { decideData } from '../lib/corpus.js';

export async function GET() {
  return new Response(JSON.stringify(decideData()), { headers: { 'content-type': 'application/json' } });
}
