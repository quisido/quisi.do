import type { ReactElement } from 'react';
import type { ListProps } from '../core/list-props.js';

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
