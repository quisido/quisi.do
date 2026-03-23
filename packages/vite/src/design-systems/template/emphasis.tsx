import type { ReactElement, ReactNode } from 'react';

export interface EmphasisProps {
  readonly children: ReactNode;
}

/**
 * Used to stress or emphasize content, but not to suggest importance.
 */
export default function Emphasis({ children }: EmphasisProps): ReactElement {
  return <em>{children}</em>;
}
