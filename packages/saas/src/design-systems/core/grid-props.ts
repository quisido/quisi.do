import type { Key, ReactNode } from 'react';

export interface GridCell {
  readonly content: ReactNode;
  readonly key: number | string;
}

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

export interface GridRow {
  readonly cells: readonly GridCell[];
  readonly key: number | string;
}
