export default function optional<T, K extends keyof T = keyof T>(
  key: K,
  value: T[K] | undefined,
): Partial<Pick<Required<T>, K>> {
  const t: Partial<Pick<Required<T>, K>> = {};
  if (typeof value !== 'undefined') {
    t[key] = value;
  }
  return t;
}
