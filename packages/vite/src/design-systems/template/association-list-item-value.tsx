import type { ReactElement, ReactNode } from 'react';

export interface AssociationListItemValueProps {
  readonly children: ReactNode;
}
/**
 * Always a sibling following an `AssociationListItemKey`.
 */

export default function AssociationListItemValue({
  children,
}: AssociationListItemValueProps): ReactElement {
  return <dd>{children}</dd>;
}
