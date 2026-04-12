import type { ReactElement } from 'react';
import type { NavigationProps } from '../core/navigation-props.js';

/**
 *   A navigation landmark contains a collection of navigational elements
 * (usually links) for navigating the document or related documents.
 * @see {@link https://w3c.github.io/aria/#navigation | WAI-ARIA `navigation` role}
 */
export default function Navigation({
  children,
  label,
}: NavigationProps): ReactElement {
  return <nav aria-label={label}>{children}</nav>;
}
