import type { AnalyticsEngineRow } from 'cloudflare-utils';
import { not } from 'fmrs';
import { type Datum } from './datum.js';
import { findEmptyString } from './is-empty-string.js';
import { findZero } from './is-zero.js';
import mapRowToBlobs from './map-row-to-blobs.js';
import mapRowToDoubles from './map-row-to-doubles.js';

const ARRAY_INDEX_OFFSET = 1;
const FIRST = 0;

export default function mapRowToDatum(row: AnalyticsEngineRow): Datum {
  const blobs: readonly string[] = mapRowToBlobs(row);
  const doubles: readonly number[] = mapRowToDoubles(row);
  const lastBlobIndex: number = blobs.findLastIndex(not(findEmptyString));
  const lastDoubleIndex: number = doubles.findLastIndex(not(findZero));
  return {
    numbers: doubles.slice(FIRST, lastDoubleIndex + ARRAY_INDEX_OFFSET),
    strings: blobs.slice(FIRST, lastBlobIndex + ARRAY_INDEX_OFFSET),
    timestamp: new Date(row.timestamp).getTime(),
  };
}
