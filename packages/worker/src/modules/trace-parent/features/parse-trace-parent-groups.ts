import { TraceFlag } from '../constants/trace-flag.js';
import type { TraceParentGroups } from '../types/trace-parent-groups.js';
import type TraceParent from '../types/trace-parent.js';
import hasTraceFlag from '../utils/has-trace-flag.js';
import mapHexToNumber from '../utils/map-hex-to-number.js';
import splitByLength from '../utils/split-by-length.js';
import tupleMap from '../utils/tuple-map.js';

type ParentId = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

type TraceId = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

const BYTES_PER_HEX = 2;

export default function parseTraceParentGroups({
  parentId,
  traceFlags: traceFlagsStr,
  traceId,
  version,
}: TraceParentGroups): TraceParent {
  if (parentId === '0000000000000000') {
    throw new Error('Trace parent parent IDs must be non-zero.');
  }

  if (traceId === '00000000000000000000000000000000') {
    throw new Error('Trace parent trace IDs must be non-zero.');
  }

  const traceFlags: number = mapHexToNumber(traceFlagsStr);
  return {
    parentId: tupleMap(
      splitByLength(parentId, BYTES_PER_HEX) as ParentId,
      mapHexToNumber,
    ),
    traceFlagRandom: hasTraceFlag(traceFlags, TraceFlag.Random),
    traceFlags,
    traceFlagSampled: hasTraceFlag(traceFlags, TraceFlag.Sampled),

    traceId: tupleMap(
      splitByLength(traceId, BYTES_PER_HEX) as TraceId,
      mapHexToNumber,
    ),
    version: mapHexToNumber(version),
  };
}
