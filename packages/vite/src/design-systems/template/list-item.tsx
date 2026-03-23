import type { ReactElement, ReactNode } from 'react';

export interface ListItemProps {
  readonly children: ReactNode;
}

/**
 * A single item in a list or directory.
 * Must be contained in a list.
 */
export default function ListItem({ children }: ListItemProps): ReactElement {
  return <li>{children}</li>;
}
