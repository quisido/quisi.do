import type { ReactElement } from 'react';
import type { SubscriptProps } from '../core/subscript-props.js';
import classes from './subscript.module.scss';

/**
 * Subscript denotes one or more subscripted characters.
 * Subscript is intended to be used only to mark up typographical conventions
 * that have specific meanings; not for typographical presentation for
 * presentation's sake. In general, use subscript only if the absence of the
 * subscript would change the meaning of the content.
 * @see {@link https://w3c.github.io/aria/#subscript | WAI-ARIA `subscript` role}
 */
export default function Subscript({ children }: SubscriptProps): ReactElement {
  return (
    <sub className={classes['subscript']} role="subscript">
      {children}
    </sub>
  );
}
