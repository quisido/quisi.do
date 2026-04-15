import type { ReactElement } from 'react';
import type { TabListProps } from '../core/tab-list-props.js';
import classes from './tab-list.module.scss';

/**
 *   A tab list...
 * @see {@link https://w3c.github.io/aria/#tablist | WAI-ARIA `tablist` role}
 */
export default function TabList({
  children,
  label,
}: TabListProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div className={classes['root']} aria-label={label} role="tablist">
      {children}
    </div>
  );
}
