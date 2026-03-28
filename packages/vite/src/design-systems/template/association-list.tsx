import type { ReactElement } from 'react';
import type { AssociationListProps } from '../shared/association-list-props.js';

/**
 *   Contains only `AssociationListItemKey` children and their sibling
 * `AssociationListItemValue`.
 */
export default function AssociationList({
  children,
}: AssociationListProps): ReactElement {
  return <dl role="associationlist">{children}</dl>;
}
