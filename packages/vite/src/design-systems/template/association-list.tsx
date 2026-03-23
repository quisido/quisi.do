import type { ReactElement, ReactNode } from 'react';

export interface AssociationListProps {
  readonly children: ReactNode;
}

/**
 *   Contains only `AssociationListItemKey` children and their sibling
 * `AssociationListItemValue`.
 */
export default function AssociationList({
  children,
}: AssociationListProps): ReactElement {
  return <dl>{children}</dl>;
}
