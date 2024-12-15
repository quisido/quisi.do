import { mapToString, sortEntriesByKey } from 'fmrs';
import mapObjectToEntries from '../../../utils/map-object-to-entries.js';

export default function mapDimensionsToFingerprints(
  dimensions: Record<string, unknown>,
): readonly string[] {
  const fingerprints: string[] = [];

  const entries: [string, unknown][] = mapObjectToEntries(dimensions);
  entries.sort(sortEntriesByKey);
  for (const [key, value] of entries) {
    fingerprints.push(key);
    fingerprints.push(mapToString(value));
  }

  return fingerprints;
}
