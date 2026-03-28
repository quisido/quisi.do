import type { ReactElement } from 'react';
import type { AssociationListItemKeyProps } from '../shared/association-list-item-key-props.js';

/**
 * Must be contained in an `AssociationList`.
 */
export default function AssociationListItemKey({
  children,
}: AssociationListItemKeyProps): ReactElement {
  return <dt role="associationlistitemkey">{children}</dt>;
}
