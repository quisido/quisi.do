export type Tuple<
  T,
  S extends number,
  P extends unknown[] = [],
> = P['length'] extends S ? P : Tuple<T, S, [...P, T]>;
