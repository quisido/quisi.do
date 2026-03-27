import type { ReactElement, ReactNode } from 'react';

export interface SuperscriptProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * One or more superscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Superscript({
  children,
  describedBy,
}: SuperscriptProps): ReactElement {
  return <sup aria-describedby={describedBy}>{children}</sup>;
}
