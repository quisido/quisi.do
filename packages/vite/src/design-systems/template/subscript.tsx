import type { ReactElement } from 'react';
import type { SubscriptProps } from '../core/subscript-props.js';

/**
 * One or more subscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 * @see {@link https://w3c.github.io/aria/#subscript | WAI-ARIA `subscript` role}
 */
export default function Subscript({ children }: SubscriptProps): ReactElement {
  return <sub role="subscript">{children}</sub>;
}
