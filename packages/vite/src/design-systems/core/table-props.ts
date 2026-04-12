import type KeyProps from './key-props.js';
import type { RowProps } from './row-props.js';

export interface TableProps {
  readonly caption: string;
  readonly rows: readonly TableRow[];
}

export type TableRow = KeyProps & RowProps;
