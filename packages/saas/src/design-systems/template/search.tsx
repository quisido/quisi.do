import type { ReactElement } from 'react';
import type { SearchProps } from '../core/search-props.js';
import classes from './search.module.scss';

/**
 * A search landmark contains a collection of items and objects that, as a
 * whole, combine to create a search facility.
 * A search region can be a mix of form controls, scripted controls, and
 * hyperlinks.
 * @see {@link https://w3c.github.io/aria/#search | WAI-ARIA `search` role}
 */
export default function Search({ children }: SearchProps): ReactElement {
  /**
   * Note: `jsdom` does not support the <search> element: The tag <search> is
   * unrecognized in this browser. If you meant to render a React component,
   * start its name with an uppercase letter.
   */
  return (
    <search className={classes['search']} role="search">
      {children}
    </search>
  );
}
