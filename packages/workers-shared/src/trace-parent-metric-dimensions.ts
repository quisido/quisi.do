/**
 *   `${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}
 * ${Hex}${Hex}${Hex}${Hex}` produces a union type that is too complex to
 * represent.
 */

export default interface TraceParentMetricDimensions {
  readonly traceFlags: number;
  readonly traceVersion: number;

  // 32 hexadecimal characters
  readonly traceId: string;

  // 16 hexadecimal characters
  readonly traceParentId: string;
}
