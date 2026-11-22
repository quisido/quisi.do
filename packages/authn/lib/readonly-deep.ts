type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type ReadonlyDeep<T> = T extends Primitive
  ? T
  // eslint-disable-next-line functional/prefer-immutable-types -- Spread functions can't be syntactically readonly.
  : T extends ((...params: readonly never[]) => unknown)
    ? T
    : T extends Map<infer K, infer V>
      ? ReadonlyMap<ReadonlyDeep<K>, ReadonlyDeep<V>>
      : T extends Set<infer U>
        ? ReadonlySet<ReadonlyDeep<U>>
        : T extends ReadonlyArray<infer U>
          ? ReadonlyArray<ReadonlyDeep<U>>
          : T extends object
            ? { readonly [K in keyof T]: ReadonlyDeep<T[K]> }
            : T;
