import { TraceFlag } from '../constants/trace-flag.js';
import type { ParentIdLength } from '../types/parent-id-length.js';
import type { TraceIdLength } from '../types/trace-id-length.js';
import type { TraceParentGroups } from '../types/trace-parent-groups.js';
import type TraceParent from '../types/trace-parent.js';
import type { Tuple } from '../types/tuple.js';
import hasTraceFlag from '../utils/has-trace-flag.js';
import mapHexToNumber from '../utils/map-hex-to-number.js';
import splitByLength from '../utils/split-by-length.js';
import tupleMap from '../utils/tuple-map.js';

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
    traceFlagRandom: hasTraceFlag(traceFlags, TraceFlag.Random),
    traceFlagSampled: hasTraceFlag(traceFlags, TraceFlag.Sampled),
    traceFlags,
    version: mapHexToNumber(version),

    parentId: tupleMap(
      splitByLength(parentId, BYTES_PER_HEX) as Tuple<string, ParentIdLength>,
      mapHexToNumber,
    ),

    traceId: tupleMap(
      splitByLength(traceId, BYTES_PER_HEX) as Tuple<string, TraceIdLength>,
      mapHexToNumber,
    ),
  };
}
