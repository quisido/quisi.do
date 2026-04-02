import type { Attributes } from 'react';
import type { RowProps } from './row-props.js';

export interface GridProps {
  readonly caption: string;
  readonly rows: readonly (RowProps & Required<Attributes>)[];
}
