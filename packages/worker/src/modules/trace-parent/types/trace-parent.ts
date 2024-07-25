export default interface TraceParent {
  // The `parentId` is also known as the span ID.
  readonly parentId: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  readonly traceFlagRandom: boolean;
  readonly traceFlagSampled: boolean;
  readonly traceFlags: number;
  readonly traceId: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  readonly version: number;
}
