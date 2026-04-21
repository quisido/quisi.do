type Undefined<T> = {
  [K in keyof T]?: undefined;
};

export type OneOf<T> = {
  [K in keyof T]: Record<K, T[K]> & Undefined<Omit<T, K>>;
}[keyof T];
