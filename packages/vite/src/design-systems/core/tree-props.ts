import type { RowProps } from './row-props.js';
import type KeyProps from './key-props.js';

export interface TreeProps {
  readonly caption: string;
  readonly rows: readonly TreeRow[];
}

export type TreeRow = KeyProps & RowProps;
