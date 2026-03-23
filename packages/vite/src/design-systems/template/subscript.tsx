import type { ReactElement, ReactNode } from 'react';

export interface SubscriptProps {
  readonly children: ReactNode;
}

/**
 * One or more subscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Subscript({ children }: SubscriptProps): ReactElement {
  return <sub>{children}</sub>;
}
