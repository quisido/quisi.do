import type { ReactElement } from 'react';

export interface SearchBoxProps {
  readonly label: string;
}

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
