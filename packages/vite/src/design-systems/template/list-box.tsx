import type { ReactElement, ReactNode } from 'react';

export interface ListBoxProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function ListBox({
  children,
  label,
}: ListBoxProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <label>
      {label}
      <select multiple>{children}</select>
    </label>
  );
}
