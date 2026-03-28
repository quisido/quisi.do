import type { ReactElement, ReactNode } from 'react';

export interface TreeItemProps {
  readonly children: ReactNode;
}

/**
 *   A `TreeItem` component represents an item in a `Tree`. It can contain a
 * nested `Group` of child tree items that may be expanded or collapsed.
 */
export default function TreeItem({ children }: TreeItemProps): ReactElement {
  return <li role="treeitem">{children}</li>;
}
