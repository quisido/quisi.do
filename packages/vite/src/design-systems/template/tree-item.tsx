import type { ReactElement, ReactNode } from 'react';

export interface TreeItemProps {
  readonly children: ReactNode;
}

export default function TreeItem({ children }: TreeItemProps): ReactElement {
  return <li role="treeitem">{children}</li>;
}
