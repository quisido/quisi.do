export default function optional<T, K extends keyof T = keyof T>(
  key: K,
  value: T[K] | undefined,
): Partial<Pick<Required<T>, K>> {
  const partial: Partial<Pick<Required<T>, K>> = {};

  if (typeof value !== 'undefined') {
    partial[key] = value;
  }

  return partial;
}
