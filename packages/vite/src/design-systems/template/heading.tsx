/* eslint-disable no-magic-numbers */
import type { ReactElement } from 'react';
import type { HeadingProps } from '../shared/heading-props.js';

/**
 * A heading for a section of the page.
 */
export default function Heading({
  children,
  id,
  level,
}: HeadingProps): ReactElement | null {
  if (children === undefined) {
    return null;
  }

  const Component = ((): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' => {
    switch (level) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      case 4:
        return 'h4';
      case 5:
        return 'h5';
      case 6:
        return 'h6';
      default:
        return 'div';
    }
  })();

  return (
    <Component aria-level={level} id={id} role="heading">
      {children}
    </Component>
  );
}
