import type { AnalyticsEngineRow } from 'cloudflare-utils';
import { not } from 'fmrs';
import { type Datum } from './datum.js';
import { findEmptyString } from './is-empty-string.js';
import { findZero } from './is-zero.js';

const ARRAY_INDEX_OFFSET = 1;
const FIRST = 0;

export default function mapRowToDatum(row: AnalyticsEngineRow): Datum {
  const blobs: readonly string[] = [
    row.blob1,
    row.blob2,
    row.blob3,
    row.blob4,
    row.blob5,
    row.blob6,
    row.blob7,
    row.blob8,
    row.blob9,
    row.blob10,
    row.blob11,
    row.blob12,
    row.blob13,
    row.blob14,
    row.blob15,
    row.blob16,
    row.blob17,
    row.blob18,
    row.blob19,
    row.blob20,
  ];

  const doubles: readonly number[] = [
    row.double1,
    row.double2,
    row.double3,
    row.double4,
    row.double5,
    row.double6,
    row.double7,
    row.double8,
    row.double9,
    row.double10,
    row.double11,
    row.double12,
    row.double13,
    row.double14,
    row.double15,
    row.double16,
    row.double17,
    row.double18,
    row.double19,
    row.double20,
  ];

  const lastBlobIndex: number = blobs.findLastIndex(not(findEmptyString));
  const lastDoubleIndex: number = doubles.findLastIndex(not(findZero));
  return {
    numbers: doubles.slice(FIRST, lastDoubleIndex + ARRAY_INDEX_OFFSET),
    strings: blobs.slice(FIRST, lastBlobIndex + ARRAY_INDEX_OFFSET),
    timestamp: new Date(row.timestamp).getTime(),
  };
}
