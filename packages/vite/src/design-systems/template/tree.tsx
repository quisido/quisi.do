import type { ReactElement, ReactNode } from 'react';

export interface TreeProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Tree` component is a widget that lets the user select one or more items
 * from a hierarchically organized collection.
 */
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
