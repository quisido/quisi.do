import type { TraceParentGroups } from '../types/trace-parent-groups.js';
import type TraceParent from '../types/trace-parent.js';
import type { Tuple } from '../types/tuple.js';
import mapHexToNumber from '../utils/map-hex-to-number.js';
import splitByLength from '../utils/split-by-length.js';
import tupleMap from '../utils/tuple-map.js';

// https://github.com/w3c/trace-context/blob/main/spec/20-http_request_header_format.md#trace-flags
const FLAG_SAMPLED = 1; // 00000001
const FLAG_RANDOM = 2; // 00000010

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
    traceFlagRandom: (traceFlags & FLAG_RANDOM) === FLAG_RANDOM,
    traceFlagSampled: (traceFlags & FLAG_SAMPLED) === FLAG_SAMPLED,
    traceFlags: traceFlags,
    version: mapHexToNumber(version),

    parentId: tupleMap(
      splitByLength(parentId, 2) as Tuple<string, 8>,
      mapHexToNumber,
    ),

    traceId: tupleMap(
      splitByLength(traceId, 2) as Tuple<string, 16>,
      mapHexToNumber,
    ),
  };
}
