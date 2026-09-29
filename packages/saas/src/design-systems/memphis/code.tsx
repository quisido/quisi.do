import { type ReactElement } from 'react';

import { type CodeProps } from '../core/code-props.js';
import classes from './code.module.scss';

/**
 * Code is a section representing a fragment of computer code.
 * @see {@link https://w3c.github.io/aria/#code | WAI-ARIA `code` role}
 */
export default function Code({
  children,
  describedBy,
}: CodeProps): ReactElement {
  return (
    <span className={classes['composition']}>
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span aria-hidden="true" className={classes['zigzag']} />
      <span aria-hidden="true" className={classes['confetti']} />
      <code
        aria-describedby={describedBy}
        className={classes['code']}
        role="code"
      >
        <span className={classes['prompt']} aria-hidden="true">
          {'< '}
        </span>
        <span className={classes['content']}>{children}</span>
        <span className={classes['cursor']} aria-hidden="true" />
      </code>
      <span aria-hidden="true" className={classes['dots']} />
      <span aria-hidden="true" className={classes['squiggle']} />
    </span>
  );
}
