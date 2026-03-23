import type { ReactElement, ReactNode } from 'react';

export interface AssociationListItemKeyProps {
  readonly children: ReactNode;
}

/**
 * Must be contained in an `AssociationList`.
 */
export default function AssociationListItemKey({
  children,
}: AssociationListItemKeyProps): ReactElement {
  return <dt>{children}</dt>;
}
