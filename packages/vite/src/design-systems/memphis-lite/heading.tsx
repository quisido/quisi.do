/* eslint-disable no-magic-numbers */
import type { ReactElement } from 'react';
import type { HeadingProps } from '../core/heading-props.js';
import classes from './heading.module.scss';

/**
 *   A heading is a heading for a section of the page.
 *   To ensure headings are organized into a logical outline, use the `level`
 * prop to indicate the proper nesting level.
 * @see {@link https://w3c.github.io/aria/#heading | WAI-ARIA `heading` role}
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
    <Component
      className={classes['root']}
      aria-level={level}
      id={id}
      role="heading"
    >
      {children}
    </Component>
  );
}
