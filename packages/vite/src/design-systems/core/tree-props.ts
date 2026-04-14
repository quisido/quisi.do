import type { RowProps } from './row-props.js';
import type KeyProps from './key-props.js';

export interface TreeProps {
  readonly caption: string;
  readonly items: readonly TreeItem[];
  readonly orientation?: 'vertical' | 'horizontal' | undefined;
  readonly required?: boolean | undefined;
}

export type TreeItem = KeyProps & RowProps;
