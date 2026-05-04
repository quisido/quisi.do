import type { ReactElement, ReactNode } from 'react';
import Heading from './heading.js';
import type { AlertProps } from '../core/alert-props.js';
import classes from './alert.module.scss';
import useAlert from '../core/use-alert.js';

/**
 *   An alert is a live region with important, and usually time-sensitive,
 * information.
 *   Alerts are used to convey messages that will be immediately important to
 * users.
 *   An alert is a special type of assertive live region that is intended to
 * cause immediate notification for users.
 *   If focus should be moved to an alert when it is conveyed, use an alert
 * dialog instead.
 * @see {@link https://w3c.github.io/aria/#alert | WAI-ARIA `alert` role}
 */
export default function Alert({
  atomic = true,
  children,
  heading,
  icon: iconProp,
  live = 'assertive',
  type,
}: AlertProps): ReactElement {
  const { descriptionId, headingId, labelledBy } = useAlert();

  const icon = ((): ReactNode => {
    if (iconProp !== undefined) {
      return iconProp;
    }

    switch (type) {
      case 'error':
        return '⛔️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
    }
  })();

  return (
    <div
      aria-atomic={atomic}
      aria-describedby={descriptionId}
      aria-labelledby={labelledBy}
      aria-live={live}
      className={classes['alert']}
      role="alert"
    >
      {icon && <span className={classes['icon']}>{icon}</span>}
      <div>
        <Heading className={classes['heading']} id={headingId}>
          {heading}
        </Heading>
        <div className={classes['description']} id={descriptionId}>
          {children}
        </div>
      </div>
    </div>
  );
}
