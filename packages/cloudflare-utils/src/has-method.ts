export default function hasMethod<K extends string | number | symbol>(
  value: Record<string | number | symbol, unknown>,
  method: K,
): value is Record<K, (...args: readonly unknown[]) => unknown> {
  return (
    method in value &&
    typeof value[method] === 'function'
  );
}

