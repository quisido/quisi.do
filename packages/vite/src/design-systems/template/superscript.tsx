import type { ReactElement, ReactNode } from 'react';

export interface SuperscriptProps {
  readonly children: ReactNode;
}

/**
 * One or more superscripted characters.
 * (Only use if absence of role would change the content's meaning.)
 */
export default function Superscript({
  children,
}: SuperscriptProps): ReactElement {
  return <sup>{children}</sup>;
}
