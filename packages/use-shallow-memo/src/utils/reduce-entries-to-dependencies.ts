export default function reduceEntriesToDependencies(
  dependencies: readonly unknown[],
  [key, value]: readonly [string, unknown],
): readonly unknown[] {
  return [...dependencies, key, value];
}
