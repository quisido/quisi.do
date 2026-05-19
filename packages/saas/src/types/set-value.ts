type SetValue<T extends Set<unknown>> = T extends Set<infer U> ? U : never;

export type { SetValue as default };
