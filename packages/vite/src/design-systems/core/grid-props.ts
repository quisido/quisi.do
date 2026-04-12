import type { Key } from 'react';
import type { RowProps } from './row-props.js';
import type KeyProps from './key-props.js';

export interface GridProps {
  readonly caption: string;
  readonly readOnly?: boolean | undefined;
  readonly rows: readonly GridRow[];
  readonly selected?: // Single select
    | readonly [Key, Key]
    // Multi select
    | ReadonlyMap<Key, ReadonlySet<Key>>
    | undefined;
}

export type GridRow = KeyProps & RowProps;
