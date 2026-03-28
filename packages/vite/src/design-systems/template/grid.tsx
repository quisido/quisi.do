import type { ReactElement, ReactNode } from 'react';

export interface GridProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Grid` component is a composite widget containing rows and cells where
 * some or all cells are focusable through two-dimensional navigation. It
 * describes relationships among elements and does not require a tabular visual
 * presentation.
 */
export default function Grid({ children, label }: GridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table aria-label={label} role="grid">
      {children}
    </table>
  );
}
