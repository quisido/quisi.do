import type { ReactElement, ReactNode } from 'react';

export interface StrongProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * Important, serious, or urgent content.
 */
export default function Strong({
  children,
  describedBy,
}: StrongProps): ReactElement {
  return <strong aria-describedby={describedBy}>{children}</strong>;
}
