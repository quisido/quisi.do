import type { ReactElement, ReactNode } from 'react';

export interface EmphasisProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * Used to stress or emphasize content, but not to suggest importance.
 */
export default function Emphasis({
  children,
  describedBy,
}: EmphasisProps): ReactElement {
  return <em aria-describedby={describedBy}>{children}</em>;
}
