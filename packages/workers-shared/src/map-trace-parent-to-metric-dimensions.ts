import mapNumberToHex from './map-number-to-hex.js';
import { type TraceParent } from './modules/trace-parent/index.js';
import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

export default function mapTraceParentToMetricDimensions({
  parentId,
  traceFlags,
  traceId,
  version,
}: TraceParent): TraceParentMetricDimensions {
  return {
    traceFlags,
    traceId: traceId.map(mapNumberToHex).join(''),
    traceParentId: parentId.map(mapNumberToHex).join(''),
    traceVersion: version,
  };
}
