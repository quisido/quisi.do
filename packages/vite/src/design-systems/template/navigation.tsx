import type { ReactElement } from 'react';
import type { NavigationProps } from '../shared/navigation-props.js';

/**
 *   A `Navigation` component is a landmark containing a collection of
 * navigational elements, usually links, for moving through the current or
 * related documents.
 */
export default function Navigation({
  children,
  label,
}: NavigationProps): ReactElement {
  return <nav aria-label={label}>{children}</nav>;
}
