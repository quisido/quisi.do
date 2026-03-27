import type { ReactElement, ReactNode } from 'react';
import Heading from './heading.js';
import useElementId from '../../hooks/use-element-id.js';
import useAlertDialog from './use-alert-dialog.js';

interface BaseAlertDialogProps {
  readonly children: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: 'error' | 'info' | 'success' | 'warning' | undefined;
}

export interface HeadingAlertDialogProps extends BaseAlertDialogProps {
  readonly heading: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type AlertDialogProps =
  | HeadingAlertDialogProps
  | LabelAlertDialogProps
  | LabelledByAlertDialogProps;

/**
 *   An `AlertDialog` is a type of dialog that contains an alert message, where
 * initial focus goes to an element within the dialog.
 *   Alert dialogs are used to convey messages to alert the user. The
 * `AlertDialog` component contains both the alert message and the rest of the
 * dialog.
 *   An alert dialog is a special type of dialog that is intended to cause an
 * immediate, alert-level notification.
 *   Unlike alerts, alert dialogs can receive a response from the user. For
 * example, to confirm that the user understands the alert being generated. When
 * the alert dialog is displayed, an active element within the alert dialog,
 * such as a form control or confirmation button, should receive focus.
 * @see https://w3c.github.io/aria/#alertdialog
 */
export default function AlertDialog({
  children,
  heading,
  icon: iconProp,
  label,
  labelledBy: labelledByProp,
  onDismiss,
  type = 'info',
}: AlertDialogProps): ReactElement {
  const descriptionId: string = useElementId();
  const headingId: string = useElementId();

  useAlertDialog();

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
      aria-describedby={descriptionId}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-modal
      data-type={type}
      role="alertdialog"
    >
      <span>{icon}</span>
      <div>
        {heading !== undefined && (
          <Heading id={headingId} level={3}>
            {heading}
          </Heading>
        )}
        <div id={descriptionId}>{children}</div>
      </div>
      <button
        aria-label="Dismiss"
        onClick={(): void => {
          onDismiss();
        }}
        type="button"
      >
        &times;
      </button>
    </div>
  );
}
