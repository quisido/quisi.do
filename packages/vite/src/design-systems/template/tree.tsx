import type { ReactElement, ReactNode } from 'react';

export interface TreeProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Tree({ children, label }: TreeProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <ul aria-label={label} role="tree">
      {children}
    </ul>
  );
}
