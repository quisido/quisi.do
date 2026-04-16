import type { ReactElement } from 'react';
import type { MathProps } from '../core/math-props.js';
import classes from './math.module.scss';

// TODO: Use MathML and fallback with a polyfill.

/**
 *   Math represents a mathematical expression.
 * @see {@link https://w3c.github.io/aria/#math | WAI-ARIA `math` role}
 */
export default function Math({ children, label }: MathProps): ReactElement {
  return (
    <div className={classes['root']} aria-label={label} role="math">
      {children}
    </div>
  );
}
