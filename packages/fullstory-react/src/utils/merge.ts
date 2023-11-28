/**
 * Given
 * interface T {
 *   (...args: readonly A[]) => R;
 *   propertyName: V;
 * }
 *
 * Merge:
 *   (...args: readonly A[]) => R
 *   Record<'propertyName', V>
 */

export default function merge<T>(
  impl: Omit<T, keyof T>,
  properties: Pick<T, keyof T>,
): T {
  return Object.assign(impl, properties);
}
