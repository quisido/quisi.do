import { FocusScope } from 'react-aria';
import type { ReactElement } from 'react';
import Heading from './heading.js';
import useAlertDialog from '../core/use-alert-dialog.js';
import type {
  AlertDialogProps,
  AlertDialogType,
} from '../core/alert-dialog-props.js';

const toIcon = (type: AlertDialogType): string => {
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
};

/**
 *   An alert dialog is a type of dialog that contains an alert message, where
 * initial focus goes to an element within the dialog.
 *   Alert dialogs are used to convey messages to alert the user. The alert
 * dialog contains both the alert message and the rest of the dialog.
 *   An alert dialog is a special type of dialog that is intended to cause an
 * immediate, alert-level notification.
 *   Unlike alerts, alert dialogs can receive a response from the user. For
 * example, to confirm that the user understands the alert being generated. When
 * the alert dialog is displayed, an active element within the alert dialog,
 * such as a form control or confirmation button, should receive focus.
 * @see {@link https://w3c.github.io/aria/#alertdialog | WAI-ARIA `alertdialog` role}
 */
export default function AlertDialog({
  children,
  heading,
  icon,
  label,
  labelledBy: labelledByProp,
  onDismiss,
  type = 'info',
}: AlertDialogProps): ReactElement {
  const { descriptionId, headingId, labelledBy } = useAlertDialog({
    heading,
    label,
    labelledBy: labelledByProp,
  });

  return (
    <div
      aria-describedby={descriptionId}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-modal
      role="alertdialog"
    >
      <FocusScope autoFocus contain restoreFocus>
        <span>{icon ?? toIcon(type)}</span>
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
      </FocusScope>
    </div>
  );
}
