import type { ReactNode } from 'react';

export interface TableCell {
  readonly content: ReactNode;
  readonly key: number | string;
}

export interface TableProps {
  readonly caption: string;
  readonly rows: readonly TableRow[];
}

export interface TableRow {
  readonly cells: readonly TableCell[];
  readonly key: number | string;
}
