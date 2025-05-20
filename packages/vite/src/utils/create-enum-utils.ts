interface EnumUtils<V extends number | string> {
  readonly isType: (value: unknown) => value is V;
  readonly validateType: (value: unknown) => V;
}

export default function createEnumUtils<V extends number | string>(
  enumObj: Record<string, V>,
  name: string,
): EnumUtils<V> {
  const values = new Set<V>(Object.values(enumObj));
  const isType = (value: unknown): value is V =>
    Set.prototype.has.call(values, value);

  return {
    isType,

    validateType(value: unknown): V {
      if (isType(value)) {
        return value;
      }

      throw new Error(
        `Expected ${name}, but received ${typeof value} ${JSON.stringify(
          value,
        )}`,
      );
    },
  };
}
