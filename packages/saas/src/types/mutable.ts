type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P];
};

export type { Mutable as default };
