import type { ReactElement, ReactNode } from 'react';

export interface ListProps {
  readonly children: ReactNode;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly ordered?: boolean | undefined;
}

/**
 * A section containing `ListItem` elements.
 */
export default function List({
  children,
  label,
  labelledBy,
  ordered = false,
}: ListProps): ReactElement {
  // eslint-disable-next-line no-ternary
  const Component = ordered ? 'ol' : 'ul';
  return (
    <Component aria-label={label} aria-labelledby={labelledBy}>
      {children}
    </Component>
  );
}
