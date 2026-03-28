import type { ReactElement } from 'react';
import type { SearchProps } from '../shared/search-props.js';

/**
 *   A `Search` component is a landmark region containing items and objects
 * that, together, create a search facility.
 */
export default function Search({ children, label }: SearchProps): ReactElement {
  return (
    <search aria-label={label} role="search">
      {children}
    </search>
  );
}
