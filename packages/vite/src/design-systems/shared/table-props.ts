import type { RowProps } from './row-props.js';
import type { Attributes } from 'react';

export interface TableProps {
  readonly caption: string;
  readonly rows: readonly (RowProps & Required<Attributes>)[];
}
