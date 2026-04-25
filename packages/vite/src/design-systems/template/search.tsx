import type { ReactElement } from 'react';
import type { SearchProps } from '../shared/search-props.js';

/**
 *   A `Search` component is a landmark region containing items and objects
 * that, together, create a search facility.
 */
export default function Search({ children, label }: SearchProps): ReactElement {
  /**
   * `jsdom` does not support the <search> element:
   *   The tag <search> is unrecognized in this browser. If you meant to render a
   * React component, start its name with an uppercase letter.
   */
  return (
    <div aria-label={label} role="search">
      {children}
    </div>
  );
}
