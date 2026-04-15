import type { ReactElement } from 'react';
import type { StatusProps } from '../core/status-props.js';
import classes from './status.module.scss';

/**
 *   Status is a type of live region whose content is advisory information for
 * the user but is not important enough to justify an alert, often but not
 * necessarily presented as a status bar.
 *   If another part of the page controls what appears in the status, set that
 * element's `controls` prop to the status's ID.
 * @see {@link https://w3c.github.io/aria/#status | WAI-ARIA `status` role}
 */
export default function Status({
  atomic = true,
  children,
  id,
  live = 'polite',
}: StatusProps): ReactElement {
  return (
    <output
      className={classes['root']}
      aria-atomic={atomic}
      aria-live={live}
      id={id}
      role="status"
    >
      {children}
    </output>
  );
}
