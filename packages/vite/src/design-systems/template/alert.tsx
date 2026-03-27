import type { ReactElement, ReactNode } from 'react';
import useElementId from '../../hooks/use-element-id.js';
import Heading from './heading.js';

interface BaseAlertProps {
  /**
   * @default true
   */
  readonly atomic?: boolean | undefined;
  readonly children: ReactNode;
  readonly heading?: ReactNode | undefined;
  readonly icon?: string | undefined;
  /**
   * @default 'assertive'
   */
  readonly live?: 'off' | 'assertive' | 'polite' | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

export interface HeadingAlertProps extends BaseAlertProps {
  readonly heading: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelAlertProps extends BaseAlertProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByAlertProps extends BaseAlertProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type AlertProps =
  | HeadingAlertProps
  | LabelAlertProps
  | LabelledByAlertProps;

/**
 *   An `Alert` component is a live region with important, and usually
 * time-sensitive, information.
 *   Alerts are used to convey messages that will be immediately important to
 * users. In the case of audio warnings, visibly displayed alerts provide an
 * accessible alternative to audible alerts for Deaf or hard-of-hearing users.
 * Likewise, alerts can provide an accessible alternative to the visible alerts
 * for blind, deaf-blind, or low-vision users, and others with certain
 * developmental disabilities. The `Alert` component contains the alert message.
 *   An alert is a special type of assertive live region that is intended to
 * cause immediate notification for users.
 *   You are not required to set or manage focus to an alert. Therefore, you
 * also should not require users to close alerts.
 *   If focus should be moved to an alert when it is conveyed, use an
 * `AlertDialog` component instead.
 * @see https://w3c.github.io/aria/#alert
 */
export default function Alert({
  atomic = true,
  children,
  heading,
  icon: iconProp,
  label,
  labelledBy: labelledByProp,
  live = 'assertive',
  type,
}: AlertProps): ReactElement {
  const descriptionId: string = useElementId();
  const headingId: string = useElementId();

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

  const labelledBy = ((): string | undefined => {
    if (heading !== undefined) {
      return headingId;
    }

    if (labelledByProp !== undefined) {
      return labelledByProp;
    }

    return undefined;
  })();

  return (
    <div
      aria-atomic={atomic}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-live={live}
      role="alert"
    >
      {icon && <span>{icon}</span>}
      <div>
        {heading !== undefined && (
          <Heading id={headingId} level={2}>
            {heading}
          </Heading>
        )}
        <div id={descriptionId}>{children}</div>
      </div>
    </div>
  );
}
