import type { ReactElement } from 'react';
import type { SuperscriptProps } from '../core/superscript-props.js';

/**
 * One or more superscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Superscript({
  children,
}: SuperscriptProps): ReactElement {
  return <sup role="superscript">{children}</sup>;
}
