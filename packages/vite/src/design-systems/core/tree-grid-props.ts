import type { ReactNode } from 'react';

export interface TreeGridCell {
  readonly content: ReactNode;
  readonly expanded?: boolean | undefined;
  readonly key: number | string;
  /**
   * @default true
   */
  readonly readOnly?: boolean | undefined;
}

export interface TreeGridProps {
  readonly caption: string;
  /**
   * @default true
   */
  readonly readOnly?: boolean | undefined;
  readonly rows: readonly TreeGridRow[];
}

export interface TreeGridRow {
  readonly cells: readonly TreeGridCell[];
  readonly expanded?: boolean | undefined;
  readonly key: number | string;
}
