export type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: readonly never[]) => unknown
    ? K
    : never;
}[keyof T];
