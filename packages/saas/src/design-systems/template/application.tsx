import type { ReactElement } from 'react';
import type { ApplicationProps } from '../core/application-props.js';
import classes from './application.module.scss';

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
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-roledescription={roleDescription}
      className={classes['application']}
      role="application"
    >
      {children}
    </div>
  );
}
