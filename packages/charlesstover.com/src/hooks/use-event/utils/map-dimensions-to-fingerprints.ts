import mapUnknownToString from 'unknown2string';
import mapObjectToEntries from '../../../utils/map-object-to-entries';
import sortEntriesByKey from '../../../utils/sort-entries-by-key';

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
