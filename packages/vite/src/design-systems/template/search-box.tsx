import type { ReactElement } from 'react';
import type { SearchBoxProps } from '../shared/search-box-props.js';

/**
 *   A `SearchBox` component is a type of text box intended for specifying
 * search criteria.
 */
export default function SearchBox({ label }: SearchBoxProps): ReactElement {
  return (
    <label>
      {label}
      <input type="search" />
    </label>
  );
}
