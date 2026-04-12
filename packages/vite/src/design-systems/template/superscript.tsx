import type { ReactElement } from 'react';
import type { SuperscriptProps } from '../core/superscript-props.js';

/**
 * One or more superscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 * @see {@link https://w3c.github.io/aria/#superscript | WAI-ARIA `superscript` role}
 */
export default function Superscript({
  children,
}: SuperscriptProps): ReactElement {
  return <sup role="superscript">{children}</sup>;
}
