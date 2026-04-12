import type { ReactElement } from 'react';
import type { TabPanelProps } from '../core/tab-panel-props.js';

/**
 *   A tab panel...
 * @see {@link https://w3c.github.io/aria/#tabpanel | WAI-ARIA `tabpanel` role}
 */
export default function TabPanel({
  children,
  label,
}: TabPanelProps): ReactElement {
  return (
    <div aria-label={label} role="tabpanel">
      {children}
    </div>
  );
}
