import hasMethod from './has-method.js';

export default function hasMethods<K extends string | number | symbol>(
  value: Record<string | number | symbol, unknown>,
  methods: readonly K[],
): value is Record<K, (...args: readonly unknown[]) => unknown> {
  return methods.every(hasMethod.bind(null, value));
}
