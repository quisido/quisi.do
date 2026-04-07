import type { ReactElement } from 'react';
import type { ListItemProps } from '../core/list-item-props.js';

/**
 * A single item in a list or directory.
 * Must be contained in a list.
 */
export default function ListItem({ children }: ListItemProps): ReactElement {
  return <li>{children}</li>;
}
