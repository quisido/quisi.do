import type { ReactElement } from 'react';
import type { SuperscriptProps } from '../core/superscript-props.js';
import classes from './superscript.module.scss';

/**
 * Superscript denotes one or more superscripted characters.
 * Superscript is intended to be used only to mark up typographical
 * conventions that have specific meanings; not for typographical presentation
 * for presentation's sake. In general, use supserscript only if the absence of
 * the superscript would change the meaning of the content.
 * @see {@link https://w3c.github.io/aria/#superscript | WAI-ARIA `superscript` role}
 */
export default function Superscript({
  children,
}: SuperscriptProps): ReactElement {
  return (
    <sup className={classes['superscript']} role="superscript">
      {children}
    </sup>
  );
}
