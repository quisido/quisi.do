import type { ReactElement, ReactNode } from 'react';

export interface StrongProps {
  readonly children: ReactNode;
}

/**
 * Important, serious, or urgent content.
 */
export default function Strong({ children }: StrongProps): ReactElement {
  return <strong>{children}</strong>;
}
