import type { ModuleOptions } from 'webpack';

type Item<T> = T extends readonly (infer U)[] ? U : never;

export type WebpackRule = Item<ModuleOptions['rules']>;
