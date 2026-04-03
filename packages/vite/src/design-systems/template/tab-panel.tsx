import type { ReactElement } from 'react';
import type { TabPanelProps } from '../shared/tab-panel-props.js';

/**
 *   A `TabPanel` component contains the resources associated with a `Tab` in a
 * `TabList`.
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
