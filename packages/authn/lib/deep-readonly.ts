type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type DeepReadonly<T> = T extends Primitive
  ? T
  // eslint-disable-next-line functional/prefer-immutable-types -- Spread functions can't be syntactically readonly.
  : T extends ((...params: readonly never[]) => unknown)
    ? T
    : T extends Map<infer K, infer V>
      ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
      : T extends Set<infer U>
        ? ReadonlySet<DeepReadonly<U>>
        : T extends ReadonlyArray<infer U>
          ? ReadonlyArray<DeepReadonly<U>>
          : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
            : T;
