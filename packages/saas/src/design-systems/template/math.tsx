import { createElement, type ReactElement } from 'react';
import type { MathProps } from '../core/math-props.js';
import classes from './math.module.scss';

/**
 * Math represents a mathematical expression.
 * @see {@link https://w3c.github.io/aria/#math | WAI-ARIA `math` role}
 */
export default function Math({
  children,
  label,
  labelledBy,
}: MathProps): ReactElement {
  return createElement(
    'math',
    {
      'aria-label': label,
      'aria-labelledby': labelledBy,
      className: classes['math'],
      role: 'math',
    },
    children,
  );
}
