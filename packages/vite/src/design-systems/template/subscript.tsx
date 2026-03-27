import type { ReactElement, ReactNode } from 'react';

export interface SubscriptProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * One or more subscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Subscript({
  children,
  describedBy,
}: SubscriptProps): ReactElement {
  return <sub aria-describedby={describedBy}>{children}</sub>;
}
