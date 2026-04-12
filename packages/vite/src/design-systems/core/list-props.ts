import type { PropsWithChildren } from 'react';
import type KeyProps from './key-props.js';

export type ListItem = KeyProps & PropsWithChildren;

export interface ListProps {
  readonly items: readonly ListItem[];
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly ordered?: boolean | undefined;
}
