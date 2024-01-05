/**
 *   This is synonymous with `Math.min(...ns)`, except an empty array is treated
 * as `undefined` instead of `Number.POSITIVE_INFINITY`.
 */
export default function mapNumbersToMin(
  ns: readonly number[],
): number | undefined {
  const min: number = Math.min(...ns);
  if (min === Number.POSITIVE_INFINITY) {
    return;
  }
  return min;
}
