import type { ReactElement } from 'react';
import type { StatusProps } from '../core/status-props.js';

/**
 *   A status... A type of live region whose content is advisory information for the user but is not important enough to justify an alert, often but not necessarily presented as a status bar.

Authors SHOULD ensure an element with role status does not receive focus as a result of change in status.

Status is a form of live region. If another part of the page controls what appears in the status, authors SHOULD make the relationship explicit with the aria-controls attribute.

Assistive technologies MAY reserve some cells of a Braille display to render the status.

Elements with the role status have an implicit aria-live value of polite and an implicit aria-atomic value of true.
 * @see {@link https://w3c.github.io/aria/#status | WAI-ARIA `status` role}
 */
export default function Status({ children, label }: StatusProps): ReactElement {
  return (
    <output aria-label={label} role="status">
      {children}
    </output>
  );
}
