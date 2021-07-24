// eslint-disable-next-line @typescript-eslint/no-type-alias
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P];
};

export default Mutable;
