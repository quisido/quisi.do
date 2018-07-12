import { mapUnknownToString } from 'fmrs';
import mapObjectToEntries from '../../../utils/map-object-to-entries.js';
import sortEntriesByKey from '../../../utils/sort-entries-by-key.js';

export default function mapDimensionsToFingerprints(
  dimensions: Record<string, unknown>,
): readonly string[] {
  const fingerprints: string[] = [];

  const entries: [string, unknown][] = mapObjectToEntries(dimensions);
  entries.sort(sortEntriesByKey);
  for (const [key, value] of entries) {
    fingerprints.push(key);
    fingerprints.push(mapUnknownToString(value));
  }

  return fingerprints;
}
