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
  readonly traceFlags: number;
  readonly traceFlagSampled: boolean;
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
