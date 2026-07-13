// Build-emitted data island for The Console (⌘K). Fetched lazily on first open —
// the palette costs zero bytes until invoked. One corpus, same data as the pages.
import { decideData, doctorData, corpusInfo, stackData, readingIndex } from '../lib/corpus.js';

export async function GET() {
  const { data, groups } = decideData();
  const { detectors } = doctorData();
  const { recipe, stageRank } = await stackData();
  const info = corpusInfo();
  return new Response(JSON.stringify({
    v: info.version, updated: info.updated, count: info.count,
    groups, entries: data, detectors, recipe, stageRank, readings: readingIndex(),
  }), { headers: { 'content-type': 'application/json' } });
}
