// `Optional` is like `Partial`, except it can also be `undefined`.
// Useful for when `exactOptionalProperties` is `true`.
type Optional<T> = {
  [K in keyof T]?: T[K] | undefined;
};

export default Optional;
