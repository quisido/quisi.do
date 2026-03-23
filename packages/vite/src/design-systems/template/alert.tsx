import type { ReactElement, ReactNode } from 'react';
import useElementId from '../../hooks/use-element-id.js';
import Heading from './heading.js';

interface BaseAlertProps {
  readonly children: ReactElement;
  readonly heading?: ReactNode | undefined;
  readonly icon?: string | undefined;
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
 *   The `Alert` component communicates important, and usually time-sensitive,
 * information. It is a type of status processed as an atomic live region.
 *   An alert should only be used for information that requires the user's
 * immediate attention. For example:
 * - An invalid value was entered into a form field.
 * - The user's login session is about to expire.
 * - The connection to the server was lost so local changes will not be saved.
 *   An alert should only be used for text content, not interactive elements
 * such as links or buttons. The element with the alert role does not have to be
 * able to receive focus, as screen readers (speech or braille) will
 * automatically announce the updated content regardless of where keyboard is
 * focused.
 *  If the user is expected to close the alert, then the `AlertDialog` component
 * should be used instead.
 */
export default function Alert({
  children,
  heading,
  icon: iconProp,
  label,
  labelledBy: labelledByProp,
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
    <div aria-label={label} aria-labelledby={labelledBy} role="alert">
      {icon && <span>{icon}</span>}
      <div>
        {heading !== undefined && <Heading level={2}>{heading}</Heading>}
        <div id={descriptionId}>{children}</div>
      </div>
    </div>
  );
}
