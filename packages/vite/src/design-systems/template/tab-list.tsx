import type { ReactElement, ReactNode } from 'react';

export interface TabListProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function TabList({
  children,
  label,
}: TabListProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div aria-label={label} role="tablist">
      {children}
    </div>
  );
}
