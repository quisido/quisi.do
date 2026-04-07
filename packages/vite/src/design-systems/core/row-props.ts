import type { Attributes } from 'react';
import type { CellProps } from './cell-props.js';

export interface RowProps {
  readonly cells: readonly (CellProps & Required<Attributes>)[];
}
