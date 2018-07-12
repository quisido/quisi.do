import type { Key } from 'react';

export type WithKey<T> = T & Readonly<Record<'key', Key>>;
