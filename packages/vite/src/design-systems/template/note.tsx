import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

/**
 *   A `Note` component adds parenthetic or ancillary content when no other
 * components fits the purpose.
 */
export default function Note({ children }: Props): ReactElement {
  return <div role="note">{children}</div>;
}
