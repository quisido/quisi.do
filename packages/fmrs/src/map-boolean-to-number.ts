/**
 * Maps `true` to `1` and `false` to `0`.
 *
 * @example
 * flags.map(mapBooleanToNumber);
 */
export default function mapBooleanToNumber(value: boolean): number {
  if (value) {
    return 1;
  }

  return 0;
}
