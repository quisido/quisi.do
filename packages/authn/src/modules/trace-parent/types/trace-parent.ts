import type { Tuple } from './tuple.js';

export default interface TraceParent {
  readonly parentId: Tuple<number, 8>; // a.k.a. span ID
  readonly traceFlagRandom: boolean;
  readonly traceFlagSampled: boolean;
  readonly traceFlags: number;
  readonly traceId: Tuple<number, 16>;
  readonly version: number;
}
