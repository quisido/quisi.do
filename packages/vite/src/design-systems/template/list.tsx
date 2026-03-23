import type { ReactElement, ReactNode } from 'react';

export interface ListProps {
  readonly children: ReactNode;
  readonly ordered?: boolean | undefined;
}

/**
 * A section containing `ListItem` elements.
 */
export default function List({
  children,
  ordered = false,
}: ListProps): ReactElement {
  // eslint-disable-next-line no-ternary
  const Component = ordered ? 'ol' : 'ul';
  return <Component>{children}</Component>;
}
