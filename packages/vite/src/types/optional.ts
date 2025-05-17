/**
 * `Optional` is like `Partial`, except it can also be `undefined`.
 * Useful for when `exactOptionalPropertyTypes` is `true`.
 */

export type Optional<T> = {
  [K in keyof T]?: T[K] | undefined;
};
