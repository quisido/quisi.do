import type { ReactElement } from 'react';
import type { TabListProps } from '../shared/tab-list-props.js';

/**
 *   A `TabList` component contains `Tab` elements that reference associated
 * `TabPanel` elements.
 */
export default function TabList({
  children,
  label,
}: TabListProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div aria-label={label} role="tablist">
      {children}
    </div>
  );
}
