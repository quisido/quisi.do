import type { ReactElement } from 'react';

export interface SearchBoxProps {
  readonly label: string;
}

export default function SearchBox({ label }: SearchBoxProps): ReactElement {
  return (
    <label>
      {label}
      <input type="search" />
    </label>
  );
}
