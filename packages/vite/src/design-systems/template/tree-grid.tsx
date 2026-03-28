import type { ReactElement, ReactNode } from 'react';

export interface TreeGridProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `TreeGrid` component is a `Grid` whose rows can be expanded and
 * collapsed in the same manner as a `Tree`.
 */
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
