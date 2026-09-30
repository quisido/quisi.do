import { type ReactElement } from 'react';

import { type ApplicationProps } from '../core/application-props.js';
import classes from './application.module.scss';

/** A deliberately expressive surface for custom, application-like interactions. */
export default function Application({
  children,
  describedBy,
  label,
  labelledBy,
  roleDescription,
}: ApplicationProps): ReactElement {
  return (
    <div
      aria-describedby={describedBy}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      aria-roledescription={roleDescription}
      className={classes['application']}
      role="application"
    >
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['stairs']} />
      <span aria-hidden="true" className={classes['scribble']} />
      <span aria-hidden="true" className={classes['sprinkles']} />
      <div className={classes['canvas']}>{children}</div>
      <span aria-hidden="true" className={classes['corner-orbit']} />
    </div>
  );
}
