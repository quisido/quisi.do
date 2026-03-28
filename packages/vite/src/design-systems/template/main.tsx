import type { ReactElement, ReactNode } from 'react';

export interface MainProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Main` component is a landmark containing the primary content of a
 * document. Only one `Main` landmark should typically appear on a page.
 */
export default function Main({ children, label }: MainProps): ReactElement {
  return <main aria-label={label}>{children}</main>;
}
