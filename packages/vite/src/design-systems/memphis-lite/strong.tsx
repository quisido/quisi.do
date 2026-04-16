import type { ReactElement } from 'react';
import type { StrongProps } from '../core/strong-props.js';
import classes from './strong.module.scss';

/**
 *   Strong content communicates importance, seriousness, or urgency. It is not
 * for communicating changes in typographical presentation that are not
 * important to the meaning of the content. Use strong content only if its
 * absence would change the meaning of the content.
 *   Strong content is not intended to convey stress or emphasis; for that
 * purpose, the `Emphasis` component is more appropriate.
 * @see {@link https://w3c.github.io/aria/#strong | WAI-ARIA `strong` role}
 */
export default function Strong({ children }: StrongProps): ReactElement {
  return (
    <strong className={classes['root']} role="strong">
      {children}
    </strong>
  );
}
