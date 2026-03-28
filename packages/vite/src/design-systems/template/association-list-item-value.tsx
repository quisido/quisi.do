import type { ReactElement } from 'react';
import type { AssociationListItemValueProps } from '../shared/association-list-item-value-props.js';

/**
 * Always a sibling following an `AssociationListItemKey`.
 */

export default function AssociationListItemValue({
  children,
}: AssociationListItemValueProps): ReactElement {
  return <dd role="associationlistitemvalue">{children}</dd>;
}
