import type { ReactElement } from 'react';
import type { SubscriptProps } from '../core/subscript-props.js';

/**
 * One or more subscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Subscript({
  children,
  describedBy,
}: SubscriptProps): ReactElement {
  return <sub aria-describedby={describedBy}>{children}</sub>;
}
