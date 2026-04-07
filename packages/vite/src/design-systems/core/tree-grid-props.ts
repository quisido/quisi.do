import type { Attributes } from 'react';
import type { RowProps } from './row-props.js';

export interface TreeGridProps {
  readonly caption: string;
  readonly rows: readonly (RowProps & Required<Attributes>)[];
}
