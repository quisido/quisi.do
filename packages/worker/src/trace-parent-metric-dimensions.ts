/**
 *   `${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}
 * ${Hex}${Hex}${Hex}${Hex}` produces a union type that is too complex to
 * represent.
 */

export default interface TraceParentMetricDimensions {
  readonly traceFlags: number;
  readonly traceId: string; // 32 hexadecimal characters
  readonly traceParentId: string; // 16 hexadecimal characters
  readonly traceVersion: number;
}
