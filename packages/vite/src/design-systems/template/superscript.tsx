import type { ReactElement } from 'react';
import type { SuperscriptProps } from '../shared/superscript-props.js';

/**
 * One or more superscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Superscript({
  children,
  describedBy,
}: SuperscriptProps): ReactElement {
  return <sup aria-describedby={describedBy}>{children}</sup>;
}
