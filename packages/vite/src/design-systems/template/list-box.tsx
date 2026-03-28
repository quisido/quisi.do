import type { ReactElement, ReactNode } from 'react';

export interface ListBoxProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `ListBox` component lets the user choose one or more items from a list
 * of choices. Its children should be `Option` components or `Group`
 * components that contain `Option` components.
 */
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
