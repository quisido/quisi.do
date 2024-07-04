// `Array<T>` helps TypeScript infer that `Tuple`s have Array methods.
export type Tuple<T, S extends number, P extends unknown[] = []> = T[] &
  (P['length'] extends S ? P : Tuple<T, S, [...P, T]>);
