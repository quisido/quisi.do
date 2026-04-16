import type { ReactElement } from 'react';
import type { TabPanelProps } from '../core/tab-panel-props.js';
import classes from './tab-panel.module.scss';

/**
 *   A tab panel...
 * @see {@link https://w3c.github.io/aria/#tabpanel | WAI-ARIA `tabpanel` role}
 */
export default function TabPanel({
  children,
  label,
}: TabPanelProps): ReactElement {
  return (
    <div className={classes['root']} aria-label={label} role="tabpanel">
      {children}
    </div>
  );
}
