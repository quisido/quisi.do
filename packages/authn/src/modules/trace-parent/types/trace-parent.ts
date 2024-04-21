import type { ParentIdLength } from './parent-id-length.js';
import type { TraceIdLength } from './trace-id-length.js';
import type { Tuple } from './tuple.js';

export default interface TraceParent {
  // The `parentId` is also known as the span ID.
  readonly parentId: Tuple<number, ParentIdLength>;
  readonly traceFlagRandom: boolean;
  readonly traceFlagSampled: boolean;
  readonly traceFlags: number;
  readonly traceId: Tuple<number, TraceIdLength>;
  readonly version: number;
}
