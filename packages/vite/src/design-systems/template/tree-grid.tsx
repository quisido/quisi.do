import type { ReactElement, ReactNode } from 'react';

export interface TreeGridProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function TreeGrid({
  children,
  label,
}: TreeGridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table aria-label={label} role="treegrid">
      {children}
    </table>
  );
}
