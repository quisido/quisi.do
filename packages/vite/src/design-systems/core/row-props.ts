import type { CellProps } from './cell-props.js';
import type KeyProps from './key-props.js';

export type RowCell = CellProps & KeyProps;

export interface RowProps {
  readonly cells: readonly RowCell[];
}
